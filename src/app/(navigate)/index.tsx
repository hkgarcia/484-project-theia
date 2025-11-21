import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, FlatList, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MapPin, User, Search, Clock, ChevronDown, Navigation as NavigationIcon, Mic, AlertTriangle } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import { MapView } from '../../components/MapView';
import { DirectionControls } from '../../components/DirectionControls';
import { AudioFeedback } from '../../components/AudioFeedback';
import { GlobalVoiceListener } from '../../components/GlobalVoiceListener';
import { CollisionAlert } from '../../components/CollisionAlert';

type RouteOption = { id: string; name: string; eta: string; distance: string };
type Place = { name: string; visits: number; lastVisited: string };

export default function NavigateScreen() {
    const router = useRouter();

    const [destination, setDestination] = React.useState<string>('Room 302');
    const [distance, setDistance] = React.useState<string>('15 meters');
    const [currentDirection, setCurrentDirection] = React.useState<string>('forward');
    const [isNavigating, setIsNavigating] = React.useState<boolean>(false);
    const [audioMessage, setAudioMessage] = React.useState<string>('');
    const [showCustomDestination, setShowCustomDestination] = React.useState<boolean>(false);
    const [customDestination, setCustomDestination] = React.useState<string>('');
    const [showRouteOptions, setShowRouteOptions] = React.useState<boolean>(false);
    const [selectedRoute, setSelectedRoute] = React.useState<string>('fastest');
    const [showCollisionAlert, setShowCollisionAlert] = React.useState<boolean>(false);
    const [showCaretakerMode, setShowCaretakerMode] = React.useState<boolean>(false);

    // Sim data
    const routes: RouteOption[] = [
        { id: 'fastest', name: 'Fastest Route', eta: '2 min', distance: '15 meters' },
        { id: 'elevator', name: 'Via Elevator', eta: '4 min', distance: '30 meters' },
        { id: 'accessible', name: 'Most Accessible', eta: '5 min', distance: '35 meters' },
    ];

    const frequentPlaces: Place[] = [
        { name: 'Room 302', visits: 25, lastVisited: '2 days ago' },
        { name: 'Cafeteria', visits: 18, lastVisited: '1 day ago' },
        { name: 'Library', visits: 12, lastVisited: '3 days ago' },
    ];

    // Handlers (kept same semantics)
    const startNavigation = () => {
        setIsNavigating(true);
        setAudioMessage(`Starting navigation to ${destination}. Proceed 5 steps forward.`);

        // simulate collision
        setTimeout(() => {
            setShowCollisionAlert(true);
            setTimeout(() => setShowCollisionAlert(false), 5000);
        }, 10000);
    };

    const handleDirectionChange = (direction: string) => {
        setCurrentDirection(direction);
        switch (direction) {
            case 'left':
                setAudioMessage('Turn left and proceed 10 steps forward.');
                break;
            case 'right':
                setAudioMessage('Turn right and proceed 8 steps forward.');
                break;
            case 'forward':
                setAudioMessage('Continue straight for 15 meters.');
                break;
            case 'stop':
                setAudioMessage("Stopping navigation. You're currently near the hallway.");
                break;
        }
    };

    const handleCustomDestinationSubmit = () => {
        if (customDestination.trim().length > 0) {
            setDestination(customDestination.trim());
            setShowCustomDestination(false);
            setCustomDestination('');
        }
    };

    const toggleRouteOptions = () => setShowRouteOptions((s) => !s);
    const selectRoute = (routeId: string) => {
        setSelectedRoute(routeId);
        const r = routes.find((x) => x.id === routeId);
        if (r) setDistance(r.distance);
        setShowRouteOptions(false);
    };
    const toggleCaretakerMode = () => setShowCaretakerMode((s) => !s);

    return (
        <SafeAreaView style={styles.safe}>

            {/* Collision Alert (top-level overlay component) */}
            {showCollisionAlert && <CollisionAlert onDismiss={() => setShowCollisionAlert(false)} />}

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerLeft}
                    onPress={() => router.back()}
                    accessibilityLabel="Go back to home screen"
                >
                    <ArrowLeft width={24} height={24} color="#fff" />
                    <Text style={styles.headerTitle}>Navigation</Text>
                </TouchableOpacity>

                <View style={styles.headerRight}>
                    <TouchableOpacity
                        onPress={toggleCaretakerMode}
                        style={styles.caretakerButton}
                        accessibilityLabel="Toggle caretaker mode"
                    >
                        <User width={18} height={18} color="#fff" />
                    </TouchableOpacity>

                    <MapPin width={20} height={20} color="#ff4d4d" style={styles.mapPin} />
                    <Text style={styles.destinationText}>{destination}</Text>
                </View>
            </View>

            {/* Caretaker Mode Panel */}
            {showCaretakerMode && (
                <View style={styles.caretakerPanel}>
                    <Text style={styles.caretakerTitle}>Caretaker Mode</Text>
                    <Text style={styles.caretakerDesc}>Configure routes and directions for the user.</Text>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Add step-by-step directions:</Text>
                        <TextInput
                            multiline
                            numberOfLines={3}
                            style={styles.textarea}
                            placeholder="E.g., Exit classroom, turn right, walk 20 steps..."
                            placeholderTextColor="#9CA3AF"
                        />

                        <Text style={[styles.label, { marginTop: 10 }]}>Set navigation preferences:</Text>
                        {/* simple picker replacement */}
                        <View style={styles.picker}>
                            <Text style={styles.pickerText}>Detailed instructions ▾</Text>
                        </View>

                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Save Directions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Main content */}
            {!isNavigating ? (
                <ScrollView contentContainerStyle={styles.main}>
                    {!showCustomDestination ? (
                        <>
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle}>Where to?</Text>
                                    <TouchableOpacity
                                        onPress={() => setShowCustomDestination(true)}
                                        style={styles.iconButton}
                                        accessibilityLabel="Search for a destination"
                                    >
                                        <Search width={18} height={18} color="#fff" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Frequent Places</Text>

                                    {frequentPlaces.map((place) => (
                                        <DestinationButton
                                            key={place.name}
                                            name={place.name}
                                            description={`${place.visits} visits - Last: ${place.lastVisited}`}
                                            isSelected={destination === place.name}
                                            onPress={() => setDestination(place.name)}
                                        />
                                    ))}
                                </View>
                            </View>

                            <View style={styles.block}>
                                <TouchableOpacity onPress={toggleRouteOptions} style={styles.routeButton}>
                                    <View style={styles.routeLeft}>
                                        <Clock width={18} height={18} color="#fff" style={{ marginRight: 8 }} />
                                        <Text style={styles.routeText}>Route Options</Text>
                                    </View>

                                    <ChevronDown
                                        width={18}
                                        height={18}
                                        color="#fff"
                                        style={{ transform: [{ rotate: showRouteOptions ? '180deg' : '0deg' }] }}
                                    />
                                </TouchableOpacity>

                                {showRouteOptions && (
                                    <View style={styles.routesList}>
                                        {routes.map((route) => (
                                            <TouchableOpacity
                                                key={route.id}
                                                onPress={() => selectRoute(route.id)}
                                                style={[
                                                    styles.routeItem,
                                                    selectedRoute === route.id ? styles.routeItemSelected : undefined,
                                                ]}
                                            >
                                                <View>
                                                    <Text style={styles.routeName}>{route.name}</Text>
                                                    <Text style={styles.routeDistance}>{route.distance}</Text>
                                                </View>
                                                <Text style={styles.routeEta}>{route.eta}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                <TouchableOpacity
                                    onPress={startNavigation}
                                    style={styles.startNavButton}
                                    accessibilityLabel={`Start navigation to ${destination}`}
                                >
                                    <NavigationIcon width={20} height={20} color="#fff" />
                                    <Text style={styles.startNavText}>Start Navigation</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>Enter Destination</Text>

                            <View style={styles.inputRow}>
                                <TextInput
                                    value={customDestination}
                                    onChangeText={setCustomDestination}
                                    placeholder="Room number or location name"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.textInput}
                                />
                                <TouchableOpacity style={styles.voiceButton} accessibilityLabel="Use voice input">
                                    <Mic width={20} height={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => setShowCustomDestination(false)} style={styles.flexButton}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCustomDestinationSubmit} style={[styles.flexButton, styles.confirmButton]}>
                                    <Text style={[styles.buttonText, { color: '#fff' }]}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ScrollView>
            ) : (
                // Navigating view
                <View style={styles.navigatingContainer}>
                    <View style={styles.mapContainer}>
                        <MapView currentDirection={currentDirection} destination={destination} distance={distance} />
                    </View>

                    <AudioFeedback message={audioMessage} />

                    <View style={styles.statusContainer}>
                        <View style={styles.statusCard}>
                            <View style={styles.statusHeader}>
                                <View style={styles.statusLeft}>
                                    <AlertTriangle width={18} height={18} color="#FBBF24" />
                                    <Text style={styles.statusTitle}>Emergency Status</Text>
                                </View>
                                <Text style={styles.safeText}>Safe</Text>
                            </View>
                            <Text style={styles.statusDesc}>No emergency alerts detected during this navigation</Text>
                        </View>
                    </View>

                    <View style={styles.controlsContainer}>
                        <DirectionControls onDirectionChange={handleDirectionChange} currentDirection={currentDirection} />
                    </View>
                </View>
            )}

            {/* Global voice listener (bottom) */}
            <GlobalVoiceListener />

        </SafeAreaView>
    );
}

function DestinationButton({
    name,
    description,
    isSelected,
    onPress,
}: {
    name: string;
    description: string;
    isSelected: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.destinationButton, isSelected ? styles.destinationSelected : undefined]}
            accessibilityLabel={`Go to ${name}`}
            accessibilityState={{ selected: isSelected }}
        >
            <View style={[styles.pinWrap, isSelected ? styles.pinWrapSelected : undefined]}>
                <MapPin width={22} height={22} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.destName}>{name}</Text>
                <Text style={styles.destDesc}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0f0f15',
    },
    header: {
        width: '100%',
        padding: 12,
        backgroundColor: '#222237',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginLeft: 8 },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    caretakerButton: {
        marginRight: 12,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#2d2d45',
    },
    mapPin: { marginRight: 8 },
    destinationText: { color: '#fff', fontWeight: '700' },

    caretakerPanel: {
        width: '100%',
        padding: 12,
        backgroundColor: '#2d2d45',
    },
    caretakerTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 6 },
    caretakerDesc: { color: '#d1d5db', marginBottom: 10 },
    formGroup: { flexDirection: 'column' },
    label: { color: '#fff', fontSize: 13, fontWeight: '600', marginBottom: 6 },
    textarea: {
        width: '100%',
        padding: 8,
        backgroundColor: '#1a1a2d',
        borderRadius: 8,
        color: '#fff',
        textAlignVertical: 'top',
    },
    picker: {
        marginTop: 4,
        padding: 12,
        backgroundColor: '#1a1a2d',
        borderRadius: 8,
    },
    pickerText: { color: '#fff' },
    saveButton: {
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#2563EB',
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: { color: '#fff', fontWeight: '700' },

    main: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    card: {
        width: '100%',
        maxWidth: 720,
        padding: 16,
        backgroundColor: '#222237',
        borderRadius: 12,
        marginBottom: 16,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    cardTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
    iconButton: { padding: 8, backgroundColor: '#2d2d45', borderRadius: 20 },

    section: { marginTop: 8 },
    sectionTitle: { color: '#9CA3AF', fontSize: 14, marginBottom: 8 },

    destinationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#2d2d45',
        marginBottom: 8,
    },
    destinationSelected: { backgroundColor: '#2563EB' },
    pinWrap: {
        marginRight: 12,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#222237',
    },
    pinWrapSelected: { backgroundColor: '#3B82F6' },
    destName: { color: '#fff', fontSize: 16, fontWeight: '700' },
    destDesc: { color: '#d1d5db', fontSize: 12 },

    block: { width: '100%', maxWidth: 720, marginBottom: 24 },
    routeButton: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: '#222237',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    routeLeft: { flexDirection: 'row', alignItems: 'center' },
    routeText: { color: '#fff', fontWeight: '600' },

    routesList: { backgroundColor: '#222237', borderRadius: 12, padding: 8, marginBottom: 12 },
    routeItem: {
        width: '100%',
        padding: 12,
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: '#2d2d45',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    routeItemSelected: { backgroundColor: '#2563EB' },
    routeName: { color: '#fff', fontWeight: '700' },
    routeDistance: { color: '#d1d5db', fontSize: 12 },
    routeEta: { color: '#fff', fontWeight: '700' },

    startNavButton: {
        width: '100%',
        paddingVertical: 16,
        backgroundColor: '#2563EB',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        ...Platform.select({
            android: { elevation: 4 },
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6 },
        }),
    },
    startNavText: { color: '#fff', fontSize: 18, fontWeight: '800', marginLeft: 10 },

    inputRow: { flexDirection: 'row', marginTop: 12 },
    textInput: {
        flex: 1,
        padding: 12,
        backgroundColor: '#1a1a2d',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        color: '#fff',
    },
    voiceButton: { padding: 12, backgroundColor: '#2d2d45', borderTopRightRadius: 8, borderBottomRightRadius: 8 },

    row: { flexDirection: 'row', marginTop: 12, gap: 8 },
    flexButton: { flex: 1, paddingVertical: 12, backgroundColor: '#2d2d45', borderRadius: 8, alignItems: 'center' },
    confirmButton: { backgroundColor: '#2563EB' },
    buttonText: { color: '#fff', fontWeight: '600' },

    navigatingContainer: { flex: 1, justifyContent: 'space-between' },
    mapContainer: { width: '100%', padding: 16 },
    
    // status
    statusContainer: { width: '100%', padding: 14 },
    statusCard: { padding: 14, backgroundColor: '#222237', borderRadius: 12 },
    statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    statusLeft: { flexDirection: 'row', alignItems: 'center' },
    statusTitle: { fontWeight: '700', marginLeft: 8, color: '#fff', fontSize: 20 },
    safeText: { color: '#10B981', fontWeight: '600', fontSize: 18 },
    statusDesc: { color: '#9CA3AF', fontSize: 18 },

    controlsContainer: { width: '100%', padding: 12 },
}); 