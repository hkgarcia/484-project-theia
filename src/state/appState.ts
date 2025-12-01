// Simple React Native–safe EventEmitter 

type Listener = (...args: any[]) => void;

class SimpleEmitter {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, fn: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }

  off(event: string, fn: Listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== fn);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(fn => fn(...args));
  }
}

// global app state

export const appState = {
  emergency: {
    isFalling: false,
    alertSent: false,
    alertTime: null as null | string,
    caretakerViewActive: false,
    message: "",
    userLocation: "Room 302 - Mathematics Building",
    countdown: 3,
  },

  obstacles: {
    activeObstacle: null as null | string,
  },

  reminders: [] as { id: number; text: string; time: string }[],

  // event system
  events: new SimpleEmitter(),
};


// SCENARIO 2: Emergency Logic

export function triggerFall() {
    
    appState.emergency.isFalling = true;
    appState.emergency.alertSent = false;
    appState.emergency.alertTime = null;
    appState.events.emit("emergencyUpdate");
    
    startEmergencyCountdown();
}

export function sendEmergencyAlert() {
  appState.emergency.alertSent = true;
  appState.emergency.alertTime = new Date().toLocaleTimeString();
  appState.events.emit("emergencyUpdate");
}

export function getEmergencyStatus() {
  return { ...appState.emergency };
}

export function resetEmergency() {
  appState.emergency.isFalling = false;
  appState.emergency.alertSent = false;
  appState.emergency.alertTime = null;
  appState.emergency.message = "";

  appState.events.emit("emergencyUpdate");
}

export function startEmergencyCountdown() {
  appState.emergency.countdown = 3;
  appState.events.emit("emergencyUpdate");

  const tick = () => {
    if (!appState.emergency.isFalling) return; // cancelled
    if (appState.emergency.countdown === 0) {
      sendEmergencyAlert();
      return;
    }

    appState.emergency.countdown--;
    appState.events.emit("emergencyUpdate");
    setTimeout(tick, 1000);
  };

  setTimeout(tick, 1000);
}


// SCENARIO 3: Obstacle Detection (Dummy)

export function triggerObstacle(type: string) {
  appState.obstacles.activeObstacle = type;
  appState.events.emit("obstacleUpdate");

  setTimeout(() => {
    appState.obstacles.activeObstacle = null;
    appState.events.emit("obstacleUpdate");
  }, 5000);
}

export function getActiveObstacle() {
  return appState.obstacles.activeObstacle;
}

// Reminders Backend
let reminderId = 1;

export function addReminder(text: string, time: string) {
  appState.reminders.push({
    id: reminderId++,
    text,
    time,
  });

  appState.events.emit("remindersUpdate");
}

export function getReminders() {
    return [...appState.reminders];
}

// Voice Commands -mockup for now

export function handleVoiceCommand(cmd: string) {
  cmd = cmd.toLowerCase();

  if (cmd.includes("help") || cmd.includes("emergency")) {
    triggerFall();
    return "Emergency triggered via voice.";
  }

  if (cmd.includes("obstacle")) {
    triggerObstacle("Blocked Path Ahead");
    return "Obstacle warning triggered.";
  }

  if (cmd.includes("remind")) {
    addReminder("Meeting soon", "In 10 minutes");
    return "Reminder created.";
  }

  return "Command not recognized.";
}


