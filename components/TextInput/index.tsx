import { FC } from 'react';
import { TextInput as PTextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import Colors from '../../constants/Colors';

export const TextInput: FC<
  TextInputProps | { [key: string]: any }
> = ({ style = {}, ...props }) => {
  return (
    <PTextInput
      {...props}
      style={[
        {
          fontSize: 14,
          height: 40,
          marginVertical: 5,
          padding: 2,
        },
        style,
      ]}
      autoComplete={false}
      mode='outlined'
      activeOutlineColor={Colors.light.primary}
      outlineColor={Colors.light.tabIconDefault}
      theme={{}}
    />
  );
};
