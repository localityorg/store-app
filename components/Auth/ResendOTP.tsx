import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { differenceInMinutes, differenceInSeconds } from "date-fns";

import { TWOFACTOR_AUTH } from "../../apollo/graphql/Common/auth";
import { View } from "../Themed";
import { BoldText, Text } from "../Common/Text";
import Sizes from "../../constants/Sizes";

interface ResendOTPProps {
  date: string;
  newAcc: boolean;
  contact: any;
  setCode: any;
}

export default function ResendOTP(props: ResendOTPProps) {
  // timer
  const [confirmTimer, setConfirmTimer] = useState<number>(1);
  const [date, setDate] = useState(props.date);

  // track of time, delivery
  const [timer, setTimer] = useState({
    over: false,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    confirmTimer > 0 &&
      setTimeout(() => setConfirmTimer(confirmTimer + 1), 1000);

    let currentTime = new Date();
    let expireTime = new Date(date);

    setTimer({
      over: currentTime > expireTime ? true : false,
      min: Math.abs(differenceInMinutes(expireTime, currentTime) % 60),
      sec: Math.abs(differenceInSeconds(expireTime, currentTime) % 60),
    });
  }, [confirmTimer]);

  // const [twoFactorAuth] = useLazyQuery(TWOFACTOR_AUTH, {
  //   variables: {
  //     contact: props.contact,
  //     newAcc: props.newAcc,
  //   },
  //   fetchPolicy: "no-cache",
  //   onCompleted(data) {
  //     if (!data.twoFactorAuth.error) {
  //       props.setCode();
  //       setDate(data.twoFactorAuth.date);
  //     }
  //   },
  //   onError(err) {
  //     console.log(err);
  //     process.env.NODE_ENV && console.log(err);
  //   },
  // });

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "transparent",
        alignSelf: "flex-start",
      }}
    >
      {timer.over ? (
        <TouchableOpacity
          onPress={() =>
            // twoFactorAuth({
            //   variables: {
            //     contact: props.contact,
            //     newAcc: props.newAcc,
            //   },
            // })
            {}
          }
        >
          <BoldText
            style={{
              textDecorationLine: "underline",
              fontSize: Sizes.font.text,
            }}
          >
            Resend Code
          </BoldText>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            fontSize: 14,
          }}
        >
          Request New Code in{" "}
          <BoldText style={{ fontSize: Sizes.font.text }}>
            {timer.min} <Text>m</Text> {timer.sec} <Text>s</Text>
          </BoldText>
        </Text>
      )}
    </View>
  );
}
