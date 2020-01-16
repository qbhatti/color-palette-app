import sizes from "./sizes";

export default {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("xl")]: {
      width: "60%"
    },
    [sizes.down("lg")]: {
      width: "70%"
    },
    [sizes.down("md")]: {
      width: "80%"
    }
  },

  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    "& a": {
      color: "white"
    }
  },

  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [sizes.down("lg")]: {
      gridGap: "1.5rem"
    },
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2, 48%)",
      gridGap: "1.5rem"
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1, 96%)",
      gridGap: "1rem"
    }
  }
};
