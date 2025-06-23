import dataBus from "@/assets/data/dataBus.json";
import PopUpBus from "@/components/PopUpDenahKursi";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const renderDay = (day: string) => {
  if (day === "0") {
    return "Minggu";
  } else if (day === "1") {
    return "Senin";
  } else if (day === "2") {
    return "Selasa";
  } else if (day === "3") {
    return "Rabu";
  } else if (day === "4") {
    return "Kamis";
  } else if (day === "5") {
    return "Jumat";
  } else if (day === "6") {
    return "Sabtu";
  } else {
    return "Hari tidak valid";
  }
};

export default function HomeScreen() {
  // Custom Hook
  const { colors } = useTheme();
  const colorScheme = useColorScheme();
  const router = useRouter();

  // useState untuk tanggal yang dipilih
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("DD-MM-YYYY")
  );
  const [selectedJenisBus, setSelectedJenisBus] = useState<string | null>(null);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedPlatNomor, setSelectedPlatNomor] = useState<string | null>("");
  const [popUp, setPopUp] = useState(false);
  const [busJalan, setBusJalan] = useState(false);

  // Const/Let
  const selectJenisBus = selectedJenisBus?.split("_")[0] || null;
  const selectJumlahKursi = selectedJenisBus
    ? parseInt(selectedJenisBus.split("_")[1])
    : null;

  // Filter data bus berdasarkan nama bus untuk driver
  const dataBusByNamaBus = dataBus.data.find(
    (brand) =>
      brand.nama_bus.toLocaleLowerCase() === "Bahagia".toLocaleLowerCase() // masih contoh bus bahagia
  );
  const dataBusByTanggalBooking = dataBusByNamaBus?.booking[selectedDate];
  const jenisBusArray = Object.keys(dataBusByTanggalBooking ?? {}).map(
    (key) => {
      const [jenis, jumlah] = key.split("_");
      return [jenis, parseInt(jumlah)];
    }
  );
  const filteredBookingByJenisBus = selectedJenisBus
    ? dataBusByTanggalBooking?.[selectedJenisBus]
    : null;

  // Filter data bus berdasarkan jenis bus dan jumlah kursi di list bus
  const dataBusByJenisBusJumlahKursi = dataBusByNamaBus?.listBus.find(
    (bus) =>
      bus.jenisBus === selectJenisBus && bus.jumlahKursi === selectJumlahKursi
  );
  const viewPlatNomor = dataBusByJenisBusJumlahKursi?.platNomor;
  const viewDenahKursi = dataBusByJenisBusJumlahKursi?.denahKursi;
  const viewFiturBus = dataBusByJenisBusJumlahKursi?.fitur;

  // Handle
  const toggleRoute = (route: any) => {
    setExpandedRoute((prev) => (prev === route ? null : route));
  };
  const handleSelectTime = (route: any, time: any) => {
    setSelectedTime(time);
    setSelectedSeats(filteredBookingByJenisBus[route][time]);
  };

  return (
    <View style={[styles.container]}>
      <Text style={[{ color: colors.text, fontSize: 18, fontWeight: "900" }]}>
        ATUR PERJALANAN BUS
      </Text>

      {/* Pilih Tanggal */}
      <View>
        <Text
          style={[
            {
              color: colors.text,
              textAlign: "left",
              marginTop: 10,
              fontWeight: "bold",
            },
          ]}
        >
          Tanggal:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 8,
          }}
        >
          {[dayjs(), dayjs().add(1, "day"), dayjs().add(2, "day")].map(
            (tanggal) => (
              <Pressable
                key={tanggal.format("DD-MM-YYYY")}
                style={{
                  backgroundColor:
                    selectedDate === tanggal.format("DD-MM-YYYY")
                      ? "#35F9D1"
                      : "#25b498",
                  borderColor:
                    selectedDate === tanggal.format("DD-MM-YYYY")
                      ? colorScheme === "dark"
                        ? "white"
                        : "#1A443B"
                      : "#25b498",
                  borderWidth: 2,
                  flex: 1,
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => setSelectedDate(tanggal.format("DD-MM-YYYY"))}
              >
                <Text style={[{ color: "#1A443B", fontWeight: "600" }]}>
                  {renderDay(tanggal.format("d"))},
                </Text>
                <Text style={[{ color: "#1A443B", fontWeight: "600" }]}>
                  {tanggal.format("DD-MM-YYYY")}
                </Text>
              </Pressable>
            )
          )}
        </View>
      </View>

      {/* Pilih Jenis Bus */}
      <Text style={[{ color: colors.text, marginTop: 10 }]}>
        Pilih Jenis Bus:
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",

          gap: 10,
          marginTop: 10,
        }}
      >
        {jenisBusArray.map(([jenis, jumlah], index) => (
          <Pressable
            key={index}
            style={{
              backgroundColor:
                selectedJenisBus === `${jenis}_${jumlah}`
                  ? "#35F9D1"
                  : "#25b498",
              flex: 1,
              padding: 5,
              borderRadius: 5,
              borderColor:
                selectedJenisBus === `${jenis}_${jumlah}`
                  ? colorScheme === "dark"
                    ? "white"
                    : "#1A443B"
                  : "#25b498",
              borderWidth: 2,
            }}
            onPress={() => setSelectedJenisBus(`${jenis}_${jumlah}`)}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#1A443B" }}
            >
              {jenis.toString().toUpperCase()}
            </Text>
            <Text style={{ fontSize: 14, color: "#1A443B" }}>
              {jumlah} Kursi
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Isi Filter Booking*/}
      <Text style={[{ color: colors.text, marginTop: 10 }]}>
        Pilih Rute & Waktu Berangkat:
      </Text>
      <View style={{ marginBottom: 10 }}>
        {filteredBookingByJenisBus ? (
          <View>
            {Object.entries(filteredBookingByJenisBus).map(([route, times]) => (
              <View
                key={route}
                style={[
                  styles.routeContainer,
                  {
                    borderWidth: 2,
                    borderColor: colorScheme === "dark" ? "white" : "#1A443B",
                  },
                ]}
              >
                <Text onPress={() => toggleRoute(route)}>
                  <Text style={styles.routeTitle}>
                    {route} {expandedRoute === route ? "▲" : "▼"}
                  </Text>
                </Text>

                {expandedRoute === route &&
                  Object.entries(times ?? {}).map(([time, seats]) => {
                    const isSelected = selectedTime === time;
                    return (
                      <TouchableOpacity
                        key={time}
                        style={styles.timeRow}
                        onPress={() => handleSelectTime(route, time)}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Text style={styles.timeText}>{time}</Text>
                          <Text
                            onPress={() => {
                              setPopUp(true);
                              setSelectedSeats(
                                filteredBookingByJenisBus[route][time]
                              );
                            }}
                          >{`[Lihat Detail]`}</Text>
                        </View>
                        <View style={styles.radio}>
                          <View
                            style={[
                              styles.radioOuter,
                              isSelected && styles.radioOuterSelected,
                            ]}
                          >
                            {isSelected && <View style={styles.radioInner} />}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text
              style={[
                { color: colors.text, textAlign: "center", marginTop: 10 },
              ]}
            >
              -- Jenis Bus Belum Dipilih --
            </Text>
          </View>
        )}
      </View>

      {/* Pilih Bus */}
      <Text style={[{ color: colors.text }]}>Pilih Bus:</Text>
      <View style={{ marginBottom: 10 }}>
        {viewPlatNomor ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap", // <- penting untuk multi-baris
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            {viewPlatNomor?.map((plat, index) => (
              <Pressable
                key={index}
                style={{
                  width: "48%",
                  backgroundColor:
                    selectedPlatNomor === plat ? "#35F9D1" : "#25b498",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  borderColor:
                    selectedPlatNomor === plat
                      ? colorScheme === "dark"
                        ? "white"
                        : "#1A443B"
                      : "#25b498",
                  borderWidth: 2,
                }}
                onPress={() => setSelectedPlatNomor(plat)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#1A443B",
                  }}
                >
                  {plat}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View>
            <Text
              style={[
                { color: colors.text, textAlign: "center", marginTop: 10 },
              ]}
            >
              -- Jenis Bus Belum Dipilih --
            </Text>
          </View>
        )}
      </View>

      {/* Pop Up Kursi */}
      <PopUpBus
        visible={popUp}
        onClose={() => setPopUp(false)}
        selectedSeats={selectedSeats}
        viewDenahKursi={viewDenahKursi}
        viewFiturBus={viewFiturBus}
      />

      {/* Button Jalan Bus/Stop Bus */}
      <Pressable
        style={{
          marginTop: 10,
          backgroundColor:
            selectedDate && selectJenisBus && selectedTime && selectedPlatNomor
              ? "#35F9D1"
              : "#25b498",
          borderRadius: 5,
          borderColor:
            selectedDate && selectJenisBus && selectedTime && selectedPlatNomor
              ? colorScheme === "dark"
                ? "white"
                : "#1A443B"
              : "#25b498",
          borderWidth: 2,
        }}
        onPress={() => {
          setBusJalan(!busJalan);
          !busJalan && router.push("/peta");
        }}
        disabled={
          !selectedDate ||
          !selectJenisBus ||
          !selectedTime ||
          !selectedPlatNomor
        }
      >
        {busJalan ? (
          <Text
            style={[
              {
                textAlign: "center",
                color: "#1A443B",
                fontWeight: "900",
                padding: 10,
                fontSize: 16,
              },
            ]}
          >
            BUS STOP
          </Text>
        ) : (
          <Text
            style={[
              {
                textAlign: "center",
                color: "#1A443B",
                fontWeight: "900",
                padding: 10,
                fontSize: 16,
              },
            ]}
          >
            BUS JALAN
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingLeft: 30, paddingRight: 30 },
  routeContainer: {
    marginTop: 10,
    backgroundColor: "#35F9D1",
    borderRadius: 5,
    padding: 10,
  },
  routeTitle: {
    fontSize: 16,
    color: "#1A443B",
    fontWeight: "900",
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#444",
  },
  timeText: {
    fontSize: 16,
    color: "#1A443B",
    fontWeight: "500",
  },
  radio: {
    paddingRight: 10,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#31574f",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#1A443B",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1A443B",
  },
  selectedInfo: {
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
  },
});
