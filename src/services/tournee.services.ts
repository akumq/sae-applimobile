import { TourneeModel } from "../models/tournee.model";

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

    async getTourneeByID(id: number): Promise<TourneeModel | null>{

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
            return null;
        }
    }
}

export const TourneeService = new _TourneeService()
