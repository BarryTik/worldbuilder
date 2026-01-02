export interface FilePaths {
  terrain: string
  water: string
  vegetation: string
  cities?: string
}

export interface RGBCode {
  r: number
  g: number
  b: number
}

export enum WaterType {
  OCEAN = 'Ocean',
  RIVER = 'River',
  HARBOR = 'Harbor',
  OASIS = 'Oasis',
  NONE = 'None',
  ERROR = 'Not Found'
}

export enum TerrainType {
  WATER = 'Water',
  FLAT = 'Flat',
  HILLY = 'Hilly',
  MOUNTAIN = 'Mountain',
  GLACIER = 'Glacier',
  ERROR = 'Not Found'
}

export enum VegetationType {
  WATER = 'Water',
  NONE = 'None',
  DESERT = 'Desert',
  GRASS = 'Grassland',
  SAVANNA = 'Savanna',
  LIGHT_FOREST = 'Light Forest',
  DENSE_FOREST = 'Dense Forest',
  SWAMP = 'Swamp',
  TUNDRA = 'Tundra',
  ERROR = 'Not Found'
}

export class Weights {
  riseIndex: number
  fallIndex: number
  distance: number
  water: {
    ocean: number
    river: number
    harbor: number
    oasis: number
    none: number
  }
  terrain: {
    water: number
    flat: number
    hilly: number
    mountain: number
    glacier: number
  }
  vegetation: {
    water: number
    none: number
    desert: number
    grassland: number
    savanna: number
    lightForest: number
    denseForest: number
    swamp: number
    tundra: number
  }

  constructor(props?) {
    this.riseIndex = props?.riseIndex || 0
    this.fallIndex = props?.fallIndex || 0
    this.distance = props?.distance || 0
    if (props?.water) {
      this.water = props.water
    } else {
      this.water = {
        ocean: 0,
        river: 0,
        harbor: 0,
        oasis: 0,
        none: 0
      }
    }
    if (props?.terrain) {
      this.terrain = props.terrain
    } else {
      this.terrain = {
        water: 0,
        flat: 0,
        hilly: 0,
        mountain: 0,
        glacier: 0
      }
    }
    if (props?.vegetation) {
      this.vegetation = props.vegetation
    } else {
      this.vegetation = {
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
}
