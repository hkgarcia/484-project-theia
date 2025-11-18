import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// custom components
import { NavigateButton } from "../../components/NavigateButton";
import { EmergencyButton } from "../../components/EmergencyButton";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>

        {/* main button components */}
        <NavigateButton />
        <EmergencyButton />
        
      </View>
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
  }
});
