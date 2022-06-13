import React, {memo, useEffect} from "react";
import Header from "../components/Header";
import Background from "../components/Background";
import {Button} from "react-native-paper";
import {getUser} from "../core/utils";

/**
 * When the application is opened and the user is not logged in, he should be redirected to the WelcomeScreen where he can login or register.
 * @param navigation
 * @constructor
 */
const WelcomeScreen = ({navigation}) => {

    /**
     * if the user is already logged in he should be redirect after the components has mounted to the HomeScreen
     */
    useEffect(() => {
        getUser().then(user => {
            if (user !== null) {
                navigation.navigate("HomeScreen");
            }
        });
    });

    // TODO: RegisterScreen is not implemented
    return(
        <Background>
            <Header>Welcome</Header>

            <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
                Login
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate('RegisterScreen')}>
                Register
            </Button>
        </Background>
    )
}

export default memo(WelcomeScreen)