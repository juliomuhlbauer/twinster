import type { PlaywrightTestConfig } from "@playwright/test";

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

const config: PlaywrightTestConfig = {
  use: {
    baseURL: baseURL,
  },
};

export default config;
