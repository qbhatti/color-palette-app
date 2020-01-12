import React, { Component } from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

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
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      currentColor: "#4cad94",
      newColorName: "",
      newPaletteName: "",
      colors: []
    };
  }

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

    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }
  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isColorNameUnique");
    ValidatorForm.removeValidationRule("isColorUnique");
    ValidatorForm.removeValidationRule("isPaletteNameUnique");
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
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSavePaletteSubmit = e => {
    const paletteName = this.state.newPaletteName;
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

  render() {
    const { classes } = this.props;
    const { open, currentColor, newColorName, newPaletteName } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create A Palette
            </Typography>
            <div className="btns">
              <Button
                variant="contained"
                href="/"
                size="small"
                color="secondary"
              >
                Go Back
              </Button>
              <ValidatorForm onSubmit={this.handleSavePaletteSubmit}>
                <TextValidator
                  value={newPaletteName}
                  label="New Palette Name"
                  name="newPaletteName"
                  onChange={this.handleChange}
                  validators={["required", "isPaletteNameUnique"]}
                  errorMessages={[
                    "Name is required",
                    "This name already exits"
                  ]}
                  placeholder="Name"
                />
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  color="primary"
                >
                  Save Palette
                </Button>
              </ValidatorForm>
            </div>
          </Toolbar>
        </AppBar>
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
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random Color
            </Button>
          </div>
          <ChromePicker
            disableAlpha
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
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
              style={{ backgroundColor: currentColor }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />

          {this.state.colors.map(color => (
            <DraggableColorBox
              color={color.color}
              name={color.name}
              key={color.name}
            />
          ))}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
