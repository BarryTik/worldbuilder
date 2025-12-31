<template>
  <h1>Year: {{ year }}</h1>
  <Loading v-if="loading" />
  <div v-else>
    <div>
      <div v-for="r in 180" :key="r" class="row">
        <div v-for="c in 360" :key="c">
          <Pixel :pixel="worldobject![getIndex(r, c)]" :weights="weights" />
        </div>
      </div>
    </div>
    <h1>Number of Cities: {{ countCities() }}</h1>
    <div class="button-row">
      <button class="menu-button">
        <span @click="nextYear()">Advance Time</span>
        <input v-model="interval" type="number" min="0" max="100" />
      </button>
      <button class="menu-button" @click="exportCsv()">Export Data</button>
    </div>
  </div>
</template>

<script lang="ts">
import { PixelData } from 'src/main/pixel-data'
import Pixel from './Pixel.vue'
import Loading from './Loading.vue'
import { saveAs } from 'file-saver'
export default {
  components: {
    Pixel,
    Loading
  },
  props: {
    worldobject: { type: Array<PixelData> },
    weights: { type: Object }
  },
  emits: ['set-world-object'],
  data() {
    return {
      loading: false,
      interval: 1,
      year: 0
    }
  },
  methods: {
    getIndex(row: number, column: number) {
      return row * 360 + column
    },
    async nextYear() {
      this.loading = true
      for (let i = 0; i < this.interval; i++) {
        this.year++
        await this.rollCities()
      }
      this.loading = false
    },
    async rollCities() {
      const response = await window.api.rollCities()
      this.countCities()
      this.$emit('set-world-object', response)
    },
    countCities() {
      let numberOfCities = 0
      for (const pixel of this.worldobject!) {
        if (pixel.city) numberOfCities += 1
      }
      return numberOfCities
    },
    exportCsv() {
      this.loading = true
      let rows = ['x,y,year,event']
      for (const pixel of this.worldobject || []) {
        for (const historyEvents of pixel.historyEvents) {
          rows.push(`${pixel.x},${pixel.y},${historyEvents.year},${historyEvents.event}`)
        }
      }
      const blob = new Blob([rows.join('\n')], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'worldbuilder-history.csv')
      this.loading = false
    }
  }
}
</script>
<style>
.row {
  display: flex;
  flex-direction: row;
}
.button-row {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.menu-button {
  input {
    width: 4em;
    margin-left: 3px;
  }
}
</style>
