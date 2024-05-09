import React, {ReactElement} from 'react';
import {StyleSheet, Text, View} from "react-native";
import dayjs from "dayjs";

type PhotoListHeaderProps = {
    cameraFullName: string | undefined
    date: string | undefined
}

function PhotoListHeader(props: PhotoListHeaderProps): ReactElement {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.textSemiBold}>{props.cameraFullName}</Text>
                <Text style={styles.textRegular}>{dayjs(props.date).format('DD MMM, YYYY')}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DCCEBE'
    },
    textSemiBold: {
        fontSize: 18,
        lineHeight: 22,
        fontFamily: 'DosisSemiBold',
        color: 'black'
    },
    textRegular: {
        fontSize: 13,
        lineHeight: 22,
        fontFamily: 'DosisRegular',
        color: 'black'
    },
});
export default PhotoListHeader;
