import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screens = [
  {
    title: "Encontre \numa \noportunidade",
    message:
      "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit ",
    image: require("../../../assets/onboarding-1.png"),
  },
  {
    image: require("../../../assets/onboarding-2.png"),

    title: "Uma forma rápida e \nsimples",
    message:
      "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit ",
  },
  {
    image: require("../../../assets/onboarding-3.png"),

    title: "Divulgue \nseus \nserviços",
    message:
      "Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit ",
  },
];

export function Onboarding() {
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  function handleNextPage() {
    setCounter((prev) => {
      if (prev === 2) {
        router.push("/");
        return prev;
      }

      return prev + 1;
    });
  }

  return (
    <View className="bg-red-50 h-full  ">
      <StatusBar translucent animated />

      <View className="-top-20  h-[80%]">
        <ImageBackground source={screens[counter].image}>
          <View className="pt-20  justify-between h-full ">
            <View className="flex-row  items-center justify-between px-5 pt-4">
              <Text className="text-2xl font-extrabold text-slate-50">
                iBico
              </Text>
              <Link href="/">
                <Text className="text-slate-50 font-semibold text-lg ">
                  pular
                </Text>
              </Link>
            </View>

            <Text
              numberOfLines={3}
              className="pl-5 pb-12  text-[52px] font-extrabold text-slate-50"
            >
              {screens[counter].title}
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View className="px-5  pt-5  -translate-y-[80px]    w-full ">
        <Text className="    text-slate-400 text-lg text-center">
          {screens[counter].message}
        </Text>

        <View className=" justify-center  flex-row gap-4 mt-3">
          <View
            className={`transition-colors w-2 h-2 bg-slate-400 rounded-md ${
              counter === 0 && "w-10 bg-blue-700 "
            }`}
          ></View>
          <View
            className={`transition-colors w-2 h-2 bg-slate-400 rounded-md ${
              counter === 1 && " w-10 bg-blue-700 "
            }`}
          ></View>
          <View
            className={` transition-colors  w-2 h-2 bg-slate-400 rounded-md ${
              counter === 2 && " w-10 bg-blue-700 "
            }`}
          ></View>
        </View>

        <TouchableOpacity
          onPress={handleNextPage}
          className="py-2 px-6  mt-6   border bg-blue-700 border-transparent  rounded-lg ml-auto  "
        >
          <Feather size={24} color="#f8fcfa" name="arrow-right" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
