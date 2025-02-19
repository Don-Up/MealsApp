import type {NextConfig} from "next";

/*
 * This is the Next.js configuration file.
 */
const nextConfig: NextConfig = {
    /* config options here */
    // next/image
    images: {
        /*
         * This is a list of remote patterns
         * that Next.js will allow to be used by the Image component.
         */
        remotePatterns: [
            {
                // This is the domain of the image hosting service
                protocol: 'https',
                // This is the domain of the image hosting service
                hostname: 'maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;