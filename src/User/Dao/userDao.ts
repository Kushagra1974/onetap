import { Dao } from "../../utils/Classes/Dao";
import { UserData } from "../Types/types";
import { UserProfileDataArray } from "../Types/types";
import { IsPremiumUserType } from "../Types/types";

interface BasicData {
  userName: string;
  profilePicture: string;
  userCustomId: string;
  profileName: string;
  globalRanking: number;
  balance: Number;
  Auth: string;
  level: number;
  premiumUser: boolean;
}

interface DaoType {
  getUserBasicInfo: (userId: string) => Promise<UserData>;
  getUserBasicInfoAll: () => Promise<any>;
  updateUserBasicInfo: (userData: BasicData, authId: string) => Promise<any>;
  getUserProfileData: (userId: string) => Promise<UserProfileDataArray>;
  getIsUserPremium: (userId: string) => Promise<IsPremiumUserType>;
  getBalance: (userId: string) => Promise<Balance>;
  createUserProfile: (userData: BasicData) => Promise<any>;
}

export type Balance =
  | {
      balance: any;
    }[]
  | null;

class UserDoa extends Dao implements DaoType {
  constructor() {
    super();
    if (this.dbInstance === null) this.throwError("DB instance is not present");
  }

  getUserBasicInfo: (authId: string) => Promise<UserData> = async (authId) => {
    const { data, error } = await this.dbInstance!.from("User")
      .select()
      .eq("Auth", authId)
      .single();

    console.log(data, error);

    if (error) this.throwError(error);
    return data;
  };

  getUserBasicInfoAll: () => Promise<any> = async () => {
    const { data, error } = await this.dbInstance!.from("User").select();

    console.log(data, error);

    if (error) this.throwError(error);
    return data;
  };

  getUserProfileData: (userId: string) => Promise<UserProfileDataArray> =
    async (userId) => {
      const { data, error } = await this.dbInstance!.from("UserGame")
        .select(
          `
            User(userName),
            id,
            isFav,
            Game(gameName ,gameImage),
            totalPlayingHours,
            gameWon,
            gameLoss,
            gameBalance
        `
        )
        .eq(`userId`, userId);
      if (error) this.throwError(error);
      return data;
    };

  getIsUserPremium: (userId: string) => Promise<IsPremiumUserType> = async (
    userId
  ) => {
    const { data, error } = await this.dbInstance!.from("User")
      .select(`premiumUser`)
      .eq(`userId`, userId);
    if (error) this.throwError(error);
    return data;
  };

  getBalance: (userId: string) => Promise<any> = async (userId) => {
    const { data, error } = await this.dbInstance!.from("User")
      .select(`balance`)
      .eq(`userId`, userId);
    if (error) this.throwError(error);
    return data;
  };

  createUserProfile: (userData: BasicData) => Promise<any> = async (
    userData: BasicData
  ) => {
    const { data, error } = await this.dbInstance!.from("User")
      .insert(userData)
      .select();
    console.log(data, error);
    if (error) this.throwError(error);
    return data;
  };

  updateUserBasicInfo: (userData: BasicData, userId: string) => Promise<any> =
    async (userData: BasicData, authId: string) => {
      const { data, error } = await this.dbInstance!.from("User")
        .update(userData)
        .eq("Auth", authId);
      console.log(data, error);
      if (error) this.throwError(error);
      return data;
    };

  checkUserExists: (authId: string) => Promise<any> = async (
    authId: string
  ) => {
    const { data, error } = await this.dbInstance!.from("User")
      .select()
      .eq("Auth", authId);
    console.log(data, error);
    if (error) this.throwError(error);
    return data;
  };
}

export const userDao = new UserDoa();
