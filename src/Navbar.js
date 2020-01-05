import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        let { level, changeLevel } = this.props;

        return (
            <header className="Navbar">
                <div className="Navbar-logo">
                    <a href="#">Paletter</a>
                </div>
                <div className="Navbar-slider-continer">
                    <span>Level: {level}</span>
                    <div className="Navbar-slider">
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
                    </div>
                </div>


            </header>
        )
    }
}
