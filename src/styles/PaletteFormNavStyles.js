import sizes from "./sizes";
import { DRAWER_WIDTH } from "../constants";

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [sizes.down("xs")]: {
      marginRight: "0.5rem",
      padding: 5
    }
  },
  navBtns: {
    marginRight: "1rem",
    "& button": {
      margin: "0 0.5rem",
      [sizes.down("xs")]: {
        margin: 0,
        padding: "0.2rem"
      }
    },
    "& a": {
      textDecoration: "none"
    },
    [sizes.down("xs")]: {
      marginRight: 0
    }
  },
  toolbar: {
    [sizes.down("xs")]: {
      padding: 0,
      paddingLeft: "0.5rem"
    }
  }
});

export default styles;
