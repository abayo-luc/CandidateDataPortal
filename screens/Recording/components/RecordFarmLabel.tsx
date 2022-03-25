import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import { Button } from 'react-native-paper';
import { TextInput } from '../../../components';
import {
  styles,
  Props,
  labelRecordStyles,
  Colors,
} from './styles';
import { useRecording } from '../../../context/RecordContext';

export const RecordFarmLabel: React.FC<Props> = ({
  onDiscard,
  onSave,
}) => {
  const { setFarmData } = useRecording();
  const [size, setSize] = useState<string>();
  const [label, setLabel] = React.useState('');
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
            // keyboardVerticalOffset={60}
            style={labelRecordStyles.content}
          >
            <View style={[labelRecordStyles.section1]}>
              <View style={styles.row}>
                <Text style={styles.textSm}>Size</Text>
                <Text style={styles.textSm}>
                  Date Registered
                </Text>
              </View>
              <View style={[styles.row, styles.spacing]}>
                <TextInput
                  value={size}
                  onChangeText={(text: string) =>
                    setSize(text)
                  }
                  placeholder='---'
                  style={{
                    fontSize: 12,
                    height: 25,
                    minWidth: '20%',
                  }}
                  keyboardType='decimal-pad'
                />
                <Text style={styles.text}>
                  {moment().format('DD-MM-YY')}
                </Text>
              </View>
            </View>
            <View style={[labelRecordStyles.section2]}>
              <TextInput
                value={label}
                onChangeText={(text: string) =>
                  setLabel(text)
                }
                placeholder='Enter Farm Label*'
              />
              <View style={styles.modalButtons}>
                <Button
                  mode='contained'
                  color={Colors.light.red}
                  style={{ flex: 0.45 }}
                  onPress={onDiscard}
                >
                  Discard
                </Button>
                <Button
                  mode='contained'
                  style={{ flex: 0.45 }}
                  disabled={!label}
                  onPress={() => {
                    setFarmData({
                      size,
                      label,
                      sizeUnit: 'sqm',
                    });
                    onSave();
                  }}
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
