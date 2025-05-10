import fs from 'fs'
import { PNG } from 'pngjs/browser'
import { FilePaths, RGBCode } from '../types/types'
import { dialog } from 'electron'
import { PixelData } from './pixel-data'

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
  const height = 180
  const width = 360
  const pixelData: PixelData[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const rCoordinate = y * width + 4 * x
      const gCoordinate = y * width + 4 * x + 1
      const bCoordinate = y * width + 4 * x + 2
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
      const pixel = new PixelData(x, y, terrain, water, vegetation)
      pixelData.push(pixel)
    }
  }
  return pixelData
}
