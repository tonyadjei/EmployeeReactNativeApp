import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const CreateEmployee = ({ navigation, route }) => {
  const [name, setName] = useState(route.params ? route.params.name : '');
  const [phone, setPhone] = useState(route.params ? route.params.phone : '');
  const [email, setEmail] = useState(route.params ? route.params.email : '');
  const [salary, setSalary] = useState(route.params ? route.params.salary : '');
  const [picture, setPicture] = useState(
    route.params ? route.params.picture : ''
  );
  const [position, setPosition] = useState(
    route.params ? route.params.position : ''
  );
  const [modal, setModal] = useState(false); // like a pop-up

  const updateData = async () => {
    try {
      const result = await fetch(
        `http://ecd9-46-193-64-19.ngrok.io/employees/${route.params._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            email,
            salary,
            picture,
            position,
          }),
        }
      );
      const finalResult = await result.json();
      if (finalResult) {
        Alert.alert(
          `Employee ${finalResult.data.name} has been updated successfully`
        );
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const submitData = async () => {
    try {
      const result = await fetch(
        'http://ecd9-46-193-64-19.ngrok.io/employees',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            salary,
            picture,
            phone,
            position,
          }),
        }
      );
      const data = await result.json();
      Alert.alert(`Employee ${data.name} successfully created!`);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(error.message);
    }
  };

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
    // create new form element
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
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView>
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
          label="Position"
          value={position}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setPosition(text)}
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
          onPress={() => {
            if (route.params) {
              updateData();
            } else {
              submitData();
            }
          }}
        >
          {route.params ? 'Update' : 'Save'}
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
      </KeyboardAvoidingView>
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
