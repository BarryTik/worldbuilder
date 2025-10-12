import { ElectronAPI } from '@electron-toolkit/preload'
import type { FilePaths } from 'src/types/types'
import { PixelData } from 'src/main/pixel-data'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      intakePngs: (filePaths: FilePaths) => Promise<PixelData[]>
      openFile: () => Promise<string[]>
      rollCities: () => Promise<PixelData[]>
      setWeights: (weights: string) => Promize<void>
    }
  }
}
