import { DepotModel } from "../models/depot.model";

class _DepotService {

    async getDepot(): Promise<DepotModel[]> {

        var result : DepotModel[]= [];

        const response = await fetch("https://ytpaqpikqarnveticqhl.supabase.co/rest/v1/view_depots_details",{
            method: "GET",
            headers: {
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFxcGlrcWFybnZldGljcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDQ3MzUsImV4cCI6MjAxOTYyMDczNX0.4glNGKdXcHAXUyWuO5fpvcmg4oRyH9TvtTZ7OYMkcfc",
            },
        })

        if(response.ok){
            // console.log(response.json())
            result = await response.json()
            return result;
        }else{
            return result;
        }
        // console.log(result)
    }

}

export const DepotService = new _DepotService()
