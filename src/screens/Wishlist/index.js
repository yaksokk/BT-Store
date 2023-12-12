import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {colors, fontType} from './../../theme';
import {ListItems} from './../../components';
import {ListOfItems} from '../../../data';
import React from 'react';

export default function Wishlist() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wishlist</Text>
        </View>
        <View style={styles.itemContainer}>
          <ListItems data={ListOfItems} numColumns={2} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  header:{
    flex:1,
    alignItems:'center',
    paddingVertical:14,
    borderBottomWidth:1.7,
    borderColor: colors.blue(.7)
},
title: {
    fontSize: 28,
    color: colors.blue(),
    fontFamily: fontType['pps-Medium']
  },
});
