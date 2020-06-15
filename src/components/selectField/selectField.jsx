import React from 'react';

import PropTypes from 'prop-types';
import { Select, Div1 } from './style';

function SelectField(props) {
  const { input, error, onChange, options, onBlur } = props;
  const { defaultText } = props;
  return (
    <>
      <p>
        <b>{input}</b>
      </p>
      <Select
        className={error === '' ? '' : 'error'}
        onChange={onChange}
        error={error}
        onBlur={onBlur}
      >
        {defaultText && <option>{defaultText}</option>}
        {options &&
          options.length &&
          options.map(({ value, label }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
      </Select>
      <Div1 className={error === '' ? 'noerror' : 'error'}>
        <p>{error}</p>
      </Div1>
    </>
  );
}

export default SelectField;

SelectField.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  input: PropTypes.string.isRequired,
  defaultText: PropTypes.string,
  onBlur: PropTypes.string.isRequired,
};
SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'Select',
};
