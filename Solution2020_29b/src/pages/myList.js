import React from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as NetInfo from '@react-native-community/netinfo';

const url = "http://192.168.43.120:2502";

function Item({ name, status }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}> Name: {name} --> {status}</Text>
        </View>
    );
}

export default class MyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            data : [],
            newData: [],
            loaded: false,
        };
    }


    async showStudentData() {
       const toBeStored = await AsyncStorage.getItem('@DATA:key');
       console.log(toBeStored);
       if (toBeStored !== null) {
           console.log(toBeStored);
           fetch(url + "/game", {
               method: 'POST',
               headers: new Headers({
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               }),
               body: toBeStored,
           }).then(response => {
               console.log(response.status);
           });
           this.setState({myData: []});
           await AsyncStorage.setItem('@DATA:key', JSON.stringify(this.state.myData));
       }
       const value = await AsyncStorage.getItem('@StudentName:key');
       this.setState({student: value});

       NetInfo.fetch().then(async state => {
           console.log("Connection type", state.type);
           console.log("Is connected?", state.isConnected);
           if (state.isConnected === true) {
               fetch(url + "/games/" + value)
                   .then(async (response) => {
                       return await response.json();
                   })
                   .then(resp => {
                       console.log(resp);
                       this.setState({data: resp});
                       if (this.state.newData !== null) {
                           const joined = this.state.data.concat(this.state.newData);
                           this.setState({data: joined});
                           this.setState({loaded: true});
                       }
                   });
           }
           else {
              alert("try again!!")
           }
    })
    };


    static navigationOptions = {
        title: 'My List',
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };

    _recordARequestAsync = async () => {
        this.props.navigation.navigate('NewRequest', {data: this.state.data});
    };

    componentDidMount(): void {
        setTimeout(function () {
                console.log("wait")
            },
            5000
        );
        this.showStudentData();
        this.setState({loaded: false});
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
                    {this.state.loaded ?
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => <Item name={item.name} status={item.status}/>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                        :
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Button title="Retry"
                                    color='#7e2242' onPress={() => this.showStudentData() }/>
                        </View>
                    }


                    <View style={styles.container3}>
                        <Button title="Sign Out"
                                color='#7e2242' onPress={this._signOutAsync} />
                        <Button title="Add game"
                                color='#7e2242' onPress={this._recordARequestAsync} />
                        <Button
                            style={styles.btn}
                            title="ALL GAMES"
                            color="#7e2242"
                            onPress={() => this.props.navigation.navigate('GetAllOpen')}
                        />
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
        height: 50,
        backgroundColor: 'white'
    },

    container3:{
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 70,
        backgroundColor: "white",
        flexDirection: 'row',
    },

    header: {
        fontSize: 20,
        alignItems:"center",
        justifyContent: "center"
    },

    text: {
        flex: 3,
        fontSize: 18
    },

    item: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#7e2242',
    },
});
