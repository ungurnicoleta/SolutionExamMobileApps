import React from 'react';
import {AlertStatic as Alert, Button, Text, TextInput, View} from 'react-native';

function UselessTextInput(props) {
    return (
        <View
            style={{marginTop: 300,
                    marginLeft: 20,
                    marginRight: 20, display: 'flex', alignContent:"center"}}>
            <Text style={{fontWeight:"bold"}}>Student's name</Text>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 20,
                    marginBottom: 20
                    }}
                {...props}
                editable
                maxLength={40}
            />
            <Button
                style={{marginTop: 30}}
                title="Let me in"
                color="#30516E"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View>
    );
}


export default function HomePage () {
    const [value, onChangeText] = React.useState("Enter Student\'s Name");

        return (<UselessTextInput
            multiline
            numberOfLines={1}
            onChangeText={text => onChangeText(text)}
            value={value}
        />);
};
