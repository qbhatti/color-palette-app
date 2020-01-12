import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5.3px",
    textTransform: "capitalize",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.3)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    boxSizing: "border-box",
    padding: "3px 5px",
    color: "rgba(0,0,0,0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  deleteIcon: {
    fontSize: "1.2rem",
    transition: "all 0.2s ease-out"
  }
};

function DraggableColorBox(props) {
  const { classes, color, name } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span>
          <DeleteIcon className={classes.deleteIcon} />
        </span>
      </div>
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
