<template>
  <input type="file" multiple accept=".png" @change="fileChanged($event)" />
  <p v-for="file of files" :key="file.name">
    {{ file.name }}
  </p>
  <button v-if="files.length" @click="submit">START SIMULATION</button>
</template>

<script lang="ts">
export default {
  emits: ['start-sim'],

  data() {
    return {
      files: []
    }
  },

  methods: {
    fileChanged(event: Event) {
      const inputElement = event.target as HTMLInputElement
      const files: FileList = inputElement.files
      this.files = files
    },
    submit() {
      this.$emit('start-sim')
    }
  }
}
</script>
