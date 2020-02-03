import * as React from 'react';
import {
    Button,
    View,
    StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class SignInPage extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in!"
                        color="#30516E" onPress={this._signInAsync} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
