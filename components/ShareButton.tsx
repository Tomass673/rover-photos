import React, {ReactElement} from 'react';
import {Alert, Pressable, Share} from "react-native";
import {Image} from "expo-image";

type ShareButtonProps = {
    imgSource: string
}

function ShareButton(props: ShareButtonProps): ReactElement {
    const onShare = async () => {
        try {
            await Share.share({
                message: props.imgSource
            });
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };
    return (
        <>
            <Pressable onPress={() => onShare()}>
                <Image
                    source={require('../assets/icons/share.png')}
                    style={{width: 24, height: 24}}
                />
            </Pressable>
        </>
    );
}

export default ShareButton;
