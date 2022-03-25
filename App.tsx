import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ImageBackground, View } from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { QueryClientProvider } from 'react-query';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { queryClient } from './store';
import Colors from './constants/Colors';
import {
  RecordingContext,
  RecordingProvider,
} from './context/RecordContext';

const theme = {
  ...DefaultTheme,
  colors: Colors.light,
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <PaperProvider theme={theme}>
      {!isLoadingComplete ? (
        <ImageBackground
          source={require('./assets/images/splash.png')}
          resizeMode='cover'
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator
            color={theme.colors.primary}
            animating
            size='large'
          />
        </ImageBackground>
      ) : (
        <QueryClientProvider client={queryClient}>
          <RecordingProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </RecordingProvider>
        </QueryClientProvider>
      )}
    </PaperProvider>
  );
}
