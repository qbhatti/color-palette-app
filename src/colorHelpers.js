import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];


function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colors: {}
    };

    for (let level of levels) {
        newPalette.colors[level] = [];
    }

    for (let color of starterPalette.colors) {
        let scale = generateScale(color.color, 10).reverse();
        for (let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)")
            });
        }
    }

    return newPalette;
}

//this function generates a range of colors ([start, middle, end]) for chroma.scale to generate scale of color shades. 
function getRange(hexColor) {
    const end = "#fff";
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ]
}

//this function returns an array of 10 hex values for different shades of a color.
function generateScale(hexColor, numberOfColors) {
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export default generatePalette;