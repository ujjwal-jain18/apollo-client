import styled from 'styled-components';

const Input = styled.input`
  display: inline;
  &.error {
    border: 1px solid red;
  }
  &.noerror {
    display: none;
  }
`;
const Div1 = styled.div`
  &.error {
    color: red;
  }
  &.noerror {
    display: none;
  }
`;
export { Input, Div1 };
