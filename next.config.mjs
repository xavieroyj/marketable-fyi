/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'x-dns-prefetch-control',
                        value: 'on'
                    }
                ]
            }
        ]
    }
}

export default nextConfig;
