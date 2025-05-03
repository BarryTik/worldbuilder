# Rob McCaleb's World Builder

An Electron application with Vue and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
---

## Project Outline

I am a hobby world builder and I would like a tool developed that will simulate the rise and fall of cities across a constructed world, giving me the ability to adjust parameters and generate a realistic history of city development.

This tool should be usable in MacOS.

# INPUT

The input will be a 360x180 grid of cells, each with a value along these three axes:

• Water Access:
Ocean, River, Harbor, Oasis, or None

• Terrain
Flat, Hilly, Mountainous, or Glacier

• Vegetation
None, Desert, Grassland, Savanna, Light Forest, Heavy Forest, or Swamp

Each cell will either contain a city or not, and each city will encode its age.

Each cell can be given a flag indicating that it is particularly well-suited for city development.

In addition, each cell should know the distance to nearby cities. I’m not sure what data structure would best encode this, but I think it should at least know 1) the distance to the nearest city and 2) the number of cities within an adjustable x distance.

There should also be a global development index, high = high chance of city development, low = high chance of city failure.

I will provide data entry for this. Ideally, data could be entered with 360x180 pixel images for each parameter, but if that is not possible I could use excel sheets or some other format.

# TOOL ELEMENTS

• From the inputed parameters, two figures are calculated for each cell: a chance of city development, and a chance of city failure. These calculations should be weighted products of the various input parameters, giving me the ability to adjust the weights as I see fit.
• I should have a method to advance the clock by x years, with a calculation taking place each year to determine where cities arise and where they fall
• I should retain the ability to adjust any input values.
High priority on being able to adjust the global development index on the fly — the variation of this parameter is a key part of my world design
High priority on being able to manually add a city at a particular date
Lower priority on being able to adjust cell parameters, as they will likely not need to be changed very often. But if I do need to make a change, I would like that to be possible without having to restart the simulation.

# OUTPUT

• I would like the tool to output a list of changes, including dates and locations where cities arise and fall. For example, if I run the tool for 100 years, it will give me a year-by-year list of all added and removed cities through that period.

• The output will also generate a new set of input parameters that I can use for a future iteration. I would only like to do the initial data entry once, after which I can use the outputs from previous simulations as starting points.

• If it’s not too difficult to do, being able to export the list of dates and locations to a spreadsheet would be a nice touch.

• Please let me know what the cost would be to add in a 360x180 pixel image to the output, which would simply show the cells in the following colors:
Blue = water
White = empty land
Red = added city
Pink = existing city
Black = failed city
This image output is not necessary but if I can afford to add it, it would be a nice addition.
