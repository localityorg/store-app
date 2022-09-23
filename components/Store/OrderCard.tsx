import { formatDistanceToNow, parseISO } from "date-fns";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { Button, Colors } from "react-native-ui-lib";
import Sizes from "../../constants/Sizes";
import { AccountTile } from "../../screens/Main/Accounts";
import FbImage from "../Common/FbImage";
import { Section } from "../Common/Section";
import { BoldText, Text } from "../Common/Text";
import { View } from "../Themed";
import Tracker from "./Tracker";

interface ProductProps {
  id: string;
  name: string;
  price: {
    mrp: string;
    discount?: string;
  };
  quantity: string;
  totalAmount: string;
}

interface CardProps {
  id: string;
  state: {
    accepted: boolean;
  };
  delivery: {
    placed: string;
    expected: string;
  };
  products: Array<ProductProps>;
  payment: {
    grandTotal: string;
    paid: boolean;
  };
  address: AddressProps;
  loading: boolean;
  onPress?: any;
  screen?: boolean;
  onBack?: any;
}

interface AddressProps {
  line: string;
  coordinates: [string, string];
}

interface GrandTotalDeliveryProps {
  address: AddressProps;
  grandTotal: string;
  card?: boolean;
}

interface ProductListProps {
  card: boolean;
  products: Array<ProductProps>;
}

const ProductList = (props: ProductListProps): JSX.Element => {
  return (
    <FlatList
      data={props.products}
      ItemSeparatorComponent={() => (
        <View style={{ height: props.card ? 5 : 10 }} />
      )}
      keyExtractor={(item) => item.id}
      style={{ width: "100%" }}
      renderItem={({ item }) => (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            {!props.card && (
              <View style={{ marginRight: 10 }}>
                <FbImage
                  og={false}
                  dimension={40}
                  url="https://picsum.photos/200"
                />
              </View>
            )}
            <Text
              style={{
                fontSize: props.card ? Sizes.font.text : 16,
                width: "70%",
              }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
          </View>
          <View
            style={{
              width: props.card ? "30%" : "40%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: props.card ? Sizes.font.text : 16,
              }}
            >
              x{item.quantity}
            </Text>
            <Text
              style={{
                fontSize: props.card ? Sizes.font.text : 16,
              }}
            >
              Rs. {item.totalAmount}/-
            </Text>
          </View>
        </View>
      )}
    />
  );
};

const GrandTotalDeliveryCard = (
  props: GrandTotalDeliveryProps
): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        borderRadius: 10,
        padding: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <BoldText>Address</BoldText>
          <Text numberOfLines={1} text70 style={{ width: "80%" }}>
            {props.address.line}
          </Text>
        </View>
        <View
          style={{
            height: "80%",
            width: 2,
            backgroundColor: Colors.$backgroundDisabled,
            marginRight: 10,
          }}
        />
      </View>

      <View
        style={{
          width: "30%",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <BoldText>Grand Total</BoldText>
        <Text text70>Rs. {props.grandTotal}/-</Text>
      </View>
    </View>
  );
};

const OrderCard = (props: CardProps): JSX.Element => {
  function handleAccept() {
    return true;
  }

  function handleReject() {
    return true;
  }

  if (props.screen) {
    return (
      <View flex>
        <Tracker deliverBy={new Date().toISOString()} />
        <Section
          title="Address"
          body={
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {props.address.line}
            </Text>
          }
        />
        <Section
          title="Products"
          body={
            <View marginT-5>
              <ProductList products={props.products} card={false} />
            </View>
          }
        />

        <Section
          title="Payment"
          body={
            <View style={{ flexDirection: "column" }}>
              <View
                row
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  Grand Total{" "}
                </Text>
                <View
                  style={{
                    width: "40%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    —
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    Rs. {props.payment.grandTotal}/-
                  </Text>
                </View>
              </View>
              <View
                row
                style={{
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  Payment Status{" "}
                </Text>
                <View
                  style={{
                    width: "40%",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    —
                  </Text>
                  <BoldText
                    style={{
                      fontSize: 16,
                    }}
                  >
                    unpaid
                  </BoldText>
                </View>
              </View>
            </View>
          }
        />
        {!props.payment.paid && (
          <Section
            title="Account requesting"
            body={
              <View marginT-5>
                <AccountTile
                  name="Vatsal Pandya"
                  closed={false}
                  lastUpdated={new Date().toISOString()}
                  id="44329342"
                  pending={{
                    status: true,
                    amount: "110",
                  }}
                  screen={true}
                  disabled={true}
                />
              </View>
            }
          />
        )}
      </View>
    );
  }

  if (props.loading) {
    return (
      <View
        style={{
          minHeight: 185,
          width: "100%",
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
          overflow: "hidden",
          flexDirection: "column",
          borderColor: Colors.$textDisabled,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View row center>
          <ActivityIndicator color={Colors.primary} size="large" />
          <BoldText marginL-20 text70 style={{ color: Colors.$iconPrimary }}>
            Please Wait ...
          </BoldText>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{
        minHeight: 140,
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        overflow: "hidden",
        flexDirection: "column",
        borderColor: Colors.$textDisabled,
      }}
      activeOpacity={0.6}
      onPress={props.onPress}
    >
      <View
        style={{
          width: "100%",
          padding: 5,
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: Colors.$textDisabled,
        }}
      >
        <Text>Id: {props.id}</Text>
        <BoldText>
          {formatDistanceToNow(parseISO(props.delivery.placed))} to go
        </BoldText>
      </View>
      <View
        style={{
          padding: 5,
          flexDirection: "column",
          alignItems: "flex-start",
          borderBottomWidth: 1,
          borderBottomColor: Colors.$textDisabled,
        }}
      >
        <BoldText>Product{props.products.length > 0 && "s"}</BoldText>
        <ProductList card={true} products={props.products} />
      </View>
      <GrandTotalDeliveryCard
        address={props.address}
        grandTotal={props.payment.grandTotal}
      />
      {!props.state.accepted && (
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
            onPress={handleReject}
            style={{
              flex: 1,
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.$backgroundDangerLight,
            }}
          >
            <BoldText style={{ color: Colors.$textDanger }}>Reject</BoldText>
          </TouchableOpacity>
          <View style={{ width: 5 }} />
          <TouchableOpacity
            onPress={handleAccept}
            style={{
              flex: 1,
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.$backgroundSuccessLight,
            }}
          >
            <BoldText style={{ color: Colors.$textSuccess }}>Accept</BoldText>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default OrderCard;
