import React from 'react';
import {colors } from './../../theme';
import {ListItems} from './../../components';
import { ListOfItems } from '../../../data';
import { StyleSheet,  Text, View,  ScrollView} from 'react-native'

export default function Wishlist() {
    return (
        <View style={styles.container}>
            <Header/>
            <ScrollView>
                <View style={styles.itemContainer} >
                    <ItemItem/>
                </View>
            </ScrollView>
        </View>
    );
}

const ItemItem = () => {
    return(
        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
            <ListItems data={ListOfItems}/>
        </ScrollView>
    )
}

const Header = () => {
    <View style={header.container}>
        <Text style={header.title}>Wishlist</Text>
    </View>
}

const header = StyleSheet.create({
    container:{
        height:90,
    },  
    title:{
        fontSize:21,
        color:colors.black()
    }
})

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.white(),
    },
    listCategory:{
        alignItems:'center',
        marginVertical:21,
        
    },
    itemContainer:{
        alignItems:'center',
        paddingVertical:14,
    }
})
