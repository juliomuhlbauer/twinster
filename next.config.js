/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom");
const withPWA = require("next-pwa");

module.exports = withAxiom(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,

    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
    },
  })
);
