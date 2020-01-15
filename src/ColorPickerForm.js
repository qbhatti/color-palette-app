import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: "teal",
      newColorName: ""
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      this.props.colors.every(
        ({ color }) =>
          color.toLowerCase() !== this.state.currentColor.toLowerCase()
      )
    );
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isColorNameUnique");
    ValidatorForm.removeValidationRule("isColorUnique");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateCurrentColor = newColor => {
    this.setState({ currentColor: newColor.hex }, () => {
      this.formRef.current
        .isFormValid()
        .then(() => this.formRef.current.resetValidations());
    });
  };

  handleSubmit = () => {
    const newColor = {
      name: this.state.newColorName,
      color: this.state.currentColor
    };

    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" }, () =>
      this.formRef.current.resetValidations()
    );
  };

  render() {
    const { currentColor, newColorName } = this.state;
    const { paletteIsFull, classes } = this.props;
    return (
      <div>
        <ChromePicker
          disableAlpha
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />

        <ValidatorForm onSubmit={this.handleSubmit} ref={this.formRef}>
          <TextValidator
            value={newColorName}
            variant="filled"
            margin="normal"
            name="newColorName"
            className={classes.colorNameInput}
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Name is required",
              "Name alreay taken",
              "Color already exists"
            ]}
            placeholder="Color Name"
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            className={classes.addColorBtn}
            style={{
              backgroundColor: paletteIsFull
                ? "rgba(0, 0, 0, 0.12)"
                : currentColor
            }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default withStyles(styles)(ColorPickerForm);
