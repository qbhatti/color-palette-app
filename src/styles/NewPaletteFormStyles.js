import { DRAWER_WIDTH } from "../constants";
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: "flex"
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },

  drawerPaper: {
    width: drawerWidth
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(164,162,162,0.05)",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },

  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
  },

  buttons: {
    width: "100%",
    "& $btn": {
      width: "50%"
    }
  },

  btn: {}
});

export default styles;
