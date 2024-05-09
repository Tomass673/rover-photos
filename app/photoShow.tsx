import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet, View} from 'react-native';
import {useLocalSearchParams, useNavigation} from "expo-router";
import React, {useEffect} from "react";
import { Image } from 'expo-image';
import {BLUR_HASH} from "@/constants/config";
import PhotoShowHeader from "@/components/PhotoShowHeader";
import ShareButton from "@/components/ShareButton";
import {NavigationProp} from "@react-navigation/core";

type PhotoShowParams = {
    source: string
    photoID: string
}

export default function PhotoShow(): React.JSX.Element {
    const params: PhotoShowParams = useLocalSearchParams();
    const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerTitle: () => <PhotoShowHeader photoID={params.photoID} /> })
        navigation.setOptions({
            headerBackVisible: false,
            headerStyle: {
                backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerRight: () => <ShareButton imgSource={params.source} />
        })
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={params.source}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={1000}
            />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black',
    },
    image: {
        width: '90%',
        height: '95%',
        backgroundColor: '#DCCEBE',
        borderRadius: 8,
        marginTop: 10
    },
});
