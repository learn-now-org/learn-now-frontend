import { View } from "react-native";
import { Stack } from "expo-router";
import SearchBar from "../../components/searchBar";
import { Text } from "native-base";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Home Page" }} />
        <SearchBar />
    </View>
  );
}