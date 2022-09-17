import React from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Colors } from "react-native-ui-lib";
import { View } from "../Themed";
import { BoldText, Text } from "../Common/Text";
import Sizes from "../../constants/Sizes";
import { TextInput } from "../Common/Input";

interface ContactInputProps {
  contact: {
    ISD: string;
    number: string;
  };
  setContact: any;
  onNext: any;
  loading: boolean;
  lock?: boolean;
  autoFocus?: boolean;
  error: {
    error: boolean;
    message: string;
  };
}

export default function ContactInput(props: ContactInputProps) {
  return (
    <>
      <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "column",
          width: "100%",
          marginVertical: 10,
          marginBottom: 0,
          height: 70,
        }}
      >
        <BoldText style={{ fontSize: Sizes.font.text }}>
          Contact Number
        </BoldText>
        <View
          style={{
            flex: 1,
            height: 40,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity disabled={props.lock || false}>
            <BoldText style={{ fontSize: Sizes.font.header, lineHeight: 40 }}>
              {props.contact.ISD}
            </BoldText>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: 10,
              flex: 1,
            }}
          >
            <TextInput
              editable={props.lock || true}
              value={props.contact.number.toString()}
              onChangeText={props.setContact}
              keyboardType="phone-pad"
              maxLength={10}
              style={{
                fontSize: Sizes.font.header,
                backgroundColor: "transparent",
                lineHeight: 40,
              }}
              textContentType="telephoneNumber"
              placeholderTextColor={Colors.tabIconDefault}
              placeholder="999900000"
              selectionColor={Colors.primary}
              autoFocus={props.autoFocus || false}
            />
          </View>
          {props.contact.number.length === 10 && (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={props.onNext}
              disabled={props.lock || false}
            >
              {props.loading ? (
                <ActivityIndicator color={Colors.primary} size="large" />
              ) : (
                <AntDesign
                  name="right"
                  color={Colors.primary}
                  size={Sizes.icon.header}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {props.error.error && (
        <View flex bottom centerH>
          <Text
            style={{
              padding: 5,
              backgroundColor: Colors.$backgroundDangerLight,
              color: Colors.$iconDanger,
              fontSize: Sizes.font.text,
            }}
          >
            {props.error.message}
          </Text>
        </View>
      )}
    </>
  );
}
