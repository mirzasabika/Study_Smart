// import Animated from "react-native-reanimated";
// import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import Colors  from '../../constants/Colors';
// import { useRouter } from "expo-router";


// export default function HomeScreen() {

//   const router = useRouter();
//   return (
//    <View
//    style={{
//     flex: 1,
//     backgroundColor: Colors.WHITE,
//    }}>
//    <Image source={require('../../assets/images/landing.png')}
//    style={{
//     width: '100%',
//     height: 300,
//     marginTop: 70,
//    }}
//    />
//    <View style={{
//     padding: 25,
//     backgroundColor: Colors.PRIMARY,
//     height: '100%',
//     borderTopLeftRadius: 35,
//     borderTopRightRadius: 35,
//    }}>
//     <Text style={{
//       fontSize: 30,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       color: Colors.WHITE,
//     }}>Welcome to Study Smart</Text>
//     <Text style={{
//       fontSize: 21,
//       color: Colors.WHITE,
//       marginTop: 20,
//       textAlign: 'center',

//     }}>Transform your ideas into engaging eductional content, effortlessly with AI! 📚🤖</Text>
    
//     <TouchableOpacity style={styles.button} onPress={ ()=>router.push('/auth/SignUp')}>
//       <Text style={[styles.buttonText ,{color: Colors.PRIMARY}]}>Get Started</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={ ()=>router.push('/auth/SignIn')} style={[styles.button, {backgroundColor: Colors.PRIMARY, borderWidth: 1, borderColor: Colors.WHITE}]}>
//       <Text style={[styles.buttonText ,{color: Colors.WHITE}]}>Already have an Account?</Text>
//     </TouchableOpacity>
//    </View>
//    </View>
//   );
// }
//  const styles = StyleSheet.create({
//   button:{
//     padding: 15,
//     backgroundColor: Colors.WHITE,
//     marginTop: 20,
//     borderRadius: 10
//   },
//   buttonText:{
//     textAlign: 'center',
//     fontSize: 18,
//   }
//  })

