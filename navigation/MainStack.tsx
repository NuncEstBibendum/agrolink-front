import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import ProfileIconInactive from "../assets/svg/profile.svg";
import ProfileIconActive from "../assets/svg/profile-active.svg";
import DashboardIconInactive from "../assets/svg/dashboard.svg";
import DashboardIconActive from "../assets/svg/dashboard-active.svg";

const MainStack: React.FunctionComponent = () => {
  const Tab = createBottomTabNavigator();

  const tabBarConfig = {
    tabBarInactiveTintColor: colors.white,
    tabBarActiveTintColor: colors.black,
  };

  const renderTabBar = ({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps) => {
    return (
      <>
        <BottomTabBar
          descriptors={descriptors}
          state={state}
          navigation={navigation}
          insets={{
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          style={{
            backgroundColor: colors.black,
            height: 60,
          }}
        />
      </>
    );
  };

  const TabIcon = ({
    focused,
    icon,
    title,
  }: {
    focused: boolean;
    icon: JSX.Element;
    title: string;
  }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        {icon}
        <Text
          style={{
            color: focused ? colors.blue[500] : colors.black,
            fontSize: 9,
            marginTop: 2,
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator
        initialRouteName={"HomeStack"}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            position: "absolute",
            overflow: "hidden",
          },
        }}
        tabBar={renderTabBar}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "",
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <TabIcon
                  focused={focused}
                  title="Conversations"
                  icon={
                    focused ? (
                      <DashboardIconActive />
                    ) : (
                      <DashboardIconInactive />
                    )
                  }
                />
              );
            },
            ...tabBarConfig,
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            title: "",
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <TabIcon
                  focused={focused}
                  title="Mon compte"
                  icon={
                    focused ? <ProfileIconActive /> : <ProfileIconInactive />
                  }
                />
              );
            },
            ...tabBarConfig,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainStack;
