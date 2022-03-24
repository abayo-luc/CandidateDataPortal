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

export const RecordFarmLabel: React.FC<Props> = ({
  onDiscard,
  onSave,
}) => {
  const [label, setLabel] = React.useState('');
  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios' ? 'padding' : 'height'
      }
      style={[labelRecordStyles.container]}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ flex: 1 }}
      >
        <View style={labelRecordStyles.innerContainer}>
          <View style={labelRecordStyles.content}>
            <View style={labelRecordStyles.section1}>
              <View style={styles.row}>
                <Text style={styles.textSm}>Size</Text>
                <Text style={styles.textSm}>
                  Date Registered
                </Text>
              </View>
              <View style={[styles.row, styles.spacing]}>
                <Text style={styles.text}>12 Acre</Text>
                <Text style={styles.text}>
                  {moment().format('DD-MM-YY')}
                </Text>
              </View>
            </View>
            <View style={[labelRecordStyles.section2]}>
              <TextInput
                value={label}
                onChangeText={(text) => setLabel(text)}
                placeholder='Enter Farm Label*'
                style={{
                  backgroundColor: 'transparent',
                  padding: 0,
                }}
                autoComplete={false}
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
                  onPress={onSave}
                >
                  Save
                </Button>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
