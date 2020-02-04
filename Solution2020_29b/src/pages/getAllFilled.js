import React from 'react';
import {
    Button,
    View,
    StyleSheet,
    Text,
    FlatList, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const url = "http://192.168.1.4:2902";

function Item({ name, cost, eCost }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>Name: {name} </Text>
            <Text style={styles.text2}>cost: {cost} </Text>
            <Text style={styles.text2}>eCost: {eCost}</Text>
        </View>
    );
}

export default class GetAllFilled extends React.Component {
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
        fetch(url + "/filled")
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
    };


    static navigationOptions = {
        title: 'Report Section',
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    };

    async componentDidMount(): void {
        setTimeout(function () {
            console.log("wait")
            },
            5000
        );
        await this.showData();
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
                        <Text style={styles.header}>FILLED EXPENSES</Text>
                    </View>

                    {this.state.loaded ?
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.data.sort((a, b) => a.cost - b.cost).reverse()}
                                renderItem={({ item }) => <Item name={item.name} cost={item.cost} eCost={item.eCost}/>}
                                keyExtractor={item => item.id.toString()}
                            />
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
        ); }
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
        height: 40
    },
});
