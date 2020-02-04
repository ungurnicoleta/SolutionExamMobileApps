import * as React from 'react';
import {
    Button,
    View,
    StyleSheet, Image,
} from 'react-native';


export default class SignInPage extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../signIn.png')} style={{width: 200, height: 250, alignSelf: "center", marginBottom: 100}}/>
                <View style={{ width: 200, height: 100, marginTop: 10}}>
                    <Button title="Sign in!"
                            style={{alignSelf: 'stretch'}}
                            color='#7e2242'
                            onPress={this._signInAsync} />
                </View>
            </View>
        );
    }

    _signInAsync = async () => {
        this.props.navigation.navigate('App');
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    },
});
