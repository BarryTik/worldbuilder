<template>
  <div class="menu-bar">
    <button class="menu-button" @click="navigate(simulationActive ? 'restart' : 'upload')">
      {{ simulationActive ? 'Restart' : 'Start' }}
    </button>
    <button class="menu-button" @click="navigate('set-weights')">Set Weights</button>
    <button class="menu-button" :disabled="!simulationActive" @click="navigate('display')">
      Simulate
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    simulationActive: { type: Boolean }
  },
  emits: ['restart', 'navigate'],
  methods: {
    navigate(page: string) {
      this.$emit('navigate', page)
    }
  }
}
</script>

<style>
.menu-bar {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--ev-c-black-soft);
  border-bottom: 3px groove var(--ev-c-black-soft);
}

.menu-button {
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  border-color: var(--ev-button-alt-border);
  color: var(--ev-button-alt-text);
  background-color: var(--ev-button-alt-bg);
  margin-left: 3px;
  margin-right: 3px;
}

.menu-button:hover {
  border-color: var(--ev-button-alt-hover-border);
  color: var(--ev-button-alt-hover-text);
  background-color: var(--ev-button-alt-hover-bg);
}

.menu-button:disabled {
  color: gray;
}
</style>
