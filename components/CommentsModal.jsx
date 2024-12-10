import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Pressable
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { firestore, auth } from "../services/firebase";

function CommentsModal({
  ImageUid,
  route,
  isVisible,
  onClose,
  photoURL,
  fullName,
}) {
  const [comments, setComments] = useState(null);
  const [com, setCom] = useState("");
  const [numCom, setNumCom] = useState(0);
  const [post, setPost] = useState(ImageUid);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [isModalVisible, setModalVisible] = useState(isVisible);
  //
  const addComments = () => {
    const comment = com
    setCom('');
    Keyboard.dismiss()
    const uid = auth.currentUser ? auth.currentUser.uid : '0CVA2hLN0SfrpGMDBMRyBqGkGO32';
    //  console.log(ImageUid + " the image uid 333")
    firestore
      .collection("comments")
      .add({
        comments: com,
        uid: uid,
        photoURL: photoURL,
        imageUID: ImageUid,
        userName: fullName,
      })
      .then((key) => {
        key.update({
          key: key.id,
        })

      })
      .catch((error) => {
        alert(error);
        setCom(comment)
      });
  };
  //
  const getComents = () => {
    // console.log(ImageUid);
    firestore
      .collection("comments")
      .where("imageUID", "==", ImageUid)
      .onSnapshot((snapShot) => {
        const commentNumber = snapShot.size;
        const comment = snapShot.docs.map((comment) => comment.data());
        setComments(comment);
        setNumCom(commentNumber);
      });
  };
  useEffect(() => {
    //////
    // console.log(photoURL + " user photo");
    let isMounted = true
    if (isMounted) {
      firestore
        .collection("users")
        .where("uid", "==", auth.currentUser.uid)
        .onSnapshot((snapShot) => {
          if(!snapShot.empty) {
            const displayName = snapShot.docs.map((docs) => docs.data().fullName);
            const userPhoto = snapShot.docs.map((docs) => docs.data().photoURL);
            //  console.log(displayName+ "  this user image");
            //  console.log(userPhoto + " user photo");
            setUserName(displayName);
            setUserImage(userPhoto);
          }
        });
      ////////
      getComents();
      /////
      if (isModalVisible) {
        Animated.timing(modalAnimatedValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(modalAnimatedValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start(() => onClose());
      }
    }
    return () => isMounted = false

  }, [isModalVisible]);
  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1000, 1000 - 720],
  });
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} style={{ minHeight: 500 }}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "rgba(16,18,27,0.1)",
          shadowColor: "#000",
          shadowOffset: { width: 3, height: 9 },
          shadowOpacity: 4,
          shadowRadius: 20,
          elevation: 5,
          height: '10%'
        }}
        behavior="padding"
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          onPress={() => { Keyboard.dismiss }}
          style={{
            position: "absolute",
            left: 0,
            // top: modalY,
            bottom: 0,
            width: "100%",
            height: "80%",
            padding: 0,
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            backgroundColor: "#fff",
            minHeight: 320,

            // maxHeight: 300
          }}
        >
          <View style={{ flex: 6, paddingHorizontal: 0 }} onPress={() => Keyboard.dismiss}>
            {/* <View style={{ height: 40, justifyContent: 'center'}}>

            </View> */}
            <Text style={{ height: 40, lineHeight: 40, color: "#000", alignSelf: "center", fontSize: 18 }}>
              {numCom > 0 ? <Text>{numCom}</Text> : <View></View>} Comments
            </Text>
            <View style={{ justifyContent: "flex-start", bottom: 0 }}>
              {/* <AntDesign
                name="closecircleo"
                size={24}
                color="#000"
                onPress={() => setModalVisible(!isVisible)}
              /> */}
            </View>
            <View style={{ flex: 1, marginHorizontal: 10 }}>
              {numCom > 0 ? (
                <FlatList
                  data={comments}
                  style={{ flexDirection: "column" }}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 8,
                          width: "70%",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Image
                            source={{ uri: `${item.photoURL}` }}
                            style={styles.profilePic}
                          />
                        </View>
                        <View
                          style={{
                            bottom: 10,
                            width: 210,
                            flexDirection: "column",
                          }}
                        >
                          <Text style={styles.textStyle}>{item.userName}</Text>
                          <Text
                            style={{
                              width: "95%",
                              alignSelf: "center",
                              left: 15,
                              color: "black",
                            }}
                          >
                            {item.comments}
                          </Text>
                        </View>
                        <View style={{ left: 35 }}>
                          {/* <MaterialIcons name="favorite-outline" color="#000" size={25}/> */}
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <View
                  style={{
                    alignSelf: "center",
                    width: "80%",
                    height: 50,
                    backgroundColor: "lightgrey",
                    borderRadius: 14,
                    marginVertical: 10,
                  }}
                >
                  <Text style={{ alignSelf: "center", marginVertical: 15 }}>
                    Be the first one to add a comment
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flexDirection: "row", height: 70, padding: 10 }}>
            {/* <View style={styles.userProfile}>
              <Image
                source={{ uri: `${photoURL}` }}
                resizeMode="stretch"
                style={styles.profilePic}
              />
            </View> */}
            <View style={styles.inputStyle}>
              {/* <View style={{ flexDirection: "row" }}> */}
              <TextInput
                style={{ flex: 1 }}
                onChangeText={(comments) => setCom(comments)}
                placeholder="Comments..."
                placeholderTextColor="#828282"
                autoCapitalize="sentences"
                value={com}
              />

              {/* </View> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                width: 40,
                paddingLeft: 10,
                justifyContent: "space-between",
              }}
            >
              {/* <Entypo style={{alignSelf: 'center'}} name="emoji-happy" color="#000" size={25}/> */}
              <Pressable onPress={addComments} disabled={com.trim() === ''}>
                <MaterialCommunityIcons
                  style={{ alignSelf: "center", marginVertical: 7 }}
                  name="send-outline"
                  color={com.trim() === '' ? 'rgb(200,200,200)' : '#000'}
                  size={30}
                />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
export default CommentsModal;
const styles = StyleSheet.create({
  inputStyle: {
    color: "#000",
    height: 50,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#676767",
    padding: 10
    // bottom: 30,
    // marginHorizontal: 15,
    // marginVertical: 7,
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
  },
  textStyle: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold",
    // borderWidth: 1, borderColor: 'yellow'
    marginHorizontal: "5%",
    marginVertical: "3%",
  },
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#C4C4C4",
    marginVertical: -22,
  },
});
