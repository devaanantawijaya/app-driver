import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const route = [
  { lat: -8.357375, lng: 114.629832 },
  { lat: -8.357526, lng: 114.631704 },
  { lat: -8.357704, lng: 114.633592 },
  { lat: -8.358118, lng: 114.634967 },
  { lat: -8.358713, lng: 114.636694 },
  { lat: -8.359358, lng: 114.638631 },
  { lat: -8.360343, lng: 114.641347 },
  { lat: -8.361059, lng: 114.643646 },
  { lat: -8.361614, lng: 114.645782 },
  { lat: -8.362134, lng: 114.647713 },
  { lat: -8.362601, lng: 114.649509 },
  { lat: -8.362886, lng: 114.650374 },
  { lat: -8.363236, lng: 114.651494 },
  { lat: -8.363585, lng: 114.652662 },
  { lat: -8.364118, lng: 114.654331 },
  { lat: -8.364559, lng: 114.655810 },
];

export default function Peta() {
  const [index, setIndex] = useState(0);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    if (index < route.length - 1) {
      const current = route[index];
      const next = route[index + 1];
      const angle = calculateBearing(current, next);
      setHeading(angle);

      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: route[0].lat,
          longitude: route[0].lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        camera={{
          center: {
            latitude: route[index].lat,
            longitude: route[index].lng,
          },
          heading: heading,
          pitch: 0,
          zoom: 17,
        }}
      >
        <Marker
          coordinate={{
            latitude: route[index].lat,
            longitude: route[index].lng,
          }}
        >
          <View style={styles.markerWrapper}>
            <Text style={[styles.arrow, { transform: [{ rotate: `0deg` }] }]}>
              ▲
            </Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

function calculateBearing(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
) {
  const lat1 = (from.lat * Math.PI) / 180;
  const lon1 = (from.lng * Math.PI) / 180;
  const lat2 = (to.lat * Math.PI) / 180;
  const lon2 = (to.lng * Math.PI) / 180;
  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  const bearing = (Math.atan2(y, x) * 180) / Math.PI;
  return (bearing + 360) % 360;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: 50,
    color: "blue",
  },
});
