import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Receipt21} from 'iconsax-react-native';
import FastImage from 'react-native-fast-image';
import { fontType, colors } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContainerItem = ({item, onPress}) => {
  return (
    <View style={listItems.cardItem}>
      <FastImage
        style={listItems.cardImage}
        source={{
            uri: item.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
      </FastImage>
        <View style={listItems.cardContent}>
          <View style={listItems.cardInfo}>
            <Text style={listItems.cardTitle}>{item.name}</Text>
            <Text style={listItems.cardText}>{item.price}</Text>
          </View>
          <View style={listItems.cardIcon}>
              <TouchableOpacity style={listItems.cardIconItem} onPress={onPress}>
                  <Icon name='heart' solid size={16} color={colors.black()} />
                  <Icon name='shopping-cart' size={16} color={colors.black()} />
              </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};
const ListItems = ({data}) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };
  const renderItem = ({item}) => {
    return (
      <ContainerItem
        item={item}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      showsHorizontalScrollIndicator={false}
      numColumns={2}
    />
  );
};
export default ListItems;

const listItems = StyleSheet.create({
  cardItem: {
      width: 170,
      alignItems:'center',
      backgroundColor:colors.black(.09),
      borderRadius:7,
      marginHorizontal:7,
      marginVertical:14,
      position:'relative',
      paddingBottom:7
  },
  cardImage: {
      width: 100,
      height: 100,
      borderRadius: 15,
      marginVertical:14,
  },
  cardContent: {
      flexDirection: 'row',
      maxWidth:'100%',
  },
  cardInfo: {
      width:'77%',
      paddingHorizontal:7,
  },
  cardTitle: {
      fontFamily: fontType['pps-Regular'],
      fontSize: 14,
      color: colors.black(),
      flexWrap:'wrap'
  },
  cardText: {
      fontSize: 10,
      color: colors.black(),
      fontFamily: fontType['pps-Regular'],
  },
  cardIcon: {
      width:'23%'
  },
  cardIconItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingRight:7
  }
})
