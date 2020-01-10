import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: "hex"
    };

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level: level });
  }

  changeFormat(format) {
    this.setState({ format: format });
  }

  render() {
    const { classes, palette } = this.props;
    const { colors, paletteName, emoji, id } = palette;
    const { level, format } = this.state;

    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showingFullPalette={true}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat={this.changeFormat}
          showSlider={true}
        />

        <div className={classes.colors}>{colorBoxes}</div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
