<template>
  <div class="pixel" :class="getColor()" @click="onClick()"></div>
</template>

<script lang="ts">
import { camelCase, kebabCase } from 'lodash'
import { PixelData } from 'src/main/pixel-data'
import Swal from 'sweetalert2'

export default {
  props: {
    pixel: { type: Object },
    weights: { type: Object }
  },
  methods: {
    getColor() {
      if (this.pixel?.city) {
        return 'city'
      }
      return kebabCase(this.pixel?.water)
    },
    onClick() {
      Swal.fire({
        title: `${this.pixel?.x}, ${this.pixel?.y}`,
        html: `<p>Water: ${this.pixel?.water}</p><br><p>Terrain: ${this.pixel?.terrain}</p><br><p>Vegetation: ${this.pixel?.vegetation}</p><hr><p>Total Weight: ${this.getMapWeightForPixel()}</p><br>${this.pixel?.city ? '<h3>CITY</h3>' : '<h4>no city</h4>'}<br>${this.pixel?.historyEvents?.length ? '<h3>History:</h3><p>' + this.formatHistory(this.pixel as PixelData) + '</p>' : ''}`
      })
    },
    getMapWeightForPixel(): string {
      const waterWeight = this.weights?.water[camelCase(this.pixel?.water)] || 0
      const terrainWeight = this.weights?.terrain[camelCase(this.pixel?.terrain)] || 0
      const vegetationWeight = this.weights?.terrain[camelCase(this.pixel?.vegetation)] || 0
      return ((waterWeight + terrainWeight + vegetationWeight) / 3).toFixed(2)
    },
    formatHistory(pixel: PixelData) {
      let events: string[] = []
      for (const event of pixel.historyEvents) {
        events.push(`${event.year}: ${event.event}`)
      }
      return events.join('\n')
    }
  }
}
</script>

<style>
.pixel {
  height: 2px;
  width: 2px;
}
.city {
  /* background-color: rgb(255, 168, 168); */
  background-color: black;
}
.ocean {
  background-color: rgb(0, 174, 239);
}
.river {
  background-color: rgb(170, 224, 250);
}
.harbor {
  background-color: rgb(237, 28, 36);
}
.oasis {
  background-color: rgb(255, 242, 0);
}
.none {
  background-color: rgb(255, 255, 255);
}
.not-found {
  background-color: rgb(0, 0, 0);
}

@keyframes pulse {
  0% {
    transform: scale(0.9); /* Slightly smaller at the start */
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); /* Initial shadow */
  }
  70% {
    transform: scale(1.1); /* Grows to a larger size */
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0); /* Expands and fades out shadow */
  }
  100% {
    transform: scale(0.9); /* Returns to slightly smaller size */
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); /* Shadow fully faded */
  }
}
</style>
