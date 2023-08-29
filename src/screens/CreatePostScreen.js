import { Text, StyleSheet, View, Image, TextInput, Button, } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const user = {
    "id": "u1",
    "image": "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
    "name": "Vadim Savin",
};


const CreatePostScreen = () => {

    const [description, setDescription] = useState("");
    const [image, setImage] = useState("null");

    const navigation = useNavigation();


    const onSubmit = () => {
        console.warn("On Submit", description);
        setDescription("");

        navigation.goBack();
    };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


    return (
        <View style={styles.container}>
        <View style={styles.header}>
                <Image source={{ uri: user.image }} style={styles.profileImage} />
                <Text style={styles.name}>{user.name}</Text>
                <Entypo
                    onPress={pickImage}
                    name="images"
                    size={24}
                    color="limegreen"
                    style={styles.icon}
                />
            
        </View>
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="What's on your mind?"
                multiline />
                <Image source={{ uri : image}} style={styles.image}/>
            <View style={styles.buttonContainer}>
                <Button title="Post" onPress={onSubmit}/>
            </View>


            
            

        </View>

    )

};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        padding: 10,
        paddingTop: 30,
        backgroundColor: "#fff",
        
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 30,
        marginRight: 10,
    },
    name: {
        fontWeight: "500",
    },
    buttonContainer: {
        marginTop: "auto",
    },
    icon: {
        marginLeft: "auto",
    },
    image: {
        width: "50%",
        aspectRatio: 4/3,
        alignSelf: "center",
    }
})

export default CreatePostScreen;