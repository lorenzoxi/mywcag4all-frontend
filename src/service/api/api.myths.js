import client from "../client";

export const getMyths = async () => {
  try {
    const res = await client.get("myths");
    return res.data;
  } catch (err) {
    throw err;
  }
};