/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {withLoaderandMessage} from '../../../../components/index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';

import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },
  cover: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'darkgrey !important',
    },
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 10,
    marginLeft: theme.spacing(10),
  },
  pages: {
    color: 'grey',
  },
});

function TableComponent(props) {
  const {
    classes,
    data,
    column,
    actions,
    onSort,
    orderBy,
    order,
    onSelect,
    count,
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
  } = props;
  return (
    <div>
      <TableContainer component={Paper} elevation={3}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {column.map((col) => (
                <TableCell
                  className={classes.header}
                  align={col.align}
                  sortDirection={orderBy === col.label ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === col.label}
                    direction={orderBy === col.label ? order : 'asc'}
                    onClick={onSort(col.label)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element) => (
                <TableRow className={classes.cover} hover>
                  {column.map(({ field, align, format }) => (
                    <TableCell align={align} onClick={onSelect(element)}>
                      {format !== undefined
                        ? format(element[field])
                        : element[field]}
                    </TableCell>
                  ))}
                  <TableCell>
                  {actions.map(({ Icon, handler }) => (
                    <IconButton
                      onClick={handler(element)}
                      className={classes.action}
                    >
                      {Icon}
                    </IconButton>
                  ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          className={classes.pages}
          rowsPerPageOptions={[5, 10, 20,25]}
          component='div'
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
TableComponent.defaultProps = {
  orderBy: '',
  order: 'asc',
  onSort: () => {},
};
const WrapTable = withLoaderandMessage(TableComponent)
export default withStyles(useStyles)(WrapTable);
