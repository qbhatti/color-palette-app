import React, { Component } from 'react';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { NavLink } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: "hex",
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.changeFormat(e.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const { level, changeLevel } = this.props;
        const { format, open } = this.state;

        return (
            <header className="Navbar">
                <div className="Navbar-logo">
                    <NavLink to="/">Paletter</NavLink>
                </div>
                <div className="Navbar-slider-continer">
                    <span>Level: {level}</span>
                    <div className="Navbar-slider">
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={changeLevel} />
                    </div>
                </div>
                <div className="Navbar-select-continer">

                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    message={<span id="message-id">Format Changed To "{format.toUpperCase()}" </span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    action={[
                        <IconButton size="small" aria-label="close" key="close" color="inherit" onClick={this.closeSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    ]}
                />

            </header>
        )
    }
}
