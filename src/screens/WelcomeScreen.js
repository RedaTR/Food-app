import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1Padding.value = 0;
        ring2Padding.value = 0;
        setTimeout(
            ()=> 
            ring1Padding.value = withSpring(ring1Padding.value+hp(5), 100))
        setTimeout(
          () =>
            (ring2Padding.value = withSpring(ring2Padding.value + hp(5), 100))
        );

        setTimeout(() => navigation.navigate('Home'), 2500)
    },[])

  return (
    <View className="flex-1 items-center justify-center bg-amber-500">
      <StatusBar style="light" />

      {/* logo images with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ring1Padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2Padding}}>
          <Image
            style={{ width: hp(20), height: hp(20) }}
            source={require("../../assets/images/welcome.png")}
          />
        </Animated.View>
      </Animated.View>
      {/* title and some text */}
      <View className="flex items-center space-y-2">
        <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">
          Foody
        </Text>
        <Text style={{fontSize: hp(2)}} className="font-bold text-white tracking-widest">
          Food is always right
        </Text>
      </View>
    </View>
  );
}

export default WelcomeScreen