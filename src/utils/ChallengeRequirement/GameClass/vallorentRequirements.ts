import { Dao } from "../../Classes/Dao";

interface IVallorent {
    checkIfReqMeet : (userAchievement : VallorentUserData , goals:VallorentUptoDateData) => boolean
    updateMatchDetails : (matchData : VallorentUserData ,userId :string) => Promise<VallorentUptoDateDataArray> 
    getDataUptoDate : (start : string , end: string , userId : string) => Promise<VallorentUptoDateDataArray>
    calculateTotal : (matches : VallorentUptoDateDataArray , challenge : VallorentUptoDateData) => VallorentUptoDateData
    uploadChallenges : (data : any) => Promise<void>
    uploadProgress : (data : UploadProgress) => Promise<any>
    getProgressData : (userId : string) => Promise<any>
}

type UploadProgress = Array<{requirements : VallorentUserData , userId :string  , challengeId :string}>

export type VallorentUptoDateDataArray = {
    id: number;
    match_start: string;
    match_end: string;
    total_kills: number;
    deaths: number;
    assists: number;
    headshot: number;
    spikes_planted: number;
    spikes_defuse: number;
    damage_done: number;
    team_scores: number;
    match_status: boolean;
    agent: string;
    region: string;
    game_mode: string;
    damage_taken: number;
    userId : string
}[] | null

export type VallorentUptoDateData = {
    id: number;
    match_start: string;
    match_end: string;
    total_kills: number;
    deaths: number;
    assists: number;
    headshot: number;
    spikes_planted: number;
    spikes_defuse: number;
    damage_done: number;
    team_scores: number;
    match_status: boolean;
    agent: string;
    region: string;
    game_mode: string;
    damage_taken: number;
    userId : string
}


export type VallorentUserData = {
    match_start: string;
    match_end: string;
    total_kills: number;
    deaths: number;
    assists: number;
    headshot: number;
    spikes_planted: number;
    spikes_defuse: number;
    damage_done: number;
    team_scores: number;
    match_status: boolean;
    agent: string;
    region: string;
    game_mode: string;
    damage_taken: null;
}

class Vallorent extends Dao implements IVallorent{
    constructor(){
        super()
        if(this.dbInstance === null) this.throwError("DB instance is not present");
    }

    checkIfReqMeet(userAchievement : VallorentUserData , goal:VallorentUptoDateData){
        // console.log( "userachievenmt" , userAchievement , goal)
        if(userAchievement === null) this.throwError("Null object")
        let achieved = 0;
        if(userAchievement.assists >= goal.assists){
            achieved ++ 
            console.log(1)
        }if(userAchievement.damage_done >= goal.damage_done){
            achieved ++
            console.log(2)
        }if(userAchievement.damage_taken!= null && userAchievement.damage_taken >= goal.damage_taken){
            achieved ++
            console.log(3)
        }if(userAchievement.deaths >= goal.deaths){
            achieved ++
            console.log(4)
        }if(userAchievement.headshot >= goal.headshot){
            achieved ++
            console.log(5)
        }if(userAchievement.spikes_defuse >= goal.spikes_defuse){
            achieved ++
            console.log(6)
        }if(userAchievement.spikes_planted >= goal.spikes_planted){
            achieved ++
            console.log(7)
        }if(userAchievement.team_scores >= goal.team_scores){
            achieved ++
            console.log(8)
        }if(userAchievement.total_kills >= goal.total_kills){
            achieved ++
            console.log(9)
        }

        // console.log("amount of match property" ,achieved)

        if(achieved === 9) return true;
        return false;
    } 
    

    async updateMatchDetails(matchData: VallorentUserData, userId: string){
        const {data , error} = await this.dbInstance!.from("valorent_data").insert({...matchData,userId}).select()
        if(error) this.throwError(error);
        return data;
    }  

    async getDataUptoDate(start: string, end: string , userId :string){
        const {data , error} = await this.dbInstance!.from("valorent_data")
        .select(`id , match_start ,match_end ,total_kills , deaths ,assists ,headshot , spikes_planted ,spikes_defuse , damage_done ,team_scores ,   match_status , agent, region ,game_mode ,damage_taken,userId`)
        .gte("match_start" , start)
        .lte("match_end" ,  end)
        .eq("userId" , userId)
        if(error) this.throwError(error)
        return data
    }

    calculateTotal (matches  : VallorentUptoDateDataArray , challenge : VallorentUptoDateData){
        const status = challenge.match_status;
        const total : VallorentUptoDateData = {id: 0,
            match_start: "",
            match_end: "",
            total_kills: 0,
            deaths: 0,
            assists: 0,
            headshot: 0,
            spikes_planted: 0,
            spikes_defuse: 0, 
            damage_done: 0,
            team_scores: 0,
            match_status:status,
            agent: "",
            region: "",
            game_mode: "",
            damage_taken: 0,
            userId : ""
        }
        
        matches!.forEach(match => {
                total.assists += match.assists
                total.damage_done += match.damage_done
                total.damage_taken += match.damage_taken
                total.deaths +=  match.deaths
                total.headshot += match.headshot
                total.spikes_defuse += match.spikes_defuse
                total.spikes_planted += match.spikes_planted
                total.team_scores += match.team_scores
                total.total_kills += match.total_kills
        });

        return total
    }

    uploadChallenges: (data: any) => Promise<void> = async (data) =>{
        const res = await this.dbInstance!.from("game_challenges").insert({...data})
        if(res.error) this.throwError(res.error)
    }

    async uploadProgress (progress :UploadProgress){
        const {data ,error} = await this.dbInstance!.from("vallorent_progress").insert(progress).select()
        if(error) this.throwError(error);
        return data;
    }
    async getProgressData(userId : string ){
        const {data,error} = await this.dbInstance!.from("vallorent_progress").select("*");
        if(error) this.throwError(error)
        return data;
    }
}

export const vallorent = new Vallorent()