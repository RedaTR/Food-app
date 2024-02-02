import React from "react";
import { ActivityIndicator, Text, View } from "react-native"

const Loading = (props) => {
    return (
        <View className="flex-1 flex justify-center items-center">
            <ActivityIndicator {...props} />
        </View>
    )
}

export default Loading;