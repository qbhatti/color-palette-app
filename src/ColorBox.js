import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";
import "./ColorBox.css";

const styles = {
  ColorBox: {
    height: props => (props.showingFullPalette ? "25%" : "50%"),
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px",
    "&:hover button": {
      opacity: "1"
    }
  },

  textColor: {
    color: props =>
      chroma(props.background).luminance() >= 0.06
        ? "rgba(0, 0, 0, 0.6)"
        : "rgba(255, 255, 255, 0.7)"
  },
  moreBtn: {
    color: props =>
      chroma(props.background).luminance() >= 0.06
        ? "rgba(0, 0, 0, 0.6)"
        : "rgba(255, 255, 255, 0.7)",
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase"
  },
  copyBtn: {
    color: props =>
      chroma(props.background).luminance() >= 0.06
        ? "rgba(0, 0, 0, 0.6)"
        : "rgba(255, 255, 255, 0.7)",
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
    textDecoration: "none",
    opacity: "0"
  }
};

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.ColorBox} style={{ background: background }}>
          <div
            style={{ background: background }}
            className={`ColorBox-copy-overlay ${copied && "show"}`}
          ></div>

          <div className={`ColorBox-copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={classes.textColor}>{background}</p>
          </div>

          <div className="ColorBox-container">
            <div className="ColorBox-box-content">
              <span className={classes.textColor}>{name}</span>
            </div>
            <button className={classes.copyBtn}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.moreBtn}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
