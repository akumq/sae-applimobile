
import * as React from 'react'
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation'
import { MainStackParamList } from './NavigationParamList'


import { TourneeService } from '../services/tournee.services'
import { TourneeModel } from '../models/tournee.model'

import { useEffect, useState } from "react";

type DetailsTourneeScreenProps = {
  route: RouteProp<MainStackParamList, 'DetailsTournee'>
  navigation: FrameNavigationProp<MainStackParamList, 'DetailsTournee'>
}

// Update the input of this function 👇
export function DetailsTourneeScreen({ route }: DetailsTourneeScreenProps) {
  // Add this 👇
  const tournee_id = route.params.tourneeId
  const [tournee, setTournee] = useState<TourneeModel | null>();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const tourneeData: TourneeModel | null = await TourneeService.getTourneeByID(tournee_id);
        setTournee(tourneeData)
      }catch(error){
        console.error("Error Depots:", error)
      }
    };  

    fetchData();
  }, []);

  return <stackLayout></stackLayout>
}