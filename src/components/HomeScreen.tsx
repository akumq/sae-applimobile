import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { ListView } from 'react-nativescript'

import { MainStackParamList } from "../NavigationParamList";

import { DepotModel } from '../models/depot.model';
import { DepotService } from '../services/depot.services';

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const depotsList = DepotService.getDepot()

    const cellFactory = (depot: DepotModel) => {
        return <label text={depot.adresse} />
    }
    return (
    <stackLayout height="100%">
        <ListView
          items={depotsList}
          cellFactory={cellFactory}
          separatorColor="transparent"
          height="100%"
        />
      </stackLayout>
    );
}

