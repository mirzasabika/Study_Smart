import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constants/Colors'
import NoCourse from '../../components/Home/NoCourse'
import {db} from './../../config/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import PracticeSection from './../../components/Home/PracticeSection'
import CourseList from '../../components/Home/CourseList'
import { UserDetailContext } from '../../context/UserDetailContext'


export default function Home() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  useEffect(()=>{userDetail&&GetCourseList();
}, [userDetail])
  const GetCourseList= async() => {
    setCourseList([])
    const q=query(collection(db, 'Courses'), where("createdBy", '==',userDetail?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setCourseList((prev)=>[...prev,doc.data()])
    })
  }
  return (
    <FlatList
    data={[]}
    ListHeaderComponent={
    <View style={{padding:25, 
        paddingTop: Platform.OS == 'ios' && 45,
        flex:1,
        backgroundColor: Colors.WHITE
    }}>
    <Header/>
    {courseList?.length == 0 ?
    <NoCourse />:
    <View>
      <CourseProgress courseList={courseList}/>
      <PracticeSection/>
<CourseList courseList={courseList}/>
<CourseList courseList={courseList}/>
</View>
}
    </View>
    }/>
  )
}
