import {NavigationContainer} from "@react-navigation/native";
import {DetailDeviceView, LoginScreen, OverviewScreen, RoomsScreen, WelcomeScreen} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {View, Text, Alert, BackHandler} from "react-native";
import {Button} from "react-native-paper";
import {getUser} from "../core/utils";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DevicesScreen from "../screens/DevicesScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NotificationsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>MessagesScreen!</Text>
        </View>
    );
}

/**
 * In the Settings screen we should find account specific settings. Currently, for testing there is just the logout button.
 * @constructor
 */
function SettingsScreen() {

    // FIXME: method is not redirecting the user to login page after pressing logout.
    const logOut = async () => {
        return AsyncStorage.removeItem("user");
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button icon="camera" mode="contained" onPress={() => logOut()}>
                Logout
            </Button>
        </View>
    );
}

/**
 * After Login user is redirected to the OverviewScreen Tab, in HomeScreen.
 * In HomeScreen I have defined 3 tabs. One for notifications, one for account settings and one used as an overview of the home system.
 * The initial route name is OverviewScreen.
 * @constructor
 */
function HomeScreen() {
    const handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                }
            ],
            {
                cancelable: false
            }
        );
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    }, []);

    return (
        <Tab.Navigator initialRouteName="OverviewScreen" screenOptions={{headerShown: false}}>
            <Tab.Screen name="NotificationsScreen" component={NotificationsScreen} options={{title: "Notifications"}}/>
            <Tab.Screen name="Settings" component={SettingsScreen} options={{title: "Settings"}}/>
            <Tab.Screen name="OverviewScreen" component={OverviewScreen} options={{title: "Overview"}}/>
        </Tab.Navigator>
    );
}

/**
 * In the Navigation I tried to define the navigation flow and tried to define screen based on authenticated user.
 * Because the authentication is to be improved, this flow currently does not work as expected :). The isLoggedIn state is not updated as expected.
 * @constructor
 */
function Navigation() {

    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getUser().then(user => {
            if (user !== null) {
                setLoggedIn(true);
            }
        });

    });


    /**
     * I tried to pass the handler to child components, so the child components can update the value.
     * I came to conclusion that is not the best approach, and after some reading having the AuthContext will be the proper solution.
     * @param someValue
     */
    const handler = (someValue) => {
        setLoggedIn(someValue)
    }

    if (isLoggedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerBackVisible: false}} />
                    <Stack.Screen name="RoomsScreen" component={RoomsScreen}/>
                    <Stack.Screen name="DetailDeviceView" component={DetailDeviceView}/>
                    <Stack.Screen name="DevicesScreen" component={DevicesScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="WelcomeScreen">
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                    <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerBackVisible: false}} />
                    <Stack.Screen name="RoomsScreen" component={RoomsScreen}/>
                    <Stack.Screen name="DetailDeviceView" component={DetailDeviceView}/>
                    <Stack.Screen name="DevicesScreen" component={DevicesScreen}/>

                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}


export default Navigation;
