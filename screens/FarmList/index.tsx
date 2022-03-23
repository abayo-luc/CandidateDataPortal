import {
  View,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from 'react-query';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { Text, ListItem } from '../../components';
import { styles } from './styles';
import Layout from '../../constants/Layout';
import { fetch, ALL_FARMS } from '../../store';
import Colors from '../../constants/Colors';

const DATA: { [key: string]: any }[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export const FarmListScreen = () => {
  const navigation = useNavigation();
  const { isLoading, data = [] } = useQuery(ALL_FARMS, () =>
    fetch('/farms')
  );

  return (
    <ImageBackground
      source={require('../../assets/images/splash.png')}
      resizeMode='cover'
      style={Layout.window}
    >
      <View style={styles.container}>
        <View style={styles.section1}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Wakulima</Text>
        </View>
        <View style={styles.section2}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Farm List</Text>
            <MaterialCommunityIcons
              name='dots-vertical'
              size={30}
            />
          </View>

          <FlatList
            data={DATA}
            ListHeaderComponent={
              <ListItem
                listItemStyle={{
                  backgroundColor: 'transparent',
                }}
                id='#ID'
                label='label'
                size='size'
              />
            }
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  id={item.id?.slice(0, 4)}
                  label={item.title}
                  size={index + 10}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <FAB
        icon='plus'
        onPress={() => navigation.navigate('Recording')}
        color={Colors.light.background}
        style={styles.fab}
      />
    </ImageBackground>
  );
};
