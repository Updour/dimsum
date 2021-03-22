const Counter = (props) => {
  return (
   <View >
   <Icon
   onPress={() => props.increment(props.index)}
   name="remove" />
   <Text>{props.count}</Text>
   <Icon
   onPress={() => props.decrement(props.index)}
   name="ios-add-circle-outline" />
   </View>
  )
}
export {Counter}
