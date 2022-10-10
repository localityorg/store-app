import React, { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors } from "react-native-ui-lib";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import Screen from "../../components/Common/Screen";
import { Section } from "../../components/Common/Section";
import { BoldText } from "../../components/Common/Text";
import { View } from "../../components/Themed";

import OrderCard, { OrderProps } from "../../components/Store/OrderCard";
import Stats from "../../components/Store/Stats";
import TabHeader from "../../components/Store/TabHeader";

import { GET_STORE, STORE_UPDATE } from "../../apollo/graphql/Store/store";
import { setStore } from "../../redux/Store/actions";

import { RootTabScreenProps } from "../../types";

export default function Store({ navigation }: RootTabScreenProps<"Store">) {
  const { store } = useSelector((state: any) => state.storeReducer);
  const { orders } = useSelector((state: any) => state.ordersReducer);
  const { user } = useSelector((state: any) => state.userReducer);

  const dispatch: any = useDispatch();

  const {
    loading: fetchingStore,
    refetch,
    subscribeToMore,
    networkStatus,
  } = useQuery(GET_STORE, {
    onCompleted(data) {
      if (data.getStore) {
        dispatch(setStore(data.getStore));
      }
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: STORE_UPDATE,
      variables: { id: user?.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedQueryData = subscriptionData.data.storeUpdate;
        dispatch(setStore(updatedQueryData));
        return Object.assign({}, prev, {
          getStore: updatedQueryData,
        });
      },
    });
    return unsubscribe;
  }, []);

  if (fetchingStore || networkStatus === 4) {
    return (
      <Screen>
        <View flex center>
          <BoldText text70>Fetching store details...</BoldText>
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
        refreshing={NetworkStatus.loading == 1 || fetchingStore}
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
                  data={orders.filter(
                    (order: any) => order.state.order.accepted === false
                  )}
                  extraData={orders}
                  ListFooterComponentStyle={{ marginBottom: 200 }}
                  keyExtractor={(item: OrderProps) => item.id.toString()}
                  renderItem={({ item }) => (
                    <OrderCard
                      onPress={() =>
                        navigation.navigate("OrderDetails", {
                          id: item.id,
                        })
                      }
                      id={item.id}
                      products={item.products}
                      state={item.state}
                      loading={false}
                      screen={false}
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
