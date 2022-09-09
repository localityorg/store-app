import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Button,
  Colors,
  Incubator,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import * as Location from "expo-location";
import AuthForm from "../../components/Auth/AuthForm";
import { OTPInput } from "../../components/Auth/OTPInput";
import AddressPicker from "../../components/Common/AddressPicker";
import { Header } from "../../components/Common/Header";
import { InputText } from "../../components/Common/Input";
import { Map } from "../../components/Common/Map";
import Screen from "../../components/Common/Screen";
import { Text } from "../../components/Common/Text";
import Sizes from "../../constants/Sizes";
import MapPicker from "../Main/MapPicker";

import { AuthStackScreenProps } from "../types";
import { Keyboard } from "react-native";
import { useSelector } from "react-redux";

export default function Register({
  navigation,
}: AuthStackScreenProps<"Login">) {
  const [location, setLocation] = useState<any | null>({
    latitude: "",
    longitude: "",
  });
  const [locationPermission, setLocationPermission] = useState<string | null>(
    null
  );
  const [status, setStatus] = useState(false);

  const { location: storeLocation } = useSelector(
    (state: any) => state.locationReducer
  );

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

  const [verified, setVerifed] = useState({
    contact: {
      ISD: "",
      number: "",
    },
    bool: false,
  });

  const [storeInfo, setStoreInfo] = useState({
    name: "",
    licenseNumber: "",
    location: {
      address: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
      pincode: "",
    },
    meta: {
      verified: false,
    },
  });

  // good manners
  useEffect(() => {
    askForLocationPermission();
  }, []);

  // init good manners
  const askForLocationPermission = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setLocationPermission(status ? "granted" : "denied");

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        });
      }
    })();
  };

  if (status) {
    return (
      <Screen>
        <Header title="" onBack={() => setStatus(false)} />
        <Text grey70>Getting store registeration confirmation ...</Text>
      </Screen>
    );
  }

  if (!verified.bool) {
    return (
      <Screen>
        <Header
          title="Register"
          onBack={() => navigation.navigate("Onboarding")}
        />
        <Text grey70>Join with an unregistered mobile number.</Text>
        <AuthForm />
        {/* <OTPInput contact={verified.contact} onNext={() => {}} newAcc={true} /> */}
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Acc. Info"
        onBack={() => {
          setVerifed({ ...verified, bool: true });
        }}
      />
      {!storeInfo.meta.verified ? (
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
                validationMessage={[
                  "Field is required",
                  "Address is too short",
                ]}
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
                onPress={() => {}}
              />
            )}
          </View>
        </>
      ) : (
        <>
          <View flex>
            <Text grey70>Enter your store details below.</Text>
            {/* <InputText
          value={storeInfo.licenseNumber}
          onChange={(text: string) =>
            setStoreInfo({ ...storeInfo, licenseNumber: text })
          }
          placeholder="Raj Maharaj"
          title="Your Name"
          autoFocus={true}
        />

        <View
          style={{
            marginVertical: 10,
            height: 1,
            width: "80%",
            alignSelf: "center",
            backgroundColor: Colors.$backgroundPrimaryHeavy,
          }}
        /> */}

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
            label={"Select Address"}
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
      )}
    </Screen>
  );
}
