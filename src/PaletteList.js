import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
    render() {
        let { palettes } = this.props;
        return (
            <div>
                <MiniPalette />
                <h1>React Colors</h1>
                <ul>
                    {palettes.map(p =>
                        <li key={p.id}><Link to={`/palette/${p.id}`}>{p.paletteName}</Link></li>
                    )}
                </ul>
            </div >
        )
    }
}
