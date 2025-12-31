import fs from 'fs'
import { PNG } from 'pngjs/browser'
import { FilePaths, RGBCode, Weights } from '../types/types'
import { dialog } from 'electron'
import { newPixel, PixelData } from './pixel-data'
import Store from 'electron-store'
import { camelCase } from 'lodash'

export async function handleFileOpen(): Promise<string[]> {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'Image', extensions: ['png'] }],
    properties: ['openFile', 'multiSelections']
  })
  if (canceled) {
    return []
  }
  return filePaths
}

export function intakePngs(_event, filePaths: FilePaths): PixelData[] {
  const store = new Store()
  store.set('year', 0)
  const terrainPixelData = pngToRgbaArray(filePaths.terrain)
  const vegetationPixelData = pngToRgbaArray(filePaths.vegetation)
  const waterPixelData = pngToRgbaArray(filePaths.water)
  return buildWorldObject(terrainPixelData, vegetationPixelData, waterPixelData)
}

function pngToRgbaArray(filePath: string): Buffer<ArrayBufferLike> {
  const data = fs.readFileSync(filePath)
  const png = PNG.sync.read(data)
  return png.data
}

function buildWorldObject(
  terrainPixelData: Buffer<ArrayBufferLike>,
  vegetationPixelData: Buffer<ArrayBufferLike>,
  waterPixelData: Buffer<ArrayBufferLike>
): PixelData[] {
  const pixelData: PixelData[] = []
  for (let p = 0; p < waterPixelData.length; p = p + 4) {
    const rCoordinate = p
    const gCoordinate = p + 1
    const bCoordinate = p + 2
    const terrain: RGBCode = {
      r: terrainPixelData[rCoordinate],
      g: terrainPixelData[gCoordinate],
      b: terrainPixelData[bCoordinate]
    }
    const water: RGBCode = {
      r: waterPixelData[rCoordinate],
      g: waterPixelData[gCoordinate],
      b: waterPixelData[bCoordinate]
    }
    const vegetation: RGBCode = {
      r: vegetationPixelData[rCoordinate],
      g: vegetationPixelData[gCoordinate],
      b: vegetationPixelData[bCoordinate]
    }
    const x = (p / 4) % 360
    const y = Math.floor(p / 4 / 180)
    const pixel = newPixel(x, y, terrain, water, vegetation)
    pixelData.push(pixel)
  }
  const store = new Store()
  store.set('world-object', pixelData)
  return pixelData
}

export function rollCities(): PixelData[] {
  const store = new Store()
  const worldObject = store.get('world-object') as PixelData[]
  let year = store.get('year') as number
  year++
  store.set('year', year)
  const weights = getWeights()
  const pixelsWithCities = getPixelsWithCities(worldObject)
  for (const pixel of worldObject) {
    if (pixel.city) {
      calculateCityFall(pixel, weights, pixelsWithCities, year)
    } else {
      calculateCityRise(pixel, weights, pixelsWithCities, year)
    }
  }
  store.set('world-object', worldObject)
  return worldObject
}

function calculateCityRise(
  pixel: PixelData,
  weights: Weights,
  pixelsWithCities: PixelData[],
  year: number
): void {
  const random = Math.random() * 5000
  const mapWeight =
    getMapWeightForPixel(pixel, weights) *
    weights.riseIndex *
    getDistanceWeightForPixel(pixel, weights, pixelsWithCities)
  if (random < mapWeight) {
    pixel.city = true
    pixel.historyEvents.push({
      event: 'rise',
      year
    })
  }
}

function calculateCityFall(
  pixel: PixelData,
  weights: Weights,
  pixelsWithCities: PixelData[],
  year: number
): void {
  const random = Math.random() * 50
  const mapWeight =
    getMapWeightForPixel(pixel, weights) *
    weights.fallIndex *
    getDistanceWeightForPixel(pixel, weights, pixelsWithCities)
  if (random < mapWeight) {
    pixel.city = false
    pixel.historyEvents.push({
      event: 'fall',
      year
    })
  }
}

export function setWeights(_event, weights: string): void {
  const store = new Store()
  store.set('weights', JSON.parse(weights))
  return
}

export function getWeights(): Weights {
  const store = new Store()
  if (!store.has('weights'))
    return {
      riseIndex: 0,
      fallIndex: 0,
      distance: 0,
      water: {
        ocean: 0,
        river: 0,
        harbor: 0,
        oasis: 0,
        none: 0
      },
      terrain: {
        water: 0,
        flat: 0,
        hilly: 0,
        mountain: 0,
        glacier: 0
      },
      vegetation: {
        water: 0,
        none: 0,
        desert: 0,
        grassland: 0,
        savanna: 0,
        lightForest: 0,
        denseForest: 0,
        swamp: 0,
        tundra: 0
      }
    }
  return store.get('weights') as Weights
}

function getMapWeightForPixel(pixel: PixelData, weights: Weights): number {
  const waterWeight = weights.water[camelCase(pixel.water)] || 0
  const terrainWeight = weights.terrain[camelCase(pixel.terrain)] || 0
  const vegetationWeight = weights.terrain[camelCase(pixel.vegetation)] || 0
  return (waterWeight + terrainWeight + vegetationWeight) / 300
}

function getDistanceWeightForPixel(
  pixel: PixelData,
  weights: Weights,
  pixelsWithCities: PixelData[]
): number {
  let scale = 0
  const breakpoints = [
    { distance: 10, scale: 1 },
    { distance: 25, scale: 0.75 },
    { distance: 50, scale: 0.5 },
    { distance: 100, scale: 0.25 }
  ]
  for (const breakpoint of breakpoints) {
    if (cityIsWithinDistance(breakpoint.distance, pixel.x, pixel.y, pixelsWithCities)) {
      scale = breakpoint.scale
      break
    }
  }
  return 1 + (scale * weights.distance) / 100
}

function cityIsWithinDistance(
  distance: number,
  x: number,
  y: number,
  pixelsWithCities: PixelData[]
): boolean {
  const firstCityWithinDistance = pixelsWithCities.find((p) => {
    const d = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2))
    return d <= distance
  })
  return !!firstCityWithinDistance
}

function getPixelsWithCities(worldObject: PixelData[]): PixelData[] {
  const pixelsWithCities = worldObject.filter((p) => p.city)
  // duplicate pixels to mimic a continuously wrapping world
  const roundWorldObject: PixelData[] = [...pixelsWithCities]
  for (const pixel of pixelsWithCities) {
    roundWorldObject.push(
      ...[
        { ...pixel, x: pixel.x + 360 },
        { ...pixel, x: pixel.x - 360 },
        { ...pixel, y: pixel.y + 180 },
        { ...pixel, y: pixel.y - 180 },
        { ...pixel, x: pixel.x + 360, y: pixel.y + 180 },
        { ...pixel, x: pixel.x + 360, y: pixel.y - 180 },
        { ...pixel, x: pixel.x - 360, y: pixel.y + 180 },
        { ...pixel, x: pixel.x - 360, y: pixel.y - 180 }
      ]
    )
  }
  return roundWorldObject
}
