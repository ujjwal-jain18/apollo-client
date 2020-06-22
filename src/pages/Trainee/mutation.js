import { gql } from 'apollo-boost';

const CREATE_TRAINEE = gql`
  mutation createTrainee($name: String!, $email: String!, $password: String!) {
    createTrainee(
      payload: { name: $name, email: $email, password: $password }
    ) {
      name
      email
    }
  }
`;
const UPDATE_TRAINEE = gql`
  mutation updateTrainee($id: ID!, $name: String, $email: String) {
    updateTrainee(payload: { id: $id, name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;
const DELETE_TRAINEE = gql`
  mutation deleteTrainee($id: ID!) {
    deleteTrainee(id: $id)
  }
`;

export { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE };
