import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  colors: {
    height: "90%"
  },
  goBack: {
    height: "50%",
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    marginBottom: "-4px",
    opacity: "1",
    backgroundColor: "black",
    "& a": {
      color: "rgba(255, 255, 255, 0.7)",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      cursor: "pointer",
      textDecoration: "none"
    }
  }
};

class SingleColorPalette extends Component {
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
    const { classes, palette } = this.props;
    const { paletteName, emoji, id } = palette;
    const colorBoxes = this._shades.map(shade => (
      <ColorBox
        name={shade.name}
        background={shade[this.state.format]}
        key={shade.name}
        showingFullPalette={false}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar showSlider={false} changeFormat={this.changeFormat} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>
              <i class="fas fa-chevron-left"></i> Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
