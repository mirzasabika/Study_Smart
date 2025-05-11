import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constants/Option'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CourseList({courseList}) {
  return (
    <View style={{
        marginTop: 15,

    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Courses</Text>

      <FlatList 
      data={courseList}
      horizental={true}
      showHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View key={index} style={styles.courseContainer}>
            <Image source={imageAssets[item.banner_image]}
            style={{
                width: '100%',
                height: 150,
                borderRadius: 15
            }}
            />
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                marginTop: 10
            }}>{item?.courseTitle}</Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
                marginTop: 5,
            }}>
          <Ionicons name="book-outline" size={24} color="black" />
            <Text style={{
                fontFamily: 'outfit',
            }}>{item?.chapters?.length} Chapters</Text>
            </View>


        </View>
      )}
      />
    </View>
  )
} const styles = StyleSheet.create({
    courseContainer:{
        margin: 6,
        borderRadius: 15,
        backgroundColor: Colors.BG_GRAY,
        padding: 10,
        width: 260,
    }
})
