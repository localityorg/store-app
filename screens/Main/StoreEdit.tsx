import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Header } from "../../components/Common/Header";
import Screen from "../../components/Common/Screen";
import { Text } from "../../components/Common/Text";
import StoreDetails from "../../components/Store/StoreDetails";

import { RootTabScreenProps } from "../types";

export default function StoreEdit({
  navigation,
}: RootTabScreenProps<"StoreEdit">) {
  const [editing, setEditing] = useState(true);
  const [changed, setChanged] = useState(false);
  const { store } = useSelector((state: any) => state.storeReducer);

  if (editing) {
    return (
      <Screen>
        <Header
          title="Edit Details"
          onBack={() => {
            setEditing(false);
            if (!changed) {
              navigation.navigate("Profile");
            }
          }}
        />
        <StoreDetails location={store?.address} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Confim Details"
        onBack={() => navigation.navigate("Profile")}
      />
      <Text text70>Confirm details before saving.</Text>
    </Screen>
  );
}
