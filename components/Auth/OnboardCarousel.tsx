import React, { useState } from "react";
import { View, PageControl } from "react-native-ui-lib";
import { Image } from "react-native";

interface OnboardCarouselProps {}

const OnboardCarousel = (props: OnboardCarouselProps): JSX.Element => {
  const [page, setPage] = useState(0);

  return (
    <>
      <View flex padding-25 center>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={{ height: 200, width: 200 }}
        />
      </View>
      <PageControl
        numOfPages={5}
        currentPage={page}
        onPagePress={(index: number) => setPage(index)}
      />
    </>
  );
};

export default OnboardCarousel;
