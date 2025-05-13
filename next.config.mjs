import createNextIntlPlugin from "next-intl/plugin";
// exam.elevateegy.com / uploads;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exam.elevateegy.com",
        // pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        // pathname: "/uploads/**",
      },
    ],
    localPatterns: [
      {
        pathname: "/assets/images/**",
      },
    ],
  },
};

//  تعدل علي ال request => next intl
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
