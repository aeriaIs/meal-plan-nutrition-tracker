import {View} from 'react-native';

import {
  BasicDivider,
  CollapsibleBox,
  CustomButton,
  OrdinaryText,
} from '../components/common';
import {HeaderBar, Section} from '../components/core';

import {theme} from '../utils/theme';

import useFoodStore from '../stores/foodStore';
import {Fragment} from 'react';

const FoodListScreen = ({navigation}: {navigation: any}) => {
  const {list: foodList} = useFoodStore();

  return (
    <>
      <HeaderBar
        title="Food List"
        customTitleStyle={{
          textAlign: 'center',
        }}
        leftContent={{
          onPress: () => navigation.goBack(),
        }}
      />
      <Section>
        <View style={{paddingVertical: 16, alignItems: 'center', flex: 1}}>
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
                width: '100%',
                marginTop: 40,
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: theme.colors.gray[100],
                borderRadius: 8,
              }}>
              {foodList.map((food: any, index: number) => {
                console.log(
                  '🚀 ~ file: FoodList.tsx:93 ~ {foodList.map ~ food:',
                  food,
                );

                return (
                  <Fragment key={index}>
                    <CollapsibleBox
                      customContainerStyle={{
                        paddingVertical: 8,
                      }}
                      header={
                        <OrdinaryText weight="bold" size={16}>
                          {food.name}
                        </OrdinaryText>
                      }
                      content={
                        <View>
                          {Object.keys(food.nutrition).map(
                            (key: string, idx: number) => {
                              return (
                                <View
                                  key={idx}
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: 4,
                                  }}>
                                  <OrdinaryText>{key}</OrdinaryText>
                                  <OrdinaryText>
                                    {food.nutrition[key]}
                                  </OrdinaryText>
                                </View>
                              );
                            },
                          )}
                        </View>
                      }
                    />
                    <BasicDivider height={1} marginVertical={0} />
                  </Fragment>
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
              <OrdinaryText>Nutrition Data</OrdinaryText>
            </View>

            <View style={{marginTop: 40, width: '100%'}}>
              <CustomButton
                text="Add Food"
                customStyle={{
                  width: '100%',
                  fontweight: 'bold',
                }}
              />
            </View>
          </View>
        </View>
      </Section>
    </>
  );
};

export default FoodListScreen;
