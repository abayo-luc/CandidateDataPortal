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
import { useRecording } from '../../../context/RecordContext';

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
  const { recordingState } = useRecording();
  if (recordingState === 'none') {
    return null;
  }
  return (
    <TouchableOpacity>
      <View style={styles.record}>
        <FontAwesome5
          name='record-vinyl'
          color={Colors.light.background}
        />
        <Text style={styles.recordText}>
          {recordingState === 'recording'
            ? 'Recording...'
            : 'Paused'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface RecordingOptionsProps {
  onSave: () => void;
}
export const RecordingOptions: React.FC<
  RecordingOptionsProps
> = ({ onSave }) => {
  const {
    recordingState,
    changeRecordingState,
    discardRecording,
  } = useRecording();

  return (
    <View style={styles.footer}>
      <View style={styles.recordingOptions}>
        <TouchableOpacity onPress={discardRecording}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name='delete'
              size={20}
            />
          </View>
        </TouchableOpacity>
        {recordingState === 'recording' ? (
          <TouchableOpacity
            onPress={() => changeRecordingState('paused')}
          >
            <View style={styles.iconContainer}>
              <AntDesign
                name='pausecircleo'
                color='#E20F0F'
                size={20}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              changeRecordingState('recording')
            }
          >
            <View style={styles.iconContainer}>
              <FontAwesome5
                name='record-vinyl'
                color='#E20F0F'
                size={20}
              />
            </View>
          </TouchableOpacity>
        )}

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
