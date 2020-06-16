/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { snackbarContext } from './../../contexts/index';
import { Button } from '@material-ui/core';
import callApi from '../../libs/utils/api';
import {
  AddDialog,
  WrapTable,
  EditDialog,
  DeleteDialog,
} from './Component/index';
import { trainees, getDateFormatted } from './data/trainee';

const styles = (theme) => ({
  root: {
    marginLeft: theme.spacing(140),
  },
});
class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      EditOpen: false,
      RemoveOpen: false,
      loader: false,
      orderBy: '',
      order: 'asc',
      traineedata: {},
      data: [],
      editData: {},
      deleteData: {},
      count: 100,
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentDidMount() {
    this.handleFetchData();
  }

  async handleFetchData() {
    const token = localStorage.getItem('token');
    this.setState({
      loader: true,
    });
    const response = await callApi(
      'get',
      '/trainee',
      {
        params: {
          skip: 0,
          limit: 1000,
        },
      },
      {
        headers: {
          authorization: token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 'ok') {
      this.setState({
        data: response.data.records,
        loader: false,
        count: response.data.records.length,
      });
    } else {
      const value = this.context;
      value(response.message, 'error');
      this.setState({
        loader: false,
      });
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleSelect = (element) => (event) => {
    this.setState({
      traineedata: element,
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });
  };

  handleDeleteDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = () => {
    this.handleFetchData();
    const { count, rowsPerPage, page, data } = this.state;
    const mod = count % rowsPerPage;
    if (mod === 1 && data.length !== 1) {
      this.setState({
        page: page - 1,
      });
    }
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('DELETE ITEM');
    console.log(deleteData);
  };

  handleEditDialogOpen = (element) => (event) => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (updatedData) => {
    this.handleFetchData();
    this.setState(
      {
        EditOpen: false,
      },
      () => {
        console.log('Edit Data');
        console.log(updatedData);
      }
    );
  };

  onSubmit = (addData) => {
    this.handleFetchData();
    this.setState(
      {
        open: false,
      },
      () => {
        console.log(addData);
      }
    );
  };

  render() {
    const {
      open,
      orderBy,
      order,
      editData,
      deleteData,
      data,
      page,
      loader,
      rowsPerPage,
      EditOpen,
      RemoveOpen,
    } = this.state;
    const {
      match: { url },
      classes,
    } = this.props;
    return (
      <>
        <Button
          className={classes.root}
          variant='outlined'
          color='primary'
          onClick={this.handleClickOpen}
        >
          ADD TRAINEELIST
        </Button>
        &nbsp;
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.onSubmit}
        />
        <EditDialog
          Editopen={EditOpen}
          handleEditClose={this.handleEditClose}
          handleEdit={this.handleEdit}
          data={editData}
        />
        <DeleteDialog
          openRemove={RemoveOpen}
          onClose={this.handleRemoveClose}
          remove={this.handleRemove}
          data={deleteData}
        />
        <WrapTable
          loader={loader}
          datalength={data.length}
          data={data}
          column={[
            {
              field: 'name',
              label: 'Name',
            },
            {
              field: 'email',
              label: 'Email-Address',
              format: (value) => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: getDateFormatted,
            },
          ]}
          actions={[
            {
              Icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              Icon: <DeleteIcon />,
              handler: this.handleDeleteDialogOpen,
            },
          ]}
          onSort={this.handleSort}
          orderBy={orderBy}
          order={order}
          onSelect={this.handleSelect}
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Router>
          <ul>
            {trainees.map(({ name, id }) => (
              <li key={id}>
                <Link to={`${url}/${id}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </Router>
      </>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(TraineeList);
TraineeList.contextType = snackbarContext;
