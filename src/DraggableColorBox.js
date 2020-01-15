import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/DraggableColorBoxStyles";

const DraggableColorBox = SortableElement(props => {
  const { classes, color, name } = props;
  const { handleDelete } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={() => handleDelete(name)}
          />
        </span>
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
