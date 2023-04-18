import { Slot } from "expo-router";
import { Provider } from "../context/auth";
import { NativeBaseProvider } from "native-base";

export default function Root() {
  return (
    <NativeBaseProvider>
    <Provider>
      <Slot />
    </Provider>
    </NativeBaseProvider>
  );
}