import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mic, X } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function VoiceCommands() {
    const router = useRouter();

    const [isListening, setIsListening] = useState(true);
    const [transcript, setTranscript] = useState('');

    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Pulse animation for the mic
    useEffect(() => {
        if (isListening) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.2,
                        duration: 700,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isListening]);

    // Simulate voice recognition
    useEffect(() => {
        if (isListening) {
            const timer = setTimeout(() => {
                setTranscript('Listening for commands...');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isListening]);

    const handleClose = () => {
        router.back();
    };


    return (
        <SafeAreaView style={styles.container}>

            {/* Close button */}
            <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
                accessibilityLabel="Close microphone"
            >
                <X size={32} color="#fff" />
            </TouchableOpacity>

            {/* Main content */}
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.micContainer,
                        { transform: [{ scale: pulseAnim }] },
                        isListening ? styles.micActive : styles.micInactive,
                    ]}
                >
                    <Mic size={80} color="#fff" />
                </Animated.View>

                <Text style={styles.transcript}>{transcript}</Text>

                <TouchableOpacity
                    onPress={() => setIsListening(!isListening)}
                    style={styles.listenButton}
                >
                    <Text style={styles.listenButtonText}>
                        {isListening ? 'Stop Listening' : 'Start Listening'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // fills the screen
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 12,
        backgroundColor: '#222237',
        borderRadius: 50,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    micContainer: {
        padding: 32,
        borderRadius: 100,
        marginBottom: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    micActive: {
        backgroundColor: '#3B82F6', // blue-500
    },
    micInactive: {
        backgroundColor: '#6B7280', // gray-500
    },
    transcript: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        maxWidth: 250,
    },
    listenButton: {
        marginTop: 32,
        paddingVertical: 16,
        paddingHorizontal: 32,
        backgroundColor: '#222237',
        borderRadius: 50,
    },
    listenButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
