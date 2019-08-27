import React, {Component} from 'react'
import { Picker, Icon } from 'native-base'

const PickerDroid = ({ placeholder, selectedValue, onValueChange, children}) => {
  return (
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="arrow-down" />}
    style={styles.pickerStyles}
    placeholder={placeholder}
    placeholderStyle={{ color: "#bfc6ea" }}
    placeholderIconColor="#007aff"
    selectedValue={selectedValue}
    onValueChange={onValueChange}
    >
    {children}
    </Picker>
    )
  }

let styles = {
pickerStyles : {
  marginLeft: 26,
    marginRight: 12
  }
}
  export {PickerDroid}
