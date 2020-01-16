import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class PaletteMetaForm extends Component {
  state = {
    showFormDialog: this.props.formShowing,
    showEmojiDialog: false,
    newPaletteName: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPaletteNameUnique");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showEmojiPicker = () => {
    this.setState({
      showEmojiDialog: true,
      showFormDialog: false
    });
  };

  savePalette = emoji => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSavePaletteSubmit(newPalette);
  };
  render() {
    const { hideForm } = this.props;
    const { showFormDialog, newPaletteName, showEmojiDialog } = this.state;
    return (
      <div>
        {/* Dialog for emoji picker */}
        <Dialog
          open={showEmojiDialog}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Emoji
          </DialogTitle>
          <Picker title="Choose an Emoji" onSelect={this.savePalette} />
        </Dialog>

        {/* Dialog for input form */}
        <Dialog
          open={showFormDialog}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please choose a name for your palette. It needs to be unique.
              </DialogContentText>

              <TextValidator
                fullWidth
                margin="normal"
                value={newPaletteName}
                label="Palette Name"
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Name is required", "This name already exits"]}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
