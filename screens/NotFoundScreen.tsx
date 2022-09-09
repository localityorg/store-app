import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../components/Common/Text";
import { View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

const NotFoundScreen = ({ navigation }: RootStackScreenProps<"NotFound">) => {
  return (
    <View flex center>
      <Text text50>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("Root")}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
