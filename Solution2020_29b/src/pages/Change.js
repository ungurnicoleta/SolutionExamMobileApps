import * as React from 'react';
import {Button, View, StyleSheet, TextInput, Text, Picker,} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as NetInfo from '@react-native-community/netinfo';

const url = "http://192.168.43.120:2502";

export default class Change extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myStatus: "",
            myData: []
        }
    }

    static navigationOptions = {
        title: 'Book a new game',
    };



    _addData = async () => {
        console.log(this.props.navigation.state.params.id);
        console.log(url + "/book");
        const value = await AsyncStorage.getItem('@StudentName:key');
        const data = {
            id: this.props.navigation.state.params.id,
            user: value,
        };
        console.log(url + "/book");
        console.log(data);
        NetInfo.fetch().then(async state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected === true) {
                    fetch(url + "/book", {
                        method: 'POST',
                        headers: new Headers({
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }),
                        body: JSON.stringify(data),
                    }).then(response => {
                        console.log(response.status + "---> FROM ADD GAME");
                    }).then(alert("The game " + + data.id + " was booked by: "+  "\nUser: " + data.user)).then(this.props.navigation.navigate('Home'))
                } else {
                    alert("You are offline!");
                    await this.storeData(data);
                    console.log('Is not online');
                    this.props.navigation.navigate('GetAllOpen')
                }
            }
        )};


    render() {
        return (
            <>
                <Button title="Book this game" style={{marginTop: 40}}
                        color="#30516E" onPress={this._addData}/>
            </>
        );
    }
}


const styles = StyleSheet.create({
    viewContainer: {
        margin: 40
    },

    picker: {
        height: 40,
        marginBottom:100,
        borderColor: 'black',
        borderWidth: 1,
    }
});
