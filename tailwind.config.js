module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    // daisyui: {
    //     themes: ["light"],
    // },
    theme: {
        // screens: {
        //     "2xl": { max: "1535px" },
        //     // => @media (max-width: 1535px) { ... }

        //     xl: { max: "1279px" },
        //     // => @media (max-width: 1279px) { ... }

        //     lg: { max: "1023px" },
        //     // => @media (max-width: 1023px) { ... }

        //     md: { max: "767px" },
        //     // => @media (max-width: 767px) { ... }

        //     sm: { max: "639px" },
        //     // => @media (max-width: 639px) { ... }
        // },
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            fontSize: {
                "9xl": ["144px", { lineHeight: "144px" }],
                "8xl": ["128px", { lineHeight: "128px" }],
                "7xl": ["72px", { lineHeight: "72px" }],
                "6xl": ["60px", { lineHeight: "60px" }],
                "5xl": [
                    "48px",
                    { lineHeight: "58px", letterSpacing: "-0.04em" },
                ],
                "4xl": ["30px", { lineHeight: "36px" }],
                "3xl": ["30px", { lineHeight: "36px" }],
                "2xl": ["24px", { lineHeight: "32px" }],
                lg: ["20px", { lineHeight: "28px" }],
                x: ["18px", { lineHeight: "28px" }],
                base: ["16px", { lineHeight: "24px" }],
                xs: ["14px", { lineHeight: "16px" }],
            },

            colors: {
                "bg-main": "#014737",
                "text-main": "#FFFBEC",
                // 'stroke-chat': '#A5A6F6',
            },
        },
    },

    plugins: [
        // require("daisyui", "flowbite/plugin"),
        // require("@tailwindcss/typography"),
        // require("tw-elements/dist/plugin"),
    ],
};
