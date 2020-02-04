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

const url = "http://192.168.1.4:2902";

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
                <Text style={styles.text2}>eCost: {this.props.eCost}</Text>
                <Button style={styles.btn} color='skyblue' title="+" onPress={this.myPress}/>
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

                fetch(url + "/open")
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
                        2000
                    );
                    this.setState({loaded: true});
                }
            });}
            else {
                alert("You are offline");
            }
        })
    };

    addData = (id) => {
        this.props.navigation.navigate('Change', {id: id});
    };

    static navigationOptions = {
        title: 'All Section',
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
                        <Text style={styles.header}>OPEN EXPENSES</Text>
                    </View>

                    {this.state.loaded ?
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <Item name={item.name} eCost={item.eCost} id={item.id} myData={this.addData}/>}
                                keyExtractor={item => item.id.toString()}/>
                        </View>
                        :
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    }


                    <View style={styles.container3}>
                        <Button title="Sign Out"
                                color="#30516E" onPress={this._signOutAsync} />
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
        height: 50, backgroundColor: 'skyblue'
    },

    container3:{
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
        backgroundColor: 'steelblue',
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
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: "#FAF3E3"
    },

    btn:{
        alignSelf: 'flex-end'
    }
});
