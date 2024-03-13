
import * as React from 'react'
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation'
import { MainStackParamList } from './NavigationParamList'


import { TourneeService } from '../services/tournee.services'
import { TourneeModel, TourneeModelDetails } from '../models/tournee.model'
import { ListView } from 'react-nativescript'

import { useEffect, useState } from "react";
import { Button, ItemEventData} from '@nativescript/core'
import { DepotModel } from '../models/depot.model'

type DetailsTourneeScreenProps = {
  route: RouteProp<MainStackParamList, 'DetailsTournee'>
  navigation: FrameNavigationProp<MainStackParamList, 'DetailsTournee'>
}

// Update the input of this function 👇
export function DetailsTourneeScreen({ route,navigation }: DetailsTourneeScreenProps) {
  // Add this 👇
  const tournee_id = route.params.tourneeId
  const [tournee_details,setTourneeDetails] = useState<TourneeModelDetails>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourneeData: TourneeModelDetails = await TourneeService.getTourneeDetails(tournee_id);
        setTourneeDetails(tourneeData)
        console.log(tourneeData)
      }catch(error){
        console.error("Error Depots:", error)
      }
    };  

    fetchData();
  }, []);

  const onItemTap = (args: ItemEventData) => {
    navigation.navigate('Tournee');
  }

  const depotsList = (depot: DepotModel) => {
    return <label text={depot.adresse} />
  }

  return (

    <stackLayout height="100%">
       <label 
        fontSize="35"
        textWrap="true" 
        text='◀' 
        onTap={onItemTap}
      />
      {tournee_details?.distribution ? (
        <ListView
          items={tournee_details.distribution}
          cellFactory={depotsList}
          separatorColor="transparent"
          height="100%"
        />
      ) : (
        <label text="Aucune donnée de distribution disponible" />
      )}
    </stackLayout>
  )

}