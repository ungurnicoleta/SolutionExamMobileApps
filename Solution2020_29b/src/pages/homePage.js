import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MyInput from '../domain/MyInput';
// import * as AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null
        }
    }
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    _showMoreApp = () => {
        this.props.navigation.navigate('MyList');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    async getKey() {
        try {
            const value = await AsyncStorage.getItem('@StudentName:key');
            this.setState({student: value});
            alert(value)
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <MyInput/>

                <Button
                    style={{marginTop: 30}}
                    title="Let me in"
                    color="#30516E"
                    onPress={() => this.props.navigation.navigate('MyList')}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewContainer: {
        margin: 40
    }
});
