import { useState } from 'react'
import { FaSearch, FaBath, FaHome, FaExpand, FaTimes, FaRuler, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { GiVillage } from 'react-icons/gi'
import SEO from '../components/SEO'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  // Примеры работ с детальным описанием
  const portfolioItems = [
    { 
      id: 1, 
      category: 'apartment', 
      title: '3-комнатная квартира 85м²', 
      desc: 'Полный ремонт под ключ в новостройке. Выравнивание стен, укладка ламината, поклейка обоев, установка сантехники.',
      location: 'Рязань, ЖК "Солнечный"',
      year: '2024',
      area: '85 м²',
      duration: '45 дней',
      features: ['Выравнивание стен', 'Укладка ламината', 'Поклейка обоев', 'Установка сантехники', 'Монтаж натяжных потолков'],
      before: '/images/portfolio/apartment1-before.jpg',
      after: '/images/portfolio/apartment1-after.jpg'
    },
    { 
      id: 2, 
      category: 'bathroom', 
      title: 'Санузел 6м²', 
      desc: 'Полная перепланировка санузла. Гидроизоляция, укладка плитки, установка душевой кабины, замена всей сантехники.',
      location: 'Рязань, ул. Ленина',
      year: '2024',
      area: '6 м²',
      duration: '14 дней',
      features: ['Гидроизоляция', 'Укладка плитки', 'Установка душевой кабины', 'Замена сантехники', 'Монтаж теплого пола'],
      before: '/images/portfolio/bathroom1-before.jpg',
      after: '/images/portfolio/bathroom1-after.jpg'
    },
    { 
      id: 3, 
      category: 'house', 
      title: 'Загородный дом 120м²', 
      desc: 'Чистовая отделка загородного дома. Штукатурка стен, покраска, укладка плитки, монтаж декоративных элементов.',
      location: 'Рязанская область, коттеджный поселок',
      year: '2024',
      area: '120 м²',
      duration: '60 дней',
      features: ['Штукатурка стен', 'Покраска', 'Укладка плитки', 'Монтаж декоративных элементов', 'Отделка потолков'],
      before: '/images/portfolio/house1-before.jpg',
      after: '/images/portfolio/house1-after.jpg'
    },
    { 
      id: 4, 
      category: 'apartment', 
      title: 'Квартира-студия 40м²', 
      desc: 'Косметический ремонт с зонированием пространства. Покраска стен, укладка линолеума, замена розеток.',
      location: 'Рязань, Центральный район',
      year: '2023',
      area: '40 м²',
      duration: '25 дней',
      features: ['Покраска стен', 'Укладка линолеума', 'Замена розеток', 'Установка натяжного потолка', 'Монтаж перегородки'],
      before: '/images/portfolio/apartment2-before.jpg',
      after: '/images/portfolio/apartment2-after.jpg'
    },
    { 
      id: 5, 
      category: 'bathroom', 
      title: 'Ванная комната 8м²', 
      desc: 'Ремонт ванной комнаты с установкой джакузи. Мозаика, подсветка, теплый пол, влагостойкие материалы.',
      location: 'Рязань, Московский район',
      year: '2023',
      area: '8 м²',
      duration: '21 день',
      features: ['Укладка мозаики', 'Установка джакузи', 'Подсветка', 'Теплый пол', 'Влагостойкие материалы'],
      before: '/images/portfolio/bathroom2-before.jpg',
      after: '/images/portfolio/bathroom2-after.jpg'
    },
    { 
      id: 6, 
      category: 'house', 
      title: 'Дача 65м²', 
      desc: 'Отделка дачного дома. Утепление, поклейка обоев, укладка ламината, установка сантехники.',
      location: 'Рязанская область, дачный кооператив',
      year: '2023',
      area: '65 м²',
      duration: '35 дней',
      features: ['Утепление', 'Поклейка обоев', 'Укладка ламината', 'Установка сантехники', 'Монтаж отопления'],
      before: '/images/portfolio/house2-before.jpg',
      after: '/images/portfolio/house2-after.jpg'
    }
  ]

  const categories = [
    { id: 'all', name: 'Все работы', icon: <FaSearch />, count: portfolioItems.length },
    { id: 'apartment', name: 'Квартиры', icon: <FaHome />, count: portfolioItems.filter(item => item.category === 'apartment').length },
    { id: 'house', name: 'Дома', icon: <GiVillage />, count: portfolioItems.filter(item => item.category === 'house').length },
    { id: 'bathroom', name: 'Санузлы', icon: <FaBath />, count: portfolioItems.filter(item => item.category === 'bathroom').length },
  ]

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="Портфолио работ | Дмитрий Романов - Мастер отделочник в Рязани"
        description="Примеры выполненных работ по ремонту квартир, загородных домов и санузлов в Рязани и области. Фото до и после, описание проектов."
        keywords="портфолио ремонта Рязань, фото ремонта до и после, примеры работ отделочника, ремонт квартир фото, ремонт санузлов фото"
        url="https://romanov-master.ru/portfolio"
      />
      
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Мои <span className="text-blue-600">работы</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Здесь вы можете увидеть примеры выполненных проектов в Рязани и области. 
          Каждый объект — это индивидуальный подход и гарантия качества.
        </p>
      </div>

      {/* Фильтры по категориям */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
            <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Галерея работ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group flex flex-col h-full"
          >
            {/* Изображение работы */}
            <div className="relative h-64 overflow-hidden bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl mb-4 text-gray-400">
                    {item.category === 'apartment' ? <FaHome /> : 
                     item.category === 'house' ? <GiVillage /> : <FaBath />}
                  </div>
                  <p className="text-gray-600 font-medium">{item.title}</p>
                  <div className="text-sm text-gray-500 mt-4">
                    <p>Площадь: {item.area}</p>
                    <p>Срок: {item.duration}</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">ДО</span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">ПОСЛЕ</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Описание работы */}
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${item.category === 'apartment' ? 'bg-blue-100 text-blue-600' : 
                  item.category === 'house' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                  {item.category === 'apartment' ? 'Квартира' : 
                   item.category === 'house' ? 'Дом' : 'Санузел'}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 flex-grow">{item.desc}</p>
              
              {/* Детали проекта */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendar className="mr-2 text-gray-400" />
                  <span>{item.year}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaRuler className="mr-2 text-gray-400" />
                  <span>{item.area}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendar className="mr-2 text-gray-400" />
                  <span>{item.duration}</span>
                </div>
              </div>
              
              {/* Список выполненных работ */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-2">Выполненные работы:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                  {item.features.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{item.features.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-auto">
                <button
                  onClick={() => setSelectedProject(item)}
                  className="w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Подробнее о проекте
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Если нет работ в категории */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏗️</div>
          <h3 className="text-2xl font-bold mb-4">Работы в этой категории</h3>
          <p className="text-gray-600">Скоро здесь появятся новые проекты</p>
        </div>
      )}

      {/* Модальное окно для просмотра проекта */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <FaTimes />
            </button>
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2" />
                      {selectedProject.location}
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full ${selectedProject.category === 'apartment' ? 'bg-blue-600' : 
                    selectedProject.category === 'house' ? 'bg-green-600' : 'bg-purple-600'} text-white font-medium`}>
                    {selectedProject.category === 'apartment' ? 'Квартира' : 
                     selectedProject.category === 'house' ? 'Загородный дом' : 'Санузел'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Фото ДО */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-center mb-4">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">ФОТО ДО</span>
                    </div>
                    <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
                      <div className="text-center">
                        <FaHome className="text-gray-500 text-5xl mx-auto mb-4" />
                        <p className="text-gray-400">Фото объекта до ремонта</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Фото ПОСЛЕ */}
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-center mb-4">
                      <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">ФОТО ПОСЛЕ</span>
                    </div>
                    <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
                      <div className="text-center">
                        <FaHome className="text-gray-500 text-5xl mx-auto mb-4" />
                        <p className="text-gray-400">Фото объекта после ремонта</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Детали проекта */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-blue-400 font-bold text-xl mb-1">{selectedProject.area}</div>
                    <div className="text-gray-400 text-sm">Площадь</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-blue-400 font-bold text-xl mb-1">{selectedProject.duration}</div>
                    <div className="text-gray-400 text-sm">Срок выполнения</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-blue-400 font-bold text-xl mb-1">{selectedProject.year}</div>
                    <div className="text-gray-400 text-sm">Год выполнения</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-blue-400 font-bold text-xl mb-1">{selectedProject.category === 'bathroom' ? 'Санузел' : 'Жилое'}</div>
                    <div className="text-gray-400 text-sm">Тип помещения</div>
                  </div>
                </div>
                
                {/* Описание */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Описание проекта</h3>
                  <p className="text-gray-300">{selectedProject.desc}</p>
                </div>
                
                {/* Выполненные работы */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Выполненные работы</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Призыв к действию в модалке */}
                <div className="bg-blue-900 bg-opacity-30 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-3">Хотите такой же ремонт?</h3>
                  <p className="text-gray-300 mb-4">Свяжитесь со мной для консультации и расчета стоимости вашего проекта</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a 
                      href="tel:+79105755989" 
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                    >
                      Позвонить: +7 910 575-59-89
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Информационный блок */}
      <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Хотите такой же ремонт?</h2>
          <p className="text-xl mb-8">
            Пришлите фото вашего помещения в Telegram, и я рассчитаю стоимость работ 
            с учетом всех ваших пожеланий
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+79105755989" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Обсудить проект по телефону
            </a>
            <a 
              href="https://t.me/ваш_телеграм" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Подсказка по фото */}
      <div className="mt-12 text-center text-gray-600">
        <p className="mb-2">
          💡 <strong>Для добавления реальных фото:</strong> Разместите фотографии в папку <code>public/images/portfolio/</code>
        </p>
        <p className="text-sm">
          Форматы: JPG, PNG, WebP. Рекомендуемый размер: 1200×800px
        </p>
      </div>
    </div>
  )
}