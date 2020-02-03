import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
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
                    marginTop: 300,
                    marginLeft: 20,
                    marginRight: 20, display: 'flex', alignContent: "center"
                }}>
                <Text style={{fontWeight: "bold", textAlign: "center"}}>Student's name</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        marginTop: 20,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    value={this.state.student}
                    onChangeText={(value) => this.saveKey(value)}
                />
            </View>
        );
    }
}

