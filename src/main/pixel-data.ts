import { TerrainType, WaterType, VegetationType, RGBCode } from '../types/types'

export class PixelData {
  terrain: TerrainType
  water: WaterType
  vegetation: VegetationType
  city = false
  x: number
  y: number

  constructor(x: number, y: number, terrain: RGBCode, water: RGBCode, vegetation: RGBCode) {
    this.x = x
    this.y = y
    this.terrain = this.assignTerrainType(terrain.r, terrain.g, terrain.b)
    this.vegetation = this.assignVegetationType(vegetation.r, vegetation.g, vegetation.b)
    this.water = this.assignWaterType(water.r, water.g, water.b)
  }

  private assignTerrainType(r: number, g: number, b: number): TerrainType {
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
    return TerrainType.FLAT
  }

  private assignWaterType(r: number, g: number, b: number): WaterType {
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
    return WaterType.NONE
  }

  private assignVegetationType(r: number, g: number, b: number): VegetationType {
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
    return VegetationType.NONE
  }
}
