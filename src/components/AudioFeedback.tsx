import { Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState } from "react";
import { Volume2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AudioFeedbackProps {
    message: string;
}

export function AudioFeedback({ message }: AudioFeedbackProps) {

    const [isPlaying, setIsPlaying] = useState(false);
    const progress = new Animated.Value(0);

    // Simulate audio playing when message changes
    useEffect(() => {
        if (message) {
            setIsPlaying(true);

            progress.setValue(0);

            Animated.timing(progress, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
            }).start(() => {
                setIsPlaying(false);
            });
        }
    }, [message]);

    if (!message) return null;

    const widthInterpolation = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.card}>
                <SafeAreaView style={styles.row}>
                    <SafeAreaView style={[styles.iconContainer, isPlaying && styles.iconPlaying]}>
                        <Volume2 size={24} color="white" />
                    </SafeAreaView>
                    <Text style={styles.title}>Audio Guidance</Text>
                </SafeAreaView>

                <Text style={styles.message}>{message}</Text>

                <SafeAreaView style={styles.progressBar}>
                    <Animated.View
                        style={[styles.progressFill, { width: widthInterpolation }]}
                    />
                </SafeAreaView>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#222237",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#444",
  },
  iconPlaying: {
    backgroundColor: "#3B82F6", // blue-600
  },
  title: {
    marginLeft: 12,
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  message: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#1A1A2D",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
  },
});