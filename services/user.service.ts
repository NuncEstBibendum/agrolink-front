import { put } from "./utils.service";

export const changeEmail = async ({
  email1,
  email2,
  pwd0,
}: {
  email1: string;
  email2: string;
  pwd0: string;
}) => {
  try {
    const res = await put("/v1/changeemail", {
      email1,
      email2,
      pwd0,
    });
    return res;
  } catch (error) {
    console.error("Error in changeEmail ", JSON.stringify(error));
    return null;
  }
};
