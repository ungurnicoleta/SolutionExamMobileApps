import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class MyInput extends React.Component{
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Please sign in',
    };


    storeData = async () => {
        try {
            await AsyncStorage.setItem('@StudentName', "nico");
            console.log("Yey");
            alert("did it")
        } catch (e){
            alert(e)
            //alert("Insert student's name") // error
        }
    };

    render() {
        return (
            <View
                style={{
                    marginTop: 300,
                    marginLeft: 20,
                    marginRight: 20, display: 'flex', alignContent: "center"
                }}>
                <Text style={{fontWeight: "bold"}}>Student's name</Text>
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
                />
                <Button
                    style={{marginTop: 30}}
                    title="Let me in"
                    color="#30516E"
                    onPress={() => this.props.navigation.navigate('MyList')}
                />

                <Button
                    title="Switch page"
                    onPress={() => this.props.navigation.navigate('MyList')}
                />
            </View>
        );
    }
}

