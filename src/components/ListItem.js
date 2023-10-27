import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Receipt21} from 'iconsax-react-native';
import FastImage from 'react-native-fast-image';
import { fontType, colors } from '../theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContainerItem = ({item, variant, onPress}) => {
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
          <View>
          <View style={listItems.cardIcon}>
              <TouchableOpacity style={listItems.cardIconItem} onPress={onPress}>
                  <Icon name='heart' solid size={16} color={colors.black()} />
                  <Icon name='shopping-cart' size={16} color={colors.black()} />
              </TouchableOpacity>
          </View>
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
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default ListItems;

const listItems = StyleSheet.create({
  cardItem: {
      width: 180,
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:colors.black(.1),
      borderRadius:7,
      padding:14,
  },
  cardImage: {
      width: 100,
      height: 100,
      borderRadius: 15,
      borderWidth:2,
  },
  cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderWidth:1,
      position:'relative'
  },
  cardInfo: {
      // justifyContent: 'flex-end',
      // maxWidth: '100%',
      borderWidth:2,
  },
  cardTitle: {
      fontFamily: fontType['mts-Bold'],
      fontSize: 14,
      color: colors.black(),
  },
  cardText: {
      fontSize: 10,
      color: colors.black(),
      fontFamily: fontType['Pjs-Medium'],
  },
  cardIcon: {
      backgroundColor: colors.black(0.33),
      borderWidth: 0.5,
      borderRadius: 5,
      position:'absolute',
      right:0,
      top:0
  },
  cardIconItem:{
    flexDirection:'row'
  }
})
