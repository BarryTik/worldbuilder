<template>
  <div class="actions">
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="openFile">Select Files</a>
    </div>
  </div>
  <p v-if="terrain">Terrain File: {{ terrain }}</p>
  <p v-if="water">Water File: {{ water }}</p>
  <p v-if="vegetation">Vegetation File: {{ vegetation }}</p>
  <div v-if="terrain && water && vegetation" class="actions">
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="submit">Submit</a>
    </div>
  </div>
</template>

<script lang="ts">
import type { FilePaths } from '../../../types/types'
export default {
  emits: ['start-sim'],

  data() {
    return {
      terrain: '',
      water: '',
      vegetation: ''
    }
  },

  methods: {
    submit() {
      const files: FilePaths = {
        terrain: this.terrain,
        water: this.water,
        vegetation: this.vegetation
      }
      this.$emit('start-sim', files)
    },
    async openFile() {
      const filePaths: string[] = await window.api.openFile()
      const terrainFiles = filePaths.filter((p: string) => p.includes('terrain'))
      const waterFiles = filePaths.filter((p: string) => p.includes('water'))
      const vegetationFiles = filePaths.filter((p: string) => p.includes('vegetation'))
      if (terrainFiles.length) {
        this.terrain = terrainFiles[0]
      }
      if (waterFiles.length) {
        this.water = waterFiles[0]
      }
      if (vegetationFiles.length) {
        this.vegetation = vegetationFiles[0]
      }
    }
  }
}
</script>
