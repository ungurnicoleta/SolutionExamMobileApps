import React from 'react';
import {
    Button,
    StatusBar,
    View,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const url = "http://192.168.1.4:2902";

function Item({ name, cost, eCost }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{name} --> cost: {cost} || eCost: {eCost}</Text>
        </View>
    );
}

export default class GetAllFilled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            data : [],
            newData: []
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

    componentDidMount(): void {
        this.showData()
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
                        <Text style={styles.header}>EXPENSES</Text>
                    </View>

                    <View style={styles.container}>
                        <FlatList
                            data={this.state.data.sort((a, b) => a.cost - b.cost).reverse()}
                            renderItem={({ item }) => <Item name={item.name} cost={item.cost} eCost={item.eCost}/>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>

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
