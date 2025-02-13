import { Controller } from "../../utils/interfaces/controller";
import { userDao } from "../Dao/userDao";

export const updateProfileInfoController: Controller = async (req, res) => {
  try {
    const { authId } = req.params;
    const userData = req.body.data;
    const data = await userDao.checkUserExists(authId);
    console.log(JSON.stringify(userData));
    let response;
    if (data.length === 0) {
      console.log("creating profile");
      userData["Auth"] = authId;
      response = await userDao.createUserProfile(userData);
    } else {
      console.log("updating profile");
      response = await userDao.updateUserBasicInfo(userData, authId);
    }
    console.log(response);
    res.status(200).json(response);
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err);
  }
};
