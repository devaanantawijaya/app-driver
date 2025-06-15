import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { BusStackParamsList } from "./bus-stack";
import { NavigationProp } from "@react-navigation/native";

const BusScreen = () => {
  const navigation = useNavigation<NavigationProp<BusStackParamsList>>();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("detail", {id: "1", driver: "A"})}>
        <Text style={styles.text}>ini Profile</Text>
      </Pressable>
    </View>
  );
};

export default BusScreen;

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});
