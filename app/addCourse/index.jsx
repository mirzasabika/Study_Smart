import { View, Text, StyleSheet,TextInput, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button'
import { GenerateCourseAIModel, GenerateTopicsAIModel } from '../../config/AiModel'
import Prompt from '../../constants/Prompt'
import { setDoc, doc } from 'firebase/firestore';
import {db} from './../../config/firebaseConfig';
import { UserDetailContext } from './../../context/UserDetailContext'
import { useRouter } from 'expo-router'


export default function AddCourse() {
 const [loading,setLoading]=useState(false);
 const [userInput,setUserInput]=useState();
 const [topics,setTopics]=useState([]);
 const [selectedTopics,setSelectedTopics]=useState([]);
 const {userDetail, setUserDetail}=useContext(UserDetailContext);
 const router = useRouter();



 const onGenerateTopic = async () => {
  setLoading(true);
  const PROMPT = userInput+Prompt.IDEA;

  try {
    const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
    const responseText = (await aiResp.response.text()).trim();

    if (!responseText || (!responseText.startsWith("[") && !responseText.startsWith("{"))) {
      throw new Error("AI response is empty or not valid JSON");
    }

    try {
      const topicIdea = JSON.parse(responseText);
      console.log(topicIdea);
      setTopics(topicIdea);
    } catch (parseError) {
      throw new Error("Failed to parse AI response as JSON");
    }
  } catch (e) {
    console.error("Error generating topics:", e);
  } finally {
    setLoading(false);
  }
};


  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopics.includes(topic);
  
    if (!isAlreadyExist) {
      setSelectedTopics(prev => [...prev, topic]);
    } else {
      const updated = selectedTopics.filter(item => item !== topic);
      setSelectedTopics(updated);
    }
  };
  
  const isTopicSelected = (topic) => selectedTopics.includes(topic);
  


  // used to generate course using AI model

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics+Prompt.COURSE;
  
    try {
      const aiResp = await GenerateCourseAIModel.sendMessage(PROMPT);
      const responseText = (await aiResp.response.text()).trim();
  
      if (!responseText || (!responseText.startsWith("[") && !responseText.startsWith("{"))) {
        throw new Error("AI response is empty or not valid JSON");
      }
  
      try {
        const resp = JSON.parse(responseText);
        const courses = resp.courses;
  
        console.log(courses);
  
        // Save course info to database
        if (courses?.length) {
          courses.forEach(async (course) => {
            await setDoc(doc(db, "courses", Date.now().toString()), {
              ...course,
              createdOn: new Date(),
              createdBy: userDetail?.email,
            });
          });
        }
  
        router.push("/(tabs)/home");
      } catch (parseError) {
        throw new Error("Failed to parse AI response as JSON");
      }
    } catch (e) {
      console.error("Error generating course or saving to Firestore:", e);
    } finally {
      setLoading(false);
    }
  };





  



  return (
    <ScrollView style={{
      padding:25,
      backgroundColor:Colors.WHITE,
      flex:1
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}> Create New Course</Text>

<Text style={{
        fontFamily:'outfit',
        fontSize:30,
        marginTop: 20,

      }}> What you want to learn today?</Text>

<Text style={{
        fontFamily:'outfit',
        fontSize:15,
        marginTop:30,
        color:Colors.GRAY
      }}> What course you want to create (ex.Learn Python, Digital Marketting, 10Th Science Chapters, etc...) </Text>


   <TextInput placeholder='Ex. Learn Python , Java '
    style={styles.textInput}  numberOfLines={3} multiline={true} onChangeText={(value)=> setUserInput(value)} />

   <Button text={'Generate Topic'} type='outline' onPress={(value)=>onGenerateTopic(value)} loading={loading} />

    <View style={{
    marginTop:15,
    marginBottom:15
        
      }} >
      <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        
      }}
      >Select all topics which you want to add in the Course </Text>
    </View>

    <View 
    style={{
     display:'flex',
     flexDirection:'row',
     flexWrap:'wrap',
     gap:10,
     marginTop:10

    }}
    >
      {topics.map((item, index)=>(

        <Pressable key={index} onPress={()=>onTopicSelect(item)}>
           <Text 
           style={{
           padding:7,
           borderWidth:0.4,
           borderRadius:99,
           paddingHorizontal:15,
           backgroundColor: isTopicSelected(item) ? Colors.PRIMARY : null,
           color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
    
          }}
           >{item}</Text>
        </Pressable>
      ))}
    </View>

   {selectedTopics?.length > 0 &&  <Button text='Generate Course'  onPress={()=> onGenerateCourse()} 
    loading={loading} /> } 



    </ScrollView>

  
  )
}


const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding:15,
    marginTop:10,
    borderRadius:15,
    height:100,
    alignItems: 'flex-start',
    fontSize:20
  }
})