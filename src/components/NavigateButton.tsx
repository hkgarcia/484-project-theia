import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export function NavigateButton() {
    const router = useRouter();
    const handlePress = () => {
        console.log('Routing to navigate page');
        router.push('/(navigate)');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.heading}>NAVIGATE</Text>
                <Text style={styles.subheading}>Find your way around</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        width: '100%',
        backgroundColor: '#222237',
        color: '#ffffff',
        padding: 60,
        paddingVertical: 90,
        borderRadius: 30,
        alignItems: 'center',
    },

    heading: {
        fontSize: 60,
        color: '#ffffff',
        fontWeight: 'bold',
    },

    subheading: {
        fontSize: 20,
        color: '#ffffff',
    },

});