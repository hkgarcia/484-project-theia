import { View, Pressable, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// moving from Tabs to custom tab bar component
export default function BottomTabs() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => router.push("/settings")}>
        <FontAwesome name="gear" size={40} color="#222237" />
        <Text style={styles.label}>Settings</Text>
      </Pressable>

      <Pressable style={styles.tab} onPress={() => router.push("/voice")}>
        <FontAwesome name="microphone" size={40} color="#222237" />
        <Text style={styles.label}>Voice</Text>
      </Pressable>

      <Pressable style={styles.tab} onPress={() => router.push("/reminders")}>
        <FontAwesome name="clock-o" size={40} color="#222237" />
        <Text style={styles.label}>Reminders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    margin: 0,
    padding: 0,
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 70,

    borderTopWidth: 1,
    borderColor: "#eee",
  },

  tab: {
    alignItems: "center",
  },

  label: {
    fontSize: 20,
    color: "#222237",
    paddingTop: 8,
  },
});
