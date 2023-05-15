import React from 'react';
import { StyleSheet, View, Text ,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderDetails = ({ route }) => {
  const navigation = useNavigation();

  const { data } = route.params;
  const handelClick = (data) => {
  navigation.navigate('TrackOrder', { data });

}

  return (
    
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Details</Text>

     
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Recipient:</Text>
        <Text style={styles.detailText}>{data.recipient}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailText}>{data.recipientEmail}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailText}>{data.recipientPhone}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Tracking Number:</Text>
        <Text style={styles.detailText}>{data.packageid}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Shipped:</Text>
        
        <Ionicons style={{paddingLeft:15}} name={data.shipped ?"checkmark-circle":"checkmark-circle-outline"} size={24} color={data.shipped ? 'green' : 'gray'} />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>Deliverd:</Text>
        <Ionicons style={{paddingLeft:15}} name={data.arrived ?"checkmark-circle":"checkmark-circle-outline"} size={24} color={data.arrived ? 'green' : 'gray'} />
      </View>
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
    letterSpacing:0.5}}>Track The Order!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 60,
    paddingHorizontal:20
  },
  headerText: {
    fontSize: 27,
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
    fontSize:16
  },
  detailText: {
    marginLeft: 10,
    fontSize:14
  },
});

export default OrderDetails;

