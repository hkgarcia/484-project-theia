import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { GlobalVoiceListener } from '../../components/GlobalVoiceListener';

export default function SettingsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    accessibilityLabel="Go back to home screen"
                >
                    <ArrowLeft size={28} color="#fff" style={{ marginRight: 8 }} onPress={() => router.back()} />
                    <Text style={styles.headerText}>Settings</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={styles.main}>
                <SettingButton
                    label="Voice Settings"
                    description="Adjust voice feedback volume and speed"
                />
                <SettingButton
                    label="Navigation Preferences"
                    description="Set route preferences and walking speed"
                />
                <SettingButton
                    label="Caretaker Access"
                    description="Manage caretaker access and permissions"
                />
                <SettingButton
                    label="Accessibility Options"
                    description="Configure additional accessibility features"
                />
            </ScrollView>

            {/* Global Voice Listener */}
            <GlobalVoiceListener />

        </SafeAreaView>
    );
}

interface SettingButtonProps {
    label: string;
    description: string;
}

function SettingButton({ label, description }: SettingButtonProps) {
    return (
        <TouchableOpacity style={styles.button} accessibilityLabel={label}>
            <Text style={styles.buttonLabel}>{label}</Text>
            <Text style={styles.buttonDescription}>{description}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f15',
    },
    header: {
        width: '100%',
        padding: 16,
        backgroundColor: '#222237',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    main: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 16,
        gap: 16, // RN 0.71+ supports gap in flex layouts
    },
    button: {
        width: '100%',
        padding: 24,
        backgroundColor: '#222237',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff',
    },
    buttonDescription: {
        fontSize: 14,
        color: '#ccc',
    },
});

