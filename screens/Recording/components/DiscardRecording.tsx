import React from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import { useRecording } from '../../../context/RecordContext';
import { styles, Colors, Props } from './styles';

export const DiscardRecording: React.FC<Props> = ({
  onDiscard = () => {},
  onSave,
}) => {
  const { discardRecording } = useRecording();
  const handleDiscard = () => {
    onDiscard();
    discardRecording();
  };
  return (
    <View style={styles.modalContentContainerStyle}>
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.content,
            {
              flex: 0.13,
            },
          ]}
        >
          <Text>Note that your data will be lost!</Text>
          <Text>
            Are you sure you wand to stop this recording?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode='contained'
              color={Colors.light.red}
              onPress={handleDiscard}
            >
              Yes, Got it!
            </Button>
            <Button mode='contained' onPress={onSave}>
              No, Keep On!
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
