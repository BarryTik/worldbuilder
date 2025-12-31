import { TerrainType, WaterType, VegetationType, RGBCode } from '../types/types'

export interface PixelData {
  terrain: TerrainType
  water: WaterType
  vegetation: VegetationType
  city: boolean
  x: number
  y: number
  historyEvents: HistoryEvent[]
}

export interface HistoryEvent {
  year: number
  event: 'rise' | 'fall'
}

function assignTerrainType(r: number, g: number, b: number): TerrainType {
  if (r == 0 && g == 0 && b == 255) {
    return TerrainType.WATER
  }
  if (r == 100 && g == 100 && b == 100) {
    return TerrainType.HILLY
  }
  if (r == 0 && g == 0 && b == 0) {
    return TerrainType.MOUNTAIN
  }
  if (r == 243 && g == 243 && b == 244) {
    return TerrainType.GLACIER
  }
  if (r == 200 && g == 200 && b == 200) {
    return TerrainType.FLAT
  }
  return TerrainType.ERROR
}

function assignWaterType(r: number, g: number, b: number): WaterType {
  if (r == 0 && g == 174 && b == 239) {
    return WaterType.OCEAN
  }
  if (r == 170 && g == 224 && b == 250) {
    return WaterType.RIVER
  }
  if (r == 237 && g == 28 && b == 36) {
    return WaterType.HARBOR
  }
  if (r == 255 && g == 242 && b == 0) {
    return WaterType.OASIS
  }
  if (r == 255 && g == 255 && b == 255) {
    return WaterType.NONE
  }
  return WaterType.ERROR
}

function assignVegetationType(r: number, g: number, b: number): VegetationType {
  if (r == 0 && g == 0 && b == 255) {
    return VegetationType.WATER
  }
  if (r == 211 && g == 192 && b == 149) {
    return VegetationType.DESERT
  }
  if (r == 234 && g == 224 && b == 147) {
    return VegetationType.GRASS
  }
  if (r == 165 && g == 168 && b == 112) {
    return VegetationType.SAVANNA
  }
  if (r == 130 && g == 144 && b == 70) {
    return VegetationType.LIGHT_FOREST
  }
  if (r == 105 && g == 127 && b == 43) {
    return VegetationType.DENSE_FOREST
  }
  if (r == 12 && g == 128 && b == 126) {
    return VegetationType.SWAMP
  }
  if (r == 192 && g == 212 && b == 207) {
    return VegetationType.TUNDRA
  }
  if (r == 226 && g == 227 && b == 228) {
    return VegetationType.NONE
  }
  return VegetationType.ERROR
}

function assignCityType(r: number, g: number, b: number): boolean {
  if (r == 0 && g == 0 && b == 0) {
    return true
  }
  return false
}

export function newPixel(
  x: number,
  y: number,
  terrain: RGBCode,
  water: RGBCode,
  vegetation: RGBCode,
  city?: RGBCode
): PixelData {
  if (city) {
    return {
      x,
      y,
      terrain: assignTerrainType(terrain.r, terrain.g, terrain.b),
      vegetation: assignVegetationType(vegetation.r, vegetation.g, vegetation.b),
      water: assignWaterType(water.r, water.g, water.b),
      city: assignCityType(city.r, city.g, city.b),
      historyEvents: []
    }
  }
  return {
    x,
    y,
    terrain: assignTerrainType(terrain.r, terrain.g, terrain.b),
    vegetation: assignVegetationType(vegetation.r, vegetation.g, vegetation.b),
    water: assignWaterType(water.r, water.g, water.b),
    city: false,
    historyEvents: []
  }
}
