import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // import useNavigation hook
import { AuthContext } from '../context/auth';
import OrderDetails from './OrderDetails'; // import the OrderDetails component

const DriverOrder = () => {
  const [packageData, setPackageData] = useState([]);
  const navigation = useNavigation(); // use the useNavigation hook
  const [state, setState] = useContext(AuthContext);

const driver=state.user._id;

useEffect(() => {
  fetchPackage();
}, [packageData]);


  const fetchPackage = async () => {
    try {
        // console.log(driver)
      const { data } = await axios.get("http://172.20.10.6:8000/api/driverPackages?driver="+driver);
      if(data.data && data.data.length){
        setPackageData(data.data);
     }
        } catch (error) {
      console.error(error);
    }
  };

  const handlePress = (data) => {
    navigation.navigate('DriverOrderDetail', { data }); // navigate to the OrderDetails page and pass the order as a prop
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Packages</Text>
      {packageData.length > 0 &&
      <ScrollView>
        {packageData.map((item) => (
          <View key={item._id} style={styles.packageContainer}>
            <View style={styles.packageBox}>
              <View style={styles.packageViews}>
                <Text style={styles.packageViewText}>{item.views}</Text>
              </View>
              <TouchableOpacity onPress={() => handlePress(item)}>
                <View style={styles.packageContent}>
                  <View style={{flexDirection:'row'}}>            
                        <Text style={styles.titles}>Delivery Date:</Text>
                        <Text  style={styles.packageText}> {item.deliveryDate}</Text>
</View>
<View style={{flexDirection:'row'}}>            
                        <Text style={styles.titles}>Pick Up:</Text>
                        <Text  style={styles.packageText}> {item.customer_address}</Text>
</View>
<View style={{flexDirection:'row'}}>            
                        <Text style={styles.titles}>Drop off:</Text>
                        <Text  style={styles.packageText}> {item.to_address}</Text>
</View>
{/* <View style={{flexDirection:'row'}}>            
                        <Text style={styles.titles}>Status:</Text>
                        <Text  style={styles.packageText}> {item.shipped}</Text>
</View> */}
                </View>
                
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>}
      {!packageData.length&&
       <View>
       <Text>No Packges Yet </Text>
       <Text>Start Your Accepting Orders request!</Text>
     </View>
      }
    </SafeAreaView>
  );
};

export default DriverOrder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titles:{
    fontSize: 13,
    paddingTop: 5,
   
    paddingBottom: 5,

    fontWeight:'bold'
  },
  mainText: {
    fontSize: 23,
    textAlign: 'center',
    marginBottom: 20,
    color: '#E67E22',
    fontWeight:'bold'

  },
  packageContainer: {
    alignItems: 'center',
  },
  packageBox: {
    backgroundColor: '#fff',
    width: 320,
    height: 200,
    borderColor:"#EA9937",
    borderBottomWidth:0.8,
    shadowColor: '#EA9937',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  packageViews: {
    position: 'absolute',
    right: 16 ,
    top: 20,
  },
  packageViewText: {
    fontSize: 11,
    color: '#ffc600',
    textAlign: 'center',
  },
  packageContent: {
paddingTop:40,
  },
  packageText: {
    paddingTop: 5,
   
fontSize:13,
    paddingBottom: 5,
  }})