import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import seedColors from "./seedColors";
import generatePalette from "./colorHelpers";

class App extends Component {
  constructor(props) {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    super(props);
    this.state = {
      palettes: savedPalettes || seedColors
    };
  }

  savePalette = newPalette => {
    this.setState(
      prevSt => ({
        palettes: [...prevSt.palettes, newPalette]
      }),
      () => {
        this.syncLocalStorage();
        this.props.history.push("/");
      }
    );
  };

  deletePalette = paletteId => {
    this.setState(
      this.setState(
        prevSt => ({
          palettes: prevSt.palettes.filter(p => p.id !== paletteId)
        }),
        () => this.syncLocalStorage()
      )
    );
  };

  syncLocalStorage = () => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={() => (
                    <Page>
                      <NewPaletteForm
                        palettes={palettes}
                        savePalette={this.savePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default withRouter(App);
