import {FlatList, View} from "react-native";
import React, {memo, useEffect, useState} from "react";
import {ActivityIndicator, Button, List} from "react-native-paper";

const DevicesScreen = ({navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getDevices = async () => {
        try {
            const devices = await fetch('https://cd86c5c7-716c-4249-8eda-21e6ae052c75.mock.pstmn.io/api/v1/devices');
            const devicesJson = await devices.json();
            setData(devicesJson)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDevices();
    }, []);



    const addNewDevice = () => {
       // TODO: user should be able to connect new devices and assigned them to the rooms. This method should navigate to a new screen for adding a new device.
    }


    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    keyExtractor={device => device.deviceId}
                    renderItem={({item}) => {
                        return (
                            <List.Item title={item.title}
                                       onPress={() => navigation.navigate("DetailDeviceView", {item: item})}
                            />
                        )
                    }}
                />
            )}


            <Button mode="contained" onPress={addNewDevice}>
                Add new device
            </Button>
        </View>
    )
}

export default memo(DevicesScreen)