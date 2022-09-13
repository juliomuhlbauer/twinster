export const production = {
  name: "Twinster",

  slug: "twinster_app",
  description: "Share your tweets and threads anywhere",
  icons: {
    web: "/twinster.png",
    app: "/twinster_social.png",
  },
};

export const dev = {
  name: "Twinster Dev",
  slug: "twinster_dev",
  description: "Share your tweets and threads anywhere",
  icons: {
    web: "/twinster-beta.png",
    app: "/twinster-beta.png",
  },
};

export const app = process.env.NODE_ENV === "production" ? production : dev;
