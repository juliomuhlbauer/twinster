export const production = {
  name: "Twinster",
  slug: "twinster_app",
  description: "Share your tweets and threads anywhere",
  icons: {
    web: "/twinster.png",
    app: "/twinster-social.png",
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

export const app = process.env.VERCEL_ENV === "production" ? production : dev;
