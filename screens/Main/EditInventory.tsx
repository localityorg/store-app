import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Colors,
  Constants,
  Dialog,
  PanningProvider,
  TouchableOpacity,
} from "react-native-ui-lib";

import { View } from "../../components/Themed";
import { BoldText, Text } from "../../components/Common/Text";
import { Header } from "../../components/Common/Header";
import { Section } from "../../components/Common/Section";
import { TextInput } from "../../components/Common/Input";
import Image from "../../components/Common/Image";
import Screen from "../../components/Common/Screen";
import Counter from "../../components/Store/Counter";

import { ProductProps } from "../../components/Store/OrderCard";
import { ADD_INVENTORY } from "../../apollo/graphql/Store/inventory";
import { SEARCH_PRODUCTS } from "../../apollo/graphql/Store/products";

import { RootStackScreenProps } from "../../types";
import Sizes from "../../constants/Sizes";

interface InventoryProductProps {
  data: Array<ProductProps>;
  item: ProductProps;
  onAdd?: any;
  onRemove?: any;
  editCount: boolean;
  add?: boolean;
  showEdit?: boolean;
}

export function InventoryProduct(props: InventoryProductProps) {
  return (
    <View
      style={{
        width: "100%",
        marginBottom: "4%",
      }}
      row
      center
    >
      <View style={{ width: 60, height: 60 }} center marginR-10>
        <Image url={props.item.url} dimension={60} og={true} />
      </View>
      <View flex>
        <Text style={{ maxWidth: "90%" }}>
          {props.item.name} {props.item.quantity.count}
          {props.item.quantity.type}
        </Text>
        <Text text70>₹ {props.item.price.mrp}/-</Text>
      </View>
      {props.add ? (
        <TouchableOpacity paddingR-10 onPress={props.onAdd}>
          <AntDesign
            name="plus"
            size={Sizes.icon.normal}
            color={Colors.$iconPrimary}
          />
        </TouchableOpacity>
      ) : (
        <Counter
          item={props.item}
          data={props.data}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          editCount={props.editCount}
          showEdit={props.showEdit}
        />
      )}
    </View>
  );
}

interface ISearch {
  value: string;
  setValue: any;
}

function SearchBar(props: ISearch) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        padding: 10,
        backgroundColor: Colors.$backgroundDisabled + "77",
        marginBottom: 15,
      }}
    >
      <TextInput
        autoFocus={true}
        value={props.value}
        placeholder={"Search Products"}
        onChangeText={(text) => props.setValue(text)}
        selectionColor={Colors.$iconPrimary}
        style={{
          flex: 1,
          fontSize: Sizes.font.text,
        }}
      />
      {props.value.trim().length > 0 && (
        <View row center style={{ backgroundColor: "transparent" }}>
          <TouchableOpacity
            onPress={() => props.setValue("")}
            style={{ marginRight: 15 }}
          >
            <AntDesign name="close" size={Sizes.icon.normal} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // do something
            }}
            disabled={props.value.trim().length > 0 ? false : true}
          >
            <AntDesign
              name="arrowright"
              size={Sizes.icon.normal}
              color={
                props.value.trim().length > 0
                  ? Colors.$iconPrimary
                  : Colors.$backgroundDisabled
              }
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

interface IConfirmChanges {
  visible: boolean;
  setVisible: any;
  length: number;
  discard: any;
  confirm: any;
}

function ConfirmChanges(props: IConfirmChanges) {
  return (
    <Dialog
      bottom={true}
      visible={props.visible}
      onDismiss={() => props.setVisible(false)}
      panDirection={PanningProvider.Directions.DOWN}
      containerStyle={{
        backgroundColor: Colors.$backgroundDefault,
        marginBottom: Constants.isIphoneX ? 0 : 20,
        borderRadius: 12,
      }}
      ignoreBackgroundPress={false}
    >
      <View spread>
        <View marginT-20 marginH-20>
          <Text $textDefault text60>
            Confirm
          </Text>
          <View
            center
            marginT-10
            style={{
              height: 1,
              width: "100%",
              backgroundColor: Colors.$backgroundDarkElevated,
            }}
          />
          <Text text70 $textDefault marginT-10>
            Confirm editing inventory with {props.length} products?
          </Text>
          <View margin-15 marginH-0 right w-100 spread row>
            <Button
              padding-5
              paddingL-0
              text70
              $textDefault
              label="Discard Changes"
              link
              onPress={props.discard}
            />
            <Button
              label={"Confirm"}
              size={Button.sizes.small}
              backgroundColor={Colors.$backgroundDarkElevated}
              round={false}
              text70
              padding-5
              borderRadius={5}
              onPress={props.confirm}
            />
          </View>
        </View>
      </View>
    </Dialog>
  );
}

export default function EditInventory({
  navigation,
}: RootStackScreenProps<"EditInventory">) {
  const [edited, setEdited] = useState<Array<ProductProps>>([]);
  const [searched, setSearched] = useState<{
    i: Array<ProductProps>;
    p: Array<ProductProps>;
  }>({ i: [], p: [] });

  const [search, setSearch] = useState<string>("");
  const [mVisible, setMVisible] = useState<boolean>(false);

  const { inventory } = useSelector((state: any) => state.inventoryReducer);

  function addToEdited(item: ProductProps) {
    const items = [...edited];
    var newItems: Array<ProductProps> = [];
    var i = items.findIndex((e) => e.id === item.id);
    if (i <= -1) {
      newItems = [{ ...item, quantity: { ...item.quantity, units: 1 } }].concat(
        items
      );
    } else {
      var q = items[i].quantity.units + 1;
      items.splice(i, 1);
      newItems = [{ ...item, quantity: { ...item.quantity, units: q } }].concat(
        items
      );
    }
    setEdited(newItems);
  }

  function removeFromEdited(item: ProductProps) {
    const items = [...edited];
    var i = items.findIndex((e) => e.id === item.id);

    if (i > -1) {
      var u = items[i].quantity.units - 1;

      if (u > 0) {
        items.splice(i, 1);
        var newItems = [
          { ...item, quantity: { ...item.quantity, units: u } },
        ].concat(items);
        setEdited(newItems);
      } else {
        items.splice(i, 1);
        setEdited(items);
      }
    }
  }

  const [edit, { loading: editing }] = useMutation(ADD_INVENTORY, {
    variables: {
      products: edited,
    },
    onCompleted(data) {
      if (data.addToInventory) {
        setMVisible(false);
        navigation.navigate("Root");
      }
    },
    onError(error) {
      console.log(edited);
      console.log({ ...error });
    },
  });

  const [lookup, { loading: searching }] = useLazyQuery(SEARCH_PRODUCTS, {
    variables: {
      name: search,
      limit: 10,
    },
    onCompleted(data) {
      if (data.getProducts) {
        var inv = inventory.filter((p: ProductProps) => p.name === search);
        setSearched({ i: inv, p: data.getProducts });
      }
    },
    onError(error) {
      console.log({ ...error });
    },
  });

  useEffect(() => {
    if (search.length > 2) {
      lookup({
        variables: {
          name: search,
          limit: 10,
        },
      });
    } else {
      setSearched({ ...searched, i: [] });
    }
  }, [search]);

  if (editing) {
    return (
      <View flex center>
        <BoldText text70>Editing inventory...</BoldText>
      </View>
    );
  }

  return (
    <Screen>
      <Header title="Inventory" onBack={() => navigation.navigate("Root")} />
      {edited.length > 0 && (
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
          onPress={() => setMVisible(true)}
        >
          <MaterialCommunityIcons
            name="check"
            color={Colors.white}
            size={Sizes.icon.header}
          />
        </TouchableOpacity>
      )}
      <ConfirmChanges
        visible={mVisible}
        setVisible={setMVisible}
        length={edited.length}
        discard={() => {
          setMVisible(false);
          setEdited([]);
        }}
        confirm={() =>
          edit({
            variables: {
              products: edited,
            },
          })
        }
      />
      <SearchBar value={search} setValue={setSearch} />
      <FlatList
        listKey="0104030239"
        showsHorizontalScrollIndicator={false}
        key={"100005"}
        data={[1]}
        keyExtractor={(item: number) => item.toString()}
        renderItem={() => (
          <>
            {edited.length > 0 && (
              <Section
                title="Edited products"
                body={
                  <FlatList
                    listKey="0104030234"
                    data={edited}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <InventoryProduct
                        item={item}
                        data={edited}
                        onAdd={() => addToEdited(item)}
                        onRemove={() => removeFromEdited(item)}
                        editCount={true}
                      />
                    )}
                  />
                }
              />
            )}
            {searched.p.length < 1 && (
              <Section
                title="Your Inventory"
                body={
                  <FlatList
                    listKey="0104030235"
                    data={searched.i.length > 0 ? searched.i : inventory}
                    keyExtractor={(item: ProductProps) => item.id}
                    renderItem={({ item }) => (
                      <InventoryProduct
                        item={item}
                        data={inventory}
                        onAdd={() => addToEdited(item)}
                        onRemove={() => removeFromEdited(item)}
                        editCount={false}
                      />
                    )}
                  />
                }
              />
            )}
            <Section
              title="More products"
              body={
                <FlatList
                  listKey="0104030236"
                  data={searched.p}
                  style={{ marginBottom: 100 }}
                  keyExtractor={(item: ProductProps) => item.id}
                  renderItem={({ item }) => (
                    <InventoryProduct
                      item={item}
                      data={inventory}
                      onAdd={() => addToEdited(item)}
                      onRemove={() => removeFromEdited(item)}
                      editCount={true}
                      add={true}
                    />
                  )}
                />
              }
            />
          </>
        )}
      />
    </Screen>
  );
}
