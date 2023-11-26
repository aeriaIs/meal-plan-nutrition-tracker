import {create} from 'zustand';
import {
  persist,
  createJSONStorage,
  subscribeWithSelector,
} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Example of Food data structure
// {
//   id: 1,
//   name: 'Pizza',
//   image:
//     'https://m.ftscrt.com/food/49aed08f-acb4-4aa4-a12d-2f88d26db3a9_lg_sq.jpg',
//   unit: 'gram',
//   size: 50,
//   nutrition: {
//     calories: 65,
//     protein: 1.2,
//     carbs: 14.3,
//     fat: 0.1,
//   },
// },

type FoodState = {
  isLoading: boolean;
  list: any[];
  detail: any;

  addFoodAction: (data: any, callback?: () => void) => void;
};

const initialState = {
  isLoading: false,
  list: [
    {
      id: 1,
      name: 'Pizza',
      image:
        'https://m.ftscrt.com/food/49aed08f-acb4-4aa4-a12d-2f88d26db3a9_lg_sq.jpg',
      unit: 'gram',
      size: 50,
      nutrition: {
        calories: 65,
        protein: 1.2,
        carbs: 14.3,
        fat: 0.1,
      },
    },
    {
      id: 2,
      name: 'Dada Ayam',
      image:
        'https://m.ftscrt.com/food/49aed08f-acb4-4aa4-a12d-2f88d26db3a9_lg_sq.jpg',
      unit: 'gram',
      size: 100,
      nutrition: {
        calories: 195,
        protein: 28,
        carbs: 0,
        fat: 7.72,
      },
    },
    {
      id: 3,
      name: 'Telur Rebus',
      image:
        'https://m.ftscrt.com/food/49aed08f-acb4-4aa4-a12d-2f88d26db3a9_lg_sq.jpg',
      unit: 'butir',
      size: 1,
      nutrition: {
        calories: 77,
        protein: 6.2,
        carbs: 0.56,
        fat: 5.28,
      },
    },
    {
      id: 4,
      name: 'Telur Goreng',
      image:
        'https://m.ftscrt.com/food/49aed08f-acb4-4aa4-a12d-2f88d26db3a9_lg_sq.jpg',
      unit: 'butir',
      size: 1,
      nutrition: {
        calories: 89,
        protein: 6.2,
        carbs: 0.43,
        fat: 6.76,
      },
    },
  ],
  detail: {},
};

const useFoodStore = create<FoodState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        ...initialState,
        addFoodAction: (data: any, callback?: () => void) => {
          const {list} = get();

          set({
            isLoading: true,
          });

          set({
            isLoading: false,
            list: [
              {
                id: list.length + 1,
                ...data,
              },
              ...list,
            ],
          });

          callback && callback();
        },
      }),
      {
        name: 'food-data',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state: any) => {
          const {list} = state;

          return {
            list,
          };
        },
      },
    ),
  ),
);

export default useFoodStore;
