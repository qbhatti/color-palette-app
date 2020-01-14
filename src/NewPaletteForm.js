import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import arrayMove from "array-move";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";

const drawerWidth = 400;

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
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    "& .btns": {
      display: "flex",
      justifyContent: "space-between",
      marginLeft: "auto",
      "& button": {
        margin: theme.spacing(0, 0.5),
        fontWeight: 400
      },
      "& a": {
        textDecoration: "none"
      }
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
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
      currentColor: "#4cad94",
      newColorName: "",
      newPaletteName: "",
      colors: [...demoColors]
    };
    this.formRef = React.createRef();
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      this.state.colors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currentColor.toLowerCase()
      )
    );
  }
  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isColorNameUnique");
    ValidatorForm.removeValidationRule("isColorUnique");
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex });
  };

  addNewColor = () => {
    const newColor = {
      name: this.state.newColorName,
      color: this.state.currentColor
    };
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ""
    });
    this.formRef.current.resetValidations();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  savePaletteSubmit = paletteName => {
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
    const {
      open,
      currentColor,
      newColorName,
      newPaletteName,
      colors
    } = this.state;

    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          classes={classes}
          palettes={palettes}
          newPaletteName={newPaletteName}
          handleDrawerOpen={this.handleDrawerOpen}
          savePaletteSubmit={this.savePaletteSubmit}
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
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
          <ChromePicker
            disableAlpha
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor} ref={this.formRef}>
            <TextValidator
              value={newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={["required", "isColorNameUnique", "isColorUnique"]}
              errorMessages={[
                "Name is required",
                "Name alreay taken",
                "Color already exists"
              ]}
              placeholder="Color Name"
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={paletteIsFull}
              style={{
                backgroundColor: paletteIsFull
                  ? "rgba(0, 0, 0, 0.12)"
                  : currentColor
              }}
            >
              {paletteIsFull ? "Palette Full" : "Add Color"}
            </Button>
          </ValidatorForm>
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
