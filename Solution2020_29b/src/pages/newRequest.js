import * as React from 'react';
import {Button, View, StyleSheet, TextInput, Text, Picker,} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const url = "http://192.168.43.120:2902";

export default class NewRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            myStatus: "",
            eCost: null,
            cost: null
        }
    }

    static navigationOptions = {
        title: 'Create a new request',
    };

    updateName = (text) => {
        this.setState({ name: text });
        console.log(this.state.name);
    };

    updateStatus = (text) => {
        this.setState({ myStatus: text });
        console.log(this.state.myStatus);

    };

    updateECost = (text) => {
        this.setState({ eCost: text });
        console.log(this.state.eCost);

    };

    updateCost = (text) => {
        this.setState({ cost: text });
        console.log(this.state.cost);
    };

     _addData = async () => {
        const value = await AsyncStorage.getItem('@StudentName:key');
        console.log(url + "/request");
        const data = {
            name: this.state.name,
            status: this.state.myStatus,
            student: value,
            eCost: this.state.eCost,
            cost: this.state.cost
        };
        console.log(url + "/request");
        console.log(data);
        fetch(url + "/request", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        }).then(response => {
            console.log(response.status);
        }).then(this.props.navigation.navigate('Home'));
     }

    render() {
        return (
            <>
            <View style={styles.viewContainer}>
                <Text style={{fontWeight: "bold", textAlign: "center"}}>Expense's name</Text>
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
                    value={this.state.name}
                    onChangeText={this.updateName}
                />

                <Text style={{fontWeight: "bold", textAlign: "center"}}>eCost</Text>
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
                    value={this.state.eCost}
                    onChangeText={this.updateECost}
                />
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

                <Text style={{fontWeight: "bold", textAlign: "center"}}>Status</Text>
                <Picker selectedValue = {this.state.myStatus} onValueChange = {this.updateStatus} style={styles.picker}>
                    <Picker.Item label = "Open" value = "open" />
                    <Picker.Item label = "Canceled" value = "canceled" />
                    <Picker.Item label = "Filled" value = "filled" />
                    <Picker.Item label = "Postponed" value = "postponed" />
                </Picker>
            </View>
            <Button title="Add Request" style={{marginTop: 40}}
                color="#30516E" onPress={this._addData}/>
        </>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
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
