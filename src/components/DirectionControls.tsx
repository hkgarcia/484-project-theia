import { Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    StopCircle,
} from "lucide-react-native";

interface DirectionControlsProps {
    onDirectionChange: (direction: string) => void;
    currentDirection: string;
}

export function DirectionControls({
    onDirectionChange,
    currentDirection,
}: DirectionControlsProps) {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.row}>
                <DirectionButton
                    direction="left"
                    icon={<ArrowLeft size={40} color="white" />}
                    label="Turn Left"
                    isActive={currentDirection === "left"}
                    onPress={() => onDirectionChange("left")}
                />

                <DirectionButton
                    direction="forward"
                    icon={<ArrowUp size={40} color="white" />}
                    label="Go Forward"
                    isActive={currentDirection === "forward"}
                    onPress={() => onDirectionChange("forward")}
                />

                <DirectionButton
                    direction="right"
                    icon={<ArrowRight size={40} color="white" />}
                    label="Turn Right"
                    isActive={currentDirection === "right"}
                    onPress={() => onDirectionChange("right")}
                />
            </SafeAreaView>

            <SafeAreaView style={styles.stopContainer}>
                <DirectionButton
                    direction="stop"
                    icon={<StopCircle size={40} color="white" />}
                    label="Stop Navigation"
                    isActive={currentDirection === "stop"}
                    onPress={() => onDirectionChange("stop")}
                    isStop
                />
            </SafeAreaView>
        </SafeAreaView>
    );
}

interface DirectionButtonProps {
    direction: string;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onPress: () => void;
    isStop?: boolean;
}

function DirectionButton({
    icon,
    label,
    isActive,
    onPress,
    isStop = false,
}: DirectionButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.button,
                isActive
                    ? isStop
                        ? styles.activeStop
                        : styles.active
                    : isStop
                        ? styles.stop
                        : styles.default,
            ]}
        >
            {icon}
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    stopContainer: {
        marginTop: 16,
    },

    button: {
        flex: 1,
        paddingVertical: 20,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    default: {
        backgroundColor: "#222237",
    },
    active: {
        backgroundColor: "#2563eb", // blue-600
    },
    stop: {
        backgroundColor: "#2d2d45",
    },
    activeStop: {
        backgroundColor: "#dc2626", // red-600
    },

    label: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
});