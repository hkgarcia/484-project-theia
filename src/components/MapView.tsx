import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Navigation } from "lucide-react-native";

interface MapViewProps {
  currentDirection: string;
  destination: string;
  distance: string;
}

export function MapView({
  currentDirection,
  destination,
  distance,
}: MapViewProps) {

  return (
    <View style={styles.container}>
      {/* Simplified visual map */}
      <View style={styles.centerWrapper}>
        <View style={styles.mapBox}>
          {/* Current position */}
          <View style={styles.currentPosition}>
            <Navigation
              size={32}
              color="#3b82f6"
              style={{
                transform: [{ rotate: `${getRotationDegree(currentDirection)}deg` }],
              }}
            />
            <View style={styles.youBadge}>
              <Text style={styles.badgeText}>You</Text>
            </View>
          </View>

          {/* Destination */}
          <View style={styles.destination}>
            <MapPin size={32} color="#ef4444" />
            <View style={styles.destinationBadge}>
              <Text style={styles.badgeText}>{destination}</Text>
            </View>
          </View>

          {/* Path line */}
          <View style={styles.pathLine} />
        </View>
      </View>

      {/* Bottom distance bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.distanceText}>
          Distance to destination: {distance}
        </Text>
      </View>
    </View>
  );
}

function getRotationDegree(direction: string): number {
  switch (direction) {
    case "left":
      return 270;
    case "right":
      return 90;
    case "forward":
      return 0;
    case "stop":
      return 0;
    default:
      return 0;
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    backgroundColor: "#222237",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },

  centerWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },

  mapBox: {
    width: "75%",
    height: "75%",
    backgroundColor: "#2d2d45",
    borderRadius: 12,
    position: "relative",
  },

  currentPosition: {
    position: "absolute",
    left: "50%",
    bottom: "25%",
    transform: [{ translateX: -16 }],
    alignItems: "center",
  },

  youBadge: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
  },

  destination: {
    position: "absolute",
    right: "25%",
    top: "25%",
    alignItems: "center",
  },

  destinationBadge: {
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#ef4444",
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },

  pathLine: {
    position: "absolute",
    left: "50%",
    bottom: "25%",
    width: 4,
    height: 100,
    backgroundColor: "#3b82f6",
    transform: [{ translateX: -2 }, { rotate: "45deg" }],
    borderRadius: 2,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 8,
    backgroundColor: "#1a1a2d",
    alignItems: "center",
    paddingVertical: 15
  },

  distanceText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});