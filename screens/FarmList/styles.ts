import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B7F68',
    opacity: 0.7,
  },
  section1: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section2: {
    flex: 0.7,
    backgroundColor: '#fff',
    width: '100%',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    opacity: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#C6D1DC',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  logo: {
    margin: 15,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.primary,
  },
});
