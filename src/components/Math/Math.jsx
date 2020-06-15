import React from 'react';
import PropType from 'prop-types';
import { Operators } from '../../configs/constants';

export class Math extends React.Component {
  calResult = (first, second, operator) => {
    let result = first + operator + second;
    // eslint-disable-next-line no-eval
    result = Operators.includes(operator) ? eval(result) : 'Invalid Operation';
    return result;
  };

  render() {
    const { first, second, operator, children } = this.props;
    const result = this.calResult(first, second, operator);
    return children !== undefined ? (
      <p>{children(first, second, operator, result)}</p>
    ) : (
      <p>{`${first} ${operator} ${second} = ${result}`}</p>
    );
  }
}
Math.propTypes = {
  first: PropType.number.isRequired,
  second: PropType.number.isRequired,
  operator: PropType.oneOf(['+', '-', '/', '*']).isRequired,
  children: PropType.func,
};
Math.defaultProps = {
  children: undefined,
};
