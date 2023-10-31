import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'roomfinder',
  webDir: 'dist/roomfinder',
  server: {
    //androidScheme: 'https',
    url: 'http://192.168.178.26:4200',
    cleartext: true,
  }
};

export default config;
