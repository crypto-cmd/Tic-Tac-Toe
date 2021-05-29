/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    mount: {
        // directory name: 'build directory'
        public: "/",
        src: "/dist",
    },
    plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-sass"],
    buildOptions: {
        baseUrl: "/Tic-Tac-Toe/",
        out: "./build",
    },
};
