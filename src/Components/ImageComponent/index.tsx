import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface I_CustomImage {
  imageBorderRadius: number;
  isButtonNeed: boolean;
  buttonText: string;
  handleOnPressInImage: (() => void) | null;
  imageUri: string;
  width: number;
  height: number;
}

const CustomImage = ({
  imageBorderRadius,
  isButtonNeed,
  buttonText,
  handleOnPressInImage,
  imageUri,
  width,
  height,
}: I_CustomImage) => {
  return (
    <View style={styles.imageConatainer}>
      {imageUri ? (
        <Image
          style={{
            ...styles.image,
            borderRadius: imageBorderRadius,
            width,
            height,
          }}
          source={{uri: imageUri}}
        />
      ) : (
        <Image
          style={{
            ...styles.image,
            borderRadius: imageBorderRadius,
            width,
            height,
          }}
          source={require('../../assets/images/icons/noAvatar.jpeg')}
        />
      )}

      {isButtonNeed && handleOnPressInImage ? (
        <TouchableOpacity
          style={styles.imageButton}
          onPress={handleOnPressInImage}>
          <Text style={{color: '#ffffff', padding: 0, margin: 0}}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  imageConatainer: {
    position: 'relative',
    width: 70,
  },
  imageButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    width: 17.5,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#0080FF',
    zIndex: 1,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default CustomImage;