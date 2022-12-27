import "dotenv/config";

export default {
  expo: {
    name: "locality: store",
    slug: "locstore",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "store",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/adaptive-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
      bundleIdentifier: "com.teamlocality.locstore",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
      package: "com.teamlocality.locstore",
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      //   apiKey: process.env.API_KEY,
      //   authDomain: process.env.AUTH_DOMAIN,
      //   projectId: process.env.PROJECT_ID,
      //   storageBucket: process.env.STORAGE_BUCKET,
      //   messagingSenderId: process.env.MESSAGING_SENDER_ID,
      //   appId: process.env.APP_ID,
      eas: {
        projectId: "30754276-a1d6-4bfe-bd04-ed63fa15fd14",
      },
    },
  },
};
