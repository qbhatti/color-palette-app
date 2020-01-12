import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import seedColors from "./seedColors";
import generatePalette from "./colorHelpers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    };
  }

  savePalette = newPalette => {
    this.setState(
      prevSt => ({
        palettes: [...prevSt.palettes, newPalette]
      }),
      () => this.props.history.push("/")
    );
  };
  findPalette(id) {
    //returns a single palette matching given id of different colors
    return this.state.palettes.find(function(palette) {
      return palette.id === id;
    });
  }
  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={() => <NewPaletteForm savePalette={this.savePalette} />}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList {...routeProps} palettes={palettes} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default withRouter(App);
