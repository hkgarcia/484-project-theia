import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, Pressable, Animated, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertTriangle } from "lucide-react-native";

interface CollisionAlertProps {
    onDismiss: () => void;
    message?: string;
}

export function CollisionAlert({ onDismiss, message }: CollisionAlertProps) {

    const pulse = useRef(new Animated.Value(1)).current;

    // Simulate pulse animation
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1.1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.overlay}>
            <Animated.View style={[styles.card, { transform: [{ scale: pulse }] }]}>
                <View style={styles.iconContainer}>
                    <AlertTriangle size={48} color="white" />
                </View>

                <Text style={styles.title}>CAUTION</Text>

                <Text style={styles.message}>
                    {message ?? "Obstacle detected ahead. Be aware."}
                </Text>

                <Pressable style={styles.button} onPress={onDismiss}>
                    <Text style={styles.buttonText}>I Understand</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    card: {
        width: "85%",
        backgroundColor: "#DC2626", // red-600
        padding: 24,
        borderRadius: 16,
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    message: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "white",
        paddingVertical: 14,
        borderRadius: 10,
    },
    buttonText: {
        color: "#DC2626",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});