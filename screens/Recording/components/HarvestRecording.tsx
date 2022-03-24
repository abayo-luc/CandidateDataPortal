import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import moment from 'moment';
import { Button, TextInput } from 'react-native-paper';

import {
  styles,
  Props,
  labelRecordStyles,
  Colors,
} from './styles';
import useKeyboard from '../../../hooks/useKeyboard';

export const HarvestRecording: React.FC<Props> = ({
  onDiscard,
  onSave,
}) => {
  const [keyboardVisible] = useKeyboard();
  const [label, setLabel] = React.useState('');
  const [date, setDate] = React.useState('2016-05-15');
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
                value={label}
                onChangeText={(text) => setLabel(text)}
                placeholder='Year'
                style={{
                  backgroundColor: 'transparent',
                  padding: 0,
                }}
                autoComplete={false}
              />
              <TextInput
                value={label}
                onChangeText={(text) => setLabel(text)}
                placeholder='Season'
                style={{
                  backgroundColor: 'transparent',
                  padding: 0,
                }}
                autoComplete={false}
              />
              <TextInput
                value={label}
                onChangeText={(text) => setLabel(text)}
                placeholder='Crop'
                style={{
                  backgroundColor: 'transparent',
                  padding: 0,
                }}
                autoComplete={false}
              />
              <View style={styles.row}>
                <TextInput
                  value={label}
                  onChangeText={(text) => setLabel(text)}
                  placeholder='Quantity'
                  style={{
                    backgroundColor: 'transparent',
                    padding: 0,
                    flex: 0.75,
                  }}
                  autoComplete={false}
                />
                <TextInput
                  value={label}
                  onChangeText={(text) => setLabel(text)}
                  placeholder='Unit'
                  style={{
                    backgroundColor: 'transparent',
                    padding: 0,
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
                  onPress={onDiscard}
                >
                  Discard
                </Button>
                <Button
                  mode='contained'
                  style={{ flex: 0.45 }}
                  onPress={onSave}
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
