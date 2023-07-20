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
};

export default appconfig;
