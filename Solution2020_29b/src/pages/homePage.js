import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import MyInput from '../domain/MyInput';
// import * as AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomePage extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };

    constructor(props) {
        super(props);
    }
    _showMoreApp = () => {
        this.props.navigation.navigate('MyList');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <>
                <MyInput/>
                <Button
                    title="Switch page"
                    onPress={() => this.props.navigation.navigate('MyList')}
                />
                <View style={styles.container}>
                    <Button title="Show me more of the app" onPress={this._showMoreApp}/>
                    <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
                </View>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
