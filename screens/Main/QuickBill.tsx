import { useLazyQuery, useMutation } from "@apollo/client";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Keyboard } from "react-native";
import {
  Button,
  Colors,
  Constants,
  Dialog,
  PanningProvider,
  TouchableOpacity,
} from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";

import {
  EDIT_PRODUCT,
  GET_PRODUCT,
  SEARCH_PRODUCTS,
} from "../../apollo/graphql/Store/products";
import { InputText, TextInput } from "../../components/Common/Input";
import Screen from "../../components/Common/Screen";
import { BoldText, Text } from "../../components/Common/Text";
import Scanner from "../../components/Store/Scanner";
import TabHeader from "../../components/Store/TabHeader";
import { View } from "../../components/Themed";
import Sizes from "../../constants/Sizes";
import { addCartItem } from "../../redux/Store/actions";

import { RootTabScreenProps } from "../../types";

export default function QuickBill({
  navigation,
}: RootTabScreenProps<"QuickBill">) {
  const dispatch: any = useDispatch();

  const [assignerScreen, setAssignerScreen] = useState<boolean>(false);

  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<any>({ id: null, name: "" });

  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<any>({
    data: [],
    error: true,
  });

  const [code, setCode] = useState<string | undefined>();

  const { cart, empty } = useSelector((state: any) => state.cartReducer);
  const { store } = useSelector((state: any) => state.storeReducer);

  const [searchProduct, { loading }] = useLazyQuery(GET_PRODUCT, {
    variables: {
      storeId: store?.id,
      barcode: code,
    },
    onCompleted(data) {
      if (data.getProduct) {
        dispatch(addCartItem(data.getProduct));
      } else {
        setAssignerScreen(true);
      }
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  const [lookUpProducts, { loading: loadingProducts }] = useLazyQuery(
    SEARCH_PRODUCTS,
    {
      variables: {
        name: search,
        limit: 10,
      },
      onCompleted(data) {
        Keyboard.dismiss();
        setProducts({ data: data.getProducts || [], error: "" });
      },
    }
  );

  const [edit, { loading: editing }] = useMutation(EDIT_PRODUCT, {
    variables: {
      id: editProduct.id,
      barcode: code,
      url: "",
    },
    onCompleted(data) {
      if (data.editProduct) {
        var product = data.editProduct;
        dispatch(addCartItem(product));
      }
    },
  });

  useEffect(() => {
    if (code) {
      searchProduct({
        variables: {
          storeId: store?.id,
          barcode: code,
        },
      });
    }
  }, [code]);

  useEffect(() => {
    editProduct.id ? setDialogVisible(true) : setDialogVisible(false);
  }, [editProduct]);

  if (assignerScreen) {
    return (
      <>
        <Dialog
          bottom={true}
          visible={dialogVisible}
          onDismiss={() =>
            setEditProduct({
              id: null,
              name: "",
            })
          }
          panDirection={PanningProvider.Directions.DOWN}
          containerStyle={{
            backgroundColor: Colors.$backgroundDefault,
            marginBottom: Constants.isIphoneX ? 0 : 20,
            borderRadius: 12,
          }}
          ignoreBackgroundPress={false}
        >
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
                Assign barcode {code} to {editProduct.name}?
              </Text>
              <View margin-15 marginH-0 right w-100 spread row>
                <Button
                  label={editing ? "Editing" : "Confirm"}
                  size={Button.sizes.small}
                  backgroundColor={Colors.$backgroundDarkElevated}
                  disabledBackgroundColor={Colors.$iconDisabled}
                  disabled={editing}
                  round={false}
                  padding-5
                  text70
                  borderRadius={5}
                  onPress={() =>
                    edit({
                      variables: {
                        id: editProduct.id,
                        barcode: code,
                        url: "",
                      },
                    })
                  }
                />
              </View>
            </View>
          </View>
        </Dialog>
        <Screen>
          <View flex marginT-25>
            <View row centerH>
              <TouchableOpacity
                paddingR-15
                center
                marginB-15
                onPress={() => {
                  setEditProduct({
                    id: null,
                    name: "",
                  });
                  setAssignerScreen(false);
                }}
              >
                <AntDesign
                  name="back"
                  size={Sizes.icon.header}
                  color={Colors.$textDefault}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: Colors.$backgroundDisabled + "77",
                  marginBottom: 15,
                }}
              >
                <TextInput
                  autoFocus={true}
                  value={search}
                  placeholder={"Search and assign code to a product"}
                  onChangeText={(text) => setSearch(text)}
                  selectionColor={Colors.$iconPrimary}
                  style={{
                    flex: 1,
                    fontSize: Sizes.font.text,
                  }}
                />
                {search.trim().length > 0 && (
                  <View row center style={{ backgroundColor: "transparent" }}>
                    <TouchableOpacity onPress={() => setSearch("")}>
                      <AntDesign name="close" size={Sizes.icon.normal} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {search.trim().length > 0 && (
                <View row centerH>
                  <TouchableOpacity
                    onPress={() => {
                      lookUpProducts({
                        variables: {
                          name: search,
                          limit: 10,
                        },
                      });
                    }}
                    style={{
                      justifyContent: "center",
                      backgroundColor: Colors.$iconPrimary,
                      paddingHorizontal: 15,
                      marginBottom: 15,
                      borderRadius: 10,
                      marginLeft: 10,
                    }}
                    disabled={search.trim().length > 0 ? false : true}
                  >
                    <AntDesign
                      name="arrowright"
                      size={Sizes.icon.normal}
                      color={Colors.white}
                    />
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      justifyContent: "center",
                      backgroundColor: Colors.$iconPrimary,
                      paddingHorizontal: 15,
                      marginBottom: 15,
                      borderRadius: 10,
                      marginLeft: 10,
                    }}
                    disabled={search.trim().length > 0 ? false : true}
                  >
                    <AntDesign
                      name="plus"
                      size={Sizes.icon.normal}
                      color={Colors.white}
                    />
                  </TouchableOpacity> */}
                </View>
              )}
            </View>
            <FlatList
              data={products.data}
              keyExtractor={(e) => e.id}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    width: "80%",
                    alignSelf: "center",
                    marginBottom: 5,
                  }}
                />
              )}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: "100%",
                      borderRadius: 5,
                      alignItems: "flex-start",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: Colors.$backgroundNeutralMedium,
                    }}
                    row
                    padding-5
                    onPress={() => {
                      setEditProduct({
                        id: item.id,
                        name: `${item.name} ${item.quantity.count}${item.quantity.type}`,
                      });
                    }}
                  >
                    <Text text70 flex numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text marginL-10 text70>
                      {item.quantity.count}
                      {item.quantity.type}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Screen>
      </>
    );
  }

  return (
    <Screen>
      <View
        row
        centerH
        marginT-25
        marginB-10
        style={{
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BoldText text40>Quickbill</BoldText>

        <View row centerH>
          <TouchableOpacity padding-10>
            <AntDesign
              size={Sizes.icon.normal}
              name="delete"
              color={
                empty
                  ? Colors.$textDisabled
                  : Colors.$textDanger || Colors.$textDisabled
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            marginL-15
            padding-10
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.$iconPrimary,
            }}
            onPress={() => {
              setSearch("");
              setProducts({ data: [], error: false });
              setAssignerScreen(true);
            }}
          >
            <AntDesign
              size={Sizes.icon.normal}
              name="plus"
              color={Colors.$iconPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 200,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: Colors.$backgroundNeutralIdle,
        }}
        marginB-10
      >
        <Scanner code={code} setCode={setCode} />
      </View>
    </Screen>
  );
}
