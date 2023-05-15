import React,{Component} from "react";
import { StyleSheet,Dimensions,ImageBackground,Image } from "react-native";

const bg=require('../assets/splash.png');
      const {height,width}=Dimensions.get("screen");


export default class Splash extends Component{

    constructor(props){
        super(props);
        setTimeout(()=>{
            this.props.navigation.navigate("LoginCustomer");
        },2000);
    }  

    render(){
        return(

        <ImageBackground
        source={bg}
        style={{height:{height}, width:{width} }}>

        </ImageBackground>
       );
    }
}
