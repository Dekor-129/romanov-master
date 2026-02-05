import Head from 'next/head'

export default function SEO({ 
  title = 'Дмитрий Романов - Мастер отделочник | Ремонт квартир и санузлов под ключ в Рязани',
  description = 'Профессиональный ремонт квартир и санузлов под ключ в Рязани и области. 8+ лет опыта. Гарантия качества. Бесплатный замер. Звоните: +7 910 575-59-89',
  keywords = 'ремонт квартир Рязань, санузел под ключ Рязань, мастер отделочник Рязань, отделочные работы Рязань, квартира под ключ Рязань',
  image = '/images/og-image.jpg',
  url = 'https://romanov-master.ru',
  type = 'website'
}) {
  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      
      {/* Open Graph для соцсетей */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Для ВКонтакте */}
      <meta property="vk:image" content={image} />
      
      {/* Для Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Канонические ссылки */}
      <link rel="canonical" href={url} />
      
      {/* Иконки */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Manifest для PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Тема браузера */}
      <meta name="theme-color" content="#1e40af" />
      
      {/* Для мобильных устройств */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    </Head>
  )
}