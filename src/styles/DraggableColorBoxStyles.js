import chroma from "chroma-js";
import sizes from "./sizes";

export default {
  root: {
    height: "25%",
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    boxSizing: "border-box",
    marginBottom: "-6px",
    textTransform: "capitalize",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.3)"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("sm")]: {
      width: "100%",
      height: "5%"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    boxSizing: "border-box",
    padding: "3px 5px",
    //color: "black",
    color: props =>
      chroma(props.color).luminance() >= 0.1
        ? "rgba(0, 0, 0, 0.6)"
        : "rgba(255, 255, 255, 0.7)",
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
