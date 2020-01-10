import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "./ColorBox.css";

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
    const { name, background, moreUrl, showMoreUrl } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.09;
    const isLightColor = chroma(background).luminance() >= 0.09;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background: background }}>
          <div
            style={{ background: background }}
            className={`ColorBox-copy-overlay ${copied && "show"}`}
          ></div>

          <div className={`ColorBox-copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={isLightColor ? "ColorBox-dark-text" : undefined}>
              {background}
            </p>
          </div>

          <div className="ColorBox-container">
            <div className="ColorBox-box-content">
              <span className={isDarkColor ? "ColorBox-light-text" : undefined}>
                {name}
              </span>
            </div>
            <button
              className={`ColorBox-copy-btn ${
                isLightColor ? "ColorBox-dark-text" : undefined
              }`}
            >
              Copy
            </button>
          </div>
          {showMoreUrl && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span
                className={`ColorBox-more ${
                  isLightColor ? "ColorBox-dark-text" : undefined
                }`}
              >
                More
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
