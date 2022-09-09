import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useFonts } from "expo-font";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Colors, View } from "react-native-ui-lib";
import Sizes from "../../constants/Sizes";
import { BoldText } from "../Common/Text";
import ResendOTP from "./ResendOTP";

interface OTPProps {
  contact: {
    ISD: string;
    number: string;
  };
  onNext: any;
  newAcc: boolean;
}

export function OTPInput(props: OTPProps) {
  const [code, setCode] = useState<string>("");
  let [fontsLoaded] = useFonts({
    Input: require("../../assets/fonts/Inter-Regular.ttf"),
  });

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
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={(code) => {
            setCode(code);
          }}
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
          contact={props.contact}
          newAcc={props.newAcc}
          date=""
          setCode={setCode}
        />
      </View>
      <Button
        label={"Verify"}
        disabled={false}
        size={Button.sizes.large}
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        marginT-50
        marginB-10
        onPress={props.onNext}
      />
    </View>
  );
}
