import { FaCheck, FaBuilding, FaBath, FaTools, FaShieldAlt, FaStar, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaTelegram, FaHome } from 'react-icons/fa'
import { GiVillage, GiHammerNails } from 'react-icons/gi'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const services = [
    { 
      icon: <FaBuilding />, 
      title: 'Квартиры под ключ', 
      desc: 'Полный цикл работ от черновой до чистовой отделки',
      features: [
        'Черновая отделка',
        'Чистовая отделка', 
        'Сантехника и электрика',
        'Укладка напольных покрытий',
        'Покраска/поклейка обоев'
      ]
    },
    { 
      icon: <GiVillage />, 
      title: 'Загородный дом под ключ', 
      desc: 'Ремонт частных домов, коттеджей, дач',
      features: [
        'Отделка всех помещений',
        'Утепление и изоляция',
        'Внутренние коммуникации',
        'Террасы и веранды',
        'Фасадные работы'
      ]
    },
    { 
      icon: <FaBath />, 
      title: 'Санузлы под ключ', 
      desc: 'Ремонт ванных комнат и туалетов под ключ',
      features: [
        'Гидроизоляция',
        'Укладка плитки',
        'Установка сантехники',
        'Электрика в санузле',
        'Вентиляция и вытяжка'
      ]
    },
  ]

  const advantages = [
    { icon: <FaTools />, text: 'Современное оборудование' },
    { icon: <FaShieldAlt />, text: 'Гарантия на работы' },
  ]

  return (
    <>
      <Head>
        <title>Ремонт квартир под ключ в Рязани | Ремонт ванной комнаты | Ремонт дома | Услуги мастеров по ремонту в Рязани</title>
        <meta name="description" content="Профессиональный ремонт квартир, ремонт ванной комнаты, ремонт дома в Рязани. Мастера ремонта, услуги ремонта квартир под ключ, ремонт в новостройке. Бесплатный замер +7 910 575-59-89" />
        <meta name="keywords" content="ремонт, ремонт в рязани, ремонт квартир, ремонт дома, мастера ремонта, ремонт дома рязань, услуги ремонта, ремонт квартир рязань, ремонт мастера рязань, ремонт ванной, ремонт многоквартирных домов, ремонт квартир под ключ, ремонт однокомнатной квартиры, ремонт 1 квартиры, ремонт квартир под ключ рязань, ремонт в новостройке, ванная комната ремонт" />
        <meta property="og:title" content="Ремонт квартир под ключ в Рязани | Дмитрий Романов" />
        <meta property="og:description" content="Профессиональный мастер-отделочник. Ремонт квартир, домов и санузлов в Рязани." />
        <meta property="og:type" content="website" />
      </Head>

      <div>
        {/* Герой секция */}
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Качественный ремонт квартир
              <span className="text-blue-600 block mt-2">и санузлов под ключ в Рязани</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Я Дмитрий Романов — профессиональный мастер-отделочник. 
              Специализируюсь на комплексном ремонте с гарантией качества.
            </p>
            
            <a 
              href="tel:+79105755989"
              className="inline-block bg-orange-500 text-white text-xl font-bold px-8 py-4 rounded-lg hover:bg-orange-600 shadow-lg transition-colors"
            >
              Бесплатная консультация: +7 910 575-59-89
            </a>
          </div>
        </section>

        {/* Услуги */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Мои услуги</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                  <div className="text-blue-600 text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.desc}</p>
                  
                  <div className="mb-6 flex-grow">
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <a 
                      href="/calculator"
                      className="block w-full text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      Рассчитать стоимость
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают меня</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {advantages.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-blue-600 text-4xl mb-4 inline-block">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.text}</h3>
                <p className="text-gray-600">
                  {index === 0 && 'Использую профессиональное оборудование и качественные материалы'}
                  {index === 1 && 'Даю гарантию на все виды выполненных работ'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Готовы начать ремонт?</h2>
            <p className="text-xl mb-8">
              Оставьте заявку на бесплатный выезд для замера и точного расчета
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+79105755989" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Позвонить сейчас
              </a>
              <a
                href="https://t.me/Dekor129"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
              >
                Написать в Телеграм
              </a>
            </div>
            <div className="mt-6 text-blue-200">
              <p>Работаю в г. Рязань и области</p>
              <p className="text-sm mt-2">Отвечаю в Телеграм</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}