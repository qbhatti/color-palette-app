import React from "react";

function PaletteFooter(props) {
  const { emoji, paletteName } = props;
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="Palette-emoji">{emoji}</span>
    </footer>
  );
}

export default PaletteFooter;
