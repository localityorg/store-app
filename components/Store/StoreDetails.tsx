import React, { useEffect, useState } from "react";
import {
  Button,
  Colors,
  Incubator,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import { Header } from "../../components/Common/Header";
import { InputText } from "../../components/Common/Input";
import { Map } from "../../components/Common/Map";
import { Text } from "../../components/Common/Text";

import Screen from "../../components/Common/Screen";
import Sizes from "../../constants/Sizes";

import { AntDesign } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { useSelector } from "react-redux";

interface DetailProps {
  location?: {
    address: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    pincode: string;
  };
}

const StoreDetails = (props: DetailProps): JSX.Element => {
  const [location, setLocation] = useState<any | null>({
    latitude: "",
    longitude: "",
  });

  const { location: locationState } = useSelector(
    (state: any) => state.locationReducer
  );

  const [locationSet, setLocationSet] = useState<boolean>(false);

  const [status, setStatus] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    licenseNumber: "",
    location: {
      address: props.location?.address || "",
      coordinates: props.location?.coordinates || location,
      pincode: props.location?.pincode || "",
    },
    meta: {
      verified: false,
    },
  });

  useEffect(() => {
    if (locationState) {
      setLocation(locationState);
    }
  }, [locationState]);

  if (status) {
    return (
      <Screen>
        <Header title="" onBack={() => setStatus(false)} />
        <Text grey70>Confirming store StoreDetailsation ...</Text>
      </Screen>
    );
  }

  if (!locationSet) {
    return (
      <>
        <View flex>
          <Text grey70>
            Enter your store address below. Drag marker to point precise store
            location.
          </Text>
          <View
            style={{
              marginVertical: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Incubator.TextField
              placeholder="Enter Adddress"
              floatingPlaceholder
              containerStyle={{
                flex: 1,
              }}
              onChangeText={(text: string) =>
                setStoreInfo({
                  ...storeInfo,
                  location: { ...storeInfo.location, address: text },
                })
              }
              enableErrors
              floatingPlaceholderColor={{
                focus: Colors.$textPrimary,
                default: Colors.$textDefault,
              }}
              floatOnFocus={true}
              validate={["required", (value: string) => value.length > 3]}
              validationMessage={["Field is required", "Address is too short"]}
              autoFocus
              fieldStyle={{
                borderBottomWidth: 1,
                borderColor: Colors.$outlineDisabledHeavy,
                paddingBottom: 4,
              }}
            />
            {isKeyboardVisible && (
              <TouchableOpacity marginL-15 onPress={() => Keyboard.dismiss()}>
                <AntDesign
                  name="arrowright"
                  color={Colors.$iconDefault}
                  size={Sizes.icon.normal}
                />
              </TouchableOpacity>
            )}
          </View>
          {!isKeyboardVisible && <Map />}
          {location && !isKeyboardVisible && (
            <Button
              label={"Confirm Store location"}
              disabled={false}
              size={Button.sizes.large}
              backgroundColor={Colors.primary}
              disabledBackgroundColor={Colors.$iconDisabled}
              round={false}
              borderRadius={10}
              marginV-10
              onPress={() => setLocationSet(true)}
            />
          )}
        </View>
      </>
    );
  }

  return (
    <>
      <View flex>
        <Text grey70>Enter your store details below.</Text>

        <InputText
          value={storeInfo.name}
          onChange={(text: string) =>
            setStoreInfo({ ...storeInfo, name: text })
          }
          title="Store Name"
          placeholder="Maharaja Superstore"
          autoFocus={true}
        />
        <InputText
          value={storeInfo.licenseNumber}
          onChange={(text: string) =>
            setStoreInfo({ ...storeInfo, licenseNumber: text })
          }
          placeholder="ISC000000000"
          title="License Number"
          autoFocus={true}
        />
      </View>
      <Button
        label={"Confirm Details"}
        disabled={true}
        size={Button.sizes.large}
        backgroundColor={Colors.primary}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        marginT-50
        marginB-10
        onPress={() => {}}
      />
    </>
  );
};

export default StoreDetails;
