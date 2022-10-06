// import { useEffect, useState } from "react";
// import { Button, StyleSheet } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import { Text, View } from "../components/Themed";
// import { RootTabScreenProps } from "../types";

// export default function Scanner({ navigation }: RootTabScreenProps<"Scanner">) {
//   const [code, setCode] = useState<string | null>(null);

//   useEffect(() => {
//     if (code) {
//       navigation.navigate("Edit");
//     }
//   }, [code]);

//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getBarCodeScannerPermissions();
//   }, []);

//   const handleBarCodeScanned = ({ data }: { data: string }) => {
//     setScanned(true);
//     setCode(data);
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
