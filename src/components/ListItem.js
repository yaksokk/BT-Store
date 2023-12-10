import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {fontType, colors} from '../theme';
import {ListOfItems} from '../../data';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from 'react-native';

const ContainerItem = ({item, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={listItems.cardItem}
      onPress={() => navigation.navigate('BlogDetail', {blogId: item.id})}>
      <FastImage
        style={listItems.cardImage}
        source={{
          uri: item.image,
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}></FastImage>
      <View style={listItems.cardContent}>
        <View style={listItems.cardInfo}>
          <Text style={listItems.cardTitle}>{item.name}</Text>
          <Text style={listItems.cardText}>{item.price}</Text>
        </View>
        <TouchableOpacity style={listItems.cardIcon} onPress={onPress}>
          <Icon name="heart" size={21} color={colors.black()} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
const ListItems = ({data, numColumns}) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };
  const renderItem = ({item}) => {
    variant = bookmark.includes(item.id) ? 'Bold' : 'Linear';
    return (
      <ContainerItem
        item={item}
        variant={variant}
        onPress={() => toggleBookmark(item.id)}
      />
    );
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      showsHorizontalScrollIndicator={false}
      numColumns={numColumns}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
    />
  );
};
export default ListItems;

const listItems = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.black(0.09),
    position: 'relative',
    alignItems: 'center',
    marginHorizontal: 14,
    marginVertical: 14,
    paddingBottom: 7,
    borderRadius: 7,
    width: 170,
  },
  cardImage: {
    marginVertical: 14,
    borderRadius: 15,
    height: 100,
    width: 100,
  },
  cardContent: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  cardInfo: {
    paddingHorizontal: 7,
    width: '75%',
  },
  cardTitle: {
    fontFamily: fontType['pps-Regular'],
    color: colors.black(),
    flexWrap: 'wrap',
    fontSize: 14,
  },
  cardText: {
    color: colors.black(),
    fontFamily: fontType['pps-Regular'],
    fontSize: 10,
  },
  cardIcon: {
    alignItems: 'center',
    width: '23%',
  },
});
