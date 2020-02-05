import * as React from 'react';
import {Button, View, StyleSheet, TextInput, Text, Picker, ToastAndroid} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as NetInfo from '@react-native-community/netinfo';

const url = "http://192.168.43.120:2502";

export default class NewRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            myStatus: "available",
            size: null,
            ps: null,
            myData: [],
            open: false,
            student: ""
        };

        this.socket = new WebSocket("ws://192.168.43.120:2502/");
        this.emit = this.emit.bind(this);
    }

    emit() {
        console.log("Intra aici");
        this.setState(prevState => ({
            open: !prevState.open
        }));
        this.socket.send("It worked!")
    }

    componentDidMount() : void{
        this.socket.onopen = () => this.socket.send(JSON.stringify({
            name: this.state.name,
            size: this.state.size
        }));
        this.socket.onmessage = () => ToastAndroid.show("Name: " + this.state.name +
            + "Size: " + this.state.size + "\nPopularity Score" + this.state.ps, ToastAndroid.SHORT);
    }

    static navigationOptions = {
        title: 'Create a new game',
    };

    updateName = (text) => {
        this.setState({ name: text });
        console.log(this.state.name);
    };

    updateStatus = (text) => {
        this.setState({ myStatus: text });
        console.log(this.state.myStatus);

    };

    updateSize = (text) => {
        this.setState({ size: text });
        console.log(this.state.size);

    };

    updatePS = (text) => {
        this.setState({ ps: text });
        console.log(this.state.ps);
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
        this.setState({ student: value });
        console.log(url + "/game");
        const data = {
            name: this.state.name,
            status: this.state.myStatus,
            user: value,
            size: this.state.size,
            popularityScore: this.state.ps
        };
        console.log(url + "/game");
        console.log(data);
        NetInfo.fetch()
             .then(async state => {
                    console.log("Connection type", state.type);
                    console.log("Is connected?", state.isConnected);
             if (state.isConnected === true) {
                 fetch(url + "/game", {
                     method: 'POST',
                     headers: new Headers({
                         'Accept': 'application/json',
                         'Content-Type': 'application/json',
                     }),
                     body: JSON.stringify(data),})
                     .then(response => {console.log(response.status);})
                     .then(alert("The data was added: \n" + "Name: " + data.name + "\nSize: " + data.size + " \nUser: "
                                + value ))
                     .then(this.emit)
                     .then(this.props.navigation.navigate('Home'))
             }
             else
                 {
                 alert("You are offline! \nThe data was added: \n Name: " + data.name + "\nsize: " +
                     data.size +" \nUser: \n" + value);
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

                <Text style={{fontWeight: "bold"}}>Size</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#7e2242',
                        borderWidth: 1,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    value={this.state.size}
                    placeholder="Size"
                    onChangeText={this.updateSize}
                />
                <Text style={{fontWeight: "bold"}}>PopularityScore</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: '#7e2242',
                        borderWidth: 1,
                        marginBottom: 20
                    }}
                    editable
                    maxLength={40}
                    placeholder="PopularityScore"
                    value={this.state.ps}
                    onChangeText={this.updatePS}
                />
                <Text style={{fontWeight: "bold"}}>Status</Text>
                <View style={styles.view4}>
                    <Picker selectedValue = {this.state.myStatus}
                            onValueChange = {this.updateStatus}
                            style={styles.picker}>
                        <Picker.Item label = "Available" value = "available" />
                        <Picker.Item label = "Missing" value = "missing" />
                        <Picker.Item label = "Canceled" value = "canceled" />
                        <Picker.Item label = "Borrowed" value = "borrowed" />
                    </Picker>
                </View>

            </View>
                <View style={styles.viewContainer1}>
                    <Button title="Add Game" style={{marginTop: 40}}
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
