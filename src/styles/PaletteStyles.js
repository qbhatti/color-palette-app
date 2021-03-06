import sizes from "./sizes";

export default {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  colors: {
    fontSize: 0,
    height: "90%"
  },
  goBack: {
    height: "50%",
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    opacity: "1",
    backgroundColor: "black",
    "& a": {
      color: "rgba(255, 255, 255, 0.7)",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      cursor: "pointer",
      textDecoration: "none"
    },
    [sizes.down("lg")]: {
      width: "75%",
      height: "33.333%"
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%"
    }
  }
};
