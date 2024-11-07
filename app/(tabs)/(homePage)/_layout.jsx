import React from "react";
import { useCallback, useEffect, useState} from "react";
import { View, StyleSheet, ScrollView, Text, Linking, Alert,RefreshControl} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LayoutHome(){
    const[songs, setSong] = useState(null);
    const[refreshing,setRefreshing] = useState(false);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    useEffect(() => {
        

    })
    
    async function getAudio() {
        try{
            setRefreshing(true);
            setTimeout(() =>{
                setRefreshing(false);
            },300);
            if(permissionResponse.status === 'undetermined'){
                await requestPermission();
            }
            else if(permissionResponse.status === "denied"){
                console.log('Pemissão não concedida, indo para configuração do aplicativo');
                Alert.alert('Conceda as permissões necessárias')
                Linking.openSettings();
            }
            else if(permissionResponse.status ==='granted'){
                console.log("Permitido");
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
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getAudio}/>}> 
            {songs && songs.map((audio) => <SongEntry key={audio.id} audio={audio}/>)}
            <Text>Nenhuma Musica Disponivel</Text>
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