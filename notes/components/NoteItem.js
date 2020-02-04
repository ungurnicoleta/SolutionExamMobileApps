import React from 'react';
import {Text, View, StyleSheet} from "react-native";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import Ionicons from '@expo/vector-icons'

const NoteItem = props => {
   return(
       <View style={styles.row}>
           <Text>{props.title}</Text>
           <TouchableOpacity>
               <Ionicons name={props.isFav ? 'ios-star':'ios-start-outline'} size={32}/>
           </TouchableOpacity>
       </View>
   )
};

const styles = StyleSheet.compose({
    row: {
        flex: 1,
        paddingVertical:25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    }
});

export default NoteItem;
