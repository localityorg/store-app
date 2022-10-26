import { useState } from "react";
import {
  Colors,
  Constants,
  Dialog,
  PanningProvider,
  TouchableOpacity,
} from "react-native-ui-lib";
import { BoldText, Text } from "../Common/Text";
import { View } from "../Themed";

interface IGrandTotalCard {
  total: string;
  m: string;
  setMethod: any;
  setAccountId: any;
}

export default function GrandTotalCard(props: IGrandTotalCard) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Dialog
        bottom={true}
        visible={visible}
        onDismiss={() => setVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
        containerStyle={{
          backgroundColor: Colors.$backgroundDefault,
          marginBottom: Constants.isIphoneX ? 0 : 20,
          borderRadius: 12,
        }}
        ignoreBackgroundPress={false}
      >
        {/* {toSetAddress.id ? (
        <View spread>
          <View marginT-20 marginH-20>
            <Text $textDefault text60>
              Confirm
            </Text>
            <View
              center
              marginT-10
              style={{
                height: 1,
                width: "100%",
                backgroundColor: Colors.$backgroundDarkElevated,
              }}
            />
            <Text text70 $textDefault marginT-10>
              Use {toSetAddress.addressInfo?.name.trim()} (
              {toSetAddress.addressInfo?.line1.trim()}) as your delivery
              address?
            </Text>
            <View margin-15 marginH-0 right w-100 spread row>
              <Button
                padding-5
                paddingL-0
                text70
                $textDefault
                label="Cancel"
                link
                onPress={() =>
                  toSetAddress({
                    id: null,
                  })
                }
              />
              <Button
                label={"Confirm"}
                size={Button.sizes.small}
                backgroundColor={Colors.$backgroundDarkElevated}
                round={false}
                text70
                padding-5
                borderRadius={5}
                onPress={() => {
                  dispatch(setDeliveryAddress(toSetAddress));
                  setToSetAddress({ id: null });
                  props.setVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      ) : (
        <View spread style={{ maxHeight: Sizes.screen.height / 2 }}>
          <View marginV-10 marginH-20>
            <BoldText text70 marginB-10>
              Pick one from your address book
            </BoldText>
            <FlatList
              data={book}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={{
                    height: 45,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("SetAddress", {
                      set: true,
                      onNextRoute: "Root",
                      backDisabled: false,
                    })
                  }
                >
                  <AntDesign
                    name="plus"
                    size={Sizes.icon.small}
                    color={Colors.$backgroundDarkActive}
                  />
                  <Text style={{ fontSize: Sizes.font.text, marginLeft: 10 }}>
                    Add New Address
                  </Text>
                </TouchableOpacity>
              )}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                    backgroundColor: Colors.$iconPrimary + "22",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "transparent",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: "50%",
                      maxWidth: "70%",
                    }}
                    activeOpacity={0.7}
                    onPress={() =>
                      setToSetAddress({
                        id: item.id,
                        addressInfo: {
                          name: item.name,
                          line1: item.line1,
                          location: item.location,
                        },
                      })
                    }
                  >
                    <Text>{item.name}</Text>
                    <Text
                      style={{ fontSize: Sizes.font.text }}
                      numberOfLines={1}
                    >
                      {item.line1}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      )} */}
      </Dialog>
      <View
        style={{
          width: "100%",
          flexDirection: "column",
          marginVertical: 10,
          padding: 10,
          paddingTop: 20,
          borderRadius: 10,
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text text70>Order payment</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => props.setMethod("CASH")}>
              <Text
                text70
                style={{
                  color:
                    props.m.toLowerCase() === "cash"
                      ? Colors.$iconPrimary
                      : Colors.$textDefault,
                }}
              >
                Cash
              </Text>
            </TouchableOpacity>
            <Text marginH-10>/</Text>
            <TouchableOpacity onPress={() => props.setMethod("UPI")}>
              <Text
                text70
                style={{
                  color:
                    props.m.toLowerCase() === "upi"
                      ? Colors.$iconPrimary
                      : Colors.$textDefault,
                }}
              >
                UPI
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text text70>Add to Account</Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.$backgroundDisabled,
              borderRadius: 10,
              padding: 5,
            }}
          >
            <Text text70>Choose Account</Text>
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text text60>Grand Total</Text>
          <BoldText text60>₹ {props.total}/-</BoldText>
        </View>
      </View>
    </>
  );
}
