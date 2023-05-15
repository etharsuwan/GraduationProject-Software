import React from 'react';

import { StyleSheet } from "react-native"
 const styleAuth=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
  },


    imageContainer: {
      alignItems:"center",
      justifyContent:"center",
      marginBottom:15
      
   },


   logoStyle:{
    width: 178, 
    height: 178, 
    borderWidth:0.5,
    borderRadius:120,
    borderColor:'#EA9937',
    shadowColor:'#000',
    shadowOffset:{
        width:0,
        height:4,
    },
    shadowOpacity:0.25,
    shadowRadius:120,
    elevation:5,
   },

   loginInput:{
    height:50,
padding:10,
marginTop:10,
    fontSize:14,
    borderWidth:0.8,
    borderColor:'rgba(0,0,0,0.2)',
    borderRadius:30,
    backgroundColor:"white",
    
   },
   
   Icon:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
//   paddingHorizontal:20,
    marginBottom:7,
    marginHorizontal:3,
   // width:'100%'
flexDirection:'row'
   },
   buttonText:{
    fontSize:20,
    fontWeight:'600',
    color:'white',
    letterSpacing:0.5
   },
   buttonStyle:{
    backgroundColor:"#EA9937",
    height:54,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:35,
    marginHorizontal:28,
    
    marginVertical:15,
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
   }
  })

  export default styleAuth;
