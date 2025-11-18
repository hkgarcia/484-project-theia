import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

export default function EmergencyScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.text}>TODO: Emergency Screen</Text>
             
            <Text style={styles.text} onPress={() => router.back()}> Click to go home </Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f0f15',
    },

    text: {
        color: 'white',
    }
});
