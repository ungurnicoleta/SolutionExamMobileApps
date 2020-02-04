import * as React from 'react';
import {Button, View, StyleSheet, TextInput, Text, Picker,} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as NetInfo from '@react-native-community/netinfo';

const url = "http://192.168.1.4:2902";

export default class NewRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            myStatus: "open",
            eCost: null,
            cost: null,
            myData: []
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


    storeData = async (data) => {
        try {
            await AsyncStorage.setItem('@DATA:key', JSON.stringify(data));
            console.log(JSON.stringify(data));
        } catch (e) {
            console.log("Sth is not working in storeData method.")
        }
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
         NetInfo.fetch().then(async state => {
             console.log("Connection type", state.type);
             console.log("Is connected?", state.isConnected);
             if (state.isConnected === true) {
                 fetch(url + "/request", {
                     method: 'POST',
                     headers: new Headers({
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     }),
                     body: JSON.stringify(data),
                 }).then(response => {
                     console.log(response.status);
                 }).then(alert("The data was added: \n" + "Name: " + data.name + "\neCost: " + data.eCost + " \nStudent: "
                     + value )).then(this.props.navigation.navigate('Home'))
             } else {
                 alert("You are offline!");
                 await this.storeData(data);
                 console.log('Is not online');
                 this.props.navigation.navigate('Home')
             }
         }
     )};


    render() {
        return (
            <View style={styles.container}>
            <View style={styles.viewContainer}>
                <Text style={{fontWeight: "bold"}}>Name</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#7e2242',
                        borderWidth: 1,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    value={this.state.name}
                    placeholder="Name"
                    onChangeText={this.updateName}
                />

                <Text style={{fontWeight: "bold"}}>eCost</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#7e2242',
                        borderWidth: 1,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    value={this.state.eCost}
                    placeholder="eCost"
                    onChangeText={this.updateECost}
                />
                <Text style={{fontWeight: "bold"}}>Cost</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#7e2242',
                        borderWidth: 1,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    placeholder="Cost"
                    value={this.state.cost}
                    onChangeText={this.updateCost}
                />
                <Text style={{fontWeight: "bold"}}>Status</Text>
                <View style={styles.view4}>
                    <Picker selectedValue = {this.state.myStatus}
                            onValueChange = {this.updateStatus}
                            style={styles.picker}>
                        <Picker.Item label = "Open" value = "open" />
                        <Picker.Item label = "Canceled" value = "canceled" />
                        <Picker.Item label = "Filled" value = "filled" />
                        <Picker.Item label = "Postponed" value = "postponed" />
                    </Picker>
                </View>

            </View>
                <View style={styles.viewContainer1}>
                    <Button title="Add Request" style={{marginTop: 40}}
                            color="#30516E" onPress={this._addData}/>
                </View>

        </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
    },

    viewContainer: {
        margin: 40,
        marginTop: 100,
    },
    viewContainer1: {
        marginTop: 100,
        margin: 40,
    },
    view4:{
        borderWidth: 1,
        borderColor: '#7e2242',
    },

});
