import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roomfinder.app',
  appName: 'roomfinder',
  webDir: 'dist/roomfinder/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
