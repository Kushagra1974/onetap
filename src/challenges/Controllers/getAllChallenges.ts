import { Controller } from "../../utils/interfaces/controller"
import { challengesDao } from "../Dao/challengesDao"
export const getAllChallenges:Controller = async (req,res) =>{
    try{
        try{
            const challenges = await challengesDao.getAllChallenges()
            res.status(200).json(challenges)
        }catch(err){
            console.log(err)
            res.status(500).json('server Error')
        }
        res.status(200).json()
    }catch(err){
        res.status(500).json("Server Error")
    }
}