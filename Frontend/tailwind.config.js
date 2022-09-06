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
        themes:["light", "dark","cupcake", "dracula" ]
    },
};
