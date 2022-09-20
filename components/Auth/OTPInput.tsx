import { useLazyQuery } from "@apollo/client";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { Button, Colors, View } from "react-native-ui-lib";
import { CHECK_AUTH } from "../../apollo/graphql/Common/auth";
import Sizes from "../../constants/Sizes";
import { BoldText } from "../Common/Text";
import ResendOTP from "./ResendOTP";

interface OTPProps {
  contact: {
    ISD: string;
    number: string;
  };
  onNext: any;
  date: string;
  onNew: any;
}

export function OTPInput(props: OTPProps) {
  let [fontsLoaded] = useFonts({
    Input: require("../../assets/fonts/Inter-Regular.ttf"),
  });

  const [date, setDate] = useState(props.date);
  const [secureCode, setSecureCode] = useState("");

  const [checkAuth, { loading: checkingAuth }] = useLazyQuery(CHECK_AUTH, {
    variables: {
      contact: props.contact,
      secureCode,
    },
    fetchPolicy: "no-cache",
    onCompleted(data) {
      console.log(data);
      if (!data.checkAuth.error) {
        props.onNext();
      }
    },
  });

  useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  useEffect(() => {}, []);

  return (
    <View flex>
      <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "column",
          width: "100%",
          marginVertical: 10,
          height: 70,
        }}
        flex
      >
        <BoldText style={{ fontSize: Sizes.font.text }}>
          One Time Paassword
        </BoldText>
        <OTPInputView
          style={{ width: "100%", height: 90 }}
          pinCount={6}
          code={secureCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={(code) => setSecureCode(code)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={{
            width: 45,
            height: 60,
            borderWidth: 2,
            fontFamily: "Input",
            fontSize: Sizes.font.header,
            color: Colors.$textDefault,
          }}
          codeInputHighlightStyle={{
            borderColor: Colors.$textPrimary,
            color: Colors.$textPrimary,
          }}
          selectionColor={Colors.$textPrimary}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <ResendOTP
          date={date}
          onNew={() => {
            setSecureCode("");
            props.onNew();
          }}
        />
      </View>
      <Button
        label={checkingAuth ? "Confirming" : "Verify"}
        disabled={checkingAuth || secureCode.length < 6}
        size={Button.sizes.large}
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        marginT-50
        marginB-10
        onPress={() =>
          checkAuth({
            variables: {
              contact: props.contact,
              secureCode,
            },
          })
        }
      />
    </View>
  );
}
