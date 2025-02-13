import { Controller } from "../../utils/interfaces/controller";
import { SubscriptionDao } from "../Dao/subscriptionsDao";

export const deleteSubscription: Controller = async (req, res) => {
  const { subscriptionId } = req.params;
  try {
    const data = await SubscriptionDao.deleteSubscription(subscriptionId);
    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json("server error");
  }
};
