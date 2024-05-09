import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Image} from "expo-image";
import {useNavigation} from "expo-router";
import {NavigationProp} from "@react-navigation/core";

export default function BackButton({ iconSrc }: { iconSrc: string }): React.JSX.Element {
    const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation();

    return (
        <Pressable onPress={() => navigation.goBack()}>
            <Image
                source={iconSrc}
                style={{width: 24, height: 24}}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({

});
