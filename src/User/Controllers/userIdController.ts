import { Request, Response } from 'express'; // Assuming you're using Express.js
import { userDao } from '../Dao/userDao'; // Make sure the path is correct
import { Controller } from '../../utils/interfaces/controller';

export const getUserIdController: Controller = async (req: Request, res: Response) => {
    const authId: string = req.params.authId; // Adjust according to how you're passing `authId`
    try {
        const userId = await userDao.getUserId(authId);
        res.status(200).json({ userId });
    } catch (error: any) {
        console.error(error);
        // Send a more generic message to the client
        res.status(500).json({ message: "Server error" });
    }
};
