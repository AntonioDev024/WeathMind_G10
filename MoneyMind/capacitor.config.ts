import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MoneyMind',
  webDir: 'dist',
  server: {
    androidScheme: 'moneyminds',
    hostname: 'app'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duración en milisegundos (3 segundos)
      launchAutoHide: true,     // Oculta automáticamente el Splash Screen
      backgroundColor: '#ffffff', // Color de fondo del Splash Screen
      androidSplashResourceName: 'splash', // Nombre del recurso en Android
      androidScaleType: 'CENTER_CROP', // Escalado de la imagen en Android
      showSpinner: false, // Muestra un spinner (opcional)
      iosSpinnerStyle: 'small', // Estilo del spinner en iOS
    },
  },
};

export default config;
