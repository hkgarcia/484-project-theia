import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Mic } from 'lucide-react-native';
import { useRouter } from 'expo-router';



export function GlobalVoiceListener() {

    const [isListening, setIsListening] = useState(false);
    const [isMinimized, setIsMinimized] = useState(true);
    const router = useRouter();

    const toggleListener = () => {
        setIsListening(!isListening);
        setIsMinimized(false);
    };

    // for voice commands:
    // const handleCommand = (command: string) => {
    //     if (command.includes('navigate') || command.includes('go to')) {
    //         router.navigate('Navigation');
    //     } else if (command.includes('emergency') || command.includes('help')) {
    //         router.navigate('Emergency');
    //     } else if (command.includes('settings')) {
    //         router.navigate('Settings');
    //     } else if (command.includes('reminders')) {
    //         router.navigate('Reminders');
    //     }
    // };

    // Simulate voice recognition when active
    useEffect(() => {
        if (isListening) {
            const timer = setTimeout(() => {
                console.log('Listening for commands...');
                setIsMinimized(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isListening]);

    return (
        <View style={styles.container}>

            {!isMinimized && isListening && (
                <View style={styles.listeningBox}>
                    <Text style={styles.listeningTitle}>Listening...</Text>
                    <Text style={styles.listeningText}>Say a command like "Navigate to Room 302"</Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.micButton, isListening && styles.listeningPulse]}
                onPress={toggleListener}
                accessibilityLabel={isListening ? 'Stop listening' : 'Start voice commands'}
            >
                <Mic size={28} color="#fff" />
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100, // bottom-24
        right: 16,   // right-4
        alignItems: 'center',
        zIndex: 50,
    },
    listeningBox: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#222237',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: 250,
    },
    listeningTitle: {
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
        fontSize: 16,
    },
    listeningText: {
        color: '#ccc',
        fontSize: 12,
    },
    micButton: {
        padding: 16,
        borderRadius: 50,
        backgroundColor: '#222237',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    listeningPulse: {
        backgroundColor: '#2563EB',
    },
});