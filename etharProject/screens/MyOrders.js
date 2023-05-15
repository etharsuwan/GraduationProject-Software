import React, { useEffect, useState,useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // import useNavigation hook
import { AuthContext } from '../context/auth';
import OrderDetails from './OrderDetails'; // import the OrderDetails component


const MyOrder = () => {
  const [packageData, setPackageData] = useState([]);
  const navigation = useNavigation(); // use the useNavigation hook
  const [state, setState] = useContext(AuthContext);

const userid=state.user._id;

useEffect(() => {
  fetchPackage();
}, [packageData]);


  const fetchPackage = async () => {
    try {
      const { data } = await axios.get("http://172.20.10.6:8000/api/packages?userId="+userid);
      if(data.data && data.data.length){
        setPackageData(data.data);
     }
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handlePress = (data) => {
    navigation.navigate('OrderDetails', { data }); // navigate to the OrderDetails page and pass the order as a prop
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
                        <Text style={styles.titles}>Recipient:</Text>
                        <Text  style={styles.packageText}> {item.recipient}</Text>
                        </View>
                          <View style={{flexDirection:'row'}}>            
                        <Text style={styles.titles}>Email:</Text>
                        <Text  style={styles.packageText}> {item.recipientEmail}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>            
                        <Text style={styles.titles}>Phone:</Text>
                        <Text  style={styles.packageText}> {item.recipientPhone}</Text>
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
        <Text style={{fontSize:28,fontWeight: 'bold',alignSelf:"center",color:'gray',marginTop:50}}>No Packages Yet</Text>
         <Text style={{fontSize:17, alignSelf:"center",color:'gray',marginTop:30}}>Start your journey and send your </Text>
       <Text style={{fontSize:17, alignSelf:"center",color:'gray'}}>first package!</Text>
     </View>
      }
    </SafeAreaView>
  );
};

export default MyOrder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:10

  },
  titles:{
    fontSize: 14,
    paddingTop: 5,
   
    paddingBottom: 5,

    fontWeight:'bold'
  },
  mainText: {
    fontSize: 27,
    textAlign: 'center',
    marginBottom: 20,
    color: '#E67E22',
  },
  packageContainer: {
    alignItems: 'center',
  },
  packageBox: {
    backgroundColor: '#fff',
    width: 390,
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
    right: 20,
    top: 20,
  },
  packageViewText: {
    fontSize: 20,
    color: '#ffc600',
    textAlign: 'center',
  },
  packageContent: {
paddingTop:40,
paddingLeft:20
  },
  packageText: {
    paddingTop: 5,
   
fontSize:16,
    paddingBottom: 5,
  }})