import { Router } from "express";

import { onGoingChallenges } from "../Controllers/onGoingChallenges";
import { completedChallenges } from "../Controllers/completedChallenges";
import { calculateChallengesCompleted } from "../Controllers/calculateChallengesCompleted";
import { uploadChallenges } from "../Controllers/uploadChallenges";
import { getProgress } from "../Controllers/getProgress";
import { getAllChallenges } from "../Controllers/getAllChallenges";
import { editChallenge } from "../Controllers/editChallenge";
import { deleteChallenge } from "../Controllers/deleteChallenge";

export const challengesRouter = Router();

challengesRouter.get(
  "/completed-challenges/:gameId/:userId",
  completedChallenges
);
challengesRouter.get("/ongoing-challenges/:gameId", onGoingChallenges);
challengesRouter.post(
  "/update-completed-challenges",
  calculateChallengesCompleted
);
challengesRouter.post("/upload-challenges", uploadChallenges);
challengesRouter.get("/get-progress/:gameId/:userId", getProgress);
challengesRouter.get("/all-data", getAllChallenges);
challengesRouter.post("/edit-challenge", editChallenge);
challengesRouter.post("/delete-challenge/:gameId/:challengeId", deleteChallenge);
