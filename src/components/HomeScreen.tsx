import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ListView } from 'react-nativescript'

import { MainStackParamList } from "../NavigationParamList";

import { DepotModel } from '../models/depot.model';
import { DepotService } from '../services/depot.services';
import { useEffect, useState } from "react";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const [depots, setDepots] = useState<DepotModel[]>([]);;

    useEffect(() => {
      const fetchData = async () => {
        try {
          const depotData: DepotModel[]= await DepotService.getDepot();
          setDepots(depotData);
        } catch (error) {
          console.error("Error fetching depot data:", error);
        }
      };

      fetchData();
    }, []);


    const cellFactory = (depot: DepotModel) => {
        return <label text={depot.adresse} />
    }
    return (
    <stackLayout height="100%">
        <ListView
          items={depots}
          cellFactory={cellFactory}
          separatorColor="transparent"
          height="100%"
        />
      </stackLayout>
    );
}

