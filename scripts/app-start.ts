import { generateManifest } from "./manifest";

const appStart = () => {
  console.log("app started");

  generateManifest();
};

appStart();
