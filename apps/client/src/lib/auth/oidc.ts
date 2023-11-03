import axios from "axios";

const params = {
  client_id: process.env.OIDC_CLIENT_ID || "",
  client_secret: process.env.OIDC_CLIENT_SECRET || "",
  grant_type: "refresh_token",
};

const payload = {
  grant_type: "password",
  client_id: process.env.OIDC_CLIENT_ID || "",
  client_secret: process.env.OIDC_CLIENT_SECRET || "",
  scope: "profile email openid"
};

export const oidc = axios.create({
  baseURL: `${process.env.OIDC_ISSUER}/protocol/openid-connect`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

export const refreshTokenRequest = (refresh_token: string) => {
  return oidc({
    method: "POST",
    url: "/token",
    data: new URLSearchParams({
      refresh_token,
      ...params,
    }),
  });
};

export const logoutRequest = (refresh_token: string) => {
  return oidc({
    method: "POST",
    url: "/logout",
    data: new URLSearchParams({
      refresh_token,
      ...params,
    }),
  });
};

export const getToken = (credentials: {
  username: string,
  password: string,
}) => {
  return oidc({
    method: "POST",
    url: "/token",
    data: new URLSearchParams({
      username: credentials.username,
      password: credentials.password,
      ...payload,
    }),
  });
};

export const getUserInfo = (token: string) => {
  return oidc({
    method: "GET",
    url: "/userinfo",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
};
