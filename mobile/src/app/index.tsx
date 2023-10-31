import { useEffect, useState } from "react";
import { ImageBackground, StatusBar, Text, View } from "react-native";
import { Button } from "../components/Button";
import { Onboarding } from "../components/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    getStorage();
  }, []);
  // — — — — — — — — — — ACTIONS — — — — — — — — — — //
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem("ONBOARDED");
    setOnboarded(!!JSON.parse(onboarded || ""));
  };

  if (onboarded) {
    return <Onboarding />;
  }

  return (
    <View className="bg-red-50 h-full  ">
      <StatusBar translucent animated />

      <View className="-top-20  h-[80%]">
        <ImageBackground source={require("../../assets/onboarding-1.png")}>
          <View className="pt-20  justify-between h-full ">
            <View className="flex-row  items-center justify-between px-5 pt-4">
              <Text className="text-2xl font-extrabold text-slate-50">
                iBico
              </Text>
            </View>

            <Text
              numberOfLines={3}
              className="pl-5 pb-12  text-[52px] font-extrabold text-slate-50"
            >
              Explore as melhores oportunidades de emprego
            </Text>
          </View>
        </ImageBackground>
      </View>

      <Button>
        <Text>Ola</Text>
      </Button>
    </View>
  );
}
