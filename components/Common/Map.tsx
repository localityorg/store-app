import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import useColorScheme from "../../hooks/useColorScheme";
import * as Location from "expo-location";
import { CommonStyles } from "./Styles";
import { View } from "../Themed";
import { BoldText } from "./Text";
import { lightMapStyle } from "../../constants/MapStyle";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../../redux/Common/actions";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native-ui-lib";
import { TouchableOpacity } from "react-native";
import Sizes from "../../constants/Sizes";

interface MapProps {
  handleLocation?: any;
  location?: any;
  track?: boolean;
}

export function Map(props: MapProps) {
  const colorScheme = useColorScheme();
  const dispatch: any = useDispatch();

  const mapRef = useRef<MapView>(null);

  const [permission, setPermission] = useState<string | null>(null);

  const { location } = useSelector((state: any) => state.locationReducer);
  // const { origin, destination } = useSelector(
  //   (state: any) => state.tripReducer
  // );

  const askForLocationPermission = () => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      setPermission(status ? "granted" : "denied");

      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        dispatch(
          setUserLocation({
            latitude: location.coords.latitude.toString(),
            longitude: location.coords.longitude.toString(),
          })
        );
      }
    })();
  };

  useEffect(() => {
    if (location === null) {
      askForLocationPermission();
    }
  }, [location]);

  // useEffect(() => {
  //   if (!origin && !destination) return;
  //   else {
  //     mapRef.current?.fitToSuppliedMarkers(["origin", "destination", "rider"], {
  //       edgePadding: { top: 10, left: 10, right: 10, bottom: 10 },
  //     });
  //   }
  // }, [origin, destination]);

  if (permission !== "granted") {
    return (
      <View flex center>
        <BoldText style={{ width: "60%" }}>
          Permission not granted. Enable location permission to view map.
        </BoldText>
        <TouchableOpacity
          onPress={() => askForLocationPermission()}
          style={{ marginTop: 10 }}
        >
          <AntDesign
            name="reload1"
            size={Sizes.icon.header}
            color={Colors.$iconPrimary}
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (location === null) {
    return (
      <View flex center>
        <BoldText>Loading map...</BoldText>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: parseFloat(location?.latitude),
          longitude: parseFloat(location?.longitude),
          latitudeDelta: 0.0011,
          longitudeDelta: 0.0018,
        }}
        provider={PROVIDER_DEFAULT}
        customMapStyle={colorScheme === "light" ? lightMapStyle : lightMapStyle}
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={{ flex: 1, zIndex: 999 }}
        onRegionChangeComplete={(e) => {
          dispatch(
            setUserLocation({
              latitude: e.latitude.toString(),
              longitude: e.longitude.toString(),
            })
          );
        }}
      >
        {/* {props.track && (
        <>
          <Marker
            identifier="origin"
            coordinate={{
              latitude: parseFloat(origin.location.latitude),
              longitude: parseFloat(origin.location.longitude),
            }}
          />
          <Marker
            identifier="destination"
            coordinate={{
              latitude: parseFloat(destination.location.latitude),
              longitude: parseFloat(destination.location.longitude),
            }}
          />
        </>
      )} */}
        {/* <Marker
          identifier="user"
          
          coordinate={{
            latitude: parseFloat(userLocation.latitude),
            longitude: parseFloat(userLocation.longitude),
          }}
        /> */}
      </MapView>
      <View
        style={{
          zIndex: 999,
          backgroundColor: "transparent",
          position: "absolute",
          top: "42.7%",
          left: "45%",
        }}
      >
        <Ionicons name="location-sharp" color={Colors.primary} size={35} />
      </View>
    </View>
  );
}
