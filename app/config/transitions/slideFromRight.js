const slideFromRight = (index, position, width) => {
    const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0]
    })
    
    return { transform: [{ translateX }] }
};

export default slideFromRight;