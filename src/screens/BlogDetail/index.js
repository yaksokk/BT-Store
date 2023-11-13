import React, {useState} from 'react';
import {ListOfItems} from '../../../data';
import { fontType, colors } from '../../theme';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';

const formatNumber = number => {
  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return number.toString();
};

const BlogDetail = ({route}) => {
  const {blogId} = route.params;
  const [iconStates, setIconStates] = useState({
    liked: {variant: 'Linear', color: colors.grey(0.6)},
    bookmarked: {variant: 'Linear', color: colors.grey(0.6)},
  });
  const selectedBlog = ListOfItems.flatMap(item => item.data).find(blog => blog.id === blogId);
  const navigation = useNavigation();
  const toggleIcon = iconName => {
    setIconStates(prevStates => ({
      ...prevStates,
      [iconName]: {
        variant: prevStates[iconName].variant === 'Linear' ? 'Bold' : 'Linear',
        color:
          prevStates[iconName].variant === 'Linear'
            ? colors.blue()
            : colors.grey(0.6),
      },
    }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-left' size={24} color={colors.grey(0.7)} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Icon name='share' size={24} color={colors.grey(0.7)} />
          <Icon name='ellipsis-v' size={24} color={colors.grey(0.7)} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 62,
          paddingBottom: 54,
        }}>
        <FastImage
          style={styles.image}
          source={{
            uri: selectedBlog.image,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}>
        </FastImage>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={styles.category}>{selectedBlog.category}</Text>
          <Text style={styles.price}>{selectedBlog.price}</Text>
        </View>
        <Text style={styles.name}>{selectedBlog.name}</Text>
        <Text style={styles.content}>{selectedBlog.content}</Text>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
          <TouchableOpacity onPress={() => toggleIcon('liked')}>
          <Icon name='thumbs-up' size={24} color={iconStates.liked.color} />
          </TouchableOpacity>
          <Text style={styles.info}>
            {formatNumber(selectedBlog.totalLikes)}
          </Text>
        </View>
        <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
        <Icon name='comment-dots' size={24} color={colors.grey(0.7)} />
        <Text style={styles.info}>
          {formatNumber(selectedBlog.totalComments)}
        </Text>
        </View>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
        <Icon name='list-alt' size={24} color={iconStates.bookmarked.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BlogDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingTop: 8,
    paddingBottom: 4,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.white(),
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: colors.white(),
    paddingVertical: 14,
    paddingHorizontal: 60,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    width: 'auto',
    borderRadius: 14,
  },
  info: {
    color: colors.grey(0.6),
    fontFamily: fontType['pps-Bold'],
    fontSize: 14,
  },
  category: {
    color: colors.blue(),
    fontFamily: fontType['mts-Medium'],
    fontSize: 14,
  },
  price: {
    color: colors.black(0.7),
    fontFamily: fontType['pps-Medium'],
    fontSize: 10,
  },
  name: {
    fontSize: 17,
    fontFamily: fontType['pps-Medium'],
    color: colors.black(),
    marginTop: 10,
  },
  content: {
    color: colors.grey(),
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 10,
    lineHeight: 20,
    marginTop: 15,
  },
});