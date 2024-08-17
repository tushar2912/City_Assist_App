import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';
import LoginScreen from '../loginPage/login';
import SignUp from '../signup/signup';
import GetApp from '../apiInt/get';
import PostApp from '../apiInt/post';
import PutApp from '../apiInt/put';
import DeleteApp from '../apiInt/delete';
import Profile from '../profileInfo/profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Get/Filter':
                            iconName = 'search';
                            break;
                        case 'POST':
                            iconName = 'plus-circle';
                            break;
                        case 'PUT':
                            iconName = 'edit';
                            break;
                        case 'DELETE':
                            iconName = 'trash-2';
                            break;
                        case 'PROFILE':
                            iconName = 'user';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    // Return the appropriate icon component
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Get/Filter" component={GetApp} />
            <Tab.Screen name="POST" component={PostApp} />
            <Tab.Screen name="PUT" component={PutApp} />
            <Tab.Screen name="DELETE" component={DeleteApp} />
            {/* <Tab.Screen name="ADDTOCART" component={AddToCart} /> */}
            <Tab.Screen name="PROFILE" component={Profile} />
        </Tab.Navigator>
    );
};

function App() {
    const logout1 = () => {
        console.log("function has been called")
        // navigation.navigate('SignIn');
    };
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerLeft: null }}>
                <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name='home' component={TabNav} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

