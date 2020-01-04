import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css'

class Palette extends Component {

    render() {
        const colorBoxes = this.props.colors.map(color => <ColorBox {...color} />);
        return (
            <div className="Palette">
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/* footer here */}
            </div>
        )
    }
}

export default Palette;