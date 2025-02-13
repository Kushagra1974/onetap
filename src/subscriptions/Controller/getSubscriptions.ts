import { Controller } from "../../utils/interfaces/controller";

import { SubscriptionDao } from "../Dao/subscriptionsDao";

export const getSubscriptions: Controller = async (req, res) => {
  try {
    await SubscriptionDao.updateExpiredSubscriptions();
    const data = await SubscriptionDao.getSubscriptions();
    
    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
