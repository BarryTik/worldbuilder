import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron/renderer'

// Custom APIs for renderer
const api = {
  intakePngs: (filePaths) => ipcRenderer.invoke('intakePngs', filePaths),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  rollCities: () => ipcRenderer.invoke('rollCities'),
  setWeights: (weights) => ipcRenderer.invoke('setWeights', weights)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
