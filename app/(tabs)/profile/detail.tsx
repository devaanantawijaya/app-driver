import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BusStackParamsList } from "./bus-stack";

const DetailBus = () => {
  const { params } = useRoute<RouteProp<BusStackParamsList, "detail">>();
  return (
    <View>
      <Text style={styles.text}>ini detailBus: {params.id}-{params.driver}</Text>
    </View>
  );
};

export default DetailBus;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
