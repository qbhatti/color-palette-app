import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(props => {
  const { colors, handleDelete, onSortEnd } = props;
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, index) => (
        <DraggableColorBox
          color={color.color}
          name={color.name}
          index={index}
          key={color.name}
          handleDelete={handleDelete}
          onSortEnd={onSortEnd}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
