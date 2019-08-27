import React, { Component } from 'react'
import { DatePicker } from 'native-base'

const SelectDate = ({ onDateChange }) => {
  return (
    <DatePicker
        locale={"en"}
        timeZoneOffsetInMinutes={undefined}
        modalTransparent={false}
        animationType={"fade"}
        androidMode={"default"}
        placeHolderText="Select date"
        textStyle={{ color: "green" }}
        placeHolderTextStyle={{ color: "#d3d3d3" }}
        disabled={false}
        onDateChange={onDateChange}
    />
    )
}

export { SelectDate }