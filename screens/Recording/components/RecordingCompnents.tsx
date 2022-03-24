import React from 'react';
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import { styles } from '../styles';

export const RecordingHeaderBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={styles.headerBack}>
        <AntDesign name='arrowleft' size={20} />
      </View>
    </TouchableOpacity>
  );
};

export const RecordingHeaderRecord = () => {
  return (
    <TouchableOpacity>
      <View style={styles.record}>
        <FontAwesome5
          name='record-vinyl'
          color={Colors.light.background}
        />
        <Text style={styles.recordText}>Recording</Text>
      </View>
    </TouchableOpacity>
  );
};

interface RecordingOptionsProps {
  onStopOrStart: () => void;
  onSave: () => void;
  recordingState?: 'recording' | 'stopped';
}
export const RecordingOptions: React.FC<
  RecordingOptionsProps
> = ({ onStopOrStart, onSave, recordingState }) => {
  const [recording, setRecording] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <View style={styles.recordingOptions}>
        <TouchableOpacity
          onPress={() => console.log('>>>>delete pressed')}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name='delete'
              size={20}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStopOrStart}>
          <View style={styles.iconContainer}>
            {recordingState === 'recording' ? (
              <AntDesign
                name='pausecircleo'
                color='#E20F0F'
                size={20}
              />
            ) : (
              <FontAwesome5
                name='record-vinyl'
                color='#E20F0F'
                size={20}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave}>
          <View style={styles.iconContainer}>
            <AntDesign
              name='checkcircleo'
              color='#2B7F68'
              size={20}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
