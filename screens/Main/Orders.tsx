import React from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { Badge, Button } from "react-native-ui-lib";
import Screen from "../../components/Common/Screen";
import OrderCard from "../../components/Store/OrderCard";
import TabHeader from "../../components/Store/TabHeader";
import { View } from "../../components/Themed";

import { RootTabScreenProps } from "../../types";

export default function Orders({ navigation }: RootTabScreenProps<"Orders">) {
  function handleReload() {
    return true;
  }

  return (
    <Screen>
      <TabHeader
        icon="reload1"
        name="Orders"
        logo={false}
        iconPress={handleReload}
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
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item: number) => item.toString()}
          renderItem={() => (
            <OrderCard
              onPress={() => navigation.navigate("OrderDetails")}
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
