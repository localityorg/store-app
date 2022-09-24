import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Button, Colors, TouchableOpacity, View } from "react-native-ui-lib";
import * as Location from "expo-location";
import { Header } from "../../components/Common/Header";
import { TextInput } from "../../components/Common/Input";
import { Map } from "../../components/Common/Map";
import Screen from "../../components/Common/Screen";
import { Text } from "../../components/Common/Text";
import Sizes from "../../constants/Sizes";

import { Alert, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AuthStackScreenProps } from "../../types";
import ContactInput from "../../components/Auth/ContactInput";
import { useLazyQuery, useMutation } from "@apollo/client";
import { EDIT_STORE } from "../../apollo/graphql/Store/store";
import { OTPInput } from "../../components/Auth/OTPInput";
import { TWOFACTOR_AUTH } from "../../apollo/graphql/Common/auth";
import { setLocation, setUser } from "../../redux/Common/actions";

export default function Register({
  navigation,
}: AuthStackScreenProps<"Register">) {
  const dispatch: any = useDispatch();

  const [meta, setMeta] = useState<any>({
    tfaScreen: false,
    registerScreen: false,
    mapScreen: false,
    date: "",
  });
  const [active, setActive] = useState<boolean>(false);

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const [locationPermission, setLocationPermission] = useState<string | null>(
    null
  );

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

  const [contact, setContact] = useState({
    ISD: "+91",
    number: "",
  });

  const [storeData, setStoreData] = useState({
    edit: false,
    storeInfo: {
      name: "",
      address: {
        line1: "",
        location: {
          coordinates: storeLocation,
        },
      },
    },
  });

  // good manners
  useEffect(() => {
    if (storeLocation === null) {
      askForLocationPermission();
    }
  }, [storeLocation]);

  // init good manners
  const askForLocationPermission = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setLocationPermission(status ? "granted" : "denied");

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        dispatch(
          setLocation([
            location.coords.latitude.toString(),
            location.coords.longitude.toString(),
          ])
        );
      }
    })();
  };

  const [editStore, { loading: registering }] = useMutation(EDIT_STORE, {
    variables: {
      edit: storeData.edit,
      storeInfo: {
        name: storeData.storeInfo.name,
        contact: contact,
        address: storeData.storeInfo.address,
      },
    },
    onCompleted(data) {
      if (data.editStore) {
        dispatch(setUser(data.editStore));
      }
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  const [tfAuth, { loading: tfAuthing }] = useLazyQuery(TWOFACTOR_AUTH, {
    variables: {
      contact,
      newAcc: true,
    },
    fetchPolicy: "no-cache",
    onCompleted(storeData) {
      if (storeData.twoFactorAuth.error) {
        setError({
          error: storeData.twoFactorAuth.error,
          message: storeData.twoFactorAuth.message,
        });
      } else {
        setMeta({
          ...meta,
          tfaScreen: true,
          date: storeData.twoFactorAuth.date,
        });
      }
    },
  });

  if (meta.registerScreen) {
    return (
      <Screen>
        <Header
          title="Store Info"
          onBack={() => {
            setStoreData({
              ...storeData,
              storeInfo: {
                ...storeData.storeInfo,
                name: "",
                address: {
                  ...storeData.storeInfo.address,
                  line1: "",
                },
              },
            });
            setMeta({ ...meta, registerScreen: false, tfaScreen: false });
          }}
        />
        {meta.mapScreen ? (
          <>
            <View flex>
              <Text style={{ fontSize: Sizes.font.text }}>
                Enter your store address below. Drag marker to point precise
                store location.
              </Text>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: active
                    ? Colors.$backgroundDarkElevated
                    : Colors.$backgroundDisabled,
                }}
              >
                <TextInput
                  autoFocus={true}
                  value={storeData.storeInfo.address.line1}
                  onChangeText={(text: string) =>
                    setStoreData({
                      ...storeData,
                      storeInfo: {
                        ...storeData.storeInfo,
                        address: {
                          ...storeData.storeInfo.address,
                          line1: text,
                        },
                      },
                    })
                  }
                  onBlur={() => setActive(false)}
                  onFocus={() => setActive(true)}
                  style={{ flex: 1 }}
                  placeholder="Store Address"
                />
                {isKeyboardVisible && (
                  <TouchableOpacity
                    marginL-15
                    disabled={
                      storeData.storeInfo.address.line1.trim().length <= 0
                    }
                    onPress={() => Keyboard.dismiss()}
                  >
                    <AntDesign
                      name="arrowright"
                      color={
                        storeData.storeInfo.address.line1.trim().length <= 0
                          ? Colors.$backgroundDisabled
                          : Colors.$backgroundDarkElevated
                      }
                      size={Sizes.icon.normal}
                    />
                  </TouchableOpacity>
                )}
                {/* <Incubator.TextField
                  placeholder="Enter Adddress"
                  floatingPlaceholder
                  containerStyle={{
                    flex: 1,
                  }}
                  onChangeText={(text: string) =>
                    setStoreData({
                      ...storeData,
                      storeInfo: {
                        ...storeData.storeInfo,
                        address: {
                          ...storeData.storeInfo.address,
                          line1: text,
                        },
                      },
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
                /> */}
              </View>
              {!isKeyboardVisible && <Map />}
              {storeLocation && !isKeyboardVisible && (
                <Button
                  label={registering ? "Registering..." : "Confirm & Register"}
                  disabled={registering}
                  size={Button.sizes.large}
                  backgroundColor={Colors.primary}
                  disabledBackgroundColor={Colors.$iconDisabled}
                  round={false}
                  borderRadius={10}
                  marginV-10
                  onPress={() =>
                    editStore({
                      variables: {
                        edit: storeData.edit,
                        storeInfo: {
                          name: storeData.storeInfo.name,
                          address: storeData.storeInfo.address,
                          contact,
                        },
                      },
                    })
                  }
                />
              )}
            </View>
          </>
        ) : (
          <>
            <View flex>
              <Text style={{ fontSize: Sizes.font.text }}>
                Enter your store details below.
              </Text>
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

              <TextInput
                value={storeData.storeInfo.name}
                onChangeText={(text: string) =>
                  setStoreData({
                    ...storeData,
                    storeInfo: {
                      ...storeData.storeInfo,
                      name: text,
                    },
                  })
                }
                onBlur={() => setActive(false)}
                onFocus={() => setActive(true)}
                style={{
                  borderWidth: 1,
                  borderColor: active
                    ? Colors.$backgroundDarkElevated
                    : Colors.$backgroundDisabled,
                  padding: 10,
                  marginVertical: 10,
                  borderRadius: 5,
                }}
                placeholder="Store Name"
              />
              {/* <InputText
                value={storeData.storeInfo.}
                onChange={(text: string) =>
                  setStoreInfo({ ...storeInfo, licenseNumber: text })
                }
                placeholder="ISC000000000"
                title="License Number"
                autoFocus={true}
              /> */}
            </View>
            <Button
              label={"Select Address"}
              disabled={storeData.storeInfo.name.trim().length <= 0}
              size={Button.sizes.large}
              backgroundColor={Colors.$backgroundDarkElevated}
              disabledBackgroundColor={Colors.$iconDisabled}
              round={false}
              borderRadius={10}
              marginV-10
              onPress={() => {
                setActive(false);
                setMeta({ ...meta, mapScreen: true });
              }}
            />
          </>
        )}
      </Screen>
    );
  }

  if (meta.tfaScreen) {
    return (
      <Screen>
        <Header
          title="Register"
          onBack={() => {
            setMeta({ ...meta, tfaScreen: false });
          }}
        />
        <Text style={{ fontSize: Sizes.font.text }}>
          Enter 6 digit code sent to your registered number.
        </Text>
        <OTPInput
          contact={contact}
          date={meta.date}
          onNew={() =>
            tfAuth({
              variables: {
                contact,
                newAcc: true,
              },
            })
          }
          onNext={() =>
            setMeta({ ...meta, registerScreen: true, mapScreen: false })
          }
        />
      </Screen>
    );
  }

  if (registering) {
    return (
      <Screen>
        <View center>
          <Text style={{ fontSize: Sizes.font.text }}>
            Getting store registeration confirmation ...
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Register"
        onBack={() => navigation.navigate("Onboarding")}
      />
      <Text style={{ fontSize: Sizes.font.text }}>
        Join with an unregistered mobile number.
      </Text>
      <ContactInput
        error={error}
        contact={contact}
        loading={tfAuthing}
        onNext={() =>
          tfAuth({
            variables: {
              contact,
              newAcc: true,
            },
          })
        }
        setContact={(text: string) => setContact({ ...contact, number: text })}
      />
    </Screen>
  );
}