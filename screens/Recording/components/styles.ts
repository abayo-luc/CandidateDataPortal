import { StyleSheet } from 'react-native';

import Layout from '../../../constants/Layout';
import Colors from '../../../constants/Colors';

export interface Props {
  onSave: () => void;
  onDiscard?: () => void;
}

export const styles = StyleSheet.create({
  modalContentContainerStyle: {
    position: 'absolute',
    width: Layout.window.width,
    height: Layout.window.height,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  content: {
    //flex: 0.3,
    backgroundColor: Colors.light.background,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    padding: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSm: {
    fontSize: 12,
    color: '#79797D',
  },
  text: {
    fontSize: 14,
  },
  spacing: {
    marginVertical: 2,
  },
});

export const labelRecordStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Layout.window.width,
    height: Layout.window.height,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  content: {
    flex: 0.4,
  },
  containerWithKeyboard: {
    position: 'absolute',
    bottom: Layout.window.height / 2.8,
  },
  section1: {
    backgroundColor: Colors.light.background,
    marginBottom: 10,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 21,
    marginHorizontal: 5,
  },
  section2: {
    backgroundColor: Colors.light.background,
    marginTop: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    flex: 1,
    padding: 21,
  },
});
export { Colors };
