import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    render() {
        const { name, color } = this.props
        return (
            <CopyToClipboard text={color}>
                <div className="ColorBox" style={{ background: color }}>
                    <div className="ColorBox-copy-container">
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