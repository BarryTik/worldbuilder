<script lang="ts">
import Loading from './components/Loading.vue'
import Upload from './components/Upload.vue'
import Display from './components/Display.vue'
import { WaterType, TerrainType, VegetationType, FilePaths } from '../../types/types'
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
      worldObject: [] as PixelData[],
      stage: 'upload'
    }
  },
  methods: {
    async intakePngs(filePaths: FilePaths) {
      this.loading = true
      const response = await window.api.intakePngs(filePaths)
      this.worldObject = response
      console.log('WATER')
      Object.values(WaterType).forEach((type) => {
        const filtered = response.filter((pd) => pd.water == type)
        console.log(type, filtered.length)
      })
      console.log('TERRAIN')
      Object.values(TerrainType).forEach((type) => {
        const filtered = response.filter((pd) => pd.terrain == type)
        console.log(type, filtered.length)
      })
      console.log('VEG')
      Object.values(VegetationType).forEach((type) => {
        const filtered = response.filter((pd) => pd.vegetation == type)
        console.log(type, filtered.length)
      })
      this.loading = false
    }
  }
}
</script>

<template>
  <Loading v-if="loading" />
  <div v-else>
    <div v-if="worldObject.length">
      <Display :worldobject="worldObject" />
    </div>
    <div v-else>
      <Upload @start-sim="intakePngs" />
    </div>
  </div>
</template>
