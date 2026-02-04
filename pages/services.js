import { FaBuilding, FaBath, FaRulerCombined, FaCheckCircle, FaClipboardList, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa'
import { GiVillage } from 'react-icons/gi'
import SEO from '../components/SEO'

export default function Services() {
  const services = [
    { 
      icon: <FaBuilding />, 
      title: 'Квартиры под ключ', 
      price: 'от 5000 руб/м²',
      description: 'Полный цикл ремонта от черновой до чистовой отделки',
      features: [
        'Демонтаж старых покрытий',
        'Выравнивание стен и потолков',
        'Электромонтажные работы',
        'Сантехнические работы',
        'Укладка напольных покрытий',
        'Покраска стен и потолков',
        'Установка дверей и плинтусов',
        'Уборка после ремонта'
      ],
      details: 'Идеально для новостроек и вторичного жилья'
    },
    { 
      icon: <GiVillage />, 
      title: 'Загородный дом под ключ', 
      price: 'от 4500 руб/м²',
      description: 'Чистовая отделка всех помещений частных домов, коттеджей и дач',
      features: [
        'Выравнивание и штукатурка стен',
        'Шпаклевка и подготовка под покраску/обои',
        'Монтаж гипсокартонных конструкций',
        'Укладка напольных покрытий (ламинат, плитка, линолеум)',
        'Покраска стен и потолков',
        'Поклейка обоев',
        'Отделка потолков (натяжные, гипсокартонные)',
        'Монтаж декоративных элементов и молдингов'
      ],
      details: 'Работаем с домами любой площади'
    },
    { 
      icon: <FaBath />, 
      title: 'Санузлы под ключ', 
      price: 'от 35000 руб',
      description: 'Комплексный ремонт ванных комнат и туалетов',
      features: [
        'Гидроизоляция пола и стен',
        'Укладка керамической плитки',
        'Установка сантехники',
        'Монтаж электрики (влагостойкой)',
        'Установка вентиляции',
        'Монтаж теплого пола',
        'Установка мебели для ванной',
        'Монтаж душевых кабин и перегородок'
      ],
      details: 'Работаем с совмещенными и раздельными санузлами'
    },
  ]

  const processSteps = [
    { icon: <FaClipboardList />, title: 'Консультация и замер', desc: 'Бесплатный выезд, оценка объема работ' },
    { icon: <FaRulerCombined />, title: 'Составление смета', desc: 'Детальный расчет стоимости и сроков' },
    { icon: <FaCalendarAlt />, title: 'Заключение договора', desc: 'Фиксация цены, гарантии, этапы работ' },
    { icon: <FaShieldAlt />, title: 'Выполнение работ', desc: 'Качественное выполнение всех этапов' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="Услуги и цены | Дмитрий Романов - Мастер отделочник"
        description="Профессиональный ремонт квартир, загородных домов и санузлов под ключ в Рязани. Качественные материалы, гарантия на работы."
        keywords="ремонт квартир под ключ Рязань, ремонт санузлов, отделочные работы, ремонт домов, цена ремонта"
      />
      
      {/* Заголовок */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Мои <span className="text-blue-600">услуги</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Предоставляю полный спектр отделочных работ с гарантией качества. 
          Работаю в Рязани и области.
        </p>
      </div>

      {/* Услуги с ценами */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
            {/* Заголовок услуги */}
            <div className="bg-blue-600 text-white p-6 text-center">
              <div className="text-4xl mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
              <div className="text-3xl font-bold">{service.price}</div>
            </div>
            
            {/* Описание */}
            <div className="p-6 flex-grow flex flex-col">
              <p className="text-gray-700 mb-6 text-lg">{service.description}</p>
              
              <div className="mb-6 flex-grow">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Что входит в услугу:
                </h3>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg mb-6">
                {service.details}
              </div>
              
              <div className="space-y-4 mt-auto">
                <a 
                  href="/calculator" 
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Рассчитать стоимость
                </a>
                <a 
                  href="tel:+79105755989" 
                  className="block w-full bg-gray-100 text-gray-800 text-center py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Позвонить для консультации
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Процесс работы */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Как проходит работа</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-4xl mb-4 flex justify-center">{step.icon}</div>
              <div className="text-blue-600 font-bold text-xl mb-2">Шаг {index + 1}</div>
              <h3 className="text-lg font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Гарантии и преимущества */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Гарантии и преимущества</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <FaShieldAlt className="text-green-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
                  <p className="text-gray-700">Даю гарантию на все выполненные работы. Если что-то пойдет не так — исправлю за свой счет.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaClipboardList className="text-blue-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Прозрачная смета</h3>
                  <p className="text-gray-700">Все материалы и работы указываются в смете. Никаких скрытых платежей или доплат в процессе.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <FaCalendarAlt className="text-orange-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Соблюдение сроков</h3>
                  <p className="text-gray-700">Работаю строго по утвержденному графику. Все этапы выполняются в оговоренные сроки.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaCheckCircle className="text-purple-500 text-2xl mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Индивидуальный подход</h3>
                  <p className="text-gray-700">Учитываю все пожелания клиента. Помогаю с выбором материалов и планировкой.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Призыв к действию */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Остались вопросы по услугам?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Свяжитесь со мной для бесплатной консультации и точного расчета стоимости вашего проекта
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+79105755989" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Позвонить для консультации
          </a>
          <a 
            href="/calculator" 
            className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Рассчитать стоимость онлайн
          </a>
        </div>
      </div>
    </div>
  )
}