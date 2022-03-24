import { StyleSheet } from 'react-native';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  headerBack: {
    backgroundColor: Colors.light.background,
    padding: 2,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  record: {
    backgroundColor: '#E20F0F',
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordText: {
    color: Colors.light.background,
    fontSize: 12,
    marginLeft: 5,
  },
  footer: {
    bottom: 15,
    width: Layout.window.width,
    position: 'absolute',
    padding: 15,
  },
  recordingOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.light.background,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
