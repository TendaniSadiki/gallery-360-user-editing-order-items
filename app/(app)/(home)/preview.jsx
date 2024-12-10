import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { firestore, auth } from "../../../services/firebase";
import { globalStyles } from "../../../assets/styles/GlobalStyles";
import { useLocalSearchParams } from "expo-router";

export default function PreviewScreen({ route, navigation }) {
  const params = useLocalSearchParams()
  const { artUrl, artistUid, photoUrl, artistName, artType } = params;
  return (
    <View>
      <Text>Hi</Text>
    </View>
  )
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Image
        source={{ uri: artUrl }}
        resizeMode="cover"
        style={globalStyles.video}
      />
    </View>
  );
}
