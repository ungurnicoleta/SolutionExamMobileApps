import React from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class MyInput extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            student: null,
            data: []
        }
    }

    static navigationOptions = {
        title: 'Please sign in',
    };


    async saveKey(value) {
        try {
            await AsyncStorage.setItem('@StudentName:key', value);
            console.log(value);
        } catch (error) {
            console.log("Error saving data" + error);
        }
    }

    render() {
        return (
            <View
                style={{
                    marginTop: 50,
                    marginLeft: 10,
                    marginRight: 10,
                }}>
                <Image source={require('../myApp.png')} style={{width: 200, height: 250, alignSelf: "center", marginBottom: 20}}/>

                <Text style={{fontWeight: "bold", textAlign: "center", marginBottom: 20}}>Student's name</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#7e2242',
                        borderWidth: 1.5,
                        marginTop: 20,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    placeholder="Enter student's name"
                    value={this.state.student}
                    onChangeText={(value) => this.saveKey(value)}
                />
            </View>
        );
    }
}

