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
    appId: `${process.env.ALGOLIA_APP_ID}` ?? 'SIRA9OZKBG',
    apiKey: `${process.env.ALGOLIA_API_KEY}` ?? '1053693dc33c00b7806258aa9ef8d7cb',
    indexName: `${process.env.ALGOLIA_INDEX_NAME}` ?? 'prod_coins'
  }
};

console.log("appconfig", appconfig);
export default appconfig;
