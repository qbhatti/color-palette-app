import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    this._shades = this.gatherShades(this.props.palette, this.props.colorId);

    this.state = {
      format: "hex"
    };

    this.changeFormat = this.changeFormat.bind(this);
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

  changeFormat(format) {
    this.setState({ format: format });
  }

  render() {
    const { paletteName, emoji } = this.props.palette;
    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        name={shade.name}
        background={shade[this.state.format]}
        key={shade.name}
        showMoreUrl={false}
      />
    ));

    return (
      <div className="Palette">
        <Navbar showSlider={false} changeFormat={this.changeFormat} />
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{colorBoxes}</div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
