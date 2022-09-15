import { View } from "../components/View"
import { Text } from "../components/Text"
import { FontAwesomeIconType } from "../constants/FontAwesomeIconType"
import { FlatList } from 'react-native';
import { Button } from "../components/Button";
import { ListRenderItemInfo, StyleSheet } from 'react-native'
import { getStyle } from "../Utils/Utils";
import { useEffect, useLayoutEffect } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Level1Header } from '../components/Headers/Level1Header';

export const MenuScreen = ({ navigation }: any) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            header: (props: NativeStackHeaderProps) => <Level1Header title='Menu' />
        })
    })

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e: any) => {
            // button press xD
        });

        return unsubscribe;
    })

    const renderItems = ({ item }: ListRenderItemInfo<MenuItem>) => {
        return (
            <Button text={item.name} iconName={item.icon} iconColor='azure' onPress={() => navigation.navigate(item.target)} style={style.flat_list_item} />
        )
    }

    return (
        <View style={getStyle().flex_c_s}>
            <FlatList
                style={{ flex: 1 }}
                data={getListItem()}
                renderItem={renderItems}
                keyExtractor={item => item.id} />
        </View>
    )
}

const style = StyleSheet.create({
    flat_list_item: {
        marginHorizontal: 30
    }
})

const getListItem = (): MenuItem[] => {
    return [
        {
            id: '1',
            name: 'Setting',
            icon: 'gear',
            target: 'Setting'
        }
    ]
}

type MenuItem = {
    id: string,
    name: string,
    target: string,
    icon: FontAwesomeIconType
}
