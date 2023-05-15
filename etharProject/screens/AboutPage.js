import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class AboutPage extends Component {
  render() {
    return (
      <View style={{paddingVertical:35,paddingHorizontal:25}}>
        <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 35 }}>
          About Our Courier System in Palestine
        </Text>
        <Text>
          Our courier system in Palestine is dedicated to providing fast and efficient delivery services throughout the region. We have a team of experienced drivers and dispatchers who are committed to ensuring that your packages are delivered on time and in perfect condition.
        </Text>
        <Text>
          Our fleet of vehicles is equipped with GPS tracking, so you can always know where your package is and when it will be delivered. We also offer real-time updates and notifications to keep you informed every step of the way.
        </Text>
        <Text>
          We understand the importance of secure and reliable deliveries, which is why our drivers are background checked and our vehicles are regularly maintained. 
        </Text>
        <Text>
          Whether you need to send a package across town or across the country, our courier system in Palestine has you covered. Contact us today to learn more about our services and to schedule a delivery.
        </Text>
        </ScrollView>
      </View>
    );
  }
}

export default AboutPage;
