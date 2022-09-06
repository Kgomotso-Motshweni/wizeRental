module.exports = {
    content: ['./src/**/*.{html,js,ts}'],
    plugins: [require('daisyui'), ],
    darkMode: true,
    theme: {
        container: {
          center: true,
        },
        card:{
            center:true,
        }
    },
    daisyui:{
        themes:[
            {
                mytheme: {
                    primary: "#F4F3EF",
                    secondary: "#55ADEA",
                    accent: "#37cdbe",
                    neutral: "#3d4451",
                    "base-100": "#ffffff",
                },
            },
            "light", "dracula" ],
    },
};
