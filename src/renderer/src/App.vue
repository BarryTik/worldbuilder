<script lang="ts">
import Loading from './components/Loading.vue'
import Upload from './components/Upload.vue'
import Display from './components/Display.vue'
import { FilePaths } from '../../types/types'
import { PixelData } from 'src/main/pixel-data'
export default {
  components: {
    Loading,
    Upload,
    Display
  },
  data() {
    return {
      loading: false,
      worldObject: [] as PixelData[]
    }
  },
  methods: {
    async intakePngs(filePaths: FilePaths) {
      this.loading = true
      const response = await window.api.intakePngs(filePaths)
      this.worldObject = response
      this.loading = false
    },
    restart() {
      this.worldObject = []
    }
  }
}
</script>

<template>
  <Loading v-if="loading" />
  <div v-else>
    <div v-if="worldObject.length">
      <Display :worldobject="worldObject" @restart="restart" />
    </div>
    <div v-else>
      <Upload @start-sim="intakePngs" />
    </div>
  </div>
</template>
