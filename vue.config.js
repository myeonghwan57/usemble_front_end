const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: { port: 8080 },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: "true",
                __VUE_PROD_DEVTOOLS__: "false",
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
            }),
        ],
    },

    chainWebpack: (config) => {
        // 기존 images 룰을 제거
        config.module.rules.delete("images");

        // 새로운 images 룰 추가
        config.module
            .rule("images")
            .test(/\.(png|jpe?g|gif|svg)$/i)
            .use("file-loader")
            .loader("file-loader")
            .options({
                name: "images/[name].[hash:8].[ext]",
            });
    },
});

