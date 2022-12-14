import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../utils/colors';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import textStyle from '../utils/textStyle';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

const ViewPayment = ({route: {params: {level}}}) => {
  const navigation = useNavigation();
  const {school, user} = useSelector(state => state.user);

  async function printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: `
      <html>
      <head>
      <style>
      
      td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      td:nth-child(odd){
        font-weight: bold;

      }
      h3, h2 {
        text-align: center
      }
      </style>
      </head>
      <body>
      
      <h2>University of Nigeria Nsukka</h2>
      <h3>SCHOOL FEE RECEIPT</h3>
      <table style="font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;">
        <tr>
          <td>Student Name</td>
          <td>${user?.firstName} ${user?.lastName}</td>
        </tr>
        <tr>
          <td>Reg Number</td>
          <td>${user?.regno}</td>
        </tr>
        <tr>
          <td>Department</td>
          <td>${user?.department}</td>
        </tr>
        <tr>
          <td>Level</td>
          <td>${level}</td>
        </tr>
        <tr>
          <td>Fee</td>
          <td style="font-weight:700; padding:30px">Amount</td>
        </tr>
        <tr>
          <td>Faculty Dues</td>
          <td>500</td>
        </tr>
        <tr>
          <td>ICT</td>
          <td>3700</td>
        </tr>
        <tr>
          <td>ID Card</td>
          <td>500</td>
        </tr>
        <tr>
          <td>Exam Fee</td>
          <td>5000</td>
        </tr>
        <tr>
          <td>Dev Fee</td>
          <td>15000</td>
        </tr>
        <tr>
          <td>Course Reg</td>
          <td>500</td>
        </tr>
        <tr>
          <td>Health Fee</td>
          <td>2000</td>
        </tr>
        <tr>
          <td>Internet Fee</td>
          <td>8000</td>
        </tr>
        <tr>
          <td>Library Fee</td>
          <td>1000</td>
        </tr>
        <tr>
          <td>SUG</td>
          <td>800</td>
        </tr>
        <tr>
          <td>Total</td>
          <td style="font-weight:700; padding:30px">₦37000</td>
        </tr>
      </table>
      
      </body>
      </html>`,
      fileName: 'test',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Ionicons
        name="chevron-back-outline"
        size={widthRes(6)}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={[textStyle.defaultRegularFootnote]}>
          University of Nigeria Nsukka
        </Text>
        <Text
          style={[
            textStyle.defaultBoldFootnote,
            {marginVertical: heightRes(1)},
          ]}>
          SCHOOL FEE RECEIPT
        </Text>
        <Image
          source={require('../images/unnlogo.png')}
          style={{
            width: widthRes(10),
            height: widthRes(10),
          }}
          resizeMode="contain"
        />
        <View style={styles.ItemContainer}>
          <View style={styles.item}>
            <Text style={styles.listText}>Student Name</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Reg Number</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>{user?.regno}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Department</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>{user?.department}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Level</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>{level}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>FEE</Text>
            <View style={[styles.leftItemContainer, {paddingVertical: heightRes(2)}]}>
              <Text style={styles.itemText}>AMOUNT</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Faculty Dues</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>500</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>ICT</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>3700</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>ID Card</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>500</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Exam Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>5000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Dev Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>15000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Course Reg</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>500</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Health Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>2000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Internet Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>8000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Library Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>1000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>SUG</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>800</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Total</Text>
            <View style={[styles.leftItemContainer, {paddingVertical: heightRes(2)}]}>
              <Text style={styles.itemText}>₦37000</Text>
            </View>
          </View>
        </View>
      </View>
      <Button title="Reprint Receipt" click={printPDF}containerStyle={{marginVertical: heightRes(3)}}  />
    </ScrollView>
  );
};

export default ViewPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(1.5),
  },
  content: {
    flex: 1,
    marginVertical: heightRes(1),
    alignItems: 'center',
    borderWidth: 0.5,
    paddingTop: heightRes(3),
  },
  ItemContainer: {
    borderTopWidth: 0.5,
    width: '100%',
    marginTop: heightRes(1),
    flex: 1,
  },
  leftItemContainer: {
    borderLeftWidth: 0.7,
    padding: heightRes(0.6),
    width: '65%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
    paddingHorizontal: heightRes(0.7),
  },
  itemText: [
    textStyle.defaultBoldFootnote,
    {
      textAlign: 'left',
    },
  ],
  listText: textStyle.defaultRegularFootnote,
});
