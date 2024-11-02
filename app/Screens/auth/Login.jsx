import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text>login</Text>
      <Button
        title="to register"
        onPress={() => navigation.navigate("Register")}
      />
    </>
  );
};
export default Login;
