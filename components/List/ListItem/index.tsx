import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';

interface Props {
  listItemStyle?: { [key: string]: any };
  id: string;
  label: string;
  size: string | number;
}
export const ListItem: React.FC<Props> = ({
  listItemStyle = {},
  ...props
}) => {
  const { id, label, size } = props;
  return (
    <View style={{ ...styles.container, ...listItemStyle }}>
      <Text style={{ flex: 0.3, ...styles.idSection }}>
        {id}
      </Text>
      <Text style={{ flex: 1 }}>{label}</Text>
      <Text>{size}</Text>
    </View>
  );
};
