import Footer from "./footer/Footer";
import dynamic from "next/dynamic";
import Header from "./header/Header";
import { shallowEqual, useSelector } from "react-redux";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import ChatModal from "./Chat/ChatModal";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import GlobalStyle from "../components/global-styles/GlobalStyle";
const DynamicCompare = dynamic(() => import("../components/Compare"));

let wsLink = null;
const SUBSCRIPTIONS_API_ENDPOINT = `wss://${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;
const HTTPS_API_ENDPOINT = `https://${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`;

const Layout = ({ children, menu, locale }) => {
  const tokenFromRedux = useSelector(
    state => state.loginReducer.token,
    shallowEqual
  );
  wsLink =
    !wsLink &&
    typeof window !== "undefined" &&
    tokenFromRedux &&
    new WebSocketLink({
      uri: SUBSCRIPTIONS_API_ENDPOINT,
      options: {
        reconnect: true,
        reconnectionAttempts: 50,
        lazy: true,
        timeout: 20000,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${tokenFromRedux}`
          }
        }
      }
    });

  //  wsLink.subscriptionClient.close();
  const authLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers

    operation.setContext(({ headers = {}, ...context }) => ({
      headers: {
        ...headers,
        ...(tokenFromRedux ? { Authorization: `Bearer ${tokenFromRedux}` } : {})
      },
      ...context
    }));

    return forward(operation);
  });

  const link =
    typeof window !== "undefined" &&
    createHttpLink({
      uri: HTTPS_API_ENDPOINT,
      credentials: "include",
      fetch
    });

  const splitLink =
    typeof window !== "undefined" && wsLink
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === "OperationDefinition" &&
              definition.operation === "subscription"
            );
          },
          wsLink,
          authLink.concat(link)
        )
      : typeof window !== "undefined"
      ? authLink.concat(link)
      : link;

  const client = new ApolloClient({
    link:
      typeof window !== "undefined"
        ? splitLink
        : new HttpLink({ uri: HTTPS_API_ENDPOINT }),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      {/* <Weglot /> */}
      <GlobalStyle />
      <Header menu={menu} locale={locale} />
      <main>{children}</main>
      <DynamicCompare />
      <Footer />
      <ChatModal params={""} />
    </ApolloProvider>
  );
};

export default Layout;
