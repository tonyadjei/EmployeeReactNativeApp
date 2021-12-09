import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false); // like a pop-up

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const imagePermission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (imagePermission.status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions in order for you to upload photos!'
          );
        }
        const cameraPermission =
          await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
          Alert.alert(
            'Sorry we need camera permissions for you to take images!'
          );
        }
      }
    })();
  }, []);

  // function to pick image from gallery
  const pickFromGallery = async () => {
    let galleryResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    // cloudinary service automatically gives each file we upload a unique name
    if (!galleryResult.cancelled) {
      const imageFile = {
        uri: galleryResult.uri,
        type: `test/${
          galleryResult.uri.split('.')[galleryResult.uri.split('.').length - 1]
        }`,
        name: `test.${
          galleryResult.uri.split('.')[galleryResult.uri.split('.').length - 1]
        }`,
      };
      handleUpload(imageFile);
    }
  };

  // function to get image from camera
  const pickFromCamera = async () => {
    let cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!cameraResult.cancelled) {
      const imageFile = {
        uri: cameraResult.uri,
        type: `test/${
          cameraResult.uri.split('.')[cameraResult.uri.split('.').length - 1]
        }`,
        name: `test.${
          cameraResult.uri.split('.')[cameraResult.uri.split('.').length - 1]
        }`,
      };
      handleUpload(imageFile);
    }
  };

  // function to upload image to cloudinary servers
  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'employeeApp');
    data.append('cloud_name', 'empreactapp');

    fetch('https://api.cloudinary.com/v1_1/empreactapp/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPicture(data.secure_url);
        setModal(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.inputStyle}
        label="Name"
        value={name}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Email"
        value={email}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Phone"
        value={phone}
        theme={theme}
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.inputStyle}
        label="Salary"
        value={salary}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setSalary(text)}
      />
      <Button
        style={styles.inputStyle}
        icon={picture === '' ? 'upload' : 'check'}
        mode="contained"
        theme={theme}
        onPress={() => setModal(true)}
      >
        Upload Image
      </Button>
      <Button
        style={styles.inputStyle}
        icon="content-save"
        mode="contained"
        theme={theme}
        onPress={() => console.log('saved')}
      >
        Save
      </Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera-image"
              theme={theme}
              mode="contained"
              onPress={() => pickFromCamera()}
            >
              Camera
            </Button>
            <Button
              theme={theme}
              icon="image"
              mode="contained"
              onPress={() => pickFromGallery()}
            >
              Gallery
            </Button>
          </View>
          <Button theme={theme} onPress={() => setModal(false)}>
            Cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  colors: {
    primary: '#006aff',
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default CreateEmployee;
