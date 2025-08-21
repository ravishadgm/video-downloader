
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://video-downloader-sigma-seven.vercel.app',
    generateRobotsTxt: true,
    outDir: './public',
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    robotsTxtOptions: {
        policies: isProd
            ? [{ userAgent: '*', allow: '/' }]
            : [{ userAgent: '*', disallow: '/' }],
    },
};
