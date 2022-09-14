import { app } from "@/config";
import fs from "fs";

const { name } = app;

const manifest = {
  name: name,
  short_name: name,
  icons: [
    {
      src: app.icons.app,
      sizes: "512x512",
      type: "image/png",
    },
  ],
  theme_color: "#00B5D8",
  background_color: "#1c2732",
  start_url: "/",
  display: "standalone",
  orientation: "portrait",
  share_target: {
    action: "/create",
    params: {
      text: "tweet",
    },
  },
  screenshots: [
    {
      src: "/showcase/screenshot_1.jpg",
      type: "image/jpg",
      sizes: "1080x2400",
    },
    {
      src: "/showcase/screenshot_2.jpg",
      type: "image/jpg",
      sizes: "1080x2400",
    },
    {
      src: "/showcase/screenshot_3.jpg",
      type: "image/jpg",
      sizes: "1080x2400",
    },
    {
      src: "/showcase/screenshot_4.jpg",
      type: "image/jpg",
      sizes: "1080x2400",
    },
  ],
  shortcuts: [
    {
      name: "Design a tweet",
      short_name: "Tweet",
      description: "Open tweet page",
      url: "/tweet",
      icons: [{ src: "/twinster-social.png", sizes: "512x512" }],
    },
    {
      name: "Design a thread",
      short_name: "Thread",
      description: "Open thread page",
      url: "/thread",
      icons: [{ src: "/twinster-social.png", sizes: "512x512" }],
    },
  ],
};

const writeManifest = () => {
  fs.writeFile(
    "public/manifest.json",
    JSON.stringify(manifest, null, 2),
    function (err) {
      console.log("manifest.json is being generated...");

      if (err) {
        console.log(err);
        return err;
      }
      console.log("manifest.json generated!");
      return manifest;
    }
  );
};

export const generateManifest = () => {
  const manifestJson = fs.readFileSync("public/manifest.json");

  if (!manifestJson) {
    console.log("manifest.json does not exist");

    return writeManifest();
  }

  if (manifestJson) {
    const parsedManifest = JSON.stringify(JSON.parse(manifestJson.toString()));

    const newParsedManifest = JSON.stringify(manifest);

    if (parsedManifest !== newParsedManifest) {
      console.log("app was updated");

      return writeManifest();
    }

    if (parsedManifest === newParsedManifest) {
      console.log("app is up to date");

      return manifest;
    }
  }
};
