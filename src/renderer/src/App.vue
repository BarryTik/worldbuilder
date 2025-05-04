<script lang="ts">
import Loading from './components/Loading.vue'
import Upload from './components/Upload.vue'
import type { FilePaths } from '../../types/types'
export default {
  components: {
    Loading,
    Upload
  },
  data() {
    return {
      loading: false,
      stage: 'upload'
    }
  },
  methods: {
    async intakePngs(filePaths: FilePaths) {
      this.loading = true
      const response = await window.api.intakePngs(filePaths)
      console.log(response)
      this.loading = false
    }
  }
}
</script>

<template>
  <Loading v-if="loading" />
  <div v-else>
    <Upload @start-sim="intakePngs" />
  </div>
</template>
