import { Colors, Text as DefaultText, TextProps } from "react-native-ui-lib";

import { useFonts } from "expo-font";

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  let [fontsLoaded] = useFonts({
    Text: require("../../assets/fonts/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <DefaultText
        style={[{ color: Colors.$textDefault, fontFamily: "Text" }, style]}
        {...otherProps}
      />
    );
  }
}

export function BoldText(props: TextProps) {
  const { style, ...otherProps } = props;
  let [fontsLoaded] = useFonts({
    BoldText: require("../../assets/fonts/Inter-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <DefaultText
        style={[{ color: Colors.$textDefault, fontFamily: "BoldText" }, style]}
        {...otherProps}
      />
    );
  }
}
