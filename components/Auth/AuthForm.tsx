import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Alert } from "react-native";
import { View } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../apollo/graphql/Common/user";
import { setUser } from "../../redux/Common/actions";
import ContactInput from "./ContactInput";

interface AuthFormProps {
  onPress: any;
  contact: {
    ISD: string;
    number: string;
  };
  setContact: any;
}

const AuthForm = (props: AuthFormProps): JSX.Element => {
  return (
    <View flex>
      <ContactInput
        contact={props.contact}
        setContact={props.setContact}
        loading={false}
        onNext={props.onPress}
        autoFocus={true}
        lock={false}
      />
    </View>
  );
};

export default AuthForm;
