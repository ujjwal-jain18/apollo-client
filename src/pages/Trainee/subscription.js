import { gql } from "apollo-boost";

const ADD_TRAINEE_SUB = gql`
  subscription ADD_SUBSCRIPTION {
    createTrainee {
      name
      email
      role
      email
      createdAt
    }
  }
`;

const UPDATE_TRAINEE_SUB = gql`
  subscription UPDATE_TRAINEE_SUB {
    traineeUpdated {
      name
      email
      id
    }
  }
`;

const DELETE_TRAINEE_SUB = gql`
  subscription {
    traineeDeleted
  }
`;

export { ADD_TRAINEE_SUB, UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB };
