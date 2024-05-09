import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from "react-native";

type PhotoShowHeaderProps = {
    photoID: string | undefined
}

function PhotoShowHeader(props: PhotoShowHeaderProps): ReactElement {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textRegular}>PhotoID</Text>
                <Text style={styles.textSemiBold}>{props.photoID}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    textSemiBold: {
        fontSize: 18,
        lineHeight: 22,
        fontFamily: 'DosisSemiBold',
        color: 'white'
    },
    textRegular: {
        fontSize: 13,
        lineHeight: 22,
        fontFamily: 'DosisRegular',
        color: 'white'
    },
});
export default PhotoShowHeader;
