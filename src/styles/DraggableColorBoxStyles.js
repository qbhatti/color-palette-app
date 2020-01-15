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
    "&:active": {
      transform: "scale(1.1)",
      transition: "0.2s ease-out"
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