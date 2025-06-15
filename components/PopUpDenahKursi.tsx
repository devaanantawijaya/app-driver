import {
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface IPopUp {
  visible: boolean;
  onClose: () => void;
  viewDenahKursi: number[][] | undefined;
  selectedSeats: number[] | undefined;
  viewFiturBus: string[] | undefined;
}

export default function PopUpBus({
  visible,
  onClose,
  viewDenahKursi,
  selectedSeats,
  viewFiturBus,
}: IPopUp) {
  const iconsFitur = [
    {
      name: "AC",
      icon: (
        <MaterialCommunityIcons
          name="air-conditioner"
          size={30}
          color="black"
        />
      ),
    },
    {
      name: "Kipas",
      icon: <MaterialCommunityIcons name="fan" size={30} color="black" />,
    },
    {
      name: "Musik",
      icon: <Ionicons name="musical-notes" size={30} color="black" />,
    },
    {
      name: "Stop Kontak",
      icon: (
        <MaterialCommunityIcons name="power-plug" size={30} color="black" />
      ),
    },
    { name: "WiFi", icon: <Ionicons name="wifi" size={30} color="black" /> },
  ];
  const [selectNomorKursi, setSelectNomorKursi] = useState<string>("");
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={styles.modalContent}
          onPress={(e) => e.stopPropagation()}
          activeOpacity={1}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>KURSI YANG DIPESAN:</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Denah Kursi */}
          <ScrollView contentContainerStyle={{ gap: 8 }}>
            {viewDenahKursi?.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={[
                  styles.row,
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 8,
                  },
                ]}
              >
                {row.map((item, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const isSeat = item > 0;
                  const isTaken = selectedSeats?.includes(item);
                  const isSelected = item.toString() === selectNomorKursi;

                  if (item === -1 && colIndex > 0 && row[colIndex - 1] === -1) {
                    return null;
                  }

                  let style = styles.seat;
                  let content = item?.toString();
                  let isClickable = false;

                  if (item === -1) {
                    style = styles.driver;
                    content = "Driver";
                  } else if (item === 0) {
                    style = styles.empty;
                  } else if (isSeat) {
                    if (isTaken) {
                      style = styles.taken;
                    } else if (isSelected) {
                      style = styles.selected;
                      isClickable = true;
                    } else {
                      style = styles.available;
                      isClickable = true;
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={key}
                      style={style}
                      disabled={!isClickable}
                      onPress={() =>
                        isClickable && setSelectNomorKursi(item.toString())
                      }
                    >
                      <Text style={styles.seatText}>{content}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          {/* Fitur Bus */}
          <Text style={styles.fiturTitle}>FITUR BUS:</Text>
          <View style={styles.fiturContainer}>
            {iconsFitur.map((item) => {
              const isActive = viewFiturBus?.includes(item.name);
              return (
                <View
                  key={item.name}
                  style={[
                    styles.fiturIcon,
                    isActive ? styles.activeFitur : styles.inactiveFitur,
                  ]}
                >
                  {item.icon}
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    width: "90%",
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexWrap: "wrap",
  },
  seat: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  driver: {
    width: 80,
    height: 40,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  empty: {
    width: 40,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  available: {
    width: 40,
    height: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  selected: {
    width: 40,
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  taken: {
    width: 40,
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  seatText: {
    color: "white",
    fontWeight: "bold",
  },
  fiturTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  fiturContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  fiturIcon: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
  },
  activeFitur: {
    borderColor: "blue",
    color: "blue",
  },
  inactiveFitur: {
    borderColor: "gray",
    color: "gray",
  },
});
