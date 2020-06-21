/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { snackbarContext } from "./../../../../contexts/snackbarProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as yup from "yup";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const styling = () => ({
  Content: {
    display: "flex",
    flexDirection: "column",
  },
  Text: {
    margin: 15,
  },
  PasswordText: {
    display: "flex",
    flexDirection: "row",
  },
  Demo: {
    flex: "1",
  },
});
class AddDialog extends React.Component {
  schema = yup.object().shape({
    name: yup.string().required("Name is required").min(3),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "must contain 8 characters at least one \n uppercase one lowercase and one number"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("password is required"),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      loader: false,
      disabled: true,
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      error: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  };

  // eslint-disable-next-line consistent-return
  getError = (field) => {
    const { touched, error } = this.state;
    if (touched[field]) {
      this.schema
        .validateAt(field, this.state)
        .then(() => {
          if (error[field] !== "") {
            this.setState(
              {
                error: {
                  ...error,
                  [field]: "",
                },
              },
              () => {
                this.hasErrors();
              }
            );
          }
        })
        .catch((err) => {
          if (err.message !== error[field]) {
            this.setState(
              {
                error: {
                  ...error,
                  [field]: err.message,
                },
              },
              () => {
                this.hasErrors();
              }
            );
          }
        });
    }
    return error[field];
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState(
      {
        touched: {
          ...touched,
          [field]: true,
        },
      },
      () => {
        this.hasErrors();
      }
    );
  };

  hasErrors = () => {
    const { error, touched } = this.state;
    let alltouched = Object.values(touched);
    let iserror = Object.values(error);
    iserror = iserror.filter((errorMessage) => errorMessage !== "");
    alltouched = alltouched.every((value) => value);
    iserror = iserror.every((value) => value === "");
    if (iserror && alltouched) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };
  onClickHandler = async (value) => {
    const { name, email, password } = this.state;
    const { onSubmit, createTrainee } = this.props;
    await this.setState({
      loader: true,
      disabled: true,
    });
    await createTrainee({
      variables: { name, email, password },
    })
      .then(() => {
        onSubmit({ name, email, password });
        value("Trainee created successfully", "success");
      })
      .catch((err) => {
        value(err.message, "error");
      })
      .finally(() => {
        this.setState({ loader: false, disabled: false });
      });
  };

  render() {
    const { open, onClose } = this.props;
    const { classes } = this.props;
    const { error, disabled, loader } = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.Content}>
              Enter your trainee details
            </DialogContentText>
            <TextField
              autoFocus
              error={!!error.name}
              id="name"
              label="Name*"
              type="name"
              variant="outlined"
              className={classes.text}
              helperText={this.getError("name")}
              onChange={this.handleChange("name")}
              onBlur={() => this.isTouched("name")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <br />
            <TextField
              id="email"
              error={!!error.email}
              label="EmailAddress"
              type="email"
              variant="outlined"
              className={classes.text}
              onChange={this.handleChange("email")}
              helperText={this.getError("email")}
              onBlur={() => this.isTouched("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <br />
            <br />
            <div className={classes.PasswordText}>
              <div className={classes.Demo}>
                <TextField
                  id="password"
                  error={!!error.password}
                  label="password"
                  type="password"
                  variant="outlined"
                  className={classes.text}
                  onChange={this.handleChange("password")}
                  helperText={this.getError("password")}
                  onBlur={() => this.isTouched("password")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              &nbsp; &nbsp;
              <div className={classes.Demo}>
                <TextField
                  id="confirm-password"
                  error={!!error.confirmPassword}
                  label="Confirm-password"
                  type="password"
                  variant="outlined"
                  className={classes.text}
                  onBlur={() => this.isTouched("confirmPassword")}
                  helperText={this.getError("confirmPassword")}
                  onChange={this.handleChange("confirmPassword")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <snackbarContext.Consumer>
              {(value) => (
                <Button
                  onClick={() => this.onClickHandler(value)}
                  color="primary"
                  variant="contained"
                  disabled={disabled}
                >
                  <span>{loader ? <CircularProgress size={20} /> : ""}</span>
                  Submit
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styling)(AddDialog);
