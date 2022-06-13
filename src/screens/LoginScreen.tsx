import Header from "../components/Header";
import Background from "../components/Background";
import React, {memo, useEffect, useState} from "react";
import {Appbar, Button, TextInput} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from "../core/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from "../core/utils";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState({value: '', error: ''});
    const [password, setPassword] = useState({value: '', error: ''});


    useEffect(() => {
        getUser().then(user => {
           if (user !== null) {
               navigation.navigate("HomeScreen");
           }
        });
    });

    const onLoginPressed = () => {
        if (email.value == null) {
            setEmail({...email, error: "You email is missing"});
            return;
        } else if (password.value == null) {
            setPassword({...password, error: "You password is missing"});
            return;
        } else if (email.value !== 'admin' || password.value !== 'admin' ) {
            setEmail({...email, error: "The user does not exist"});
            return;
        }

        // credentials for login are admin/admin
        AsyncStorage.setItem("user", "admin").then(() => navigation.navigate('HomeScreen'));

    };
    return (
        <Background>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.navigate('HomeScreen')}/>
            </Appbar.Header>

            <Header>Welcome back</Header>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    selectionColor={theme.colors.primary}
                    underlineColor="transparent"
                    mode="outlined"
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={text => setEmail({value: text, error: ''})}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                {email.error ? <Text style={styles.error}>{email.error}</Text> : null}
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    selectionColor={theme.colors.primary}
                    underlineColor="transparent"
                    mode="outlined"
                    label="Password"
                    autoCapitalize="none"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => setPassword({value: text, error: ''})}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
            </View>

            <Button mode="contained" onPress={onLoginPressed}>
                Login
            </Button>
        </Background>
    );
}
const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginVertical: 12
        },
        input: {
            backgroundColor: theme.colors.surface,
        },
        error: {
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
        }
    }
);
export default memo(LoginScreen)