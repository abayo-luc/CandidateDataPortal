import { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import Layout from '../../constants/Layout';
import * as Location from 'expo-location';
import { styles } from './styles';
import { StatusBar } from 'react-native';
import { RecordingOptions } from './components/RecordingCompnents';
import * as Recording from './components';
import { useNavigation } from '@react-navigation/native';

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA =
  LATITUDE_DELTA *
  (Layout.window.width / Layout.window.height);

interface Props {
  step:
    | 'recording'
    | 'farm-label'
    | 'harvest-recording'
    | 'discard';
  onSaveLabel: () => void;
  onDiscard: () => void;
  onKeep: () => void;
  overAllSave: () => void;
  confirmDiscard: () => void;
}

const RecordingForm: React.FC<Props> = ({
  step,
  children,
  onSaveLabel,
  onDiscard,
  onKeep,
  overAllSave,
  confirmDiscard,
}) => {
  switch (step) {
    case 'farm-label':
      return (
        <Recording.RecordFarmLabel
          onSave={onSaveLabel}
          onDiscard={onDiscard}
        />
      );
    case 'harvest-recording':
      return (
        <Recording.HarvestRecording
          onDiscard={onDiscard}
          onSave={overAllSave}
        />
      );
    case 'discard':
      return (
        <Recording.DiscardRecording
          onSave={onKeep}
          onDiscard={confirmDiscard}
        />
      );
    default:
      return <>{children}</>;
  }
};

export const MapRecording = () => {
  const [recordingState, setRecordingState] = useState<
    'recording' | 'stopped'
  >();
  const navigation = useNavigation();
  const [step, setStep] = useState<
    | 'recording'
    | 'farm-label'
    | 'harvest-recording'
    | 'discard'
  >('recording');

  const [initialPosition, setInitialPosition] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {}, []);
  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg(
          'Permission to access location was denied'
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync(
        {}
      );
      const { latitude, longitude } = location?.coords;
      setInitialPosition({
        latitude,
        longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
      });
    })();
  }, []);

  const onMapPress = async () => {
    console.log('>>>>>>>>onpress');
  };

  return (
    <>
      <StatusBar
        barStyle='light-content'
        translucent
        showHideTransition='fade'
      />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={initialPosition}
          mapType='satellite'
          minZoomLevel={15}
          onPress={onMapPress}
        >
          <Polygon
            coordinates={[
              {
                latitude: -1.954388,
                longitude: 30.127411,
              },
              {
                latitude: -1.954388 - 0.0002,
                longitude: 30.127411 - 0.0002,
              },
              {
                latitude: -1.954388 - 0.0003,
                longitude: 30.127411 - 0.0003,
              },
              {
                latitude: -1.954388 - 0.0002,
                longitude: 30.127411 - 0.0003,
              },
              {
                latitude: -1.954388,
                longitude: 30.127411,
              },
            ]}
            fillColor='rgba(35, 140, 35,0.4)'
            strokeColor='#238c23' // fallback for when `strokeColors` is not supported by the map-provider
          />
        </MapView>
      </View>

      <RecordingForm
        step={step}
        onSaveLabel={() => setStep('harvest-recording')}
        onDiscard={() => setStep('discard')}
        onKeep={() => setStep('farm-label')}
        overAllSave={() => setStep('recording')}
        confirmDiscard={() => navigation.navigate('Root')}
      >
        <RecordingOptions
          onStopOrStart={() => {
            if (recordingState === 'recording') {
              return setRecordingState('stopped');
            } else {
              return setRecordingState('recording');
            }
          }}
          onSave={() => {
            setStep('farm-label');
          }}
          recordingState={recordingState}
        />
      </RecordingForm>
    </>
  );
};
