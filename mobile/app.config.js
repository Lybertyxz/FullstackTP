export default {
  expo: {
    name: "mobile",
    slug: "journeyapp",
    version: "1.0.0",
    platforms: ["ios", "android"],
    android: {
      package: "com.journeyapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON
    },
    ios: {
      bundleIdentifier: "com.journeyapp",
      googleServicesFile: process.env.GOOGLE_SERVICE_INFO_PLIST,
      supportsTablet: true
    },
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID
      },
      firebase: {
        apiKey: process.env.EXPO_PUBLIC_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_APP_ID
      }
    }
  }
};
