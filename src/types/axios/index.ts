export type ResponsePromise = {
  message: string;
  statusCode: number;
};

export type Tokens = {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};
