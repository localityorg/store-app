import React, { useEffect, useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Colors, TouchableOpacity } from "react-native-ui-lib";

import { View } from "../Themed";
import { Text } from "../Common/Text";

import Sizes from "../../constants/Sizes";
import id from "date-fns/esm/locale/id/index.js";

interface CounterProps {
  data: any;
  item: {
    id: string;
  };
  onAdd: any;
  onRemove: any;
  editCount: boolean;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState<number>(0);

  const dispatch: any = useDispatch();

  useEffect(() => {
    const item = props.data.find((e: any) => e.id === props.item.id);
    const itemCount = item.quantity.units || item.itemQuantity;
    setCount(itemCount);
  }, [props.data]);

  if (!props.editCount) {
    return (
      <View row centerH>
        <View
          padding-10
          height={45}
          width={40}
          center
          style={{ backgroundColor: Colors.$backgroundDisabled + "99" }}
        >
          <Text text70>{count}</Text>
        </View>
        <TouchableOpacity padding-10 center marginL-15 onPress={props.onAdd}>
          <MaterialCommunityIcons
            name="pencil"
            color={Colors.$iconPrimary}
            size={Sizes.icon.normal}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.$iconPrimary,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: count > 0 ? "transparent" : Colors.$iconPrimary,
      }}
      padding-10
      marginT-5
    >
      {count > 0 && (
        <>
          <TouchableOpacity onPress={props.onRemove}>
            <AntDesign
              name="minus"
              size={Sizes.icon.normal}
              color={Colors.$iconPrimary}
            />
          </TouchableOpacity>
          <Text style={{ paddingHorizontal: 15, fontSize: Sizes.font.text }}>
            {count.toString()}
          </Text>
        </>
      )}
      <TouchableOpacity onPress={props.onAdd}>
        <AntDesign
          name="plus"
          size={Sizes.icon.normal}
          color={count > 0 ? Colors.$iconPrimary : Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}
