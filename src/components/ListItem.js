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
        <View style={listItems.cardIcon}>
          <TouchableOpacity onPress={onPress}>
            <Icon name="heart" size={21} color={colors.black()} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListItems = ({}) => {
  const [bookmark, setBookmark] = useState([]);
  const toggleBookmark = itemId => {
    if (bookmark.includes(itemId)) {
      setBookmark(bookmark.filter(id => id !== itemId));
    } else {
      setBookmark([...bookmark, itemId]);
    }
  };
  return (
    <View>
      <SafeAreaView style={{flex: 1}}>
        <SectionList
          contentContainerStyle={{paddingHorizontal: 10}}
          stickySectionHeaderEnabled={false}
          sections={ListOfItems}
          renderSectionHeader={({section}) => (
            <>
              <Text style={listItems.titleItem}>{section.title}</Text>
              {section.horizontal ? (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({item}) => <ContainerItem item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}
            </>
          )}
          renderItem={({item, section}) => {
            if (section.horizontal) {
              return null;
            }
            return (
              <ContainerItem
                item={item}
                onPress={() => toggleBookmark(item.id)}
              />
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};
export default ListItems;

const listItems = StyleSheet.create({
  titleItem: {
    fontSize: 17,
    color: colors.blue(0.7),
    fontFamily: fontType['pps-Medium'],
  },
  cardItem: {
    width: 170,
    alignItems: 'center',
    backgroundColor: colors.black(0.09),
    borderRadius: 7,
    marginHorizontal: 7,
    marginVertical: 14,
    position: 'relative',
    paddingBottom: 7,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginVertical: 14,
  },
  cardContent: {
    flexDirection: 'row',
    maxWidth: '100%',
  },
  cardInfo: {
    width: '75%',
    paddingHorizontal: 7,
  },
  cardTitle: {
    fontFamily: fontType['pps-Regular'],
    fontSize: 14,
    color: colors.black(),
    flexWrap: 'wrap',
  },
  cardText: {
    fontSize: 10,
    color: colors.black(),
    fontFamily: fontType['pps-Regular'],
  },
  cardIcon: {
    width: '23%',
    alignItems: 'center',
  },
});
