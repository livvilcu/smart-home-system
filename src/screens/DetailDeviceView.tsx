import React, {memo} from "react";
import {View, Text} from "react-native";
import Header from "../components/Header";

/**
 * DetailDeviceView where the device details can be viewed and updated.
 * TODO: update of the device by rendering the information in a form with edit and save button. The details should be sent to the backend and saved.
 * @param route
 * @param navigation
 * @constructor
 */
const DetailDeviceView = ({route, navigation}) => {

    const { item } = route.params;

    console.log(item);
    //TODO: the items should be retrieved from the backend and rendered
    return (
        <View style={{flex: 1, padding: 24}}>
            <Header>{item.title}</Header>
            <Text>{item.deviceId}</Text>
            <Text>{item.state}</Text>
        </View>
    )
}

export default memo(DetailDeviceView)