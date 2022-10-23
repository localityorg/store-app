import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Colors } from "react-native-ui-lib";
import { useSelector } from "react-redux";
import { CREATE_ORDER } from "../../apollo/graphql/Store/orders";
import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { View } from "../../components/Themed";

import { RootStackScreenProps } from "../../types";

const Confirm = ({ navigation }: RootStackScreenProps<"Confirm">) => {
  const [products, setProducts] = useState<any>([]);
  const [grandTotal, setGrandTotal] = useState<string>("0");

  const [delivery, setDelivery] = useState(false);

  const { cart } = useSelector((state: any) => state.cartReducer);
  const { store } = useSelector((state: any) => state.storeReducer);

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    variables: {
      orderInfo: {
        products: [],
        grandTotal: grandTotal,
        addressId: null,
        storeId: store.id,
        delivery,
        deliverBy: new Date().toISOString(),
        accountId: null,
      },
    },
    onCompleted(data) {},
    onError(error) {
      console.log({ ...error });
    },
  });

  function handleOrder() {
    createOrder({
      variables: {
        orderInfo: {
          products: products,
          grandTotal: grandTotal,
          addressId: null,
          storeId: store.id,
          delivery,
          deliverBy: new Date().toISOString(),
          accountId: null,
        },
      },
    });
  }

  useEffect(() => {
    if (cart.length <= 0) {
      navigation.navigate("QuickBill");
    } else {
      var total = 0;
      const prods: Array<any> = [];
      cart.forEach((e: any) => {
        prods.push({
          id: e.id,
          quantity: parseInt(e.itemQuantity),
          inStore: false,
        });

        total += parseFloat(e.totalPrice);
      });
      setProducts(prods);
      setGrandTotal(total.toString());
    }
  }, [cart]);

  return (
    <Screen>
      <Header title="Confirm" onBack={() => navigation.navigate("QuickBill")} />
      <View flex></View>
      <Button
        label={"Confirm"}
        disabled={false}
        size={Button.sizes.large}
        backgroundColor={Colors.$backgroundDarkElevated}
        disabledBackgroundColor={Colors.$iconDisabled}
        round={false}
        borderRadius={10}
        marginV-10
        onPress={handleOrder}
      />
    </Screen>
  );
};

export default Confirm;
