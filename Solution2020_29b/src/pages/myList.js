import React from 'react';
import {Button, StatusBar, View, StyleSheet, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const url = "http://192.168.43.120:2902";

function Item({ name, status }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}> {name} --> {status}</Text>
        </View>
    );
}

export default class MyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            data : []
        };
    }

   async showStudentData() {
        const value = await AsyncStorage.getItem('@StudentName:key');
        this.setState({student: value});
        fetch(url + "/my/" + value)
            .then(async (response) => {
                return await response.json();
            })
            .then(resp => {
                console.log(resp);
                this.setState({data: resp});
            });
    };

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

    componentDidMount(): void {
        this.showStudentData()
    }

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
                            data={this.state.data}
                            renderItem={({ item }) => <Item name={item.name} status={item.status}/>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>

                    <View style={styles.container3}>
                        <Button title="Sign Out"
                                color="#30516E" onPress={this._signOutAsync} />
                        <Button title="Add request"
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
        backgroundColor: '#30516E',
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
        fontSize: 22
    },

    item: {
        backgroundColor: '#f0f6f7',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
});
