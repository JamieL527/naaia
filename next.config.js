module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: "standalone",

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'handlebars'];
    }
    return config;
  },
  
};
