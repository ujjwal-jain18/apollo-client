/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import callApi from '../../../../libs/utils/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { snackbarContext } from './../../../../contexts/snackbarProvider';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@material-ui/core';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      loader: false,
    };
  }
  onClickHandler = async (value) => {
    const token = localStorage.getItem('token');
    const { remove, data } = this.props;
    const { originalId: deleteId } = data;
    await this.setState({
      loader: true,
      disabled: true,
    });
    const response = await callApi(
      'delete',
      `/trainee/${deleteId}`,
      {},
      {
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 'ok') {
      remove();
      value(response.message, 'success');
    } else {
      value(response.message, 'error');
    }

    this.setState({
      loader: false,
      disabled: false,
    });
  };
  render() {
    const { openRemove, onClose } = this.props;
    const { loader, disabled } = this.state;
    return (
      <div>
        <Dialog
          open={openRemove}
          variant='outlined'
          color='primary'
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to remove Trainee ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color='primary'>
              Cancel
            </Button>
            <snackbarContext.Consumer>
              {(value) => (
                <Button
                  onClick={() => this.onClickHandler(value)}
                  color='primary'
                  variant='contained'
                  disabled={disabled}
                  autoFocus
                >
                  <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                  Delete
                </Button>
              )}
            </snackbarContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
DeleteDialog.propTypes = {
  openRemove: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};
export default DeleteDialog;
