import Icon from 'react-native-vector-icons/FontAwesome5';
import {CategoryList, ListOfItems} from '../../../data';
import {useNavigation} from '@react-navigation/native';
import {fontType, colors} from './../../theme';
import React, {useState, useRef} from 'react';
import {ListItems} from './../../components';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 142);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 142],
    outputRange: [0, -142],
    extrapolate: 'clamp',
  });

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.top]}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SearchPage')}>
          <View style={styles.search}>
            <Icon name="search" size={24} color={colors.black()} />
            <Text style={styles.placeholder}>Search</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row', gap: 7}}>
          <TouchableOpacity>
            <Icon name="heart" solid size={24} color={colors.black()} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="shopping-cart" size={24} color={colors.black()} />
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={[
          styles.animatiedContainer,
          {transform: [{translateY: recentY}]},
        ]}>
        <Text style={styles.title}>Discover Your Badminton Look</Text>
        <View style={styles.listCategory}>
          <ListCategory />
        </View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{paddingTop: 200}}>
        <View style={styles.containerItem}>
          <ListItems data={ListOfItems} numColumns={2} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const ListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({item}) => {
    const color = item.id === selected ? colors.blue() : colors.black(0.7);
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
      data={CategoryList}
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
        <Text style={{...category.title, color}}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: colors.white(),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000,
    height: 70,
    gap: 14,
    right: 0,
    left: 0,
    top: 0,
  },
  search: {
    backgroundColor: colors.grey(0.17),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 7,
    width: '75%',
    padding: 10,
    gap: 7,
  },
  placeholder: {
    marginLeft: 7,
    fontFamily: fontType['pps-Medium'],

    lineHeight: 21,
    color: colors.black(0.7),
  },
  listCategory: {
    alignItems: 'center',
    paddingVertical: 21,
    position: 'relative',
  },
  title: {
    fontFamily: fontType['pps-Medium'],
    fontSize: 42,
    color: colors.black(),
    textAlign: 'center',
  },
  animatiedContainer: {
    position: 'absolute',
    backgroundColor: colors.white(),
    borderRadius: 14,
    elevation: 1000,
    zIndex: 999,
    right: 0,
    left: 0,
    top: 69,
  },
  containerItem: {
    backgroundColor: colors.white(),
    paddingBottom: 70,
    paddingTop: 14,
    top: 55,
  },
});

const category = StyleSheet.create({
  item: {
    backgroundColor: colors.grey(0.08),
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 25,
  },
  title: {
    fontFamily: fontType['pps-Medium'],
    lineHeight: 18,
    fontSize: 14,
  },
});
