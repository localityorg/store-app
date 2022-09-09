/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList, AuthStackParamList } from "../types";

export const authlinking: LinkingOptions<AuthStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Onboarding: "onboarding",
      Login: "login",
      Register: "register",
    },
  },
};

export const rootlinking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Store: {
            screens: {
              TabTwoScreen: "store",
            },
          },
          Orders: {
            screens: {
              OrdersScreen: "orders",
            },
          },
          QuickBill: {
            screens: {
              QuickScreen: "quick",
            },
          },
          Profile: {
            screens: {
              ProfileScreen: "profile",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
    },
  },
};
