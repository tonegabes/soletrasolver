import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://t-gamer.github.io/soletrasolver'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/scripts/',
        '/dicionario*.txt',
        '*.json'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}
