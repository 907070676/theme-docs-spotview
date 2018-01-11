
module.exports = {
    hooks: {
        config: function(config) {
            config.styles = config.styles || config.pluginsConfig['theme-docs-hengshi'].styles;

            return config;
        }
    }
};


