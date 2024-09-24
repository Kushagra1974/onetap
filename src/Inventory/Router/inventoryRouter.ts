import { Router } from "express";
import { allInventoryInfo } from "../Controllers/allInventoryInfo";
export const inventoryRouter = Router()

inventoryRouter.get("/get-all-user-info/:userId" , allInventoryInfo)

inventoryRouter.get("/" ,(req,res)=>{
    res.status(200).json("ok")
})