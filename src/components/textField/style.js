import styled from 'styled-components';

const Input = styled.input`
  width: 97%;
  height: 18%;
  padding: 1%;
  border-radius: 5px;
  border: 1px solid grey;
  color: solid black;
  &.error {
    border: 1px solid red;
    text-color: red;
  }
  &.noerror {
    display: none;
  }
`;
const Div = styled.div`
  border: 2px solid black;
`;

const Div1 = styled.div`
  &.error {
    color: red;
  }
  &.noerror {
    display: none;
  }
`;
export { Input, Div, Div1 };
