import {Animated, View, Pressable, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';
import {colors as MyColors} from '../../styles';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

export default function Modal({navigation, route}) {
  let {message, icon} = route.params;
  const {current} = useCardAnimation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.8)'},
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          padding: 16,
          width: '90%',
          maxWidth: 400,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: MyColors.BLACK_3,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Text style={{paddingVertical: 20}}>{message}</Text>
        <Button title={'Okay'} onPress={navigation.goBack} />
      </Animated.View>
    </View>
  );
}
