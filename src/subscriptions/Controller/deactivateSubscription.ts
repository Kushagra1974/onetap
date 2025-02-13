import { Controller } from "../../utils/interfaces/controller";
import { SubscriptionDao } from "../Dao/subscriptionsDao";

export const deactivateSubscription: Controller = async (req, res) => {
  const subscriptionId = req.params.subscriptionId
  try {
    const data = await SubscriptionDao.deactivate(subscriptionId as unknown as number);
    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json("server error");
  }
};
