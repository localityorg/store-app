import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib";
import { useSelector } from "react-redux";
import Screen from "../../components/Common/Screen";
import { BoldText } from "../../components/Common/Text";
import TabHeader from "../../components/Store/TabHeader";
import { View } from "../../components/Themed";

import { RootTabScreenProps } from "../../types";

export default function QuickBill({
  navigation,
}: RootTabScreenProps<"QuickBill">) {
  const { cart, empty } = useSelector((state: any) => state.cartReducer);

  return (
    <Screen>
      <TabHeader
        icon="delete"
        name="Quickbill"
        logo={false}
        color={
          empty
            ? Colors.$textDisabled
            : Colors.$textDanger || Colors.$textDisabled
        }
        iconPress={() => {}}
        namePress={() => {}}
      />

      <View flex center>
        <AntDesign
          name="qrcode"
          size={Dimensions.get("screen").width - 100}
          color={Colors.$backgroundDisabled}
        />
        <BoldText marginT-50>Feature coming soon!</BoldText>
      </View>
    </Screen>
  );
}
