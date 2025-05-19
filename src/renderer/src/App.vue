<script lang="ts">
import Loading from './components/Loading.vue'
import Upload from './components/Upload.vue'
import Display from './components/Display.vue'
import { FilePaths } from '../../types/types'
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
      page: 'upload'
    }
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
    }
  }
}
</script>

<template>
  <AppMenu :simulation-active="worldObject.length > 0" @restart="restart" @navigate="navigate" />
  <Loading v-if="loading" />
  <div v-else>
    <div v-if="page == 'upload'">
      <Upload @start-sim="intakePngs" />
    </div>
    <div v-else-if="page == 'display'">
      <Display :worldobject="worldObject" />
    </div>
    <div v-else-if="page == 'set-weights'">
      <SetWeights />
    </div>
    <div v-else>X</div>
  </div>
</template>
