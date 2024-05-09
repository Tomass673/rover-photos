import React, {useState, ReactElement, useEffect} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import dayjs from "dayjs";
import {Image} from "expo-image";
import RNDateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {useRouter} from "expo-router";
import {useGetRoverInfoQuery} from "@/store/services/api";
import {Camera} from "@/store/apiTypes";
import {SelectValues} from "@/app";

function Form(): ReactElement {
    const router = useRouter();
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [maxDate, setMaxDate] = useState<Date>(new Date());
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const {data: roverData, isLoading: isLoadingRoverData, isFetching: isFetchingRoverData} = useGetRoverInfoQuery()

    const [open, setOpen] = useState<boolean>(false);
    const [cameraItems, setCameraItems] = useState<SelectValues[]>([
        {label: '', value: ''},
    ]);

    let camerasArr: SelectValues[] = []
    useEffect(() => {
        if (roverData) {
            setMaxDate(new Date(roverData.rover.max_date))
            setMinDate(new Date(roverData.rover.landing_date))
            roverData.rover.cameras.map((camera: Camera): void => {
                camerasArr.push({value: camera.name, label: camera.full_name})
            })
            setCameraItems(camerasArr)
        }
    }, [roverData]);

    const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined): void => {
        const currentDate: Date = selectedDate ? selectedDate : new Date();
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };
    function checkAndNavigateToList(): void {
        if(selectedDate && selectedCamera){
            const date: string = selectedDate.toISOString().split('T')[0]
            const cameraObj: SelectValues | undefined = cameraItems.find(({ value }): boolean => value === selectedCamera);

            router.navigate({ pathname: "/photoList", params: { date: date, camera: selectedCamera, cameraFullName: cameraObj?.label } });
        } else {
            alert('Please select camera and date');
        }
    }
    return (
        <>
            {isLoadingRoverData ?
                <ActivityIndicator size="large" color="#BF2E0E" />
                :
                <View style={styles.formCont}>
                    <Text style={styles.textRegular}>Rover Camera</Text>
                    <DropDownPicker
                        open={open}
                        value={selectedCamera}
                        items={cameraItems}
                        setOpen={setOpen}
                        setValue={setSelectedCamera}
                        setItems={setCameraItems}
                        style={styles.pickerContainer}
                        dropDownContainerStyle={styles.dropdownContainer}
                        textStyle={styles.pickerText}
                    />
                    <View style={styles.dateInputContainer}>
                        <Text style={styles.textRegular}>Date</Text>
                        <Pressable onPress={() => setShowDatePicker(true)}>
                            <View style={styles.picker}>
                                <Text style={styles.dateText}>
                                    {selectedDate ?
                                        dayjs(selectedDate).format('DD MMM, YYYY')
                                        :
                                        'Select a date'
                                    }
                                </Text>
                                <Image
                                    source={require('../assets/icons/calendar.png')}
                                    style={{width: 24, height: 24}}
                                />
                            </View>
                        </Pressable>
                    </View>
                    <Pressable style={styles.button} onPress={() => checkAndNavigateToList()}>
                        {({ pressed }) => (
                            <Text style={[styles.buttonText, { opacity: pressed ? 0.5 : 1}]}>Explore</Text>
                        )}
                    </Pressable>
                    {showDatePicker && (
                        <RNDateTimePicker
                            value={selectedDate ? selectedDate : maxDate}
                            maximumDate={maxDate}
                            minimumDate={minDate}
                            onChange={onChangeDate}
                        />
                    )}
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#DCCEBE',
    },
    formCont: {
        width: '90%',
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        rowGap: 10,
        backgroundColor: '#DCCEBE'
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#BF2E0E',
        borderRadius: 10,
        marginTop: 30,
    },
    buttonText:{
        color: 'white',
        fontFamily: 'DosisSemiBold',
        fontSize: 18,
        lineHeight: 22.75
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 60,
        borderRadius: 10,
        fontFamily: 'DosisRegular',
        paddingHorizontal: 17
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textRegular: {
        fontFamily: 'DosisRegular',
        fontSize: 14,
        lineHeight: 17.7,
        marginBottom: 4,
        color: 'black'
    },
    dateInputContainer: {
        backgroundColor: '#DCCEBE'
    },
    dateText: {
        fontFamily: 'DosisRegular',
        fontSize: 18,
        lineHeight: 22.75,
        color: 'black'
    },
    pickerContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: 60,
        borderRadius: 10,
        borderWidth: 0,
        paddingHorizontal: 17
    },
    dropdownContainer: {
        backgroundColor: "#eee7df",
        borderWidth: 0,
        borderRadius: 10,
    },
    pickerText: {
        fontSize: 18,
        lineHeight: 22.75,
        fontFamily: 'DosisRegular'
    }
});
export default Form;
