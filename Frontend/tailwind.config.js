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
                    primary: "#55ADEA",
                    secondary: "#D27C2C",
                    accent: "#37cdbe",
                    neutral: "#3d4451",
                    "base-100": "#F4F3EF",
                },
            },
        ],
    },
};
