import { Controller } from "../../utils/interfaces/controller";
import { requirementFactory } from "../../utils/ChallengeRequirement/ChallengeRequirementFactory/RequirementFactory";
import { vallorent } from "../../utils/ChallengeRequirement/GameClass/vallorentRequirements";
export const deleteChallenge: Controller = async (req, res) => {
  try {
    try {
      const gameId: number = req.params.gameId as unknown as number;
      const challengeId = req.params.challengeId;
      const game = requirementFactory.getRequirement(gameId);
      if (game === vallorent) {
        await game!.deleteChallenge(challengeId);
        res.status(200).json("challenge-delete");
      }
      res
        .status(200)
        .json("challenge-delete method not available for this game");
    } catch (err) {
      console.log(err);
      res.status(500).json("server Error");
    }
    res.status(200).json();
  } catch (err) {
    res.status(500).json("server-error");
  }
};
