const appconfig = {
  siteName: "Eric's Coins",
  siteDescription: "Eric's Coins Site.",
  links: {
    github: "https://github.com/ericbrian/coinorganizer",
    mastadon: "https://mstdn.social/@EricBrian",
    bluesky: "https://bsky.app/profile/ericbrian.bsky.social",
  },
  cdn: "https://coin-organizer.b-cdn.net",
  envs: {
    development: {
      clientBaseUrl: "http://localhost:3000",
    },
    test: {
      clientBaseUrl: "http://localhost:3000",
    },
    production: {
      clientBaseUrl: "http://localhost:3000",
    }
  },
  algolia: {
    appId: `${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}`,
    apiKey: `${process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}`,
    indexName: `${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}`
  }
};

export default appconfig;
