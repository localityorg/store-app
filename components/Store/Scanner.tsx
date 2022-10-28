import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BoldText } from "../Common/Text";
import { View } from "../Themed";

import { Camera } from "expo-camera";
import Sizes from "../../constants/Sizes";

interface ScannerProps {
  code: string | undefined;
  setCode: any;
}

const barCodeTypes = [
  BarCodeScanner.Constants.BarCodeType.aztec,
  BarCodeScanner.Constants.BarCodeType.codabar,
  BarCodeScanner.Constants.BarCodeType.code39,
  BarCodeScanner.Constants.BarCodeType.code93,
  BarCodeScanner.Constants.BarCodeType.code128,
  BarCodeScanner.Constants.BarCodeType.code39mod43,
  BarCodeScanner.Constants.BarCodeType.datamatrix,
  BarCodeScanner.Constants.BarCodeType.ean13,
  BarCodeScanner.Constants.BarCodeType.ean8,
  BarCodeScanner.Constants.BarCodeType.interleaved2of5,
  BarCodeScanner.Constants.BarCodeType.itf14,
  BarCodeScanner.Constants.BarCodeType.maxicode,
  BarCodeScanner.Constants.BarCodeType.pdf417,
  BarCodeScanner.Constants.BarCodeType.rss14,
  BarCodeScanner.Constants.BarCodeType.rssexpanded,
  BarCodeScanner.Constants.BarCodeType.upc_a,
  BarCodeScanner.Constants.BarCodeType.upc_e,
  BarCodeScanner.Constants.BarCodeType.upc_ean,
];

export default function Scanner(props: ScannerProps) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (props.code !== undefined) {
      setScanned(false);
    }
  }, [props.code]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    props.setCode(data);
    // console.log(data);
  };

  if (hasPermission === null) {
    return (
      <View flex center>
        <BoldText>Requesting for camera permission</BoldText>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View flex center>
        <BoldText>No access to camera</BoldText>
      </View>
    );
  }

  return (
    <Camera
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      type={0}
      focusable
      barCodeScannerSettings={{
        barCodeTypes: barCodeTypes,
      }}
      style={{
        height: 900,
        width: 680,
      }}
    />
  );
}
