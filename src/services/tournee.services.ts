import { DepotModel } from "../models/depot.model";
import { TourneeModel, TourneeModelDetails } from "../models/tournee.model";

class _TourneeService {

    async getTournee(): Promise<TourneeModel[]> {

        var result : TourneeModel[]= [];

        const response = await fetch("https://ytpaqpikqarnveticqhl.supabase.co/rest/v1/tournees?select=*",{
            method: "GET",
            headers: {
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFxcGlrcWFybnZldGljcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDQ3MzUsImV4cCI6MjAxOTYyMDczNX0.4glNGKdXcHAXUyWuO5fpvcmg4oRyH9TvtTZ7OYMkcfc",
            },
        })

        if(response.ok){
            result = await response.json()
            return result;
        }else{
            return result;
        }
        
    }

    async getTourneeDetails(id: number ): Promise<TourneeModelDetails>{

        const donnee = {tournee_id: id, semaine: 9}
        const response = await fetch("https://ytpaqpikqarnveticqhl.supabase.co/functions/v1/tournees",{
            method: "POST",
            headers: {
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFxcGlrcWFybnZldGljcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDQ3MzUsImV4cCI6MjAxOTYyMDczNX0.4glNGKdXcHAXUyWuO5fpvcmg4oRyH9TvtTZ7OYMkcfc",
            },
            body: JSON.stringify(donnee),
        });

        if(response.ok){
            const data: TourneeModelDetails = await response.json();
            return data;
        }else{
            return Promise.reject();
        }

    }

    async getTourneeByID(id: number): Promise<TourneeModel>{

        const response = await fetch("https://ytpaqpikqarnveticqhl.supabase.co/rest/v1/tournees?eq."+id.toString(),{
            method: "GET",
            headers: {
                "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cGFxcGlrcWFybnZldGljcWhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwNDQ3MzUsImV4cCI6MjAxOTYyMDczNX0.4glNGKdXcHAXUyWuO5fpvcmg4oRyH9TvtTZ7OYMkcfc",
            },
        })

        if(response.ok){
            const result : TourneeModel = await response.json()
            return result;
        }else{
            return Promise.reject();
        }
    }
}

export const TourneeService = new _TourneeService()
