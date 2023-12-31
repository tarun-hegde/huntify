import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList,
  ActivityIndicator
 } from 'react-native'
import { useRouter } from 'expo-router'
import {COLORS,SIZES } from '../../../constants'
import styles from './popularjobs.style'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'
const Popularjobs = () => {

  const router = useRouter();
  const [data,isLoading,error] = useFetch(
    'search',{
      query:'Full-time',
      num_pages:1,
    }
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity onPress={()=>router.push('/popular')}>
          <Text style={styles.headerBtn}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
{
 isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : 
 error ?
 (
    <Text>{error}</Text>
  ) : (
    <FlatList
    data={[1,2,3,4,5]}
    renderItem={({item})=>(
      <TouchableOpacity onPress={()=>router.push(`/job/${item._id}`)}>
        <PopularJobCard item={item}/>
      </TouchableOpacity>
    )}
    keyExtractor={item=>item._id}
    contentContainerStyle={{columnGap:SIZES.medium}}
    horizontal
    />
 )
}
      </View>
    </View>
  )
}

export default Popularjobs