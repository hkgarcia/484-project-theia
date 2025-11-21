import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// custom components
import { NavigateButton } from "../components/NavigateButton";
import { EmergencyButton } from "../components/EmergencyButton";
import { GlobalVoiceListener } from '../components/GlobalVoiceListener';
import TabBar from "../components/TabBar";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>

      {/* main button components */}
      <View style={styles.main}>
        <NavigateButton />
        <EmergencyButton />
      </View>

       <GlobalVoiceListener />

      {/* new tab bar */}
      <TabBar />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f15',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
