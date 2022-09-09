import { ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Colors } from "react-native-ui-lib";
import Sizes from "../../constants/Sizes";
import { View } from "../Themed";
import { Text } from "./Text";

interface ButtonProps {
  onPress: any;
  label: string;
  name?: React.ComponentProps<typeof AntDesign>["name"];
  icon?: boolean;
  fullWidth?: boolean;
  transparent?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: props.fullWidth ? "100%" : "50%",
        alignSelf: props.fullWidth ? "baseline" : "auto",
        backgroundColor: props.transparent
          ? "transparent"
          : Colors.$backgroundDisabled + "99",
      }}
      activeOpacity={Sizes.opacity.active}
      disabled={props.disabled || false}
    >
      {props.loading ? (
        <ActivityIndicator color={Colors.tint} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: props.icon ? "flex-start" : "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          {props.icon && (
            <AntDesign
              name={props.name}
              color={Colors.text}
              size={Sizes.icon.normal}
              style={{ marginRight: 10 }}
            />
          )}
          <Text
            style={{
              color: Colors.text,
              fontSize: Sizes.font.text,
            }}
          >
            {props.label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
