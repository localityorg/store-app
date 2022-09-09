import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { Provider } from "react-redux";
import { Store } from "./redux/store";

// handling auth
import { AuthProvider } from "./redux/Common/reducers/auth";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/Provider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <AuthProvider>
            <Provider store={Store}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </Provider>
          </AuthProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
