import {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';

import {
  CustomButton,
  CustomTextInput,
  OrdinaryText,
} from '../components/common';
import {HeaderBar, ScreenContainer, Section} from '../components/core';

import {theme} from '../utils/theme';

import {FOOD_LIST} from '../navigations/navigations';
import useFoodStore from '../stores/foodStore';

const AddFoodScreen = ({navigation}: {navigation: any}) => {
  const {addFoodAction, isLoading} = useFoodStore();

  const [foodName, setFoodName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [carb, setCarb] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [unitType, setUnitType] = useState<string>('');

  const handleAddFood = () => {
    const foodData = {
      name: foodName,
      unit: unitType,
      size: size,
      nutrition: {
        calories: calories,
        protein: protein,
        fat: fat,
        carb: carb,
      },
    };

    addFoodAction(foodData, () => {
      Alert.alert('Success', 'Food has been added', [
        {
          text: 'OK',
          onPress: () => navigation.navigate(FOOD_LIST),
        },
      ]);
    });
  };

  return (
    <ScreenContainer statusBar={true}>
      <HeaderBar
        title="Add New Food"
        customTitleStyle={{
          textAlign: 'center',
        }}
        leftContent={{
          onPress: () => navigation.goBack(),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Section>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <OrdinaryText>
              Make sure you have the nutrition data of the food you want to add
            </OrdinaryText>

            <View style={{marginTop: 28}}>
              <View
                style={{
                  marginTop: 4,
                }}>
                <OrdinaryText weight="medium" color={theme.colors.gray[100]}>
                  Food Data
                </OrdinaryText>
              </View>
              <CustomTextInput
                label="Food Name"
                placeholder="Food Name"
                value={foodName}
                onChangeText={setFoodName}
                style={{marginTop: 8}}
              />
              <CustomTextInput
                label="Unit Type"
                placeholder="ex. gram, piece, item, etc"
                value={unitType}
                onChangeText={setUnitType}
                style={{marginTop: 16}}
              />
              <CustomTextInput
                label="Size of unit"
                placeholder="Input size of unit type before size total"
                value={size}
                onChangeText={setSize}
                editable={unitType ? true : false}
                style={{marginTop: 16}}
              />

              <View
                style={{
                  marginTop: 24,
                }}>
                <OrdinaryText weight="medium" color={theme.colors.gray[100]}>
                  Nutrition Data
                </OrdinaryText>
              </View>

              <CustomTextInput
                label="Calories"
                placeholder="Input total calories"
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
                style={{marginTop: 8}}
                right={
                  <OrdinaryText
                    weight="semibold"
                    size={12}
                    color={theme.colors.gray[100]}>
                    Gram
                  </OrdinaryText>
                }
              />
              <CustomTextInput
                label="Protein"
                placeholder="Input total protein"
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
                style={{marginTop: 16}}
                right={
                  <OrdinaryText
                    weight="semibold"
                    size={12}
                    color={theme.colors.gray[100]}>
                    Gram
                  </OrdinaryText>
                }
              />
              <CustomTextInput
                label="Fat"
                placeholder="Input total fat"
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
                style={{marginTop: 16}}
                right={
                  <OrdinaryText
                    weight="semibold"
                    size={12}
                    color={theme.colors.gray[100]}>
                    Gram
                  </OrdinaryText>
                }
              />
              <CustomTextInput
                label="Carb"
                placeholder="Input total carb"
                value={carb}
                onChangeText={setCarb}
                keyboardType="numeric"
                style={{marginTop: 16}}
                right={
                  <OrdinaryText
                    weight="semibold"
                    size={12}
                    color={theme.colors.gray[100]}>
                    Gram
                  </OrdinaryText>
                }
              />
            </View>

            <View style={{marginTop: 40, width: '100%'}}>
              <CustomButton
                text="Add Food"
                action={handleAddFood}
                loading={isLoading}
                customStyle={{
                  width: '100%',
                  fontweight: 'bold',
                }}
              />
            </View>
          </View>
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AddFoodScreen;
