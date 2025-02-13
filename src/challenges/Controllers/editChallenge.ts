import { Controller } from "../../utils/interfaces/controller";
import { requirementFactory } from "../../utils/ChallengeRequirement/ChallengeRequirementFactory/RequirementFactory";
import { vallorent } from "../../utils/ChallengeRequirement/GameClass/vallorentRequirements";
export const editChallenge: Controller = async (req, res) => {
  try {
    try {
      const gameId: number = Number(req.body.gameId);
      const id = req.body.id;
      const data = req.body.data;
      const game = requirementFactory.getRequirement(gameId);
      if (game === vallorent) {
        await game!.editChallenge(data, id);
      }
      res.status(200).json("challenge-updated");
    } catch (err) {
      console.log(err);
      res.status(500).json("server Error");
    }
    res.status(200).json();
  } catch (err) {
    res.status(500).json("server-error");
  }
};
