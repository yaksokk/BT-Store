import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {formatNumber} from '../../utils/formatNumber';
import FastImage from 'react-native-fast-image';
import {fontType, colors} from '../../theme';
import {ProfileData} from '../../../data';
import React from 'react';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View
        style={{
          height: '100%',
          gap: 10,
          alignItems: 'center',
          paddingHorizontal:21,
          top:70

        }}>
        <FastImage
          style={profile.pic}
          source={{
            uri: ProfileData.profilePict,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{gap: 5, alignItems: 'center'}}>
          <Text style={profile.name}>{ProfileData.name}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 20}}>
          <View style={{alignItems: 'center', gap: 5}}>
            <Text style={profile.sum}>{ProfileData.blogPosted}</Text>
            <Text style={profile.tag}>Product</Text>
          </View>
          <View style={{alignItems: 'center', gap: 5}}>
            <Text style={profile.sum}>
              {formatNumber(ProfileData.following)}
            </Text>
            <Text style={profile.tag}>Following</Text>
          </View>
          <View style={{alignItems: 'center', gap: 5}}>
            <Text style={profile.sum}>
              {formatNumber(ProfileData.follower)}
            </Text>
            <Text style={profile.tag}>Follower</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.button}>
            <Icon name="thumbs-up" solid size={17} color={colors.black()} />
            <Text style={styles.title}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="info-circle" size={17} color={colors.black()} />
            <Text style={styles.title}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="cog" size={17} color={colors.black()} />
            <Text style={styles.title}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon
              name="question-circle"
              solid
              size={17}
              color={colors.black()}
            />
            <Text style={styles.title}>Help & FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Icon name="sign-out-alt" size={17} color={colors.black()} />
            <Text style={styles.title}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.blue(.9),
    position:'absolute',
    height: 125,
    top:0,
    left:0,
    right:0,
  },
  borders: {
    borderColor: colors.black(0.7),
    alignItems: 'flex-start',
    position: 'relative',
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 7,
    borderWidth: 1,
    width: '100%',
    gap: 7,
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    gap: 7,
  },
  title: {
    fontFamily: fontType['pps-Medium'],
    color: colors.black(0.7),
    fontSize: 17,
  },
  wrapper: {
    backgroundColor: colors.black(0.07),
    paddingHorizontal: 14,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 28,
    width: '100%',
    gap: 14,
  },
});

const profile = StyleSheet.create({
  pic: {
    borderColor: colors.black(0.4),
    borderRadius: 100,
    borderWidth: 2,
    height: 100,
    width: 100,
  },
  name: {
    fontFamily: fontType['pps-Medium'],
    textTransform: 'capitalize',
    color: colors.black(),
    fontSize: 20,
  },
  sum: {
    fontFamily: fontType['pps-Medium'],
    color: colors.black(),
    fontSize: 16,
  },
  tag: {
    fontFamily: fontType['pps-Regular'],
    color: colors.grey(0.5),
    fontSize: 14,
  },
});
