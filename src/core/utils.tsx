import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: method to be improved and take the state of the user from the AuthContext
export const getUser = async () => {
    try {
        return await AsyncStorage.getItem("user");
    } catch (error) {
        console.log(error);
    }
};

export const logOut = async () => {
    return AsyncStorage.removeItem("user");
};