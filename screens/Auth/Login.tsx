import React, { useState } from "react";

import { useMutation } from "@apollo/client";

import { EDIT_STORE } from "../../apollo/graphql/Store/store";

import AuthForm from "../../components/Auth/AuthForm";
import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { Text } from "../../components/Common/Text";
import Sizes from "../../constants/Sizes";

import { AuthStackScreenProps } from "../types";

export default function Login({ navigation }: AuthStackScreenProps<"Login">) {
  const [verified, setVerifed] = useState({
    contact: {
      ISD: "",
      number: "",
    },
    bool: false,
  });

  const [login, { loading }] = useMutation(EDIT_STORE, {
    variables: {
      editStore: {
        contact: verified.contact,
      },
    },
  });

  if (!verified.bool) {
    return (
      <Screen>
        <Header
          title="Login"
          onBack={() => navigation.navigate("Onboarding")}
        />
        <Text style={{ fontSize: Sizes.font.text }}>
          Welcome back! Login with your registered number.
        </Text>
        <AuthForm />
        {/* <OTPInput contact={verified.contact} onNext={() => {}} newAcc={false} /> */}
      </Screen>
    );
  }

  return <Screen></Screen>;
}
