import React from "react";
import { View } from "react-native-ui-lib";
import { Image } from "react-native";

interface OnboardCarouselProps {}

const OnboardCarousel = (props: OnboardCarouselProps): JSX.Element => {
  return (
    <View flex padding-25 center>
      <Image
        source={{ uri: "https://picsum.photos/220" }}
        style={{ height: 200, width: 200 }}
      />
    </View>
  );
};

export default OnboardCarousel;
