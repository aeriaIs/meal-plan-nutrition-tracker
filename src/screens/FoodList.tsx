import {FlatList, View} from 'react-native';

import {CollapsibleBox, CustomButton, OrdinaryText} from '../components/common';
import {HeaderBar, ScreenContainer, Section} from '../components/core';

import {theme} from '../utils/theme';

import useFoodStore from '../stores/foodStore';

const FoodListScreen = ({navigation}: {navigation: any}) => {
  const {list: foodList} = useFoodStore();
  console.log(
    '🚀 ~ file: FoodList.tsx:17 ~ FoodListScreen ~ foodList:',
    foodList,
  );

  return (
    <ScreenContainer statusBar={true}>
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
          paddingVertical: 16,
        }}>
        <OrdinaryText align="center">
          List of food that you have added to your food list
        </OrdinaryText>
        <View style={{marginTop: 16}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            data={foodList}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({item, index}) => {
              return (
                <CollapsibleBox
                  key={index}
                  customContainerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.gray[200],
                  }}
                  header={
                    <OrdinaryText weight="bold">{item?.name}</OrdinaryText>
                  }
                  content={
                    <View>
                      {Object.keys(item.nutrition).map(
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
                              <OrdinaryText weight="semibold">
                                {item?.nutrition[key]} {item.unit}
                              </OrdinaryText>
                            </View>
                          );
                        },
                      )}
                    </View>
                  }
                />
              );
            }}
          />
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
      </Section>
    </ScreenContainer>
  );
};

export default FoodListScreen;
