import React from 'react';
import { Text, View } from '../../Themed';
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
      <Text lightColor='#2B7F68' style={{ flex: 0.3 }}>
        {id}
      </Text>
      <Text style={{ flex: 1 }}>{label}</Text>
      <Text>{size}</Text>
    </View>
  );
};
