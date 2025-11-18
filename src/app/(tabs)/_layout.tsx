import { Tabs } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';


export default function TabsLayout() {

  return (
    <SafeAreaProvider>

      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false, // hide built-in header

          tabBarStyle: {
            paddingTop: 20,
            height: 125,
          },
          tabBarLabelStyle: {
            fontSize: 18,
            color:"#222237",
            paddingTop: 10,
          },
        }}
      >

        {/* tabs for navigation */}
        {/* index */}
        <Tabs.Screen
          name="index"
          options={{ tabBarItemStyle: { display: "none" } }}
        />

        {/* settings */}
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <FontAwesome size={30} name="gear" color="#222237" />
            ),
          }}
        />

        {/* voice commands */}
        <Tabs.Screen
          name="voice"
          options={{
            title: 'Voice',
            tabBarIcon: ({ focused }) => (
              <FontAwesome size={30} name="microphone" color="#222237" />
            ),
            tabBarActiveTintColor: "#222237",
            tabBarInactiveTintColor: "#37373dff",
          }}
        />

        {/* reminders */}
        <Tabs.Screen
          name="reminders"
          options={{
            title: 'Reminders',
            tabBarIcon: ({ focused }) => (
              <FontAwesome size={30} name="clock-o" color="#222237" />
            ),
            tabBarActiveTintColor: "#222237",
            tabBarInactiveTintColor: "#37373dff",
          }}
        />

      </Tabs>

    </SafeAreaProvider>
  );
}
