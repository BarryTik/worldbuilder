<template>
  <div v-if="loading">
    <Loading />
  </div>
  <div v-else class="weights-content">
    <h1>Set Weights</h1>
    <div class="wrapper-flex-column">
      <label for="development-index">Global Development Index (Rise)</label>
      <input id="rise-index" v-model="weights.riseIndex" type="number" min="0" max="100" />
    </div>
    <div class="wrapper-flex-column">
      <label for="development-index">Global Development Index (Fall)</label>
      <input id="fall-index" v-model="weights.fallIndex" type="number" min="0" max="100" />
    </div>
    <div class="wrapper-flex-column">
      <label for="distance">Distance Weight</label>
      <input id="distance" v-model="weights.distance" type="number" />
    </div>
    <div>
      <div class="type-buttons">
        <button class="menu-button" @click="selectType('water')">Water Weights</button>
        <button class="menu-button" @click="selectType('vegetation')">Vegetation Weights</button>
        <button class="menu-button" @click="selectType('terrain')">Terrain Weights</button>
      </div>
      <div v-if="selectedType == 'water'">
        <div v-for="type of waterTypes" :key="type">
          {{ type }}
          <input v-model="weights.water[type]" type="number" min="0" max="100" />
        </div>
      </div>
      <div v-if="selectedType == 'vegetation'">
        <div v-for="type of vegetationTypes" :key="type">
          {{ type }}
          <input v-model="weights.vegetation[type]" type="number" min="0" max="100" />
        </div>
      </div>
      <div v-if="selectedType == 'terrain'">
        <div v-for="type of terrainTypes" :key="type">
          {{ type }}
          <input v-model="weights.terrain[type]" type="number" min="0" max="100" />
        </div>
      </div>
    </div>
    <div>
      <button class="menu-button" @click="submit()">Submit</button>
    </div>
  </div>
</template>
<script lang="ts">
import Loading from './Loading.vue'
import { WaterType, VegetationType, TerrainType, Weights } from '../../../../src/types/types'
import { remove, camelCase } from 'lodash'
export default {
  components: {
    Loading
  },
  props: {
    inputweights: { type: Weights }
  },
  emits: ['set-weights'],
  data() {
    return {
      loading: true,
      selectedType: 'water',
      waterTypes: [] as string[],
      terrainTypes: [] as string[],
      vegetationTypes: [] as string[],
      weights: new Weights()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const waterTypes = remove(Object.values(WaterType), (i) => i !== 'Not Found')
      this.waterTypes = waterTypes.map((t) => camelCase(t))
      const vegetationTypes = remove(Object.values(VegetationType), (i) => i !== 'Not Found')
      this.vegetationTypes = vegetationTypes.map((t) => camelCase(t))
      const terrainTypes = remove(Object.values(TerrainType), (i) => i !== 'Not Found')
      this.terrainTypes = terrainTypes.map((t) => camelCase(t))
      this.weights = new Weights(this.inputweights)
      this.loading = false
    },
    selectType(type) {
      this.selectedType = type
    },
    submit() {
      this.$emit('set-weights', this.weights)
    }
  }
}
</script>
<style>
.wrapper-flex-column {
  display: flex;
  flex-direction: column;
}
.type-buttons {
  display: flex;
}
input {
  width: 100px;
}
.weights-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>
