import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {heightRes, widthRes} from '../utils/responsive';
import colors from '../utils/colors';
import Button from './Button';
import textStyle from '../utils/textStyle';
import Input from './Input';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RRRModal = ({visible, click, rrrValue, close}) => {
  const [value, setValue] = useState('');
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: heightRes(1),
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: colors.white,
            borderRadius: 20,
            padding: heightRes(3),
            alignItems: 'center',
          }}>
          <Ionicons
            name="close"
            size={widthRes(6)}
            onPress={close}
            style={{alignSelf: 'flex-end', marginBottom: 10}}
          />
          <Text
            style={[textStyle.defaultBoldTitle3, {marginBottom: heightRes(2)}]}>
            Your RRR is {rrrValue}
          </Text>
          <Input placeholder="Enter the rrr above" onChange={setValue} />
          <Button
            title="Pay"
            containerStyle={{marginTop: heightRes(2)}}
            click={click}
            disable={value !== rrrValue}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RRRModal;

const styles = StyleSheet.create({});
