import React, {useState} from 'react';
import {FlatList,ScrollView, StyleSheet,  Text, View, TextInput, TouchableOpacity} from 'react-native';
import {MessageText1,Notification, Message, SearchNormal1} from 'iconsax-react-native';
import { fontType, colors } from './src/assets/theme';
import {BlogList, CategoryListIklan, CategoryList, CategoryListMerk} from './data';
import { ListHorizontal } from './src/assets/components';

export default function App() {
  const [text, onChangeText] = useState('Search')
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.search}>
          <SearchNormal1 size="24" color="#000"/>
          <TextInput
            style={styles.input}
            onChangeText= {onChangeText}
            value= {text}
          />
        </View>
        <View style={styles.iconHeader}>
          <MessageText1 size="24" color={colors.white()} variant='Linear'/>
          <Notification color={colors.white()} variant="Linear" size={24} />
        </View>
      </View>
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>
      <Blog />
    </View>
  );
}

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.darkModeBlue() : colors.grey();
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };
  return (
    <FlatList
      data={CategoryListMerk}
      keyExtractor={item => item.id}
      renderItem={item => renderItem({...item})}
      ItemSeparatorComponent={() => <View style={{width: 10}} />}
      contentContainerStyle={{paddingHorizontal: 24}}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const ItemCategory = ({item, onPress, color}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{...category.title, color}}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141863',
  },
  header: {
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height:52,
    elevation: 8,
    paddingVertical:8,
    gap:7,
    position:'relative'
  },
  search:{
    backgroundColor: colors.white(),
    width: '85%',
    alignItems:'center',
    borderRadius: 7,
    paddingHorizontal:7,
    flexDirection: 'row',
  },
  input:{
    marginLeft:7,
  },
  iconHeader: {
    marginLeft:5,
    flexDirection: 'row',
    gap: 7,
    width:'15%',
    justifyContent:'center',
  },
  listCategory:{
    paddingVertical: 10,
    paddingHorizontal:20,
    backgroundColor: '#14186358',
  },
  listBlog: {
    paddingVertical: 10,
  },
});



const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
    marginHorizontal:5
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
})


const Blog = () => {
  const horizontalData = BlogList.slice(0, 4);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.listBlog}>
        <ListHorizontal data={horizontalData} />
      </View>
    </ScrollView>
  );
};

const itemVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  cardItem: {
    backgroundColor: colors.blue(0.03),
    flexDirection: 'row',
    borderRadius: 10,
  },
  cardCategory: {
    color: colors.blue(),
    fontSize: 10,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  cardText: {
    fontSize: 10,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.blue(0.6),
  },
  cardImage: {
    width: 94,
    height: 94,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cardInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 15,
    flex: 1,
    paddingVertical: 10,
  },
});

