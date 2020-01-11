import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    height: "25%",
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4px"
  }
};

function DraggableColorBox(props) {
  const { classes } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: props.color }}>
      {props.color}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
