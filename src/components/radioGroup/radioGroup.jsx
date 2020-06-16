import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Input, Div1 } from './style';

function RadioGroup(props) {
  const { input, error, onChange, options, onBlur } = props;
  return (
    <>
      <p>
        <b>{input}</b>
      </p>
      {options &&
        options.length &&
        options.map(({ value, label }) => (
          <Fragment key={label}>
            <Input
              className={error === '' ? '' : 'error'}
              type='radio'
              name='sport'
              value={value}
              onChange={onChange}
              error={error}
              onBlur={onBlur}
            />
            {label}
            <br />
          </Fragment>
        ))}
      <Div1 className={error === '' ? 'noerror' : 'error'}>
        <p>{error}</p>
      </Div1>
    </>
  );
}

export default RadioGroup;

RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  input: PropTypes.string.isRequired,
  onBlur: PropTypes.string.isRequired,
};
RadioGroup.defaultProps = {
  error: '',
  options: [],
};
