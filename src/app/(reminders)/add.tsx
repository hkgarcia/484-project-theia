import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, MapPin, Bell, Check } from 'lucide-react-native';
import { GlobalVoiceListener } from '../../components/GlobalVoiceListener';

// TODO: add backend for storing reminders. code is currently just a form that shows success message
// we can use the form data to create a reminder object + store in db
export default function AddReminderPage() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('10:00');
    const [location, setLocation] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // handle form submission for adding reminder
    const handleSubmit = () => {
        setShowSuccess(true);
        setTimeout(() => {
            router.back();
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    style={styles.headerButton}
                >
                    <ArrowLeft size={28} color="white" />
                    <Text style={styles.headerTitle}>Add Reminder</Text>
                </Pressable>
            </View>

            {/* main content */}
            <ScrollView contentContainerStyle={styles.main}>
                {showSuccess ? (
                    <View style={styles.successBox}>
                        <View style={styles.successIcon}>
                            <Check size={48} color="white" />
                        </View>
                        <Text style={styles.successTitle}>Reminder Added</Text>
                        <Text style={styles.successMessage}>
                            Your reminder has been successfully added to your schedule.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.form}>
                        {/* reminder details */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Bell size={24} color="#3B82F6" />
                                <Text style={styles.sectionTitle}>Reminder Details</Text>
                            </View>

                            <View style={{ gap: 16 }}>
                                {/* title */}
                                <View>
                                    <Text style={styles.label}>Title</Text>
                                    <TextInput
                                        value={title}
                                        onChangeText={setTitle}
                                        placeholder="Class or activity name"
                                        placeholderTextColor="#aaa"
                                        style={styles.input}
                                    />
                                </View>

                                {/* time */}
                                <View>
                                    <Text style={styles.label}>
                                        <Clock size={18} color="#fff" /> Time
                                    </Text>
                                    <TextInput
                                        value={time}
                                        onChangeText={setTime}
                                        placeholder="10:00 AM"
                                        placeholderTextColor="#aaa"
                                        style={styles.input}
                                    />
                                </View>

                                {/* location */}
                                <View>
                                    <Text style={styles.label}>
                                        <MapPin size={18} color="#fff" /> Location
                                    </Text>
                                    <TextInput
                                        value={location}
                                        onChangeText={setLocation}
                                        placeholder="Room or location name"
                                        placeholderTextColor="#aaa"
                                        style={styles.input}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* repeat section */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Repeat</Text>

                            <View style={styles.repeatGrid}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                                    (day) => (
                                        <RepeatButton key={day} day={day} />
                                    )
                                )}
                            </View>
                        </View>

                        {/* submit button */}
                        <Pressable style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Add Reminder</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>

            <GlobalVoiceListener />
        </SafeAreaView>
    );
}


// repeat button component
function RepeatButton({ day }: { day: string }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <Pressable
            onPress={() => setIsActive(!isActive)}
            style={[
                styles.repeatButton,
                { backgroundColor: isActive ? '#3B82F6' : '#2d2d45' },
            ]}
        >
            <Text style={styles.repeatButtonText}>{day}</Text>
        </Pressable>
    );
}


// styles
const styles = StyleSheet.create({
    // main theme parts
    container: {
        flex: 1,
        backgroundColor: '#0f0f15',
    },
    header: {
        width: '100%',
        padding: 16,
        backgroundColor: '#222237',
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    main: {
        padding: 16,
        width: '100%',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        maxWidth: 500,
        gap: 24,
    },
    section: {
        backgroundColor: '#222237',
        padding: 20,
        borderRadius: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    label: {
        color: 'white',
        marginBottom: 6,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#2d2d45',
        borderRadius: 10,
        padding: 14,
        color: 'white',
        fontSize: 16,
    },
    repeatGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 8,
    },
    repeatButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    repeatButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 12,
    },
    submitText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    successBox: {
        width: '100%',
        backgroundColor: '#222237',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    successIcon: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 50,
        marginBottom: 16,
    },
    successTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    successMessage: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
