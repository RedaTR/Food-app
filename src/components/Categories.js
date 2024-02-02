import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((categorie) => {
          const isActive = categorie.strCategory == activeCategory;
          return (
            <TouchableOpacity
              key={categorie.idCategory}
              onPress={() => handleChangeCategory(categorie.strCategory)}
              className="flex items-center space-y-1"
            >
              <View
                className={`rounded-full p-[6px] ${
                  isActive ? "bg-amber-400" : "bg-black/10"
                }`}
              >
                {/* <Image
                  source={{ uri: categorie.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                /> */}
                <CachedImage
                  uri={categorie.strCategoryThumb}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text
                className={`text-neutral-600 ${
                  isActive ? "font-bold" : "font-normal"
                }`}
                style={{ fontSize: hp(1.6) }}
              >
                {categorie.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;