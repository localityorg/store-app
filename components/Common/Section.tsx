import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";
import Sizes from "../../constants/Sizes";
import { View } from "../Themed";
import { CommonStyles } from "./Styles";
import { BoldText, Text } from "./Text";

interface SectionProps {
  title: string;
  subtitle?: string;
  body: any;
  horizontal?: boolean;
  onPressIcon?: any;
  loading?: boolean;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
}

export function Section(props: SectionProps) {
  return (
    <View style={CommonStyles.section}>
      <View style={CommonStyles.sectionHeaderRow}>
        <BoldText style={CommonStyles.sectionHeader} text70>
          {props.title}
        </BoldText>
        {props.icon && (
          <TouchableOpacity onPress={props.onPressIcon}>
            <AntDesign
              name={props.icon}
              color={Colors.text}
              size={Sizes.icon.normal}
            />
          </TouchableOpacity>
        )}
        {props.loading && (
          <ActivityIndicator color={Colors.$iconPrimary} size="small" />
        )}
      </View>
      {props.subtitle && (
        <Text style={CommonStyles.sectionText} text70>
          {props.subtitle}
        </Text>
      )}

      <View
        style={{
          flexDirection: props.horizontal ? "row" : "column",
          backgroundColor: "transparent",
          marginTop: 5,
        }}
      >
        {props.body}
      </View>
    </View>
  );
}
