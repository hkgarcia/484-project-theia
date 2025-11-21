import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Mic, Bell, Plus, Clock, MapPin, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalVoiceListener } from '../../components/GlobalVoiceListener';

interface ReminderType {
    id: number;
    title: string;
    time: string;
    location: string;
}

export default function RemindersPage() {
    const router = useRouter();
    const [showReminderAlert, setShowReminderAlert] = useState(false);
    const [activeReminder, setActiveReminder] = useState<ReminderType | null>(null);

    // sample data
    const reminders: ReminderType[] = [
        { id: 1, title: 'Math Class', time: '10:00 AM', location: 'Room 302' },
        { id: 2, title: 'Lunch', time: '12:30 PM', location: 'Cafeteria' },
        { id: 3, title: 'Doctor Appointment', time: '3:45 PM', location: 'Health Center' },
    ];

    // handle reminder click - display details
    // dummy implementation for now - closes out of alert after 5 seconds
    // real implementation would use more scheduling/reminder logic
    const handleReminderClick = (reminder: ReminderType) => {
        setActiveReminder(reminder);
        setShowReminderAlert(true);
        setTimeout(() => setShowReminderAlert(false), 5000);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* show current reminders that we have */}
            {showReminderAlert && activeReminder && (
                <ReminderAlert reminder={activeReminder} onDismiss={() => setShowReminderAlert(false)} />
            )}

            {/* header */}
            <View style={styles.header}>
                {/* return home on back */}
                <Pressable onPress={() => router.push('/')} style={styles.headerButton}>
                    <ArrowLeft size={28} color="white" />
                    <Text style={styles.headerTitle}>Reminders</Text>
                </Pressable>
            </View>

            {/* main content for page */}
            <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.todaySchedule}>
                    <Text style={styles.sectionTitle}>Today's Schedule</Text>
                    <View style={styles.currentTime}>
                        <Clock size={20} color="#3B82F6" />
                        <Text style={styles.currentTimeText}>Current time: 9:30 AM</Text>
                    </View>
                </View>

                {reminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} onClick={() => handleReminderClick(reminder)} />
                ))}
            </ScrollView>

            {/* adding a new reminder */}
            <View style={styles.addButtonContainer}>
                <Pressable
                    onPress={() => router.push('/(reminders)/add')}
                    style={styles.addButton}
                >
                    <Plus size={32} color="white" />
                </Pressable>
            </View>

            <GlobalVoiceListener />
        </SafeAreaView>
    );
}

// reminder card
interface ReminderCardProps {
    reminder: ReminderType;
    onClick: () => void;
}
function ReminderCard({ reminder, onClick }: ReminderCardProps) {
    return (
        // basic information for reminders
        <Pressable onPress={onClick} style={styles.reminderCard}>
            <View style={styles.reminderIcon}>
                <Bell size={24} color="white" />
            </View>
            <View style={styles.reminderContent}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <View style={styles.reminderDetails}>
                    <Text style={styles.reminderText}>{reminder.time}</Text>
                    <Text style={styles.reminderText}>{reminder.location}</Text>
                </View>
            </View>
        </Pressable>
    );
}

// reminder alert
interface ReminderAlertProps {
    reminder: ReminderType;
    onDismiss: () => void;
}
function ReminderAlert({ reminder, onDismiss }: ReminderAlertProps) {
    return (
        <View style={styles.alertOverlay}>
            <View style={styles.alertBox}>

                {/* basic information for reminders */}
                <Bell size={48} color="white" />
                <Text style={styles.alertTitle}>{reminder.title}</Text>

                <View style={styles.alertInfo}>
                    <View style={styles.alertInfoRow}>
                        <Clock size={20} color="white" />
                        <Text style={styles.alertInfoText}>{reminder.time}</Text>
                    </View>
                    <View style={styles.alertInfoRow}>
                        <MapPin size={20} color="white" />
                        <Text style={styles.alertInfoText}>{reminder.location}</Text>
                    </View>
                </View>


                {/* dismiss and navigate buttons */}
                <View style={styles.alertButtons}>
                    <Pressable style={styles.alertButtonDismiss} onPress={onDismiss}>
                        <Text style={styles.alertButtonTextDismiss}>Dismiss</Text>
                    </Pressable>
                    <Pressable
                        style={styles.alertButtonNavigate}
                        onPress={() => {
                            onDismiss();
                            // router.push('/navigate')
                        }}
                    >
                        <Text style={styles.alertButtonTextNavigate}>Navigate</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

// styles
const styles = StyleSheet.create({
    // basic styles
    container: { flex: 1, backgroundColor: '#0f0f15' },
    header: { width: '100%', padding: 16, backgroundColor: '#222237' },
    headerButton: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold', marginLeft: 8 },
    main: { padding: 16, alignItems: 'center' },

    // today's schedule
    todaySchedule: { width: '100%', padding: 16, backgroundColor: '#222237', borderRadius: 12, marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: 'white' },
    currentTime: { height: 50, backgroundColor: '#2d2d45', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
    currentTimeText: { color: 'white', marginLeft: 6 },
    
    // reminder card parts
    reminderCard: { flexDirection: 'row', width: '100%', padding: 16, backgroundColor: '#222237', borderRadius: 12, marginBottom: 12, alignItems: 'center' },
    reminderIcon: { backgroundColor: '#3B82F6', padding: 12, borderRadius: 50, marginRight: 12 },
    reminderContent: { flex: 1 },
    reminderTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
    reminderDetails: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
    reminderText: { color: '#ccc', fontSize: 16 },
   
    // buttons for adding more reminders
    addButtonContainer: { width: '100%', padding: 16, alignItems: 'center' },
    addButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center' },
    
    // overlay alert styles
    alertOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 50 },
    alertBox: { width: '80%', backgroundColor: '#3B82F6', padding: 24, borderRadius: 16, alignItems: 'center' },
    alertTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginVertical: 12 },
    alertInfo: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
    alertInfoRow: { flexDirection: 'row', alignItems: 'center' },
    alertInfoText: { fontSize: 18, color: 'white', marginLeft: 6 },
    alertButtons: { flexDirection: 'row', width: '100%', marginTop: 16, justifyContent: 'space-between' },
    alertButtonDismiss: { flex: 1, paddingVertical: 12, backgroundColor: 'white', borderRadius: 12, marginRight: 8, alignItems: 'center' },
    alertButtonNavigate: { flex: 1, paddingVertical: 12, backgroundColor: '#222237', borderRadius: 12, marginLeft: 8, alignItems: 'center' },
    alertButtonTextDismiss: { color: '#3B82F6', fontWeight: 'bold', fontSize: 16 },
    alertButtonTextNavigate: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
