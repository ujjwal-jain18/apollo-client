/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Mutation } from '@apollo/react-components';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { snackbarContext } from './../../contexts/index';
import { Button } from '@material-ui/core';
import Compose from 'lodash.flowright';
import {
  AddDialog,
  WrapTable,
  EditDialog,
  DeleteDialog,
} from './Component/index';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import { trainees, getDateFormatted } from './data/trainee';
import { graphql } from '@apollo/react-hoc';
import GET_TRAINEE from './query';
import { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB } from './subscription';

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
      orderBy: '',
      order: 'asc',
      traineedata: {},
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 395,
    };
  }

  componentDidMount() {
    const {
      data: { subscribeToMore },
    } = this.props;
    subscribeToMore({
      document: UPDATE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const {
          getTrainee: { records },
        } = prev;
        const {
          data: { traineeUpdated},
        } = subscriptionData;
        const updateRecords = [...records].map((record) => {
          if (record.originalId === traineeUpdated.id) {
            return {
              ...record,
              ...traineeUpdated,
            };
          }
          return record;
        });
        return {
          getTrainee: {
            ...prev.getTrainee,
            count: prev.getTrainee.count,
            records: updateRecords,
          },
        };
      },
    });

    subscribeToMore({
      document: DELETE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const {
          getTrainee: { records, count },
        } = prev;
        const {
          data: { traineeDeleted },
        } = subscriptionData;
        const updateRecords = [...records].filter(
          (record) => traineeDeleted !== record.originalId
        );
        return {
          getTrainee: {
            ...prev.getTrainee,
            count: count - 1,
            records: updateRecords,
          },
        };
      },
    });
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

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState(
      {
        page: newPage,
      },
      () =>
        refetch({
          skip: newPage * rowsPerPage,
          limit: rowsPerPage,
        })
    );
  };

  handleChangeRowsPerPage = (refetch) => (event) => {
    this.setState(
      {
        page: 0,
        rowsPerPage: event.target.value,
      },
      ({ rowsPerPage, page } = this.state) =>
        refetch({
          skip: page * rowsPerPage,
          limit: rowsPerPage,
        })
    );
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
    const { rowsPerPage, page } = this.state;
    const {
      data: { getTrainee: { count = 0 } = {}, refetch },
    } = this.props;
    if (count - page * rowsPerPage === 1 && page > 0) {
      this.setState({
        page: page - 1,
      });
      refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
    }
    this.setState({
      RemoveOpen: false,
    });
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
    this.setState({
      EditOpen: false,
    });
  };

  onSubmit = (addData) => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      open,
      orderBy,
      order,
      editData,
      deleteData,
      page,
      rowsPerPage,
      EditOpen,
      RemoveOpen,
    } = this.state;
    const variables = { skip: rowsPerPage * page, limit: rowsPerPage };
    const {
      match: { url },
      classes,
      data: { getTrainee: { records = [], count = 0 } = {}, refetch, loading },
    } = this.props;
    return (
      <Mutation
        mutation={DELETE_TRAINEE}
      >
        {(deleteTrainee) => (
          <Mutation
            mutation={CREATE_TRAINEE}
            refetchQueries={[{ query: GET_TRAINEE, variables }]}
          >
            {(createTrainee) => (
              <Mutation
                mutation={UPDATE_TRAINEE}
              >
                {(updateTrainee) => (
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
                      createTrainee={createTrainee}
                      open={open}
                      onClose={this.handleClose}
                      onSubmit={this.onSubmit}
                    />
                    <EditDialog
                      updateTrainee={updateTrainee}
                      Editopen={EditOpen}
                      handleEditClose={this.handleEditClose}
                      handleEdit={this.handleEdit}
                      data={editData}
                    />
                    <DeleteDialog
                      deleteTrainee={deleteTrainee}
                      openRemove={RemoveOpen}
                      onClose={this.handleRemoveClose}
                      remove={this.handleRemove}
                      data={deleteData}
                    />
                    <WrapTable
                      loader={loading}
                      datalength={records.length}
                      data={records}
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
                      count={count}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      onChangePage={this.handleChangePage(refetch)}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage(
                        refetch
                      )}
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
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Compose(
  withStyles(styles),
  graphql(GET_TRAINEE, {
    options: { variables: { skip: 0, limit: 500 } },
  })
)(TraineeList);
TraineeList.contextType = snackbarContext;
