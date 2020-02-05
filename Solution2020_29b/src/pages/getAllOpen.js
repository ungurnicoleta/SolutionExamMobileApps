import React from 'react';
import {
    Button,
    StatusBar,
    View,
    StyleSheet,
    Text,
    FlatList, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as NetInfo from '@react-native-community/netinfo';

const url = "http://192.168.43.120:2502";

class Item extends React.Component{
    constructor(props){
        super(props)
    }

    myPress = () => {
        this.props.myData(this.props.id)
    }


    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>Name: {this.props.name}</Text>
                <Text style={styles.text2}>Size: {this.props.size}</Text>
                <Button style={styles.btn} color='#7e2242' title="+" onPress={this.myPress}/>
            </View>
        );
    }
}

export default class GetAllOpen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            data : [],
            newData: [],
            loaded: false
        };
    }


    async showData() {
        NetInfo.fetch().then(async state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected === true) {

                fetch(url + "/ready")
            .then(async (response) => {
                return await response.json();
            })
            .then(resp => {
                console.log(resp);
                this.setState({data: resp});
                if (this.state.newData !== null) {
                    const joined = this.state.data.concat(this.state.newData);
                    this.setState({data: joined});
                    setTimeout(function () {
                            console.log("wait...")
                        },
                        50000
                    );
                    this.setState({loaded: true});
                }
            });}
            else {
                alert("You are offline");
            }
        })
    };

    addData = async (id, name) => {
        this.props.navigation.navigate('Change', {id: id, name: name});
    };

    static navigationOptions = {
        title: 'All Games ',
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };

    async componentDidMount(): void {
        await this.showData();
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
                        <Text style={styles.header}>ALL AVAILABLE GAMES</Text>
                    </View>

                    {this.state.loaded ?
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <Item name={item.name} size={item.size} id={item.id} myData={this.addData}/>}
                                keyExtractor={item => item.id.toString()}/>
                        </View>
                        :
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    }


                    <View style={styles.container3}>
                        <Button title="Sign Out"
                                color='#7e2242' onPress={this._signOutAsync} />
                    </View>
                </View>
            </>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30516E',
    },

    container2: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, backgroundColor: 'white'
    },

    container3:{
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
    },

    header: {
        fontSize: 20,
        alignItems:"center",
        justifyContent: "center"
    },

    text: {
        flex: 3,
        fontSize:18,
    },

    text2: {
        flex: 2,
        fontSize:18,
        alignItems: 'flex-end',
        justifyContent: "flex-end"
    },

    item: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal:13,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#7e2242',
        backgroundColor: "white",
    },

    btn:{
        alignSelf: 'flex-end'
    }
});
