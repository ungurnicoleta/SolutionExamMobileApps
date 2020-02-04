import * as React from 'react';
import {Button, View, StyleSheet, TextInput, Text, Picker,} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as NetInfo from '@react-native-community/netinfo';

const url = "http://192.168.1.4:2902";

export default class Change extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myStatus: "",
            cost: null,
            myData: []
        }
    }

    static navigationOptions = {
        title: 'Change',
    };


    updateStatus = (text) => {
        this.setState({ myStatus: text });
        console.log(this.state.myStatus);

    };


    updateCost = (text) => {
        this.setState({ cost: text });
        console.log(this.state.cost);
    };



    _addData = async () => {
        console.log(this.props.id)
        console.log(url + "/request");
        const data = {
            id: this.props.navigation.state.params.id,
            status: this.state.myStatus,
            cost: this.state.cost
        };
        console.log(url + "/change");
        console.log(data);
        NetInfo.fetch().then(async state => {
                console.log("Connection type", state.type);
                console.log("Is connected?", state.isConnected);
                if (state.isConnected === true) {
                    fetch(url + "/change", {
                        method: 'POST',
                        headers: new Headers({
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }),
                        body: JSON.stringify(data),
                    }).then(response => {
                        console.log(response.status);
                    }).then(alert("The data was changed: \n" + "\nCost: " + data.cost + "\nStatus: " + data.status)).then(this.props.navigation.navigate('Home'))
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
                <View style={styles.viewContainer}>
                    <View style={styles.viewContainer2}>
                        <Text style={{fontWeight: "bold", textAlign: "center"}}>Cost</Text>
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
                            value={this.state.cost}
                            onChangeText={this.updateCost}
                        />
                    </View>

                    <Text style={{fontWeight: "bold", textAlign: "center"}}>Status</Text>
                    <Picker selectedValue = {this.state.myStatus} onValueChange = {this.updateStatus} style={styles.picker}>
                        <Picker.Item label = "Open" value = "open" />
                        <Picker.Item label = "Canceled" value = "canceled" />
                        <Picker.Item label = "Filled" value = "filled" />
                        <Picker.Item label = "Postponed" value = "postponed" />
                    </Picker>
                </View>
                <Button title="Change" style={{marginTop: 40}}
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
