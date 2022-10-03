import { useMutation, useQuery } from "@apollo/client";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { DELIVERED_ORDER, GET_ORDER } from "../../apollo/graphql/Store/orders";

import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { BoldText } from "../../components/Common/Text";
import OrderCard from "../../components/Store/OrderCard";
import { View } from "../../components/Themed";
import { setLocation } from "../../redux/Common/actions";

import { RootStackScreenProps } from "../../types";

export default function OrderDetails({
  route,
  navigation,
}: RootStackScreenProps<"OrderDetails">) {
  const { id } = route.params;
  const dispatch: any = useDispatch();

  const { location } = useSelector((state: any) => state.locationReducer);

  const [permission, setPermission] = useState<string | null>(null);
  const [order, setOrder] = useState<any>();

  const { loading } = useQuery(GET_ORDER, {
    variables: {
      id: id,
    },
    onCompleted(data) {
      setOrder(data.getOrder);
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  const askForLocationPermission = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setPermission(status ? "granted" : "denied");

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        dispatch(
          setLocation([
            location.coords.latitude.toString(),
            location.coords.longitude.toString(),
          ])
        );
      }
    })();
  };

  useEffect(() => {
    if (location === null) {
      askForLocationPermission();
    }
  }, [location]);

  const [delivered, { loading: settingDeliveryStatus }] = useMutation(
    DELIVERED_ORDER,
    {
      variables: {
        id: id,
        coordinates: location,
      },
      onCompleted(data) {
        if (data.deliveredOrder) {
        }
      },
      onError(error) {
        console.log({ ...error });
      },
    }
  );

  if (loading || order === undefined) {
    return (
      <View center flex>
        <ActivityIndicator size={"large"} color={Colors.$iconPrimary} />
        <BoldText text70>Fetching order details...</BoldText>
      </View>
    );
  }

  if (order?.state.cancelled) {
    setTimeout(() => {
      navigation.navigate("Orders");
    }, 2000);
    return (
      <View center flex>
        <BoldText text70>Order cancelled by user. Redirecting you...</BoldText>
      </View>
    );
  }

  return (
    <Screen>
      <Header title="Detail" onBack={() => navigation.navigate("Orders")} />
      <FlatList
        style={{ flex: 1 }}
        data={[1]}
        renderItem={() => (
          <OrderCard
            onPress={() => {}}
            id={order.id}
            products={order.products}
            delivery={{
              placed: order.state.created.date,
              expected: order.state.delivery.deliverBy,
            }}
            state={{
              accepted: order.state.order.accepted,
            }}
            address={{
              line: order.state.delivery.address.line,
              coordinates: order.state.delivery.address.location.coordinates,
            }}
            payment={{
              grandTotal: order.state.payment.grandAmount,
              paid: order.state.payment.paid,
            }}
            loading={loading}
            screen={true}
          />
        )}
      />
      {!order.state.delivery.delivered && (
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
            onPress={() =>
              delivered({
                variables: {
                  id: id,
                  coordinates: location,
                },
              })
            }
            disabled={settingDeliveryStatus}
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
      )}
    </Screen>
  );
}
