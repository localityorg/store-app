import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";

import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { BoldText } from "../../components/Common/Text";
import OrderCard from "../../components/Store/OrderCard";
import { View } from "../../components/Themed";

import { RootTabScreenProps } from "../../types";

export default function OrderDetails({
  navigation,
}: RootTabScreenProps<"OrderDetails">) {
  function handleReload() {
    return true;
  }

  function handleCancel() {
    return true;
  }

  function handleDelivered() {
    return true;
  }

  return (
    <Screen>
      <Header title="Detail" onBack={() => navigation.navigate("Orders")} />
      <FlatList
        style={{ flex: 1 }}
        data={[1]}
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
              {
                name: "Lays Chips2",
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
                name: "Lays Chips1",
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
            screen={true}
          />
        )}
      />
      <View
        style={{
          marginTop: 5,
          height: 50,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCancel}
          style={{
            flex: 1,
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.$iconDanger,
          }}
        >
          <BoldText style={{ color: Colors.white }}>Cancel Order</BoldText>
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDelivered}
          style={{
            flex: 1,
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.$iconPrimary,
          }}
        >
          <BoldText style={{ color: Colors.white }}>Delivered</BoldText>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
