import {FlatList, View, BackHandler, StyleSheet} from "react-native";
import React, { memo, useEffect, useState} from "react";
import {ActivityIndicator, List} from 'react-native-paper';

const RoomsScreen = ({navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    const getRooms = async () => {
        try {
            const rooms = await fetch('https://cd86c5c7-716c-4249-8eda-21e6ae052c75.mock.pstmn.io/api/v1/rooms');
            const roomsJson = await rooms.json();
            setData(roomsJson)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleBackButton = () => {
        navigation.navigate("HomeScreen");
        return true;
    }

    useEffect(() => {
        getRooms();
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    }, []);

    const renderItem = (item) => {
        const devices = item.devices;

        return (<List.Section>
                <List.Accordion
                    title={item.title}>
                    <FlatList
                        data={devices}
                        keyExtractor={device => device.deviceId}
                        renderItem={({item, index, separators}) => (
                            <ListItem entry={item}/>
                        )}
                    />
                </List.Accordion>
            </List.Section>
        )
    }
    return (
        <View style={{flex: 1, padding: 24}}>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    renderItem={({item}) => {
                        return renderItem(item)
                    }}
                    keyExtractor={item => item.roomId}
                />
            )}
        </View>
    );
}

const ListItem = (props) => {
    const [isOn, setIsOn] = useState(props.entry.state);

    const descriptionStyle = isOn ? styles.isOn : styles.isOff;
    const description = isOn ? "On" : "Off";

    return(
        <List.Item descriptionStyle={descriptionStyle}
                   title={props.entry.title}
                   description={description}
                   onPress={() => setIsOn(!isOn)}
        />
    )
}

const styles = StyleSheet.create({
        isOn: {
            color: '#008000'
        },
        isOff: {
            color: '#686868'
        }
    }
);

/***
 * When a component is wrapped in React.memo(), React renders the component and memoizes the result.
 * Before the next render, if the new props are the same, React reuses the memoized result skipping the next rendering.
 */
// TODO: Using memo it might be not the best choice for all the components. I should consider changing this to something else.
// TODO: For now I think it is fine because I am using always the same data.
export default memo(RoomsScreen);