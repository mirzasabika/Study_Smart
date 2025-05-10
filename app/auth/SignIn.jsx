import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState,useContext} from 'react'
import { useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserDetailContext } from './../../context/UserDetailContext';
import { auth,db } from './../../config/firebaseConfig';
import { getDoc,doc } from 'firebase/firestore';
import { ToastAndroid } from 'react-native';


export default function SignIn() {
  const router=useRouter();
   const [email, setEmail] =useState();
    const [password, setPassword] =useState();
    const {userDetail,setUserDetail}=useContext(UserDetailContext);
    const [loading,setLoading]=useState(false);
    const onSignInClick =()=>{
      setLoading(true);
      signInWithEmailAndPassword(auth,email,password)
      .then(async(resp)=>{
        const user=resp.user
        console.log(user)
        await getUserDetail();
        setLoading(false);
        router.replace('/(tabs)/home')
      }).catch(e=>{
        console.log(e)
        setLoading(false);
        ToastAndroid.show('Incorrect Email & Password',ToastAndroid.BOTTOM)
      })
    }
    const getUserDetail=async()=>{
      const result=await getDoc(doc(db,'users',email));
      console.log(result.data())
      setUserDetail(result.data())
    }
  return (
    <View style={{
          display:'flex',
          alignItems:'center',
          paddingTop:50,
          flex:1,
          padding:25,
          backgroundColor:Colors.WHITE
        }} >
          <Image source={require('./../../assets/images/logo.png')}
          style={{
            width:180,
            height:180
          }}
          />
    
          <Text style={{
            fontSize:30,
            fontFamily:'outfit-bold'
          }}> Welcome Back</Text>
    
          
          <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={styles.textInput} />
          <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.textInput} />
    
          <TouchableOpacity
          onPress={onSignInClick}
          disabled={loading}
          style={{
            padding:15,
            backgroundColor:Colors.PRIMARY,
            width:'100%',
            marginTop:25,
            borderRadius:10
          }}
          >
            {!loading? <Text style={{
              fontFamily:'outfit',
              fontSize:20,
              color:Colors.WHITE,
              textAlign: 'center'
            }}>Sign In</Text>:
            <ActivityIndicator size={'large'} color={Colors.WHITE}/>

          }
          </TouchableOpacity>
    <View style={{
      display: 'flex',
      flexDirection: 'row', 
      gap: 5,
      marginTop: 20
    }}>
          <Text style={{
            fontFamily: 'outfit',
          }}>Don't have an account?</Text>
          <Pressable
          onPress={()=>router.push('/auth/SignUp')}
          >
              <Text style={{
                color: Colors.PRIMARY,
                fontFamily: 'outfit-bold'
              }}>Create New Here</Text>
            </Pressable>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding:15,
    fontSize: 18,
    marginTop:20,
    borderRadius:8
  }
})