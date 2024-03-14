import * as React from 'react'
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation'
import { MainStackParamList } from './NavigationParamList'
import { TourneeService } from '../services/tournee.services'
import { TourneeModelDetails, DistributionModel } from '../models/tournee.model'
import { ListView } from 'react-nativescript'
import { useEffect, useState } from "react";
import { Button, ItemEventData} from '@nativescript/core'

type DetailsTourneeScreenProps = {
  route: RouteProp<MainStackParamList, 'DetailsTournee'>
  navigation: FrameNavigationProp<MainStackParamList, 'DetailsTournee'>
}

export function DetailsTourneeScreen({ route, navigation }: DetailsTourneeScreenProps) {
  const tournee_id = route.params.tourneeId
  const [tournee_details, setTourneeDetails] = useState<TourneeModelDetails | null>(null);
  const [distributions,setDistributions] = useState<DistributionModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourneeData: TourneeModelDetails = await TourneeService.getTourneeDetails(tournee_id);
        setTourneeDetails(tourneeData);
        setDistributions(tourneeData[0].distribution)
        console.log(distributions)
      } catch(error) {
        console.error("Error Depots:", error);
      }
    };

    fetchData();
  }, []); // Mettre à jour les données lorsque tournee_id ou forceRerender changent

  const onItemTap = (args: ItemEventData) => {
    navigation.navigate('Tournee');
  }


  const distributionCellFactory = (distribution: DistributionModel) => {
    console.log(distribution)
    return (
      <label text={distribution.adresse} />
    );
  };

  return (
    <stackLayout height="100%">
       <label
        fontSize="35"
        textWrap="true"
        text='◀'
        onTap={onItemTap}
      />
      {tournee_details ? (
        <ListView
          items={distributions}
          onItemTap={onItemTap}
          cellFactory={distributionCellFactory}
          separatorColor="transparent"
          height="100%"
        />
      ) : (
        <label text="Aucune donnée de distribution disponible" />
      )}
    </stackLayout>
  )
}
