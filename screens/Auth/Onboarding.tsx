import React from "react";
import Screen from "../../components/Common/Screen";
import OnboardCarousel from "../../components/Auth/OnboardCarousel";
import { Button, Colors } from "react-native-ui-lib";
import { AuthStackScreenProps } from "../../types";

interface OnboardingProps {}

const Onboarding = ({
  navigation,
}: AuthStackScreenProps<"Onboarding">): JSX.Element => {
  return (
    <Screen>
      <OnboardCarousel />
      <Button
        label={"Login with Phone"}
        disabled={false}
        size={Button.sizes.large}
        backgroundColor={Colors.$backgroundDarkElevated}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        marginT-50
        marginB-10
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        label={"New User? Register"}
        disabled={false}
        size={Button.sizes.large}
        backgroundColor={Colors.transparent}
        labelStyle={{
          color: Colors.$textDefault,
        }}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        onPress={() => navigation.navigate("Register")}
      />
    </Screen>
  );
};

export default Onboarding;
