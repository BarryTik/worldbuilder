<template>
  <Loading v-if="loading" />
  <div v-else>
    <div>
      <div v-for="r in 180" :key="r" class="row">
        <div v-for="c in 360" :key="c">
          <Pixel :pixel="worldobject![getIndex(r, c)]" />
        </div>
      </div>
    </div>
    <div class="button-row">
      <button class="menu-button" @click="nextYear()">Next Year</button>
    </div>
  </div>
</template>

<script lang="ts">
import { PixelData } from 'src/main/pixel-data'
import Pixel from './Pixel.vue'
import Loading from './Loading.vue'
export default {
  components: {
    Pixel,
    Loading
  },
  props: {
    worldobject: { type: Array<PixelData> }
  },
  emits: ['set-world-object'],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    getIndex(row: number, column: number) {
      return row * 360 + column
    },
    async nextYear() {
      this.loading = true
      await this.rollCities()
      this.loading = false
    },
    async rollCities() {
      const response = await window.api.rollCities()
      this.$emit('set-world-object', response)
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
</style>
