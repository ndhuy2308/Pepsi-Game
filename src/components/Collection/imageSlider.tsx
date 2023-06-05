// Import React and React Native components
import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native'

// Define an array of image sources

// Define a custom component that takes an array of images as a prop
const ImageSlider = ({ navigation }: { navigation: any }) => {
  const image1 = require('../../../assets/images/gameplay/an.png')
  const image2 = require('../../../assets/images/gameplay/loc.png')
  const image3 = require('../../../assets/images/gameplay/phuc.png')
  const resultQuantity = 3
  // Use state hooks to store the current image index
  const [index, setIndex] = useState(0)

  // Use a ref hook to store the animated value for the horizontal position of the image slider
  const position = React.useRef(new Animated.Value(0)).current

  // Define a function that increments the index by one, or resets it to zero if it reaches the end of the array
  const nextImage = () => {
    if (index < resultQuantity - 1) {
      // Animate the position to the left by one screen width
      Animated.timing(position, {
        // Use as any to cast position to any type
        toValue: (position as any)._value - 300,
        duration: 500,
        useNativeDriver: true
      }).start()
      // Update the index state
      setIndex(index + 1)
    } else {
      // Animate the position back to the start
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
      // Reset the index state
      setIndex(0)
    }
  }

  // Define a function that decrements the index by one, or sets it to the last element of the array if it reaches the beginning
  const prevImage = () => {
    if (index > 0) {
      // Animate the position to the right by one screen width
      Animated.timing(position, {
        toValue: (position as any)._value + 300,
        duration: 500,
        useNativeDriver: true
      }).start()
      // Update the index state
      setIndex(index - 1)
    } else {
      // Animate the position to the end
      Animated.timing(position, {
        toValue: -300 * (resultQuantity - 1),
        duration: 500,
        useNativeDriver: true
      }).start()
      // Set the index state to the last element
      setIndex(resultQuantity - 1)
    }
  }

  // Return a JSX element that renders the image slider
  return (
    <View>
      {/* Display an animated view that contains all the images */}
      <Animated.View style={{ flexDirection: 'row', transform: [{ translateX: position }] }}>
        <Image key={image1} source={image1} style={{ width: 300, height: 300 }} />
        <Image key={image2} source={image2} style={{ width: 300, height: 300 }} />
        <Image key={image3} source={image3} style={{ width: 300, height: 300 }} />
      </Animated.View>

      {/* Display a button that goes to the previous image */}
      <TouchableOpacity onPress={prevImage}>
        <Text>Back</Text>
      </TouchableOpacity>

      {/* Display a button that goes to the next image */}
      <TouchableOpacity onPress={nextImage}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

// Export the component
export default ImageSlider
