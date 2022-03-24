import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Provider as PaperProvider,
  DefaultTheme,
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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RecordingProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </RecordingProvider>
        </QueryClientProvider>
      </PaperProvider>
    );
  }
}
