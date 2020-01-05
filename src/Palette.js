import React, { Component } from 'react';
import uuid from 'uuid/v4';
import Slider from 'rc-slider';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500
        };

        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(level) {
        this.setState({ level: level });
    }

    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;

        const colorBoxes = colors[level].map(color => <ColorBox {...color} key={uuid()} />);

        return (
            <div className="Palette">
                <div className="Palette-slider">
                    <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={this.changeLevel} />
                </div>
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