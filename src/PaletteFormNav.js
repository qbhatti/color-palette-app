import React, { Component } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false
    };
  }

  showForm = () => {
    this.setState({ formShowing: true });
  };

  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const {
      open,
      classes,
      handleDrawerOpen,
      handleSavePaletteSubmit,
      palettes
    } = this.props;

    const { formShowing } = this.state;

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
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            {this.state.formShowing && (
              <PaletteMetaForm
                palettes={palettes}
                handleSavePaletteSubmit={handleSavePaletteSubmit}
                hideForm={this.hideForm}
                formShowing={formShowing}
              />
            )}
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
            <Button variant="contained" color="primary" onClick={this.showForm}>
              Save
            </Button>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
