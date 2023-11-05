import {View} from 'react-native';

import {OrdinaryText} from '../components/common';
import {Section} from '../components/core';

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

const MainScreen = () => {
  return (
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

          <View style={{marginTop: 40}}>
            {Object.keys(NUTRITION_DATA).map((key: any, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    marginTop: 16,
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
                    <OrdinaryText weight="bold">
                      {NUTRITION_DATA[key as keyof NutritionData]}
                    </OrdinaryText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Section>
  );
};

export default MainScreen;
