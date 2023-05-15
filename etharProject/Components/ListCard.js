import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const ListCard = ({item, viewItem}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        viewItem(item);
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          
            <Ionicons name="package" size="40"color="#EA9937"/>          
        </View>
        <View>
        <Text style={styles.packageText}>Recipient: </Text>
        <Text style={styles.title}>{item.recipient}</Text>
       
        <Text style={styles.packageText}>Email: </Text>
        <Text style={styles.subtitle}>{item.recipientEmail}</Text>

        <Text style={styles.packageText}>Phone:</Text>

        <Text style={styles.subtitle}>{item.recipientPhone}</Text>
        
        </View>
      </View>
    </TouchableOpacity>
  );
  //
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#303540',
  },
});

export default ListCard;