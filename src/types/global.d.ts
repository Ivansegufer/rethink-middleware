declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      HOST: string;
      BASE_URI: string;
      HOST_RETHINK: string;
      PORT_RETHINK: string;
      USER_RETHINK: string;
      PASSWORD_RETHINK: string;
      DATABASE_RETHINK: string;
    }
  }
}

export {};
