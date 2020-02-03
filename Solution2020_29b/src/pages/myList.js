import React from 'react';
import {Button, StatusBar, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class MyList extends React.Component {
    static navigationOptions = {
        title: 'My List',
    };

    render() {
        return (
            <View style={styles.container}>
                <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
                <StatusBar barStyle="default" />
            </View>
        );
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Home');
    };

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
