import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink ({
    uri: process.env.REACT_APP_APOLLO_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token,
        },
    };
});

const cache = new InMemoryCache();

const client =  new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
});

export default client;