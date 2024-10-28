import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
const Document = () => {
  const [fileInfo, setFileInfo] = useState(null);
  const handleDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
      console.log(result.canceled);
      if (result.canceled) {
        setFileInfo(null);
      } else {
        setFileInfo(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="pick a document" onPress={handleDocument} />
      {fileInfo && (
        <View>
          <Text>File Name: {fileInfo.name}</Text>
          <Text>File Size: {fileInfo.size} bytes</Text>
          <Text>File URI: {fileInfo.uri}</Text>
        </View>
      )}
    </View>
  );
};

export default Document;
