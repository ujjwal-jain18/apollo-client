import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Div from './style';

const withLoaderandMessage = (Wrapper) => (props) => {
  const { loader, datalength } = props;
  return (
    <div>
      {loader ? (
        <span>{loader ? <CircularProgress size={20} /> : ''}</span>
      ) : datalength ? (
        <Wrapper {...props} />
      ) : (
        <Div>
          <p> OOPS!, No More Trainees </p>
        </Div>
      )}
    </div>
  );
};
export default withLoaderandMessage;
