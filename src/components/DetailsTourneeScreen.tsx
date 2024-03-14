import * as React from 'react'
import { RouteProp } from '@react-navigation/core'
import { FrameNavigationProp } from 'react-nativescript-navigation'
import { MainStackParamList } from './NavigationParamList'
import { TourneeService } from '../services/tournee.services'
import { TourneeModelDetails, DistributionModel, LivraisonModel } from '../models/tournee.model'
import { ListView } from 'react-nativescript'
import { useEffect, useState } from "react";
import { Button, ItemEventData} from '@nativescript/core'

type DetailsTourneeScreenProps = {
  route: RouteProp<MainStackParamList, 'DetailsTourneeScreen'>
  navigation: FrameNavigationProp<MainStackParamList, 'DetailsTourneeScreen'>
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

  const NavigateTournee = (args: ItemEventData) => {
    navigation.navigate('HomeScreen');
  }

  const NavigateQrCode = (args: ItemEventData) => {
    navigation.navigate('QRCodeScreen');
  }

  const distributionCellFactory = (distribution: DistributionModel) => {
    return (
        <stackLayout style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <label text={`Adresse: ${distribution.adresse}`} fontSize="16" />
            <label text={`Code Postal: ${distribution.codepostal}`} fontSize="16" />
            <label text={`Ville: ${distribution.ville}`} fontSize="16" />
            <label text={`Capacité: ${distribution.capacite}`} fontSize="16" />
            <stackLayout>
                {distribution.livraisons.map((livraison, index) => (
                    <label key={index} text={`${livraison.count} | ${livraison.panier}`} fontSize="12" />
                ))}
            </stackLayout>
        </stackLayout>
    );
};

  return (
    <stackLayout height="100%">
       <label
        fontSize="35"
        textWrap="true"
        text='◀'
        onTap={NavigateTournee}
      />
      {tournee_details ? (
        <ListView
          items={distributions}
          onItemTap={NavigateQrCode}
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
