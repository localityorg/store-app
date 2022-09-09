import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { CommonStyles } from "./Styles";
import { View } from "../Themed";
import Sizes from "../../constants/Sizes";
import { Colors } from "react-native-ui-lib";
import { BoldText } from "./Text";

interface HeaderProps {
  onBack?: any;
  onNext?: any;
  title: string;
  focused?: boolean;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
}

export function Header(props: HeaderProps) {
  return (
    <View style={CommonStyles.header}>
      {props.onBack && (
        <TouchableOpacity
          onPress={props.onBack}
          style={{
            backgroundColor: props.focused ? Colors.background : "transparent",
            padding: props.focused ? 10 : 0,
            borderRadius: props.focused ? Sizes.icon.header : 0,
          }}
        >
          <AntDesign name="back" size={Sizes.icon.header} color={Colors.text} />
        </TouchableOpacity>
      )}
      <View
        style={{
          ...CommonStyles.screenTitle,
          backgroundColor: props.focused ? Colors.background : "transparent",
          padding: props.focused ? 2 : 0,
          paddingHorizontal: props.focused ? 10 : 0,
          borderRadius: props.focused ? Sizes.icon.normal : 0,
        }}
      >
        <BoldText numberOfLines={1} style={CommonStyles.title}>
          {props.title}
        </BoldText>
      </View>

      {props.onNext && (
        <TouchableOpacity
          onPress={props.onNext}
          style={{
            backgroundColor: props.focused ? Colors.background : "transparent",
            padding: props.focused ? 5 : 0,
            borderRadius: props.focused ? Sizes.icon.header : 0,
          }}
        >
          <AntDesign
            name={props.icon}
            size={Sizes.icon.header}
            color={Colors.text}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
