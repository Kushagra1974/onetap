import { Controller } from "../../utils/interfaces/controller";
import { SubscriptionDao } from "../Dao/subscriptionsDao";

export const editSubscription: Controller = async (req, res) => {
  const subscription = req.body;
  const subscriptionId = req.params.subscriptionId
  try {
    const data = await SubscriptionDao.editSubscription(subscription, subscriptionId as unknown as number);
    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json("server error");
  }
};
