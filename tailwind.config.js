/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'landing-about-bg':
                    'linear-gradient(to bottom right, rgba(81, 81, 229, 1), rgba(209, 109, 151, .4)), url(/images/landing-about-bg.png)',
                'landing-registration-bg': 'url(/images/landing-about-bg.png)',
            },
            colors: {
                primary: 'rgba(81, 81, 229, 1)',
                secondary: 'rgba(106, 40, 190, 1)',
                'yellow-sunrise': 'rgba(255, 236, 61, 1)',
                'neutral/5': 'rgba(217, 217, 217, 1)',
                'neutral/4': 'rgba(240, 240, 240, 1)',
                'orange-sunset': 'rgba(255, 247, 230, 1)',
            },
        },
    },
    plugins: [],
    important: true,
}
