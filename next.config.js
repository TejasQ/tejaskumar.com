module.exports = {
  images: { domains: ["pbs.twimg.com", "abs.twimg.com"] },
  async redirects() {
    return [
      {
        source: `/blog/((?:(?!__).)*bicycle.*)`,
        destination:
          "/blog/1579078596000__what-i-learned-from-getting-pushed-off-my-bicycle",
        permanent: true,
      },
      {
        source: `/blog/((?:(?!__).)*)`,
        destination: "/blog",
        permanent: false,
      },
    ];
  },
};
