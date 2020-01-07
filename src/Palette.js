import React, { Component } from 'react';
import uuid from 'uuid/v4';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        };

        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level: level });
    }

    changeFormat(format) {
        this.setState({ format: format });
    }

    render() {
        const { colors } = this.props.palette;
        const { level, format } = this.state;

        const colorBoxes = colors[level].map(color => <ColorBox background={color[format]} name={color.name} key={uuid()} />);

        return (
            <div className="Palette">

                <Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat} />
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