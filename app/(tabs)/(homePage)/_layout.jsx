import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Button, Text} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutHome(){
    const[songs, setSong] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    async function getAudio() {
        if(permissionResponse.status !== 'granted'){
            await requestPermission();
        }
        const fetchedSongs = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: 50
        });
        setSong(fetchedSongs.assets); 
    }

    

    return(
       <SafeAreaView style={Styles.container}>
        <Button onPress={getAudio} title="Get Song"/>
        <ScrollView>
            {songs && songs.map((audio) => <SongEntry audio={audio}/>)}
        </ScrollView>
       </SafeAreaView>
    )
}

function SongEntry({audio}){
    const [assets, setAssets] = useState([]);

    useEffect(() =>{
        async function getSongAssets() {
            const songAssets = await MediaLibrary.getAssetsAsync({audio});
            setAssets(songAssets.assets);     
        }
        getSongAssets();
    },[audio])

    return (
        <View key={audio.id} style={Styles.songContainer}>
          <Text style={Styles.text}>
            {audio.filename} - {audio.assetCount ?? 'no'} assets
          </Text>
        </View>
    );
}

const Styles = StyleSheet.create(
    {
        container:{
            flex: 1,
            backgroundColor:"#000000",
            alignItems:"center",
   
        },
        text:{
            color:"#fff",       
        },
        songContainer: {
            padding: 10,
            margin: 5,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
        
        },
        songAssetsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
    }
)