import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { Badge, Button } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { GET_NEW_ORDER, GET_ORDERS } from "../../apollo/graphql/Store/orders";
import Screen from "../../components/Common/Screen";
import OrderCard from "../../components/Store/OrderCard";
import TabHeader from "../../components/Store/TabHeader";
import { View } from "../../components/Themed";
import { setOrders } from "../../redux/Store/actions";

import { RootTabScreenProps } from "../../types";

export default function Orders({ navigation }: RootTabScreenProps<"Orders">) {
  const dispatch: any = useDispatch();

  const [render, setRender] = useState(false);

  const { orders } = useSelector((state: any) => state.ordersReducer);
  const { user } = useSelector((state: any) => state.userReducer);

  const {
    loading: fetchingOrders,
    refetch,
    subscribeToMore,
  } = useQuery(GET_ORDERS, {
    onCompleted(data) {
      if (data.getOrders) {
        dispatch(setOrders(data.getOrders));
      }
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_ORDER,
      variables: { id: user?.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const updatedQueryData = subscriptionData.data.orderUpdate;

        const index = prev.getOrders.findIndex(
          (e: any) => e.id === updatedQueryData.id
        );

        if (index <= -1) {
          dispatch(setOrders([updatedQueryData, ...prev.getOrders]));
          setRender(!render);
          return Object.assign({}, prev, {
            getOrders: [updatedQueryData, ...prev.getOrders],
          });
        } else {
          var updatedOrders = [...prev.getOrders];
          updatedOrders.splice(index, 1);
          dispatch(setOrders([updatedQueryData, ...updatedOrders]));
          setRender(!render);
          return Object.assign({}, prev, {
            getOrders: [updatedQueryData, ...updatedOrders],
          });
        }
      },
    });
    return unsubscribe;
  }, []);

  return (
    <Screen>
      <TabHeader
        icon="reload1"
        name="Orders"
        logo={false}
        iconPress={() => refetch()}
        namePress={() => {}}
      />
      <View style={{ width: "100%", marginBottom: 15 }}>
        <ScrollView horizontal>
          <Button
            label="Today's Orders"
            size={Button.sizes.medium}
            outline={false}
            style={{ marginRight: 10 }}
          />
          <Button
            label="Pending"
            size={Button.sizes.medium}
            outline
            style={{ marginRight: 10 }}
          />
          <Button
            label="Delivered"
            size={Button.sizes.medium}
            outline
            style={{ marginRight: 10 }}
          />
        </ScrollView>
      </View>
      {orders && (
        <View flex>
          <FlatList
            data={orders}
            extraData={render}
            onRefresh={() => refetch()}
            refreshing={fetchingOrders}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item }) => (
              <OrderCard
                onPress={() =>
                  navigation.navigate("OrderDetails", {
                    id: item.id,
                  })
                }
                id={item.id}
                products={item.products}
                delivery={{
                  placed: item.state.created.date,
                  expected: item.state.delivery.deliverBy,
                }}
                state={{
                  accepted: item.state.order.accepted,
                }}
                address={{
                  line: item.state.delivery.address.line,
                  coordinates: [
                    "item.state.delivery.address.location.coordinates",
                    "",
                  ],
                }}
                payment={{
                  grandTotal: item.state.payment.grandAmount,
                  paid: item.state.payment.paid,
                }}
                loading={false}
                screen={false}
              />
            )}
          />
        </View>
      )}
    </Screen>
  );
}
