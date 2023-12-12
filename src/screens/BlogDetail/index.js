import {Animated, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {formatNumber} from '../../utils/formatNumber';
import ActionSheet from 'react-native-actions-sheet';
import { formatDate } from '../../utils/formatDate';
import FastImage from 'react-native-fast-image';
import {fontType, colors} from '../../theme';
import axios from 'axios';

const BlogDetail = ({route}) => {
  const {blogId} = route.params;
  const [iconStates, setIconStates] = useState({
    liked: {variant: 'Linear', color: colors.grey(0.6)},
    bookmarked: {variant: 'Linear', color: colors.grey(0.6)},
  });
  // const selectedBlog = ListOfItems.find(blog => blog.id === blogId);
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

  // Buat Animation
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  // REST API
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // default 23-31
  const actionSheetRef = useRef(null);

  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  useEffect(() => {
    getBlogById();
  }, [blogId]);

  const getBlogById = async () => {
    try {
      const response = await axios.get(
        `https://65641fc9ceac41c0761d7695.mockapi.io/wocoapp/blog/${blogId}`,
      );
      setSelectedBlog(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditBlog', {blogId});
  };
  const handleDelete = async () => {
    await axios
      .delete(
        `https://65641fc9ceac41c0761d7695.mockapi.io/wocoapp/blog/${blogId}`,
      )
      .then(() => {
        closeActionSheet();
        navigation.navigate('Product');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={colors.grey(0.7)} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 20}}>
          <Icon name="share" size={24} color={colors.grey(0.7)} />
          <TouchableOpacity onPress={openActionSheet}>
            <Icon name="ellipsis-v" size={24} color={colors.grey(0.7)} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size={'large'} color={colors.blue()} />
        </View>
      ) : (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 62,
            paddingBottom: 54,
          }}>
          <FastImage
            style={styles.image}
            source={{
              uri: selectedBlog?.image,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}></FastImage>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text style={styles.category}>{selectedBlog?.category.name}</Text>
            <Text style={styles.price}>{selectedBlog?.price}</Text>
          </View>
          <Text style={styles.name}>{selectedBlog?.name}</Text>
          <Text style={styles.content}>{selectedBlog?.content}</Text>
        </Animated.ScrollView>
      )}
      <Animated.View
        style={[styles.bottomBar, {transform: [{translateY: bottomBarY}]}]}>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => toggleIcon('liked')}>
            <Icon name="thumbs-up" size={24} color={iconStates.liked.color} />
          </TouchableOpacity>
          <Text style={styles.info}>
            {formatNumber(selectedBlog?.totalLikes)}
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Icon name="comment-dots" size={24} color={colors.grey(0.7)} />
          <Text style={styles.info}>
            {formatNumber(selectedBlog?.totalComments)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleIcon('bookmarked')}>
          <Icon name="list-alt" size={24} color={iconStates.bookmarked.color} />
        </TouchableOpacity>
      </Animated.View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              fontFamily: fontType['pps-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              fontFamily: fontType['pps-Medium'],
              color: colors.black(),
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              fontFamily: fontType['pps-Medium'],
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
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
    backgroundColor: colors.white(),
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingBottom: 4,
    paddingTop: 8,
    zIndex: 1000,
    height: 52,
    right: 0,
    left: 0,
    top: 0,
  },
  bottomBar: {
    backgroundColor: colors.white(),
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    position: 'absolute',
    flexDirection: 'row',
    paddingVertical: 14,
    zIndex: 1000,
    bottom: 0,
    right: 0,
    left: 0,
  },
  image: {
    borderRadius: 14,
    width: 'auto',
    height: 200,
  },
  info: {
    fontFamily: fontType['pps-Bold'],
    color: colors.grey(0.6),
    fontSize: 14,
  },
  category: {
    fontFamily: fontType['mts-Medium'],
    color: colors.blue(),
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
