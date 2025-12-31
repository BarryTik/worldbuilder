<template>
  <div class="year-select">
    <p>Start Year:</p>
    <input v-model="year" type="number" min="0" />
  </div>
  <div class="actions">
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="openFile">Select Files</a>
    </div>
  </div>
  <p v-if="terrain">Terrain File: {{ terrain }}</p>
  <p v-if="water">Water File: {{ water }}</p>
  <p v-if="vegetation">Vegetation File: {{ vegetation }}</p>
  <p v-if="cities">Cities File: {{ cities }}</p>
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
      year: 0,
      terrain: '',
      water: '',
      vegetation: '',
      cities: ''
    }
  },

  methods: {
    submit() {
      const files: FilePaths = {
        terrain: this.terrain,
        water: this.water,
        vegetation: this.vegetation
      }
      if (this.cities) {
        files.cities = this.cities
      }
      this.$emit('start-sim', files, this.year)
    },
    async openFile() {
      const filePaths: string[] = await window.api.openFile()
      const terrainFiles = filePaths.filter((p: string) => p.includes('terrain'))
      const waterFiles = filePaths.filter((p: string) => p.includes('water'))
      const vegetationFiles = filePaths.filter((p: string) => p.includes('vegetation'))
      const cityFiles = filePaths.filter((p: string) => p.includes('cities'))
      if (terrainFiles.length) {
        this.terrain = terrainFiles[0]
      }
      if (waterFiles.length) {
        this.water = waterFiles[0]
      }
      if (vegetationFiles.length) {
        this.vegetation = vegetationFiles[0]
      }
      if (cityFiles.length) {
        this.cities = cityFiles[0]
      }
    }
  }
}
</script>

<style>
.year-select {
  display: flex;
  margin: 5px;
  p {
    margin-right: 5px;
  }
}
</style>
