import { FaAward, FaTools, FaHome, FaHandshake, FaCalendarAlt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { GiHouseKeys } from 'react-icons/gi'
import SEO from '../components/SEO'

export default function About() {
  const experienceYears = new Date().getFullYear() - 2016
  
  const achievements = [
    { icon: <FaAward />, title: '8+ лет опыта', desc: 'Профессиональной работы' },
    { icon: <FaHome />, title: '150+ объектов', desc: 'Успешно сдано в Рязани' },
    { icon: <FaHandshake />, title: '95% клиентов', desc: 'Рекомендуют меня' },
    { icon: <GiHouseKeys />, title: 'Гарантия', desc: 'На все виды работ' },
  ]

  const specialties = [
    'Квартиры под ключ',
    'Санузлы под ключ',
    'Загородные дома',
    'Укладка плитки',
    'Штукатурные работы',
    'Монтаж сантехники',
    'Электромонтажные работы',
    'Покраска и поклейка обоев',
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="Обо мне | Дмитрий Романов - Мастер отделочник в Рязани"
        description="Профессиональный мастер-отделочник с 8-летним опытом. Ремонт квартир, домов и санузлов под ключ в Рязани. Гарантия качества."
        keywords="мастер-отделочник Рязань, ремонт под ключ, опыт работы 8 лет, гарантия на ремонт, отделочные работы Рязань"
      />
      
      {/* Заголовок */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Обо <span className="text-blue-600">мне</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Меня зовут Дмитрий Романов. Я профессиональный мастер-отделочник с {experienceYears}-летним опытом работы в Рязани.
        </p>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Фото и контакты */}
        <div>
          {/* Фото Дмитрия Романова - ИСПРАВЛЕНО ДЛЯ ВЕРТИКАЛЬНОГО ФОТО */}
          <div className="bg-gray-200 rounded-2xl p-1 shadow-xl mb-8 overflow-hidden">
            <div className="relative w-full">
              {/* Контейнер для вертикального фото с обрезкой */}
              <div className="aspect-[4/5] md:aspect-[3/4] relative">
                <img
                  src="/images/romanov.jpg"
                  alt="Дмитрий Романов - мастер-отделочник в Рязани"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  style={{ 
                    objectPosition: '50% 15%', // Сдвигаем фото вверх, чтобы лицо было видно
                    objectFit: 'cover' // Обрезаем снизу
                  }}
                  loading="lazy"
                />
                {/* Затемнение сверху для лучшей читаемости текста */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent"></div>
                
                {/* Наложение с информацией */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1">Дмитрий Романов</h2>
                  <p className="text-lg text-blue-300">Мастер-отделочник</p>
                  <p className="text-sm mt-2">Рязань и область • {experienceYears} лет опыта</p>
                </div>
              </div>
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaMapMarkerAlt className="text-blue-600 mr-2" />
              Контактная информация
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-3" />
                <span>В ремонте: с 2016 года</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-3" />
                <span>Работаю в: Рязани и области</span>
              </div>
              <div className="pt-4">
                <a 
                  href="tel:+79105755989"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium w-full text-center transition-colors"
                >
                  <FaPhone className="inline mr-2" />
                  Позвонить: +7 910 575-59-89
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* История и специализация */}
        <div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Моя история</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                Начал работать в сфере ремонта и отделки более {experienceYears} лет назад. 
                Начинал с помощника мастера, постепенно осваивая все тонкости профессии.
              </p>
              
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 my-4">
                <p className="font-medium text-blue-800 mb-2">🇪🇺 Европейский подход к ремонту</p>
                <p>
                  Для повышения квалификации проходил обучение у европейских мастеров, 
                  работающих в Германии и Испании. Перенял немецкую точность и аккуратность, 
                  а также испанское внимание к деталям и эстетике.
                </p>
              </div>
              
              <p>
                У немецких коллег научился системному подходу: тщательному планированию, 
                использованию профессионального оборудования и соблюдению технологий до миллиметра.
              </p>
              
              <p>
                Испанские мастера показали, как сочетать функциональность с красотой, 
                работать с современными материалами и создавать пространства, 
                которые радуют глаз каждый день.
              </p>
              
              <p>
                За эти годы прошел путь от простого отделочника до специалиста, 
                который может выполнить ремонт квартиры под ключ от начала и до конца.
              </p>
              
              <p>
                Работаю преимущественно в Рязани и Рязанской области. 
                Знаю особенности местного рынка материалов и специфику домов в нашем регионе.
              </p>
              
              <p>
                Верю, что хороший ремонт — это не только качественные материалы, 
                но и внимание к деталям, понимание потребностей клиента и соблюдение сроков.
              </p>
            </div>
          </div>

          {/* Мои достижения */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Мои достижения</h2>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 text-2xl mb-2">{item.icon}</div>
                  <div className="text-xl font-bold">{item.title}</div>
                  <div className="text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Специализация */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Моя специализация</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialties.map((spec, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <FaTools className="text-blue-600 mr-3" />
                <span className="font-medium">{spec}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Принципы работы */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-10">Мои принципы работы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Честность</h3>
            <p className="text-gray-600">
              Всегда называю реальные сроки и стоимость работ. Никаких скрытых платежей.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Качество</h3>
            <p className="text-gray-600">
              Использую только проверенные материалы и профессиональное оборудование.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Ответственность</h3>
            <p className="text-gray-600">
              Несу ответственность за каждый этап работ. Даю гарантию на все виды работ.
            </p>
          </div>
        </div>
      </div>

      {/* Как я работаю */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-10">Как я работаю</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-blue-600 text-3xl mb-4">📞</div>
            <h3 className="text-lg font-bold mb-2">Консультация</h3>
            <p className="text-gray-600">Обсуждаем задачу, выезжаю на бесплатный замер</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-blue-600 text-3xl mb-4">📋</div>
            <h3 className="text-lg font-bold mb-2">Смета</h3>
            <p className="text-gray-600">Составляю детальную смету с ценами и сроками</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-blue-600 text-3xl mb-4">📝</div>
            <h3 className="text-lg font-bold mb-2">Договор</h3>
            <p className="text-gray-600">Заключаем договор с фиксацией всех условий</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-blue-600 text-3xl mb-4">🔨</div>
            <h3 className="text-lg font-bold mb-2">Выполнение</h3>
            <p className="text-gray-600">Выполняю работы качественно и в срок</p>
          </div>
        </div>
      </div>

      {/* Призыв к действию БЕЗ ДУБЛИРУЮЩЕГО ФОТО */}
      <div className="mt-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Работаем вместе?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Я всегда на связи и готов ответить на ваши вопросы. 
            Позвоните мне или напишите в Telegram для бесплатной консультации.
          </p>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-2xl mb-2">Дмитрий Романов</p>
              <p className="text-blue-200 text-lg">Мастер-отделочник • Рязань</p>
            </div>
            <div>
              <a 
                href="tel:+79105755989" 
                className="inline-flex items-center text-2xl font-bold hover:text-blue-200 mb-2"
              >
                <FaPhone className="mr-4 text-xl" />
                +7 910 575-59-89
              </a>
              <p className="text-blue-200 text-lg">
                Отвечаю быстро, консультирую бесплатно
              </p>
            </div>
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+79105755989" 
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                >
                  Позвонить для консультации
                </a>
                <a 
                  href="/portfolio" 
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors"
                >
                  Посмотреть мои работы
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}