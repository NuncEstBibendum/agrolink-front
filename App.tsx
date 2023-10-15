import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/Navigator";
import { colors } from "./constants/colors";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";

function App() {
  return (
    // @ts-ignore
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer
          fallback={
            <View style={{ flex: 1 }}>
              <ActivityIndicator color={colors.blue[100]} size="large" />
            </View>
          }
          theme={{
            dark: false,
            colors: {
              ...DefaultTheme.colors,
              background: colors.white,
              text: colors.blue[200],
            },
          }}
        >
          <Navigator />
          <StatusBar
            style="dark"
            backgroundColor={colors.white}
            networkActivityIndicatorVisible={false}
          />
        </NavigationContainer>
      </SafeAreaView>
    </AuthProvider>
  );
}

export default App;
