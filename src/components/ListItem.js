import {StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, SectionList} from 'react-native';
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
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        stickySectionHeadersEnabled={false}
        sections={LIST}
        renderSectionHeader={({ section }) => (
          <>
            <Text>{section.merk}</Text>
            {section.horizontal ? (
              <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={item => renderItem({...item})}
              ItemSeparatorComponent={() => <View style={{width: 15}} />}
              showsHorizontalScrollIndicator={false}
              horizontal
              />
            ) : null}
          </>
        )}
        renderItem={({ item, section }) => {
          if (section.horizontal) {
            return null;
          }
          return <ContainerItem item={item} />;
        }}
      />
  </SafeAreaView>
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


export const LIST = [{
  merk: 'Yonex',
  horizontal:true,
  dataItem: [{
          id: 1,
          category: 'Raket',
          name: 'Astrox 99 Pro JPN',
          price: 'Rp3.199.000',
          image: 'https://down-id.img.susercontent.com/file/id-11134207-7qul0-lh76871odtio02',

      },
      {
          id: 2,
          category: 'Sepatu',
          name: 'Velo 100 Junior',
          price: 'Rp449.000',
          image: 'https://down-id.img.susercontent.com/file/id-11134207-7qul7-lk9cw92ey7xy94',

      },
  ],
},
{
  merk: 'Li-Ning',
  horizontal:true,
  dataItem: [{
          id: 1,
          category: 'Raket',
          name: 'Halbertec 8000',
          price: 'Rp2.749.000',
          image: 'https://down-id.img.susercontent.com/file/id-11134207-7qul1-lfhqpcjr6t4xff',
      },
      {
          id: 2,
          category: 'Sepatu',
          name: 'Ranger AYTS067-3 Nany',
          price: 'Rp1.299.000',
          image: 'https://down-id.img.susercontent.com/file/sg-11134201-22110-5bu19hi2s7jve9',
      },
  ],
},
{
  merk: 'Victor',
  horizontal:true,
  dataItem: [{
          id: 1,
          category: 'Raket',
          name: 'Thruster Falcon C LTD A Tai Tzu Ying',
          price: 'Rp3.990.000',
          image: 'https://down-id.img.susercontent.com/file/24de4fec7bd6548712be3c0dce477cd6',
      },
      {
          id: 2,
          category: 'Sepatu',
          name: 'S 82 II',
          price: 'Rp2.350.000',
          image: 'https://down-id.img.susercontent.com/file/id-11134207-7r98v-llonxtr6ch0kca',
      },
  ]
}
];
