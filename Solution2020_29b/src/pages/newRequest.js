import * as React from 'react';
import {
    Button,
    View,
    StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class NewRequest extends React.Component {
    static navigationOptions = {
        title: 'Create a new request',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="Add Request" onPress={this._signInAsync} />
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