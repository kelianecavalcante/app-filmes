import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import Movies from '../pages/Movies';
import StackRoutes from './stackRoutes';


const Drower = createDrawerNavigator();

function Routes() {
    return (
        <Drower.Navigator
            screenOptions={{
                headerShown: false,

                drawerStyle: {
                    backgroundColor: '#090A0E',
                    paddingTop: 20,
                },
                drawerActiveBackgroundColor: '#E72F49',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#FFF',
            }}

        >
            <Drower.Screen
                name="HomeDrawer"
                component={StackRoutes}
                options={{
                    title: 'Home',

                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'movie-open' : 'movie-outline'}
                            size={size}
                            color={color}
                        />

                    )
                }}
            />
            <Drower.Screen
                name="Movies"
                component={Movies}
                options={{
                    title: 'Meus filmes',

                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'archive' : 'archive-outline'}
                            size={size}
                            color={color}

                        />
                    )
                }}
            />
        </Drower.Navigator>
    )
}
export default Routes;
