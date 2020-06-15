/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Dialog,
  DialogActions,
  InputAdornment,
  Avatar,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as yup from "yup";
import EmailIcon from "@material-ui/icons/Email";
import { Redirect } from "react-router-dom";
import { snackbarContext } from "../../contexts/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const styling = (theme) => ({
  Content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  root: {
    marginLeft: theme.spacing(16),
    backgroundColor: theme.palette.secondary.main,
  },
  Demo: {
    flex: 1,
  },
});
class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "must contain 8 characters at least one \n uppercase one lowercase and one number"
      ),
  });
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      disabled: true,
      redirect: false,
      email: "",
      password: "",
      touched: {
        email: false,
        password: false,
      },
      error: {
        email: "",
        password: "",
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

  onClickHandler = async (value) => {
    const { email, password } = this.state;
    const { loginUser } = this.props;
    await this.setState({
      disabled: true,
      loader: true,
    });
    console.log(email, password)
    const response = await loginUser({ variables: { email, password } });
    console.log(response.data.loginUser)
    if (response.data.loginUser) {
      localStorage.setItem("token", response.data.loginUser);
      this.setState({
        redirect: true,
      });
    } else {
      value("login Failed", "error");
    }
    this.setState({
      disabled: false,
      loader: false,
    });
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

  renderRedirect = () => {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/trainee" />;
    }
  };

  render() {
    const { classes } = this.props;
    const { error, disabled, loader } = this.state;
    return (
      <div className={classes.Content}>
        <Dialog open aria-labelledby="form-dialog-title">
          <Avatar className={classes.root}>
            <LockOutlinedIcon />
          </Avatar>
          <DialogTitle id="form-dialog-title" align="center">
            Login
          </DialogTitle>
          <DialogContent>
            <TextField
              id="email"
              error={!!error.email}
              label="EmailAddress"
              type="email"
              variant="outlined"
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
            <div className={classes.Demo}>
              <TextField
                id="password"
                error={!!error.password}
                label="password"
                type="password"
                variant="outlined"
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
                fullWidth
              />
            </div>
          </DialogContent>
          <DialogActions>
            <snackbarContext.Consumer>
              {(value) => (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => this.onClickHandler(value)}
                  disabled={disabled}
                  fullWidth
                >
                  {this.renderRedirect()}
                  <span>{loader ? <CircularProgress size={20} /> : ""}</span>
                  SIGNIN
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styling)(Login);
