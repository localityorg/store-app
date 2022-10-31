import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Colors, TouchableOpacity } from "react-native-ui-lib";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../../components/Common/Screen";
import { Section } from "../../components/Common/Section";
import { BoldText } from "../../components/Common/Text";
import { View } from "../../components/Themed";
import OrderCard, {
  OrderProps,
  ProductProps,
} from "../../components/Store/OrderCard";
import { SearchButton } from "../../components/Common/SearchList";
import { InventoryProduct } from "./EditInventory";
import TabHeader from "../../components/Store/TabHeader";

import { removeStore, setInventory, setStore } from "../../redux/Store/actions";

import { GET_STORE, STORE_UPDATE } from "../../apollo/graphql/Store/store";
import {
  FETCH_INVENTORY,
  INVENTORY_UPDATE,
} from "../../apollo/graphql/Store/inventory";

import { RootTabScreenProps } from "../../types";
import Sizes from "../../constants/Sizes";
import { removeUser } from "../../redux/Common/actions";

export default function Store({ navigation }: RootTabScreenProps<"Store">) {
  const { store } = useSelector((state: any) => state.storeReducer);
  const { id: inventoryId, inventory } = useSelector(
    (state: any) => state.inventoryReducer
  );
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
      if (error.graphQLErrors[0]) {
        dispatch(removeStore());
        dispatch(removeUser());
      }
    },
  });

  const {
    loading: fetchingInventory,
    subscribeToMore: subscribeToInventory,
    refetch: refetchInventory,
  } = useQuery(FETCH_INVENTORY, {
    onCompleted(data) {
      if (data.getInventory) {
        dispatch(setInventory(data.getInventory));
      }
    },
    onError(error) {
      if (error.graphQLErrors[0]) {
        console.log("Error fetching inventory");
      }
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
    if (inventoryId) {
      const unsubscribe = subscribeToInventory({
        document: INVENTORY_UPDATE,
        variables: { id: inventoryId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const updatedQueryData = subscriptionData.data.inventoryUpdate;
          dispatch(setInventory(updatedQueryData));
          return Object.assign({}, prev, {
            getInventory: updatedQueryData,
          });
        },
      });
      return unsubscribe;
    }
  }, [inventoryId]);

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
          zIndex: 999,
        }}
        center
        onPress={() => navigation.navigate("EditInventory")}
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
            onRefresh={() => {
              refetchStore();
              refetchInventory();
            }}
            colors={[Colors.$iconPrimary]}
          />
        }
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
                  {inventory.length > 0 && (
                    <>
                      <SearchButton
                        onPress={() => navigation.navigate("EditInventory")}
                        placeholder="Search Products..."
                      />
                      <FlatList
                        listKey="0104030235"
                        data={inventory}
                        keyExtractor={(item: ProductProps) => item.id}
                        renderItem={({ item }) => (
                          <InventoryProduct
                            data={inventory}
                            item={item}
                            showEdit={false}
                            editCount={false}
                          />
                        )}
                      />
                    </>
                  )}
                </View>
              }
            />
          </>
        )}
      />
    </Screen>
  );
}
