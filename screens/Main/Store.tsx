import React from "react";
import { FlatList, RefreshControl } from "react-native";

import { Section } from "../../components/Common/Section";
import Screen from "../../components/Common/Screen";
import OrderCard from "../../components/Store/OrderCard";
import Stats from "../../components/Store/Stats";
import TabHeader from "../../components/Store/TabHeader";

import { Colors } from "react-native-ui-lib";

import { RootTabScreenProps } from "../../types";
import { useQuery } from "@apollo/client";
import { GET_STORE } from "../../apollo/graphql/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOrders, setStore } from "../../redux/Store/actions";
import { Text } from "../../components/Common/Text";
import { View } from "../../components/Themed";
import { GET_ORDERS } from "../../apollo/graphql/Store/orders";

export default function Store({ navigation }: RootTabScreenProps<"Store">) {
  const [refreshing, setRefreshing] = React.useState(false);

  const { store } = useSelector((state: any) => state.storeReducer);
  const { orders } = useSelector((state: any) => state.ordersReducer);

  const dispatch: any = useDispatch();

  const { loading: fetchingStore, refetch } = useQuery(GET_STORE, {
    onCompleted(data) {
      console.log(data);
      if (data.getStore) {
        dispatch(setStore(data.getStore));
      }
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  if (fetchingStore) {
    return (
      <Screen>
        <View flex center>
          <Text>Fetching store details...</Text>
        </View>
      </Screen>
    );
  }

  if (!store) {
    return null;
  }

  return (
    <Screen>
      <TabHeader
        icon="user"
        name={store.name || "Store Name"}
        logo={true}
        iconPress={() => navigation.navigate("Profile")}
        namePress={() => {}}
      />
      <FlatList
        data={[1]}
        refreshing={refreshing}
        refreshControl={
          <RefreshControl
            refreshing={fetchingStore}
            onRefresh={() => refetch()}
            tintColor={Colors.$iconPrimary}
          />
        }
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: number) => item.toString()}
        renderItem={() => (
          <>
            {store.stat && (
              <Stats
                amount={store.stat.amount || "0.0"}
                count={store.stat.count}
                pending={2}
              />
            )}
            {/* <LinearGradient
              colors={[
                Colors.$iconDanger + "00",
                Colors.$backgroundDefault + "aa",
                Colors.$backgroundDefault + "cc",
              ]}
            >
              <Section
                title="Store Products"
                subtitle="Manage all items in your store here"
                icon="pluscircleo"
                onPressIcon={() => {}}
                body={
                  <FlatList
                    data={[1, 2, 3, 4, 5]}
                    horizontal
                    style={{ height: 112 }}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{ width: 8, backgroundColor: "transparent" }}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item: number) => item.toString()}
                    renderItem={({ item }) => (
                      <ProductTile
                        url="https://picsum.photos/200"
                        dimension={80}
                        amount={"100"}
                        count={7}
                        id=""
                      />
                    )}
                  />
                }
              />
            </LinearGradient> */}
            <Section
              title="Pending Orders"
              subtitle={
                orders.length === 0
                  ? "You have no pending orders, go to Orders tab"
                  : "Once accepted, view in Orders tab"
              }
              body={
                <FlatList
                  data={orders}
                  keyExtractor={(item: any) => item.id.toString()}
                  renderItem={() => (
                    <OrderCard
                      id="344535loc"
                      products={[
                        {
                          name: "Lays Chips",
                          meta: {
                            quantity: "250",
                            type: "g",
                          },
                          price: {
                            mrp: "100",
                            discount: "90",
                            curr: "INR",
                          },
                          count: 2,
                          totalPrice: "200",
                        },
                        {
                          name: "Lays Chips 2",
                          meta: {
                            quantity: "250",
                            type: "g",
                          },
                          price: {
                            mrp: "100",
                            discount: "90",
                            curr: "INR",
                          },
                          count: 2,
                          totalPrice: "200",
                        },
                      ]}
                      delivery={{
                        placed: new Date().toISOString(),
                        expected: "",
                      }}
                      state={{
                        accepted: false,
                      }}
                      address={{
                        line: "A10, 604, Rutu Enclave Street 400625",
                        coordinates: {
                          latitude: "12.245435",
                          longitude: "12.245435",
                        },
                      }}
                      payment={{
                        grandTotal: "1134",
                        paid: false,
                      }}
                      loading={false}
                    />
                  )}
                />
              }
            />
          </>
        )}
      />
    </Screen>
  );
}
