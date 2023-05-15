import React from 'react';
import { StyleSheet, View, Text ,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DriverOrderDetail = ({ route }) => {
  const navigation = useNavigation();

  const { data } = route.params;
  const handelClick = (data) => {
  navigation.navigate('DriverMap', { data });

}
const packageid=data.packageid;
console.log(packageid)

const handleShippedPress = async (data) => {
  try {
    const response = await axios.post("http://172.20.10.6:8000/api/packagesUpdate", {
      packageid,
      shipped: true
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
const handleArrivedPress = async (data) => {
  try {
    const response = await axios.post("http://172.20.10.6:8000/api/packagesUpdateArrived", {
      packageid,
      arrived: true
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

  return (
    
    <View style={styles.container}>
      <Text style={styles.headerText}>Delivery Details</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Sender:</Text>
        <Text style={styles.detailText}>{data.sender}</Text>
      </View> 
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Pick up:</Text>
        <Text style={styles.detailText}>{data.customer_address}</Text>
      </View> 
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Recipient:</Text>
        <Text style={styles.detailText}>{data.recipient}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Drop off:</Text>
        <Text style={styles.detailText}>{data.to_address}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}> Sender Phone:</Text>
        <Text style={styles.detailText}>{data.recipientPhone}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}> Recipient Phone:</Text>
        <Text style={styles.detailText}>{data.recipientPhone}</Text>
      </View>

     
      {!data.shipped &&!data.arrived&& (     <TouchableOpacity style={{marginTop:20,backgroundColor:"#EA9937",
    height:54,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center',
    borderRadius:20,
    width:120,
    borderWidth:1,
    borderColor:'#EA9937',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:4,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
   }} onPress={() => handleShippedPress()}>
    <Text style={{color:'white',fontWeight:'bold'}}>Shipped</Text>
</TouchableOpacity>)}

{data.shipped && !data.arrived&& (
    <TouchableOpacity style={{marginTop:20,backgroundColor:"#EA9937",
    height:54,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center',
    borderRadius:20,
    width:120,
    borderWidth:1,
    borderColor:'#EA9937',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:4,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
   }} onPress={() => handleArrivedPress()}>
        <Text style={{color:'white',fontWeight:'bold'}}>Arrived</Text>
    </TouchableOpacity>
)}
{
  data.shipped && data.arrived&& (
    <Text style={{fontsize:18,color:'green',marginTop:15}}> This Order is Shipped and Deliverd </Text>
  )
}

      <TouchableOpacity onPress={()=>handelClick(data)} style={{
      
    backgroundColor:"#EA9937",
    height:54,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center',
    borderRadius:35,
    width:200,
    marginVertical:40,
    borderWidth:1,
    borderColor:'#EA9937',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:4,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
   }}>
<Text style={{    fontSize:15,
    fontWeight:'600',
    color:'white',
    letterSpacing:0.5}}>Show on a Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#E67E22',
  },
  detailContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  detailText: {
    marginLeft: 10,
  },
});

export default DriverOrderDetail;

