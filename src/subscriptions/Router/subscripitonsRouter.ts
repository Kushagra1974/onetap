import { Router } from "express";

import { getSubscriptions } from "../Controller/getSubscriptions";
import { setSubscription } from "../Controller/addSubscriptions";
import { deleteSubscription } from "../Controller/deleteSubscriptions";
import { editSubscription } from "../Controller/editSubscriptions";
import { deactivateSubscription } from "../Controller/deactivateSubscription";

export const subscriptionRouter = Router();

subscriptionRouter.post("/set-subscriptions", setSubscription);

subscriptionRouter.get("/get-subscriptions", getSubscriptions);

subscriptionRouter.get("/delete-subscription/:supscriptionId", deleteSubscription);

subscriptionRouter.post("/edit-subscription/:subscriptionId", editSubscription);

subscriptionRouter.get("/deactivate-subscription/:subscriptionId", deactivateSubscription);


