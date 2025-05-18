<template>
  <div v-for="r in 180" :key="r" class="row">
    <div v-for="c in 360" :key="c">
      <Pixel :pixel="worldobject![getIndex(r, c)]" />
    </div>
  </div>
  <div>
    <button @click="restart">RESTART</button>
  </div>
</template>

<script lang="ts">
import { flatten } from 'lodash'
import { PixelData } from 'src/main/pixel-data'
import { WaterType } from '../../../../src/types/types'
import Pixel from './Pixel.vue'
export default {
  components: {
    Pixel
  },
  props: {
    worldobject: { type: Array<PixelData> }
  },
  emits: ['restart'],
  data() {
    return {}
  },
  methods: {
    convertWorldObject() {
      const pixels = this.$props.worldobject!.map((pixel) => {
        if (pixel.water === WaterType.OCEAN) {
          return [0, 174, 239]
        }
        return [255, 255, 255]
      })
      const flat = flatten(pixels)
      return flat
    },
    getIndex(row: number, column: number) {
      return row * 360 + column
    },
    restart() {
      this.$emit('restart')
    }
  }
}
</script>
<style>
.row {
  display: flex;
  flex-direction: row;
}
</style>
