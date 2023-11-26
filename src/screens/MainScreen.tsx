import {View} from 'react-native';

import {CustomButton, OrdinaryText} from '../components/common';
import {ScreenContainer, Section} from '../components/core';

import {theme} from '../utils/theme';
import {FOOD_LIST} from '../navigations/navigations';
import useFoodStore from '../stores/foodStore';

type NutritionData = {
  kkal: number;
  protein: number;
  fat: number;
  carb: number;
};

const NUTRITION_DATA: NutritionData = {
  kkal: 500,
  protein: 100,
  fat: 50,
  carb: 200,
};

const FOOD_DATA = [
  {
    id: 1,
    foodName: 'Rice',
    weightType: 'gram',
    weight: 100,
    kkal: 100,
    protein: 10,
    fat: 5,
    carb: 20,
  },
  {
    id: 2,
    foodName: 'Chicken',
    weightType: 'gram',
    weight: 100,
    kkal: 200,
    protein: 20,
    fat: 10,
    carb: 20,
  },
  {
    id: 3,
    foodName: 'Egg',
    weightType: 'gram',
    weight: 100,
    kkal: 300,
    protein: 30,
    fat: 15,
    carb: 30,
  },
  {
    id: 4,
    foodName: 'Apple',
    weightType: 'gram',
    weight: 100,
    kkal: 400,
    protein: 40,
    fat: 20,
    carb: 40,
  },
  {
    id: 5,
    foodName: 'Banana',
    weightType: 'gram',
    weight: 100,
    kkal: 500,
    protein: 50,
    fat: 25,
    carb: 50,
  },
  {
    id: 6,
    foodName: 'Orange',
    weightType: 'gram',
    weight: 100,
    kkal: 600,
    protein: 60,
    fat: 30,
    carb: 60,
  },
  {
    id: 7,
    foodName: 'Pineapple',
    weightType: 'gram',
    weight: 100,
    kkal: 700,
    protein: 70,
    fat: 35,
    carb: 70,
  },
  {
    id: 8,
    foodName: 'Watermelon',
    weightType: 'gram',
    weight: 100,
    kkal: 800,
    protein: 80,
    fat: 40,
    carb: 80,
  },
  {
    id: 9,
    foodName: 'Mango',
    weightType: 'gram',
    weight: 100,
    kkal: 900,
    protein: 90,
    fat: 45,
    carb: 90,
  },
  {
    id: 10,
    foodName: 'Strawberry',
    weightType: 'gram',
    weight: 100,
    kkal: 1000,
    protein: 100,
    fat: 50,
    carb: 100,
  },
];

const MainScreen = ({navigation}: {navigation: any}) => {
  const {list: foodList} = useFoodStore();
  console.log(
    '🚀 ~ file: MainScreen.tsx:129 ~ MainScreen ~ foodList:',
    foodList,
  );
  return (
    <ScreenContainer>
      <Section>
        <View style={{paddingVertical: 16, alignItems: 'center', flex: 1}}>
          <OrdinaryText>Hi, Welcome to the This App!</OrdinaryText>
          <View
            style={{
              marginTop: 16,
              width: '100%',
              alignItems: 'center',
            }}>
            <OrdinaryText>
              What you have eaten today? Let's track it!
            </OrdinaryText>

            <View
              style={{
                marginTop: 40,
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: theme.colors.gray[100],
                borderRadius: 8,
              }}>
              {FOOD_DATA.map((item: any, index: number) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      width: '100%',
                      marginTop: index === 0 ? 0 : 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <OrdinaryText>{item.foodName}</OrdinaryText>
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <OrdinaryText>
                        {item.weight} {item.weightType}
                      </OrdinaryText>
                    </View>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                marginTop: 40,
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: theme.colors.gray[100],
                borderRadius: 8,
              }}>
              {Object.keys(NUTRITION_DATA).map((key: any, index: number) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      marginTop: index === 0 ? 0 : 16,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <OrdinaryText>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </OrdinaryText>
                    </View>
                    <View
                      style={{
                        flex: 1,
                      }}>
                      <OrdinaryText>
                        {NUTRITION_DATA[key as keyof NutritionData]}
                      </OrdinaryText>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={{marginTop: 40, width: '100%'}}>
              <CustomButton
                text="Add Food"
                action={() => navigation.navigate(FOOD_LIST)}
                customStyle={{
                  width: '100%',
                  fontweight: 'bold',
                }}
              />
            </View>
          </View>
        </View>
      </Section>
    </ScreenContainer>
  );
};

export default MainScreen;
