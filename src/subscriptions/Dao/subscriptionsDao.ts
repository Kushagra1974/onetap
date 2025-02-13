import { Dao } from "../../utils/Classes/Dao";
import { Subscription } from "../Types/types";

interface SubscriptionsType {
  getSubscriptions: () => Promise<any>;
  setSubscription: (subscription: Subscription) => Promise<any>;
  deleteSubscription: (subscription: any) => Promise<any>;
  editSubscription: (subscription: Subscription, id: number) => Promise<any>;
}

class Subscriptions extends Dao implements SubscriptionsType {
  constructor() {
    super();
    if (this.dbInstance === null) this.throwError("DB instance is not present");
  }

  getSubscriptions: () => Promise<any> = async () => {
    const { data, error } = await this.dbInstance!.from("subscriptions")
      .select()
      .eq("active", true);
    if (error) this.throwError(error);
    return data;
  };

  deleteSubscription: (subscriptionId: string) => Promise<any> = async (
    subscriptionId
  ) => {
    const response = await this.dbInstance!.from("subscriptions")
      .delete()
      .eq("id", subscriptionId);
    if (response.status === 204) return response;
    else this.throwError("SUBSCRIPTION NOT FOUND");
  };

  setSubscription: (subscription: Subscription) => Promise<any> = async (
    subscription
  ) => {
    console.log(subscription);
    const { data, error } = await this.dbInstance!.from("subscription")
      .insert({ ...subscription })
      .select();
    if (error) this.throwError(error);
    return data;
  };

  editSubscription: (subscription: Subscription, id: number) => Promise<any> =
    async (subscription, id) => {
      console.log(subscription);
      const { data, error } = await this.dbInstance!.from("subscription")
        .update({ ...subscription })
        .eq("id", id)
        .select();
      if (error) this.throwError(error);
      return data;
    };

  updateExpiredSubscriptions: () => Promise<any> = async () => {
    const currentTime = new Date().toISOString();
    const { data, error } = await this.dbInstance!.from("subscriptions")
      .update({ active: false })
      .not("endTime", "is", null)
      .lt("endTime", currentTime)
      .eq("active", true)
      .select();
    if (error) this.throwError(error);
    return data;
  };

  deactivate: (subscriptionId: number) => Promise<any> = async (
    subscriptionId
  ) => {
    const { data, error } = await this.dbInstance!.from("subscriptions")
      .update({ active: false })
      .eq("id", subscriptionId)
      .select();
    if (error) this.throwError(error);
    return data;
  };
}

export const SubscriptionDao = new Subscriptions();
