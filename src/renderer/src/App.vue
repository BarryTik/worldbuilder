<script lang="ts">
import Loading from './components/Loading.vue'
import Upload from './components/Upload.vue'
import Display from './components/Display.vue'
import { FilePaths, Weights } from '../../types/types'
import { PixelData } from 'src/main/pixel-data'
import AppMenu from './components/AppMenu.vue'
import Swal from 'sweetalert2'
import SetWeights from './components/SetWeights.vue'
export default {
  components: {
    Loading,
    Upload,
    Display,
    AppMenu,
    SetWeights
  },
  data() {
    return {
      loading: false,
      worldObject: [] as PixelData[],
      page: 'upload',
      weights: {
        riseIndex: 0,
        fallIndex: 0,
        distance: 0,
        water: {
          ocean: 0,
          river: 0,
          harbor: 0,
          oasis: 0,
          none: 0
        },
        terrain: {
          water: 0,
          flat: 0,
          hilly: 0,
          mountain: 0,
          glacier: 0
        },
        vegetation: {
          water: 0,
          none: 0,
          desert: 0,
          grassland: 0,
          savanna: 0,
          lightForest: 0,
          denseForest: 0,
          swamp: 0,
          tundra: 0
        }
      }
    }
  },
  mounted() {
    this.getWeights()
  },
  methods: {
    async intakePngs(filePaths: FilePaths) {
      this.loading = true
      const response = await window.api.intakePngs(filePaths)
      this.worldObject = response
      this.page = 'display'
      this.loading = false
    },
    restart() {
      Swal.fire({
        title: 'Restart?',
        icon: 'warning',
        text: 'Work will not be saved',
        showCancelButton: true
      }).then((onClose) => {
        if (onClose.isConfirmed) {
          this.worldObject = []
          this.page = 'upload'
        }
      })
    },
    navigate(page: string) {
      if (page == 'restart') {
        this.restart()
      } else {
        this.page = page
      }
    },
    async setWeights(weights: Weights) {
      this.loading = true
      await window.api.setWeights(JSON.stringify(weights))
      this.weights = { ...weights }
      this.loading = false
    },
    setWorldObject(worldObject: PixelData[]) {
      this.worldObject = worldObject
    },
    async getWeights() {
      this.weights = await window.api.getWeights()
    }
  }
}
</script>

<template>
  <AppMenu :simulation-active="worldObject.length > 0" @restart="restart" @navigate="navigate" />
  <Loading v-if="loading" />
  <div v-else class="full-height">
    <div v-if="page == 'upload'" class="full-height">
      <Upload @start-sim="intakePngs" />
    </div>
    <div v-else-if="page == 'display'" class="full-height">
      <Display :worldobject="worldObject" :weights="weights" @set-world-object="setWorldObject" />
    </div>
    <div v-else-if="page == 'set-weights'" class="full-height">
      <SetWeights :inputweights="weights" @set-weights="setWeights" />
    </div>
    <div v-else class="full-height">X</div>
  </div>
</template>

<style>
#app {
  margin-top: 50px;
  height: calc(100vh - 50px);
}
.full-height {
  height: 100%;
}
</style>
