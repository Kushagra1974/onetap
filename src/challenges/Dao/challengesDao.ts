import { number } from "zod";
import { Dao } from "../../utils/Classes/Dao";
import { ChallengesInSameGame } from "../Types/types";
import { ChallengesNotInSameGame } from "../Types/types";
import { OnGoingChallenges } from "../Types/types";
import { CompletedChallenges } from "../Types/types";

type updateCompletedChallenges = Array<{
  gameId: string;
  challengeId: string;
  userId: string;
}>;

interface DaoType {
  getChallengesInSameGame: (gameId: string) => Promise<ChallengesInSameGame>;
  getChallengesNotInSameGame: (
    gameId: string
  ) => Promise<ChallengesNotInSameGame>;
  getOngoingChallenges: (gameId: string) => Promise<OnGoingChallenges>;
  getCompletedChallenges: (
    gameId: string,
    userId: string
  ) => Promise<CompletedChallenges>;
  updateChallengesCompleted: (
    completed: updateCompletedChallenges
  ) => Promise<any>;
  updateTotalCoins: (userId: string, coins: number) => Promise<any>;
  getAllChallenges: () => Promise<OnGoingChallenges>
}

class ChallengesDao extends Dao implements DaoType {
  constructor() {
    super();
    if (this.dbInstance === null) this.throwError("DB instance is not present");
  }

  getChallengesInSameGame: (gameId: string) => Promise<ChallengesInSameGame> =
    async (gameId) => {
      const { data, error } = await this.dbInstance!.from(
        "game_challenges_active_insamegame_view"
      )
        .select(
          "id,Game(gameName,id), requirements , startTime ,endTime ,type, name , reward"
        )
        .eq("gameId", gameId);
      if (error) this.throwError(error);
      return data;
    };

  getChallengesNotInSameGame: (
    gameId: string
  ) => Promise<ChallengesNotInSameGame> = async (gameId) => {
    const { data, error } = await this.dbInstance!.from(
      "game_challenges_active_not_insamegame_view"
    )
      .select(
        "id,Game(gameName,id), requirements, startTime ,endTime ,type, name ,reward"
      )
      .eq("gameId", gameId);
    if (error) this.throwError(error);
    return data;
  };

  getOngoingChallenges: (gameId: string) => Promise<OnGoingChallenges> = async (
    gameId
  ) => {
    const { data, error } = await this.dbInstance!.from(
      "game_challenges_ongoing_view"
    )
      .select(
        "id,Game(gameName), requirements , startTime ,endTime ,type, name,reward"
      )
      .eq("gameId", gameId);
    if (error) this.throwError(error);
    return data;
  };

  getCompletedChallenges: (
    gameId: string,
    userId: string
  ) => Promise<CompletedChallenges> = async (gameId, userId) => {
    const { data, error } = await this.dbInstance!.from("completed_challenges")
      .select("id ,userId, challengeId, Game(gameName) , gameId ")
      .eq("userId", userId)
      .eq("gameId", gameId);
    if (error) this.throwError(error);
    return data;
  };

  getCompletedChallengeById = async (id: string) => {
    const { data, error } = await this.dbInstance!.from("completed_challenges")
      .select(
        "id ,userId, challengeId, game_challenges(name), Game(gameName) , gameId "
      )
      .eq("challengeId", id);
    if (error) this.throwError(error);
    return data;
  };

  updateChallengesCompleted: (
    completed: updateCompletedChallenges
  ) => Promise<any> = async (completed: updateCompletedChallenges) => {
    const { data, error } = await this.dbInstance!.from("completed_challenges")
      .insert(completed)
      .select();
    if (error) this.throwError(error);
    return data;
  };

  updateTotalCoins: (userId: string, coins: number) => Promise<any> = async (
    userId,
    coins
  ) => {
    const { data, error } = await this.dbInstance!.from("User")
      .select("balance")
      .eq("id", userId)
      .single();
    if (error) this.throwError(error);
    const totalCoins = data?.balance + coins;
    const res = await this.dbInstance!.from("User")
      .update({ balance: totalCoins })
      .eq("id", userId)
      .select()
      .single();
    if (res.error) this.throwError(res.error);
    return res.data.balance;
  };

  getAllChallenges: () => Promise<OnGoingChallenges> = async () => {
    const { data, error } = await this.dbInstance!.from(
      "game_challenges"
    )
      .select(
        "id,Game(gameName,id), requirements, startTime ,endTime ,type, name ,reward"
      )
    if (error) this.throwError(error);
    return data;
  }
}

export const challengesDao = new ChallengesDao();
