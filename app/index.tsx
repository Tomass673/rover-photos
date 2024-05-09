import { StatusBar } from 'expo-status-bar';
import {Platform, StyleSheet,  View} from 'react-native';
import React from "react";
import {Image} from "expo-image";
import Form from "@/components/Form";

export interface SelectValues {
    value: string
    label: string
}

export default function MainScreen() {
    return (
        <View style={styles.container}>
            <Form/>
            <View style={{width: '100%', height: '40%', backgroundColor: '#DCCEBE'}}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/rover.png')}
                    contentFit="cover"
                    transition={1000}
                />
            </View>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#DCCEBE',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
