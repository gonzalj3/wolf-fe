export const authFetch = async (url, config = {}) => {
  let token = JSON.parse(sessionStorage.getItem("token")) || null;
  if (token) {
    config.headers = {
      authorization: "Bearer " + token.toString(),
    };
  } else {
    console.log("no token saved");
    return new Error("no token saved");
  }

  try {
    console.log("sent request");
    const res = await fetch(url, config);
    console.log("response", res);
    return res;
  } catch (error) {
    return error;
  }
};
