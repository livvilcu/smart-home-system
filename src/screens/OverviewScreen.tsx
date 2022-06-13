import React, {memo, useEffect, useState} from "react";
import {ScrollView, View} from "react-native";
import {ActivityIndicator, Divider} from "react-native-paper";
import {List} from 'react-native-paper';

const OverviewScreen = ({navigation}) => {


    const [isLoading, setLoading] = useState(true);
    const [devicesCount, setDevicesCount] = useState([]);
    const [roomsCount, setRoomsCount] = useState([]);
    const [scenesCount, setScenesCount] = useState([]);

    const getOverview = async () => {
        try {
            const overview = await fetch('https://cd86c5c7-716c-4249-8eda-21e6ae052c75.mock.pstmn.io/api/v1/overview');
            const overviewJson = await overview.json();
            setDevicesCount(overviewJson.devices?.length);
            setRoomsCount(overviewJson.rooms?.length);
            setScenesCount(overviewJson.scenes?.length);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getOverview();
    }, []);

    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? <ActivityIndicator/> : (
                <ScrollView>
                    <List.Item
                        title="Devices"
                        description={devicesCount}
                        onPress={() => navigation.navigate('DevicesScreen')}
                    />
                    <Divider/>
                    <List.Item
                        title="Rooms"
                        description={roomsCount}
                        onPress={() => navigation.navigate('RoomsScreen')}
                    />
                    <Divider/>
                    <List.Item
                        title="Scenes"
                        description={scenesCount}
                    />

                </ScrollView>
            )}
        </View>
    );
}

export default memo(OverviewScreen)