import React, { useState } from "react";
import {
  View,
  TextField,
  Button,
  Colors,
  Dialog,
  PanningProvider,
  ActionSheet,
} from "react-native-ui-lib";
import { BoldText } from "../Common/Text";
import { Text } from "../Themed";
import ContactInput from "./ContactInput";

interface AuthFormProps {}

const AuthForm = (props: AuthFormProps): JSX.Element => {
  const [contact, setContact] = useState({
    ISD: "+91",
    number: "",
  });

  return (
    <View flex>
      <ContactInput
        contact={contact}
        setContact={(e: string) => setContact({ ...contact, number: e })}
        loading={false}
        onNext={() => {}}
        autoFocus={true}
        lock={false}
      />
      <ActionSheet
        title={"Title"}
        message={"Message goes here"}
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        options={[
          { label: "", onPress: () => {} },
          { label: "", onPress: () => {} },
          { label: "Cancel", onPress: () => console.log("cancel") },
        ]}
      />
    </View>
  );
};

export default AuthForm;
