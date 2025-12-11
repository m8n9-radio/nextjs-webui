import type { NextConfig } from "next";

const datetime = new Date().toISOString();

const nextConfig: NextConfig = {
  reactStrictMode: process.env.NODE_ENV === "development",
  reactCompiler: true,
  cacheComponents: false,
  cleanDistDir: true,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  images: {
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  output: "standalone",
  generateBuildId: () => `build@${datetime}`,
  deploymentId: `deploy@${datetime}`,
  compiler:
    process.env.NODE_ENV === "development"
      ? undefined
      : {
          removeConsole: {
            exclude: ["error"],
          },
        },
};

export default nextConfig;
