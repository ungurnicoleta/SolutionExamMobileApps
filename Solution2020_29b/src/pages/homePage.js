import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
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
    };


    render() {
        return (
            <>
            <View style={styles.viewContainer}>
                <MyInput/>

                <Button
                    style={{marginTop: 30}}
                    title="Let me in"
                    color="#30516E"
                    onPress={() => this.props.navigation.navigate('MyList')}
                />

            </View>
            <View style={styles.viewContainer2}>
                <Button
                    style={{ margin: 30}}
                    title="FILLED EXPENSES"
                    color="#30516E"
                    onPress={() => this.props.navigation.navigate('GetAllFilled')}
                />
            </View>
            <View style={styles.viewContainer3}>
                <Button
                    style={{ margin: 30}}
                    title="OPEN EXPENSES"
                    color="#30516E"
                    onPress={() => this.props.navigation.navigate('GetAllOpen')}
                />
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
    viewContainer2: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewContainer3: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    viewContainer: {
        margin: 40
    }
});
