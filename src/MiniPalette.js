import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles/MiniPaletteStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class MiniPalette extends PureComponent {
  state = {
    dialogOpen: false
  };

  openDialog = e => {
    e.stopPropagation();
    this.setState({
      dialogOpen: true
    });
  };

  closeDialog = e => {
    e.stopPropagation();
    this.setState({
      dialogOpen: false
    });
  };

  handleDelete = e => {
    e.stopPropagation();
    const { deletePalette, id } = this.props;
    this.setState({ dialogOpen: false }, deletePalette(id));
  };

  handleClick = () => {
    this.props.goToPalette(this.props.id);
  };

  render() {
    const { classes, paletteName, emoji, colors } = this.props;
    const { dialogOpen } = this.state;

    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={this.handleClick}>
        <DeleteIcon className={classes.deleteIcon} onClick={this.openDialog} />
        <Dialog
          open={dialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete This Palette?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will permanently delete this palette.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDelete}
              variant="outlined"
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
            <Button onClick={this.closeDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
