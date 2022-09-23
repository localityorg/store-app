// apollo
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

// secure store import
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "../constants/Network";

const URI = `http://${BASE_URL}/graphql`;

// websocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${BASE_URL}/subscriptions`,
    shouldRetry() {
      return true;
    },
  })
);

// http link
const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext(async () => {
  const token = await SecureStore.getItemAsync("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      source: `locale-store-${token || ""}`,
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: true,
  }),
});
