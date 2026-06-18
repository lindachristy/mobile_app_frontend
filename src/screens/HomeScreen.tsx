import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import HomescreenImage from '../assets/images/homescreen.svg';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.background }]}
      activeOpacity={1}
      onPress={() => navigation.navigate('Onboarding')}>
      <HomescreenImage width={300} height={300} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
