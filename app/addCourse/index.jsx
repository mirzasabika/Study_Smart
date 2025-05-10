import { View, Text, StyleSheet,TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import Button from '../../components/Shared/Button'
import { GenerateTopicsAIModel } from '../../config/AiModel'
import Prompt from '../../constants/Prompt'


export default function AddCourse() {
 const [loading,setLoading]=useState(false);
 const [userInput,setUserInput]=useState();

 const onGenerateTopic = async() =>{
  setLoading(true);
  // Get topic idea from ai model

  const PROMPT = userInput+Prompt.IDEA;
  const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT)
  const topicIdea = aiResp.response.text();
  console.log(topicIdea)
 }
  
  return (
    <View style={{
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
        marginTop20,
        
      }}> What You Want to Learn Today?</Text>

<Text style={{
        fontFamily:'outfit',
        fontSize:20,
        marginTop:30,
        color:Colors.GRAY
      }}> What course you want to create (ex.Learn Python, Digital Marketting, 10Th Science Chapters, etc...) </Text>


   <TextInput placeholder='Ex. Learn Python , Java '
    style={styles.textInput}  numberOfLines={3} multiline={true} onChangeText={(value)=> setUserInput(value)} />

   <Button text={'Generate Topic'} type='outline' onPress={()=>onGenerateTopic()}loading={loading} />
    </View>

  
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
    fontSize:12
  }
})