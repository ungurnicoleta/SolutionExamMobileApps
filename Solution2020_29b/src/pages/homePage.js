import React from 'react';
import {Button, StyleSheet, View, ToastAndroid} from 'react-native';
import MyInput from '../domain/MyInput';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            data: []
        };
    }


    static navigationOptions = {
        title: 'Welcome to the app!',
        headerStyle: {
            backgroundColor: "white",
        },
        headerTintColor: 'black',
        headerRight: () => (
            <View style ={{marginRight: 20}}>
                <Button
                    onPress={() => {
                        //function to make Toast With Duration
                        ToastAndroid.show('This app was made for the exam', ToastAndroid.SHORT);
                    }}
                    title="Info"
                    color="#30516E"
                    style ={{marginRight: 20}}
                />
            </View>

        ),
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewContainer1}>
                    <MyInput/>
                    <Button
                        style={{marginTop: 50}}
                        title="Let me in"
                        color='#7e2242'
                        onPress={() => this.props.navigation.navigate('MyList')}
                    />
                </View>
                <View style={styles.viewContainer2}>
                    <Button
                        style={styles.btn}
                        title="FILLED EXPENSES"
                        color="#30516E"
                        onPress={() => this.props.navigation.navigate('GetAllFilled')}
                    />

                    <Button
                        style={styles.btn}
                        title="OPEN EXPENSES"
                        color="#30516E"
                        onPress={() => this.props.navigation.navigate('GetAllOpen')}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    viewContainer1:{
        margin: 30,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    viewContainer2:{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
