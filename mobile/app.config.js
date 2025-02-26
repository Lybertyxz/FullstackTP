export default {
  expo: {
    name: "JourneyApp",
    slug: "journeyapp",
    scheme: "journeyapp",
    version: "1.0.0",
    platforms: ["ios", "android"],
    plugins: ["expo-router", "@react-native-google-signin/google-signin"],
    android: {
      package: "com.e.journeyapp",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
    },
    ios: {
      bundleIdentifier: "com.e.journeyapp",
      googleServicesFile:
        process.env.GOOGLE_SERVICE_INFO_PLIST || "./GoogleService-Info.plist",
      supportsTablet: true,
    },
    extra: {
      eas: {
        projectId:
          process.env.EAS_PROJECT_ID || "1f264604-bdbf-4a02-8eb4-a8a3569735c1",
      },
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_APP_ID,
      },
    },
  },
};
