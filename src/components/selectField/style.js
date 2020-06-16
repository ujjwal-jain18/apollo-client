import styled from 'styled-components';

const Select = styled.select`
  width: 99%;
  padding: 1%;

  &.error {
    border: 1px solid red;
    text-color: red;
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
export { Select, Div1 };
