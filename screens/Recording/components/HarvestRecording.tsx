import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { v1 as uuidv4 } from 'uuid';
import { Button } from 'react-native-paper';
import { useMutation } from 'react-query';

import { TextInput } from '../../../components';
import { useRecording } from '../../../context/RecordContext';
import {
  ALL_USERS,
  fetch,
  GET_LOCAL_STORAGE_USER,
} from '../../../store';
import {
  styles,
  Props,
  labelRecordStyles,
  Colors,
} from './styles';
import { useNavigation } from '@react-navigation/native';

export const HarvestRecording: React.FC<Props> = ({
  onDiscard = () => {},
}) => {
  const navigation = useNavigation();
  const mutation = useMutation((payload) =>
    fetch.post('/farms', payload)
  );
  const { farmData, setFarmData } = useRecording();
  const [values, setValues] = React.useState<{
    [key: string]: any;
  }>({
    year: farmData.year,
    season: farmData.season,
    crop: farmData.crop,
    quantity: farmData.quantity,
    unit: farmData.unit,
  });

  const handleInputChange = (
    value: string,
    key: 'year' | 'season' | 'crop' | 'quantity' | 'unit'
  ) => {
    setValues((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const user: any = JSON.parse(
        (await AsyncStorage.getItem(
          GET_LOCAL_STORAGE_USER
        )) || ''
      );

      await mutation.mutateAsync({
        ...farmData,
        ...values,
        ownerId: user.id,
        ownerType: user.userType,
        uuid: new Date().valueOf(),
        userId: user.id,
        userType: user.userType,
        geoShapes: [
          {
            geojson: JSON.stringify(farmData.coordinates),
          },
        ],
      } as any);
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Action Failed', error.message);
    }
  };
  return (
    <View style={[labelRecordStyles.container]}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ flex: 1 }}
      >
        <View style={labelRecordStyles.innerContainer}>
          <KeyboardAvoidingView
            behavior={
              Platform.OS === 'ios' ? 'padding' : 'height'
            }
            keyboardVerticalOffset={60}
            style={[
              labelRecordStyles.content,
              {
                flex: 0.42,
                backgroundColor: Colors.light.background,
              },
            ]}
          >
            <View
              style={[
                labelRecordStyles.section2,
                {
                  flex: 1,
                  marginTop: 0,
                  paddingTop: 0,
                },
              ]}
            >
              <TextInput
                value={values.year}
                onChangeText={(text: string) =>
                  handleInputChange(text, 'year')
                }
                placeholder='Year'
                autoComplete={false}
                keyboardType='decimal-pad'
              />
              <TextInput
                value={values.season}
                onChangeText={(text: string) =>
                  handleInputChange(text, 'season')
                }
                placeholder='Season'
                autoComplete={false}
              />
              <TextInput
                value={values.crop}
                onChangeText={(text: string) =>
                  handleInputChange(text, 'crop')
                }
                placeholder='Crop'
                autoComplete={false}
              />
              <View style={styles.row}>
                <TextInput
                  value={values.quantity}
                  onChangeText={(text: string) =>
                    handleInputChange(text, 'quantity')
                  }
                  placeholder='Quantity'
                  keyboardType='decimal-pad'
                  style={{
                    flex: 0.75,
                  }}
                  autoComplete={false}
                />
                <TextInput
                  value={values.unit}
                  onChangeText={(text: string) =>
                    handleInputChange(text, 'unit')
                  }
                  placeholder='Unit'
                  style={{
                    flex: 0.2,
                  }}
                  autoComplete={false}
                />
              </View>
              <View
                style={[styles.row, { marginVertical: 20 }]}
              >
                <Button
                  mode='contained'
                  style={{ flex: 0.45 }}
                  color={Colors.light.red}
                  onPress={() => {
                    setFarmData(values);
                    onDiscard();
                  }}
                >
                  Discard
                </Button>
                <Button
                  mode='contained'
                  style={{ flex: 0.45 }}
                  onPress={handleSubmit}
                  disabled={mutation.isLoading}
                >
                  Save
                </Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
