import { useQuery } from "@apollo/client";
import React from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { Badge, Button } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { GET_ORDERS } from "../../apollo/graphql/Store/orders";
import Screen from "../../components/Common/Screen";
import OrderCard from "../../components/Store/OrderCard";
import TabHeader from "../../components/Store/TabHeader";
import { View } from "../../components/Themed";
import { setOrders } from "../../redux/Store/actions";

import { RootTabScreenProps } from "../../types";

export default function Orders({ navigation }: RootTabScreenProps<"Orders">) {
  const dispatch: any = useDispatch();

  const { orders } = useSelector((state: any) => state.ordersReducer);

  const { loading: fetchingOrders, refetch } = useQuery(GET_ORDERS, {
    onCompleted(data) {
      if (data.getOrders) {
        dispatch(setOrders(data.getOrders));
      }
    },
  });

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
      <View flex>
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <OrderCard
              onPress={() =>
                navigation.navigate("OrderDetails", {
                  id: item.id,
                })
              }
              id={item.id}
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
              ]}
              delivery={{
                placed: new Date().toISOString(),
                expected: "",
              }}
              state={{
                accepted: true,
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
              screen={false}
            />
          )}
        />
      </View>
    </Screen>
  );
}
