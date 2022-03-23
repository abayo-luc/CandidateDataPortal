import { useState, useEffect } from 'react';
import { View } from '../../components';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import Layout from '../../constants/Layout';
import * as Location from 'expo-location';

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA =
  LATITUDE_DELTA *
  (Layout.window.width / Layout.window.height);

export const RecordingScreen = () => {
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
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    })();
  }, []);
  const onMapPress = async () => {
    let location = await Location.getCurrentPositionAsync(
      {}
    );
    console.log(location);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialPosition}
        mapType='satellite'
        minZoomLevel={15}
        onPress={onMapPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
