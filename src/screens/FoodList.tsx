import {FlatList, View} from 'react-native';

import {CollapsibleBox, CustomButton, OrdinaryText} from '../components/common';
import {HeaderBar, ScreenContainer, Section} from '../components/core';

import {theme} from '../utils/theme';

import {ADD_FOOD} from '../navigations/navigations';

import useFoodStore from '../stores/foodStore';

const FoodListScreen = ({navigation}: {navigation: any}) => {
  const {list: foodList} = useFoodStore();

  return (
    <ScreenContainer>
      <HeaderBar
        title="Food List"
        customTitleStyle={{
          textAlign: 'center',
        }}
        leftContent={{
          onPress: () => navigation.goBack(),
        }}
      />
      <Section
        customStyle={{
          paddingVertical: 8,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          ListHeaderComponent={
            <>
              <OrdinaryText align="center">
                List of food that you have added to your food list
              </OrdinaryText>
            </>
          }
          data={foodList}
          keyExtractor={(item: any) => item.id?.toString()}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: FoodList.tsx:42 ~ FoodListScreen ~ item:',
              item,
            );
            return (
              <CollapsibleBox
                key={index}
                customContainerStyle={{
                  marginTop: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.gray[200],
                }}
                header={
                  <OrdinaryText weight="bold" size={16}>
                    {item?.name}
                  </OrdinaryText>
                }
                content={
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 4,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.darkBlue[400],
                      }}>
                      <OrdinaryText weight="semibold">Size:</OrdinaryText>
                      <OrdinaryText
                        weight="bold"
                        color={theme.colors.main[500]}
                        style={{
                          textTransform: 'capitalize',
                        }}>
                        {item?.size} {item?.unit}
                      </OrdinaryText>
                    </View>
                    <View
                      style={{
                        marginTop: 4,
                      }}>
                      {Object.keys(item?.nutrition).map(
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
                              <OrdinaryText
                                style={{
                                  textTransform: 'capitalize',
                                }}>
                                {key}
                              </OrdinaryText>
                              <OrdinaryText
                                weight="semibold"
                                color={theme.colors.main[500]}>
                                {item?.nutrition[key]} Gram
                              </OrdinaryText>
                            </View>
                          );
                        },
                      )}
                    </View>
                  </View>
                }
              />
            );
          }}
        />

        <View style={{marginTop: 40, width: '100%'}}>
          <CustomButton
            text="Add Food"
            action={() => navigation.navigate(ADD_FOOD)}
            customStyle={{
              width: '100%',
              fontweight: 'bold',
            }}
          />
        </View>
      </Section>
    </ScreenContainer>
  );
};

export default FoodListScreen;
