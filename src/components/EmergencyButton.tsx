import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function EmergencyButton() {
    const router = useRouter();
    const handlePress = () => {
        console.log('Routing to emergency page');
        router.push('/(emergency)');
    }

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <FontAwesome name="exclamation-triangle" size={30} color="white" />
            <Text style={styles.text}>EMERGENCY</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        width: '100%',
        maxWidth: 350,
        paddingVertical: 35,
        backgroundColor: 'red',
        borderRadius: 60,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        marginLeft: 20
    },
});
