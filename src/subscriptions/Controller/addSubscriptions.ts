import { Controller } from "../../utils/interfaces/controller";

import { SubscriptionDao } from "../Dao/subscriptionsDao";

export const setSubscription: Controller = async (req, res) => {
  try {
    const subscription = req.body.subscription;
    console.log(subscription);
    const data = await SubscriptionDao.setSubscription(subscription);
    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
