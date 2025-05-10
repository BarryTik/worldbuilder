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
</style>
