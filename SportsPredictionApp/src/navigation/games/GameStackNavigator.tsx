import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from '../../components/screen/GameScreen';
import GameDetailScreen from '../../components/screen/GameDetailScreen';
import { Game } from '../../model/model';

export type GameStackParamList = {
    GameList: undefined;
    GameDetail: { game: Game , userId: string};
};

const Stack = createStackNavigator<GameStackParamList>();
const GameStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="GameList">
            <Stack.Screen
                name="GameList"
                component={GameScreen}
            />
            <Stack.Screen
                name="GameDetail"
                component={GameDetailScreen}
            />
        </Stack.Navigator>
    );
  };
export default GameStackNavigator;
