import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontFamily from '../utils/FontFamily'
import Color from '../utils/Colors'
import { moderateScale, textScale } from '../utils/Responsive'

const CustomButton = ({name,handleAction}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={handleAction}>
      <Text style={styles.text}>{name} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    main:{
        width:'100%',
        alignItems:'center',
        backgroundColor:Color.red,
        borderRadius:moderateScale(10)
    },
    text:{
        fontFamily:FontFamily.Inter_Bold,
        color:Color.white,
        fontSize:textScale(16),
        padding:moderateScale(10)
    }
})