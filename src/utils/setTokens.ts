type Props = {
  at?: string | boolean;
  rt?: string | boolean;
  method: "remove" | "set" | "get";
};

export const setTokens = ({ method, at, rt }: Props) => {
  switch (method) {
    case "get":
      return {
        accessToken: at ? localStorage.getItem("access_token") : null,
        refreshToken: rt ? localStorage.getItem("refresh_token") : null,
      };
    case "remove":
      if (at) {
        localStorage.removeItem("access_token");
      }
      if (rt) {
        localStorage.removeItem("refresh_token");
      }
      break;
    case "set":
      if (at && typeof at === "string") {
        localStorage.setItem("access_token", at);
      }
      if (rt && typeof rt === "string") {
        localStorage.setItem("refresh_token", rt);
      }
      break;
    default:
      break;
  }
};
