export const production = {
  name: "Twinster",

  slug: "twinster_app",
  description: "Share your tweets and threads anywhere",
  icon: "/twinster.png",
};

export const dev = {
  name: "Twinster Dev",
  slug: "twinster_dev",
  description: "Share your tweets and threads anywhere",
  icon: "/twinster.png",
};

export const app = process.env.NODE_ENV === "production" ? production : dev;
