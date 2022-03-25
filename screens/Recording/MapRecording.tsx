import { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import MapView, {
  Polygon,
  Marker,
} from 'react-native-maps';
import * as Location from 'expo-location';
import { styles } from './styles';
import { StatusBar } from 'react-native';
import { RecordingOptions } from './components/RecordingCompnents';
import * as Recording from './components';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  LocationObject,
  LocationOptions,
  LocationSubscription,
} from 'expo-location';
import { useRecording } from '../../context/RecordContext';

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

const positionConfig: LocationOptions = {
  accuracy: 4.5,
  //timeInterval: 1000,
  distanceInterval: 5,
};
interface CoordinateType {
  latitude: number;
  longitude: number;
}
export const MapRecording = () => {
  const { discardRecording, recordingState, setFarmData } =
    useRecording();
  const [currentLocation, setCurrentLocation] =
    useState<CoordinateType>();

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
  const [coordinates, setCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  let clientLocation: LocationSubscription;
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
        positionConfig
      );

      const { latitude, longitude } = location?.coords;
      setInitialPosition({
        latitude,
        longitude,
        latitudeDelta: 0.0001,
        longitudeDelta: 0.0001,
      });
      setCoordinates([{ latitude, longitude }]);
      setCurrentLocation({ latitude, longitude });
    })();
  }, []);

  const onLocationChange = async (
    location: LocationObject
  ) => {
    if (recordingState === 'recording') {
      const { latitude, longitude } = location?.coords;
      setCurrentLocation({ latitude, longitude });
      setCoordinates((state) => [
        ...state,
        { longitude, latitude },
      ]);
    }
  };

  const watchPosition = useCallback(async () => {
    if (!clientLocation) {
      clientLocation = await Location.watchPositionAsync(
        positionConfig,
        onLocationChange
      );
    }
  }, [recordingState]);

  useEffect(() => {
    watchPosition();
    return () => {
      if (clientLocation) {
        clientLocation.remove();
      }
    };
  }, [recordingState]);

  useEffect(() => {
    return () => {
      discardRecording();
    };
  }, []);

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
          loadingEnabled
          loadingBackgroundColor={Colors.light.accent}
        >
          <Polygon
            coordinates={coordinates}
            fillColor='rgba(255, 246, 25, 0.3)'
            strokeColor='#FFF619' // fallback for when `strokeColors` is not supported by the map-provider
          />
          {currentLocation?.latitude ? (
            <Marker
              coordinate={{
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.longitude,
              }}
            >
              <MaterialCommunityIcons
                name='map-marker-outline'
                color={Colors.light.red}
                size={30}
              />
            </Marker>
          ) : null}
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
          onSave={() => {
            setFarmData({ coordinates });
            setStep('farm-label');
          }}
          onDelete={() => setCoordinates([])}
        />
      </RecordingForm>
    </>
  );
};
