export interface FilePaths {
  terrain: string
  water: string
  vegetation: string
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
  NONE = 'None'
}

export enum TerrainType {
  WATER = 'Water',
  FLAT = 'Flat',
  HILLY = 'Hilly',
  MOUNTAIN = 'Mountain',
  GLACIER = 'Glacier'
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
  TUNDRA = 'Tundra'
}
