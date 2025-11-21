import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, AlertTriangle, Phone, MapPin, Mic, X } from "lucide-react-native";

// custom components
import { GlobalVoiceListener } from "@/components/GlobalVoiceListener";

export default function EmergencyPage() {
    const router = useRouter();

    // TODO: implement backend and real data for emergency handling
    // static data used instead
    const [emergencyType, setEmergencyType] = useState("Fall Detected");
    const [location, setLocation] = useState("Room 302 - Mathematics Building");
    const [isAlertSent, setIsAlertSent] = useState(false);
    const [showCaretakerView, setShowCaretakerView] = useState(false);
    const [isRecordingMessage, setIsRecordingMessage] = useState(false);

    // simulate emergency alert sent (after 3 seconds - dummy)
    useEffect(() => {
        const timer = setTimeout(() => setIsAlertSent(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.headerBackButton}
                >
                    <ArrowLeft size={28} color="white" />
                    <Text style={styles.headerTitle}>Emergency</Text>
                </Pressable>

                <Pressable
                    onPress={() => setShowCaretakerView(!showCaretakerView)}
                    style={styles.caretakerToggle}
                >
                    <Text style={styles.caretakerToggleText}>
                        {showCaretakerView ? "User View" : "Caretaker View"}
                    </Text>
                </Pressable>
            </View>

            {/* user view */}
            {!showCaretakerView ? (
                <View style={styles.contentWrapper}>
                    {/* main alert card */}
                    <View style={styles.alertCard}>
                        <AlertTriangle
                            size={64}
                            color="white"
                            style={{ alignSelf: "center", marginBottom: 16 }}
                        />
                        <Text style={styles.alertTitle}>Emergency Alert</Text>
                        <Text style={styles.alertType}>{emergencyType}</Text>

                        {/* sending status */}
                        <View style={styles.sendStatusWrapper}>
                            <View
                                style={[
                                    styles.sendStatusBubble,
                                    isAlertSent ? styles.sent : styles.sending,
                                ]}
                            >
                                <Text style={styles.sendStatusText}>
                                    {isAlertSent ? "Alert Sent" : "Sending..."}
                                </Text>
                            </View>
                        </View>

                        {/* info */}
                        <Text style={styles.instructionText}>
                            Help is on the way. Stay calm and remain where you are.
                        </Text>

                        {/* call and message buttons */}
                        <View style={styles.actionRow}>
                            <Pressable style={styles.actionButton}>
                                <Phone size={24} color="#B00020" />
                                <Text style={styles.actionButtonText}>Call</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setIsRecordingMessage(true)}
                                style={styles.actionButton}
                            >
                                <Mic size={24} color="#B00020" />
                                <Text style={styles.actionButtonText}>Message</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* recording modal */}
                    {isRecordingMessage && (
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalBox}>
                                <TouchableOpacity
                                    onPress={() => setIsRecordingMessage(false)}
                                    style={styles.modalClose}
                                >
                                    <X size={24} color="white" />
                                </TouchableOpacity>

                                <Text style={styles.modalTitle}>Record Message</Text>

                                <View style={styles.micPulseContainer}>
                                    <View style={styles.micPulse}>
                                        <Mic size={40} color="white" />
                                    </View>
                                </View>

                                <Text style={styles.modalDescription}>
                                    Recording... Speak clearly to describe your situation.
                                </Text>

                                <Pressable style={styles.modalSendButton}>
                                    <Text style={styles.modalSendText}>Send Message</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}

                    {/* location */}
                    <View style={styles.locationCard}>
                        <View style={styles.locationHeader}>
                            <MapPin size={24} color="#FF4B4B" style={{ marginRight: 8 }} />
                            <Text style={styles.locationTitle}>Your Location</Text>
                        </View>

                        <Text style={styles.locationText}>{location}</Text>

                        <View style={styles.locationMap}>
                            <Text style={{ color: "#888" }}>Map location data</Text>
                        </View>
                    </View>
                </View>

            ) : (
                // caretaker view
                <View style={styles.contentWrapper}>
                    <View style={styles.caretakerCard}>
                        <Text style={styles.caretakerHeader}>
                            Emergency Alert Received
                        </Text>

                        <View style={styles.caretakerAlertBox}>
                            <View style={styles.caretakerAlertRow}>
                                <AlertTriangle size={20} color="white" />
                                <Text style={styles.caretakerAlertText}>
                                    {emergencyType}
                                </Text>
                            </View>
                            <Text style={styles.caretakerText}>
                                Detected at 10:42 AM
                            </Text>
                        </View>

                        <Text style={styles.sectionLabel}>Student Information:</Text>
                        <Text style={styles.caretakerText}>Name: Alex Johnson</Text>
                        <Text style={styles.caretakerText}>ID: 12345678</Text>
                        <Text style={styles.caretakerText}>Medical Conditions: None</Text>

                        <Text style={[styles.sectionLabel, { marginTop: 12 }]}>
                            Location:
                        </Text>
                        <Text style={styles.caretakerText}>{location}</Text>

                        {/* map view */}
                        <View style={styles.caretakerMap}>
                            <Text style={{ color: "#888" }}>Detailed map view</Text>
                        </View>

                        {/* respond and call buttons */}
                        <View style={styles.caretakerActions}>
                            <Pressable style={styles.caretakerButtonGreen}>
                                <Text style={styles.caretakerButtonText}>Respond</Text>
                            </Pressable>
                            <Pressable style={styles.caretakerButtonBlue}>
                                <Text style={styles.caretakerButtonText}>Call Student</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

            <GlobalVoiceListener />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f15",
    },

    /* header */
    header: {
        padding: 16,
        backgroundColor: "#B00020",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerBackButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 22,
        marginLeft: 8,
        fontWeight: "bold",
        color: "white",
    },
    caretakerToggle: {
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    caretakerToggleText: {
        color: "#B00020",
        fontWeight: "bold",
    },
    contentWrapper: {
        flex: 1,
        padding: 20,
        gap: 20,
    },

    /* alert card */
    alertCard: {
        backgroundColor: "#B00020",
        padding: 20,
        borderRadius: 16,
    },
    alertTitle: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
        color: "white",
    },
    alertType: {
        textAlign: "center",
        fontSize: 22,
        marginBottom: 16,
        color: "white",
    },

    sendStatusWrapper: {
        alignItems: "center",
        marginBottom: 16,
    },
    sendStatusBubble: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sent: { backgroundColor: "#22C55E" },
    sending: { backgroundColor: "#FACC15" },
    sendStatusText: { fontWeight: "bold", color: "white" },

    instructionText: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
        marginBottom: 12,
    },
    actionRow: {
        flexDirection: "row",
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: "white",
        height: 54,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    actionButtonText: {
        marginLeft: 8,
        fontWeight: "bold",
        color: "#B00020",
        fontSize: 16,
    },

    /* modal */
    modalOverlay: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.9)",
        inset: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
    },
    modalBox: {
        width: "85%",
        backgroundColor: "#222237",
        padding: 20,
        borderRadius: 16,
    },
    modalClose: { alignSelf: "flex-end" },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 12,
        color: "white",
    },
    micPulseContainer: { alignItems: "center", marginBottom: 20 },
    micPulse: {
        backgroundColor: "#B00020",
        padding: 30,
        borderRadius: 999,
    },
    modalDescription: {
        textAlign: "center",
        marginBottom: 20,
        color: "white",
    },
    modalSendButton: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 10,
    },
    modalSendText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#222237",
    },

    /* location card */
    locationCard: {
        backgroundColor: "#222237",
        padding: 20,
        borderRadius: 16,
    },
    locationHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    locationTitle: { fontSize: 20, fontWeight: "bold", color: "white" },
    locationText: { color: "white", fontSize: 16, marginBottom: 12 },
    locationMap: {
        height: 120,
        backgroundColor: "#1A1A2D",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },

    /* caretaker section */
    caretakerCard: {
        backgroundColor: "#222237",
        padding: 20,
        borderRadius: 16,
        gap: 12,
    },
    caretakerHeader: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 8,
        color: "white",
    },
    caretakerAlertBox: {
        backgroundColor: "#B00020",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    caretakerAlertRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 4,
    },
    caretakerText: {
        color: "white",
        fontSize: 16,
    },
    caretakerAlertText: { fontWeight: "bold", color: "white" },
    sectionLabel: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    caretakerMap: {
        height: 150,
        backgroundColor: "#1A1A2D",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
    },
    caretakerActions: {
        flexDirection: "row",
        gap: 10,
    },
    caretakerButtonGreen: {
        flex: 1,
        backgroundColor: "#22C55E",
        padding: 14,
        borderRadius: 10,
    },
    caretakerButtonBlue: {
        flex: 1,
        backgroundColor: "#2563EB",
        padding: 14,
        borderRadius: 10,
    },
    caretakerButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
