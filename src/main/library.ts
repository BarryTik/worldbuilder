import fs from 'fs'
import { PNG } from 'pngjs/browser'
import { FilePaths, RGBCode, WaterType, Weights } from '../types/types'
import { dialog } from 'electron'
import { PixelData } from './pixel-data'
import Store from 'electron-store'

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
    const pixel = new PixelData(x, y, terrain, water, vegetation)
    pixelData.push(pixel)
  }
  const store = new Store()
  store.set('world-object', pixelData)
  return pixelData
}

export function rollCities(): PixelData[] {
  console.log('rollCitites - backend')
  const store = new Store()
  const worldObject = store.get('world-object') as PixelData[]
  const weights = store.get('weights') as Weights
  for (const pixel of worldObject) {
    if (pixel.city) {
      calculateCityFall(pixel, weights)
    } else {
      calculateCityRise(pixel, weights)
    }
  }
  console.log('end')
  store.set('world-object', worldObject)
  return worldObject
}

function calculateCityRise(pixel: PixelData, weights: Weights): void {
  if (pixel.water == WaterType.HARBOR) {
    pixel.city = true
  }
}

function calculateCityFall(pixel: PixelData, weights: Weights): void {
  if (pixel.city) {
    pixel.city = false
  }
}

export function setWeights(_event, weights: string): void {
  const store = new Store()
  store.set('weights', JSON.parse(weights))
  return
}
