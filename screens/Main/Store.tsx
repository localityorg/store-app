import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors, TouchableOpacity } from "react-native-ui-lib";
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
import { setInventory, setStore } from "../../redux/Store/actions";

import { RootTabScreenProps } from "../../types";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Sizes from "../../constants/Sizes";
import { SearchBar } from "react-native-screens";
import { TextInput } from "../../components/Common/Input";
import { SearchButton } from "../../components/Common/SearchList";
import {
  FETCH_INVENTORY,
  INVENTORY_UPDATE,
} from "../../apollo/graphql/Store/inventory";

export default function Store({ navigation }: RootTabScreenProps<"Store">) {
  const [search, setSearch] = useState<string>("");

  const { store } = useSelector((state: any) => state.storeReducer);
  const { inventory } = useSelector((state: any) => state.inventoryReducer);
  const { orders } = useSelector((state: any) => state.ordersReducer);
  const { user } = useSelector((state: any) => state.userReducer);

  const dispatch: any = useDispatch();

  const {
    loading: fetchingStore,
    refetch: refetchStore,
    subscribeToMore: subscribeToStore,
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

  const {
    loading: fetchingInventory,
    subscribeToMore: subscribeToInventory,
    refetch: refetchInventory,
  } = useQuery(FETCH_INVENTORY, {
    onCompleted(data) {
      if (data.getInventory) {
        dispatch(setInventory(data.getInventory.products));
      }
    },
    onError(error) {
      console.log({ ...error.graphQLErrors });
    },
  });

  useEffect(() => {
    const unsubscribe = subscribeToStore({
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

  useEffect(() => {
    const unsubscribe = subscribeToInventory({
      document: INVENTORY_UPDATE,
      variables: { id: inventory?.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedQueryData = subscriptionData.data.inventoryUpdate;
        dispatch(setStore(updatedQueryData));
        return Object.assign({}, prev, {
          getInventory: updatedQueryData,
        });
      },
    });
    return unsubscribe;
  }, []);

  if (fetchingStore || fetchingInventory) {
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
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          height: 50,
          width: 50,
          borderRadius: 10,
          backgroundColor: Colors.$iconPrimary,
          margin: 30,
        }}
        center
      >
        <MaterialCommunityIcons
          name="pencil"
          color={Colors.white}
          size={Sizes.icon.header}
        />
      </TouchableOpacity>
      <TabHeader
        icon="user"
        name={store.name || "Store Name"}
        logo={false}
        iconPress={() => navigation.navigate("Profile")}
        namePress={() => {}}
      />
      <FlatList
        data={[1]}
        refreshing={NetworkStatus.loading == 1 || fetchingStore}
        refreshControl={
          <RefreshControl
            refreshing={fetchingStore}
            onRefresh={() => refetchStore()}
            tintColor={Colors.$iconPrimary}
          />
        }
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: number) => item.toString()}
        renderItem={() => (
          <>
            {/* {store.stat && (
              <Stats
                amount={store.stat.amount || "0.0"}
                count={store.stat.count}
                pending={2}
              />
            )} */}
            <Section
              title="Pending Orders"
              subtitle={
                orders.length === 0
                  ? "All pending orders will show here. You have none as of now."
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
            <Section
              title="Inventory"
              subtitle={
                "All products in your store are displayed here. Search or Add products here"
              }
              body={
                <View flex>
                  <SearchButton
                    onPress={() => navigation.navigate("EditInventory")}
                    placeholder="Search Products..."
                  />
                </View>
                // <FlatList
                //   data={inventory}
                //   extraData={orders}
                //   ListFooterComponentStyle={{ marginBottom: 200 }}
                //   keyExtractor={(item: OrderProps) => item.id.toString()}
                //   renderItem={({ item }) => (
                //     <View></View>
                //   )}
                // />
              }
            />
          </>
        )}
      />
    </Screen>
  );
}
