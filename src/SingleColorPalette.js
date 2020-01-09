import React, { Component } from "react";
import ColorBox from "./ColorBox";

export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
  }

  gatherShades(palette, colorId) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      let colorShade = allColors[key].find(color => color.id === colorId);
      shades.push(colorShade);
    }

    //return all shades of a single color
    return shades.slice(1);
  }

  render() {
    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        name={shade.name}
        background={shade.hex}
        key={shade.name}
        moreUrl={null}
      />
    ));
    return (
      <div className="Palette">
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}
