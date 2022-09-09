import { ImageLoader } from "react-native-image-fallback";
import { ICON_URL, IMG_URL } from "../../constants/Network";

interface FbImageProps {
  og: boolean;
  url: string;
  dimension: number;
}

const FbImage = (props: FbImageProps): JSX.Element => {
  return (
    <ImageLoader
      source={(props.og ? `${IMG_URL}/` : "") + `${props.url}`}
      fallback={[`${ICON_URL}/imagedefault.png`]}
      style={{
        height: props.dimension || 80,
        width: props.dimension || 80,
        borderRadius: 10,
      }}
    />
  );
};

export default FbImage;
