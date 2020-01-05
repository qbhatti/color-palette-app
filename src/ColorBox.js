import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props)
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
        const { name, hex } = this.props;
        const { copied } = this.state;

        return (
            <CopyToClipboard text={hex} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{ background: hex }}>
                    <div style={{ background: hex }} className={`ColorBox-copy-overlay ${copied && "show"}`}></div>

                    <div className={`ColorBox-copy-msg ${copied && "show"}`}>
                        <h1>Copied!</h1>
                        <p>{hex}</p>
                    </div>

                    <div className="ColorBox-container">
                        <div className="ColorBox-box-content">
                            <span>{name}</span>
                        </div>
                        <button className="ColorBox-copy-btn">Copy</button>
                    </div>
                    <span className="ColorBox-more">More</span>
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;