import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://proper-quagga-74.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "uV0ICBO8vVIQBiXl9XpJ6c2BgE6kG5y1Bg13sPtpdgqit7AcMk2xwjBHwu5gn38z",
  },
  cache: new InMemoryCache(),
});

export default client;
