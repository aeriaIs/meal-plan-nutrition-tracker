import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ADD_FOOD, FOOD_LIST, MAIN} from './navigations';

import MainScreen from '../screens/MainScreen';
import FoodListScreen from '../screens/FoodList';
import AddFoodScreen from '../screens/AddFood';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={MAIN}
            component={MainScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name={FOOD_LIST}
            component={FoodListScreen}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name={ADD_FOOD}
            component={AddFoodScreen}
            options={{animation: 'slide_from_right'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
