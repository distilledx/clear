/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = {
    async redirects() {
        return [
            {
                source: '/login',
                has: [
                    {
                        type: 'cookie',
                        key: 'loggedIn',
                        value: 'true',
                    },
                ],
                permanent: false,
                destination: '/',
            },
        ];
    },
};
