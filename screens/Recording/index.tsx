import { useState, useEffect } from 'react';
import { Text, View } from '../../components';
import MapView, { Polygon } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import Layout from '../../constants/Layout';
import * as Location from 'expo-location';

const LATITUDE_DELTA = 0.28;
const LONGITUDE_DELTA =
  LATITUDE_DELTA *
  (Layout.window.width / Layout.window.height);

const coordinates = [
  {
    name: 'Burger',
    latitude: 37.8025259,
    longitude: -122.4351431,
    // image: require('./img/burger.jpg'),
  },
  {
    name: 'Pizza',
    latitude: 37.7946386,
    longitude: -122.421646,
    // image: require('./img/pizza.jpg'),
  },
  {
    name: 'Soup',
    latitude: 37.7665248,
    longitude: -122.4165628,
    // image: require('./img/soup.jpg'),
  },
  {
    name: 'Sushi',
    latitude: 37.7834153,
    longitude: -122.4527787,
    // image: require('./img/sushi.jpg'),
  },
  {
    name: 'Curry',
    latitude: 37.7948105,
    longitude: -122.4596065,
    // image: require('./img/curry.jpg'),
  },
];
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
        latitude: -1.9553560154837102,
        longitude: 30.09647643127834,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,
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
