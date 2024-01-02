import client from "../client";

export const getTools = async () => {
  try {
    const res = await client.get("tools");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getToolsTypes = async () => {
  try {
    const res = await client.get("tools/types");
    return res.data;
  } catch (err) {
    throw err;
  }
};