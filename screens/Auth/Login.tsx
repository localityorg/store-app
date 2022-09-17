import React, { useState } from "react";

import { useLazyQuery, useMutation } from "@apollo/client";

import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { Text } from "../../components/Common/Text";
import Sizes from "../../constants/Sizes";

import { CHECK_AUTH, TWOFACTOR_AUTH } from "../../apollo/graphql/Common/auth";
import { OTPInput } from "../../components/Auth/OTPInput";
import { LOGIN_USER } from "../../apollo/graphql/Common/user";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Common/actions";
import ContactInput from "../../components/Auth/ContactInput";

import { AuthStackScreenProps } from "../../types";

export default function Login({ navigation }: AuthStackScreenProps<"Login">) {
  const [contact, setContact] = useState({
    ISD: "+91",
    number: "",
  });
  const [meta, setMeta] = useState({
    tfScreen: false,
    date: "",
  });

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const dispatch: any = useDispatch();

  const [login, { loading }] = useMutation(LOGIN_USER, {
    variables: {
      contact,
    },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      if (data.login) {
        dispatch(setUser(data.login));
      } else {
        Alert.alert("Error occured.", "Some error occured. Please try again.");
      }
    },
  });

  const [tfAuth, { loading: tfAuthing }] = useLazyQuery(TWOFACTOR_AUTH, {
    variables: {
      contact: contact,
      newAcc: false,
    },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      if (data.twoFactorAuth.error) {
        setError({
          error: data.twoFactorAuth.error,
          message: data.twoFactorAuth.message,
        });
      } else {
        setMeta({ ...meta, tfScreen: true, date: data.twoFactorAuth.date });
      }
    },
  });

  if (meta.tfScreen) {
    return (
      <Screen>
        <Header
          title="Login"
          onBack={() => {
            setMeta({ ...meta, tfScreen: false });
          }}
        />
        <Text style={{ fontSize: Sizes.font.text }}>
          Enter 6 digit code sent to your registered number.
        </Text>
        <OTPInput
          date={meta.date}
          onNew={() =>
            tfAuth({
              variables: {
                contact,
                newAcc: false,
              },
            })
          }
          contact={contact}
          onNext={() =>
            login({
              variables: {
                contact,
              },
            })
          }
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Login" onBack={() => navigation.navigate("Onboarding")} />
      <Text style={{ fontSize: Sizes.font.text }}>
        Welcome back! Login with your registered number.
      </Text>
      <ContactInput
        contact={contact}
        loading={tfAuthing}
        onNext={() => {
          setError({ ...error, error: false });
          tfAuth({
            variables: {
              contact: contact,
              newAcc: false,
            },
          });
        }}
        error={error}
        setContact={(text: string) => {
          if (error.error) {
            setError({ error: false, message: "" });
          }
          setContact({ ...contact, number: text });
        }}
      />
    </Screen>
  );
}
