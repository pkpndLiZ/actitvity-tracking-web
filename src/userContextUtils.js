import { useContext } from "react";
import { UserContext } from "./userContext";

export const updateUser = (newToken, newUserId, newUsername, newUserImage) => {
  const { updateUserData } = useContext(UserContext);
  updateUserData(newToken, newUserId, newUsername, newUserImage);
};

export const getUserToken = () => {
  const { userToken } = useContext(UserContext);
  return userToken;
};

export const getUserId = () => {
  const { userId } = useContext(UserContext);
  return userId;
};

export const getUsername = () => {
  const { username } = useContext(UserContext);
  return username;
};

export const getUserImage = () => {
  const { userImage } = useContext(UserContext);
  return userImage;
};
