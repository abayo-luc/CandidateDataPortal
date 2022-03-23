import { DefaultTheme } from 'react-native-paper';

const tintColorLight = '#2B7F68';
const tintColorDark = '#fff';

export default {
  light: {
    ...DefaultTheme.colors,
    primary: '#2B7F68',
    accent: '#F2F9F7',
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
