import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'clin35.cll.kuleuven.be', // Update the app ID here
  appName: 'CLIN 35', // Update the app name here
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,  // Duration in milliseconds
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
