import { put } from "./utils.service";

export const changeEmail = async ({
  oldEmail,
  email,
  confirmEmail,
  password,
}: {
  oldEmail: string;
  email: string;
  confirmEmail: string;
  password: string;
}) => {
  try {
    const res = await put("/auth/update/email", {
      oldEmail,
      email,
      confirmEmail,
      password,
    });
    return res;
  } catch (error) {
    console.error("Error in update/email ", JSON.stringify(error));
    return null;
  }
};
