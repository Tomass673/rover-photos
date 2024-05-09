import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, FlatList, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {router, useLocalSearchParams, useNavigation} from "expo-router";
import React, {useCallback, useEffect} from "react";
import {useGetPhotosQuery} from "@/store/services/api";
import { Image } from 'expo-image';
import {BLUR_HASH} from "@/constants/config";
import PhotoListHeader from "@/components/PhotoListHeader";

type PhotoListParams = {
    date: string
    camera: string
    cameraFullName: string
}

export default function PhotoList() {
    const params: PhotoListParams = useLocalSearchParams();
    const navigation = useNavigation();
    const {data: photosData, isLoading: isLoadingPhotos, isFetching: isFetchingPhotos} = useGetPhotosQuery({
        earth_date: params.date,
        camera: params.camera
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <PhotoListHeader cameraFullName={params.cameraFullName} date={params.date}/>
        })
        navigation.setOptions({ headerBackVisible: false })
    }, []);

    type PhotoItemProps = {src: string, photoID: number};
    const renderPhotoItem = useCallback(({src, photoID}: PhotoItemProps) => (
        <Pressable
            style={styles.item}
            onPress={() => router.navigate({ pathname: "/photoShow", params: { source: src, photoID: photoID } })}
        >
            <Image
                style={styles.image}
                source={src}
                placeholder={BLUR_HASH}
                contentFit="cover"
                transition={1000}
            />
        </Pressable>
    ), []);
    return (
        <View style={styles.container}>
            {isLoadingPhotos ?
                <ActivityIndicator size="large" color="#BF2E0E" />
                :
                <FlatList
                    data={photosData?.photos}
                    renderItem={({item}) => renderPhotoItem({src: item.img_src, photoID: item.id})}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                />
            }

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCCEBE'
    },
    item: {
        margin: 5,
        backgroundColor: '#DCCEBE',
    },
    image: {
        flex: 1,
        width: 109,
        height: 109,
        backgroundColor: '#DCCEBE',
        borderRadius: 8,
    },
});
