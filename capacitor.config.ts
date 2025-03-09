
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b8e4655bf6fa4e37782a6568b37d06c30',
  appName: 'AI Assistant',
  webDir: 'dist',
  server: {
    url: 'https://b8e4655b-f6fa-4e37-82a6-568b37d06c30.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      releaseType: 'APK'
    }
  }
};

export default config;
