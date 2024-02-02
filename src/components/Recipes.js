import React, { useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mealData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { CachedImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";



const Recipes = ({categories, meals}) => {
    const navigation = useNavigation();
  return (
    <View clasName="space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <View>
        {categories.length > 0 && meals.length > 0 ? (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
            onEndReachedThreshold={0.1}
          />
        ) : (<Loading size="large" className="mt-20"/>)}
      </View>
    </View>
  );
};

export default Recipes;

const RecipeCard = ({ item, index, navigation }) => {
    
    const handlePressed = (idMeal) => {
        navigation.navigate("Details", {...item})
    }
    const isEven = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .springify()
        .damping(12)}
    >
      <Pressable
        onPress={()=> handlePressed(item.idMeal)}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        /> */}
        <CachedImage
          uri={item.strMealThumb }
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
