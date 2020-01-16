import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import arrayMove from "array-move";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: seedColors[0].colors
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = _color => {
    this.setState({
      colors: [...this.state.colors, _color]
    });
  };

  handleSavePaletteSubmit = newPalette => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = this.state.colors;

    this.props.savePalette(newPalette);
  };

  handleDelete = colortoDelete => {
    const updatedColors = this.state.colors.filter(
      color => color.name !== colortoDelete
    );

    this.setState({ colors: updatedColors });
  };
  handleRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let randomIndex = Math.floor(Math.random() * allColors.length);

    const numOfColors = allColors.length;

    let randomColor = allColors[randomIndex];

    let count = 0;
    let uniqueColorPicked = this.isColorUnique(randomColor);

    while (count < numOfColors && !uniqueColorPicked) {
      randomIndex = (randomIndex + 1) % numOfColors;
      randomColor = allColors[randomIndex];
      uniqueColorPicked = this.isColorUnique(randomColor);
      count++;
      console.log(`Color: ${uniqueColorPicked},  ${count}`);
    }

    if (uniqueColorPicked) {
      this.setState({ colors: [...this.state.colors, randomColor] });
    } else {
      alert("No more colors to pick from");
    }
  };

  isColorUnique = colorPicked => {
    return !this.state.colors.some(
      color =>
        color.name.toLowerCase() === colorPicked.name.toLowerCase() &&
        color.color.toLowerCase() === colorPicked.color.toLowerCase()
    );
  };

  handleClearPalette = () => {
    this.setState({ colors: [] });
  };
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;

    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleDrawerOpen={this.handleDrawerOpen}
          handleSavePaletteSubmit={this.handleSavePaletteSubmit}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                onClick={this.handleClearPalette}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                className={classes.btn}
                color="primary"
                disabled={paletteIsFull}
                onClick={this.handleRandomColor}
              >
                {paletteIsFull ? "Palette Full" : "Random Color"}
              </Button>
            </div>

            <ColorPickerForm
              colors={this.state.colors}
              addNewColor={this.addNewColor}
              paletteIsFull={paletteIsFull}
            />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />

          <DraggableColorList
            axis="xy"
            colors={colors}
            handleDelete={this.handleDelete}
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
