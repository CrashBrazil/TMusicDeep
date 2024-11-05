import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Button, Text, Linking, Alert} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutHome(){
    const[songs, setSong] = useState(null);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

    async function getAudio() {
        try{
            if(permissionResponse.status === 'undetermined'){
                await requestPermission();
            }
            else if(permissionResponse.status === 'denied'){
                console.log('Pemissão negada, indo para configuração do aplicativo');
                Alert.alert('Conceda as permissões necessárias')
                Linking.openSettings();
            }
            
        
            const fetchedSongs = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                first: 100,
                sortBy: ['duration']
                

            });
            setSong(fetchedSongs.assets); 
        }
        catch(error){
            console.log("Error:",error);
            
        }
    }

    

    return(
       <SafeAreaView style={Styles.container}>
        <Button onPress={getAudio} title="Get Song"/>
        <ScrollView>
            {songs && songs.map((audio) => <SongEntry key={audio.id} audio={audio}/>)}
        </ScrollView>
       </SafeAreaView>
    )
}

function SongEntry({audio}){
    const [assets, setAssets] = useState([]);

    useEffect(() =>{
        async function getSongAssets() {
            const songAssets = await MediaLibrary.getAssetsAsync({
                mediaType:'audio'
            });
            setAssets(songAssets.assets);     
        }
        getSongAssets();
    },[audio])

    return (
        <View key={audio.id} style={Styles.songContainer}>
          <Text style={Styles.text}>
            {audio.filename} - {audio.duration}
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
    }
)