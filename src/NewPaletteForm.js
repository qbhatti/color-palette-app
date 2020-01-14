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

export const drawerWidth = 400;

const demoColors = [
  { color: "red", name: "red" },
  { color: "blue", name: "blue" },
  { color: "green", name: "green" },
  { color: "black", name: "black" },
  { color: "grey", name: "grey" },
  { color: "purple", name: "purple" },
  { color: "teal", name: "teal" },
  { color: "olive", name: "olive" }
];
const styles = theme => ({
  root: {
    display: "flex"
  },

  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(164,162,162,0.05)",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
  },
  buttons: {
    width: "100%",
    "& button": {
      width: "50%"
    }
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: [...demoColors]
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

  handleSavePaletteSubmit = paletteName => {
    const paletteId = paletteName.toLowerCase().replace(/ /g, "-");
    const emoji = "🎨";

    const newPalette = {
      paletteName: paletteName,
      id: paletteId,
      emoji: emoji,
      colors: this.state.colors
    };
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
    return this.state.colors.every(
      color =>
        color.name.toLowerCase() !== colorPicked.name.toLowerCase() &&
        color.color.toLowerCase() !== colorPicked.color.toLowerCase()
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
          drawerWidth={drawerWidth}
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
                color="secondary"
                onClick={this.handleClearPalette}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
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
