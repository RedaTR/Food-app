import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Categories from "../components/Categories";
import axios from 'axios';
import Recipes from '../components/Recipes';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    getCatgories();
    getMeals();
  }, []);
  const handleChangeCategory = (category) =>{
    getMeals(category);
    setActiveCategory(category);
    setMeals([]);
  }
  const getCatgories = async() =>{
    try {
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
      if(response && response.data){
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const getMeals = async(catgorie = "beef") =>{
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catgorie}`
      );
      if(response && response.data){
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <Icon name="notifications" size={hp(5)} color="gray" />
        </View>
        {/* Greeting and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Reda!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own Food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>
        {/* Search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any receipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <Icon name="search" size={hp(2.5)} color={"gray"} />
          </View>
        </View>
        {/* Categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        {/* Recipes */}
        <View className="mx-4">
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen