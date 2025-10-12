<template>
  <div class="pixel" :class="getColor()"></div>
</template>

<script lang="ts">
import { kebabCase } from 'lodash'

export default {
  props: {
    pixel: { type: Object }
  },
  methods: {
    getColor() {
      if (this.pixel?.city) {
        return 'city'
      }
      return kebabCase(this.pixel?.water)
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
  background-color: rgb(255, 168, 168);
  animation: pulse 2s infinite;
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
