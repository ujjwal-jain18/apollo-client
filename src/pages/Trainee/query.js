import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
  query getTrainee($skip: Int!, $limit: Int!) {
    getTrainee(options: { skip: $skip, limit: $limit }) {
      records {
        name
        role
        email
        createdAt
        originalId
      }
      count
    }
  }
`;
export default GET_TRAINEE