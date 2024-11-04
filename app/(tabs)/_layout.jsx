import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function TabLayout(){

    return(
        <Tabs screenOptions={{ 
            headerStyle: {
                backgroundColor:"#000000",
                borderBottomWidth: 0,
                shadowColor: "transparent",
                elevation: 0
            },
            tabBarStyle: {
                backgroundColor:"#000000", 
                shadowColor: "transparent",
                
            },
            tabBarLabelStyle:{
                fontFamily: "SpaceMono",
                fontStyle:"italic",
                fontSize:14

            },
            headerTintColor:"#FFFFFF",
            headerTitleStyle:{
                fontFamily: "Inter-Black",
                fontSize: 30,
            },
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor:"#888888",
        }}>
            <Tabs.Screen 
                name="(homePage)"
                options={{
                    title:"Songs",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons size={33} name="home" color={color} />,

                }}

            />
            <Tabs.Screen
                name="(playlist)"
                options={{
                    title:"PlayList",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons size={35} name="playlist-music-outline" color={color}/>
                }}
            
            />
            
        </Tabs>
    )
}