import React from 'react';
import {Button, StatusBar, View, StyleSheet, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Item({ name, title }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}> {name}  {title}</Text>
        </View>
    );
}

export default class MyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            DATA: [
            {
                id: '1',
                title: 'First Item',
                name: 'Yey'
            },
            {
                id: '32',
                title: 'Second Item',
                name: 'Yey'
            },
            {
                id: '3',
                title: 'Third Item',
                name: 'Yey'
            }]
        };
    }

    async getKey() {
        try {
            const value = await AsyncStorage.getItem('@StudentName:key');
            this.setState({student: value});
        } catch (error) {
            console.log("Error retrieving data" + error);
        }
    }

    static navigationOptions = {
        title: 'My List',
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };

    _recordARequestAsync = async () => {
        this.props.navigation.navigate('NewRequest');
    };

    render() {
        return (
            <>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                }}>
                    <View style={styles.container2} >
                        <Text style={styles.header}>{this.state.student!==null? "Hello " + this.state.student: "Hello anonymous"}</Text>
                    </View>

                    <View style={styles.container}>
                        <FlatList
                            data={this.state.DATA}
                            renderItem={({ item }) => <Item title={item.title} name={item.name}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <View style={styles.container3}>
                        <Button title="Sign Out"
                                color="#30516E" onPress={this._signOutAsync} />
                        <Button title="Value"
                                color="#30516E" onPress={this.getKey.bind(this)} />
                        <Button title="Record a request"
                                color="#30516E" onPress={this._recordARequestAsync} />
                    </View>
                </View>
            </>

        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },

    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, backgroundColor: 'skyblue'
    },

    container3:{
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 100,
        backgroundColor: 'steelblue',
        flexDirection: 'row',
    },

    header: {
        fontSize: 20,
        alignItems:"center",
        justifyContent: "center"
    },

    text: {
        fontSize: 42,
    },
});
