import vitalModel from "../models/vitalModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
export const createVitals = async(req,res)=> {
        try {
            console.log(req.user);
            console.log(req.body);
    
            const { bloodPressure, sugar, weight, note} = req.body;
            
         
         
            const vitalData = await vitalModel({
                userId: req.user.id,
                bloodPressure, sugar, weight, note
            })
            await vitalData.save()
            successHandler(res, 201, "vital manuals created successfully", vitalData)
        } catch (error) {
            errorHandler(res, 400, error.message)
        }
}   


export const getAllVitals = async(req,res) => {
     try {
            const vitalData = await vitalModel.find({userId: req.user.id})
            successHandler(res, 200, "All vitals fetched", vitalData)
        }
        catch (err) {
            console.log(err);
            errorHandler(res, 400, err.message)
        }
}