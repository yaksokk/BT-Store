import {ListItems} from './../../components';
import React, {useState, useRef} from 'react';
import {fontType, colors} from './../../theme';
import {CategoryList, ListOfItems} from '../../../data';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Home() {
  const [text, onChangeText] = useState('Search');
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 150);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <View style={[styles.top]}>
        <View style={styles.search}>
          <Icon name="search" size={24} color={colors.black()} />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>
        <View style={{flexDirection: 'row', gap: 7}}>
          <Icon name="heart" solid size={24} color={colors.black()} />
          <Icon name="shopping-cart" size={24} color={colors.black()} />
        </View>
      </View>
      <Animated.View
        style={[
          headers.animatedContainer,
          {transform: [{translateY: recentY}]},
        ]}>
        <View style={headers.header}>
          <Header />
        </View>
        <View style={styles.listCategory}>
          <ListCategory />
        </View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}>
          <ListItems data={ListOfItems} />
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}

const Header = () => {
  return <Text style={headers.title}>Discover Your Badminton Look</Text>;
};

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

const headers = StyleSheet.create({
  animatedContainer: {},
  header: {
    margin: 7,
  },
  title: {
    fontFamily: fontType['pps-Medium'],
    fontSize: 42,
    color: colors.black(),
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    flexDirection: 'row',
    gap: 14,
    zIndex: 999,
    backgroundColor: colors.white(),
  },
  search: {
    borderRadius: 7,
    width: '75%',
    backgroundColor: colors.grey(0.17),
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 7,
    flexWrap: 'nowrap',
  },
  listCategory: {
    alignItems: 'center',
    marginVertical: 21,
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: 14,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: colors.grey(0.08),
  },
  title: {
    fontFamily: fontType['pps-Medium'],
    fontSize: 14,
    lineHeight: 18,
  },
});
