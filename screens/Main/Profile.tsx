import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Colors } from "react-native-ui-lib";
import Button from "../../components/Common/Button";
import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { Section } from "../../components/Common/Section";
import { BoldText, Text } from "../../components/Common/Text";
import TabHeader from "../../components/Store/TabHeader";
import { View } from "../../components/Themed";
import useColorScheme from "../../hooks/useColorScheme";

import { RootTabScreenProps } from "../../types";

export default function Profile({ navigation }: RootTabScreenProps<"Profile">) {
  const colorScheme = useColorScheme();

  function handleLogout() {
    return true;
  }

  return (
    <Screen>
      <Header title="Profile" onBack={() => navigation.navigate("Store")} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 15,
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 5,
            backgroundColor: Colors.$backgroundDisabled,
            marginRight: 10,
          }}
          center
        >
          <AntDesign name="user" color={Colors.$textDefault + "66"} size={60} />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            height: 100,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <BoldText text50>Store Superstore</BoldText>
            <Text text70>+91 88987 39333</Text>
          </View>
          <Text text70>
            Account Status: <BoldText green30>Active</BoldText>
          </Text>
        </View>
      </View>
      <Section
        title="Store Settings"
        body={
          <View style={{ flexDirection: "column" }}>
            <Button
              label="Accounts"
              icon
              name="user"
              fullWidth
              onPress={() => navigation.navigate("Accounts")}
            />
            <View style={{ height: 5 }} />
            <Button
              label="Store Details"
              icon
              name="edit"
              fullWidth
              onPress={() => navigation.navigate("StoreEdit")}
            />
          </View>
        }
      />

      <Section
        title="App Settings"
        body={
          <View style={{ flexDirection: "column" }}>
            <Button
              label={colorScheme == "light" ? "Dark Theme" : "Light Theme"}
              icon
              name="bulb1"
              fullWidth
              transparent
              onPress={handleLogout}
            />
            <Button
              label="Logout"
              icon
              name="logout"
              fullWidth
              transparent
              onPress={handleLogout}
            />
          </View>
        }
      />
    </Screen>
  );
}
