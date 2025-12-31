import { ElectronAPI } from '@electron-toolkit/preload'
import type { FilePaths } from 'src/types/types'
import { PixelData } from 'src/main/pixel-data'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      intakePngs: (filePaths: FilePaths, year: number) => Promise<PixelData[]>
      openFile: () => Promise<string[]>
      rollCities: () => Promise<{ worldObject: PixelData[]; year: number }>
      setWeights: (weights: string) => Promise<void>
      getWeights: () => Promise<Weights>
      exportPng: () => Promise<void>
    }
  }
}
