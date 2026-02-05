import { useState, useRef, useEffect } from 'react'
import { FaSearch, FaBath, FaHome, FaTimes, FaRuler, FaCalendar, FaMapMarkerAlt, FaExpand } from 'react-icons/fa'
import { GiVillage } from 'react-icons/gi'
import SEO from '../components/SEO'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [fullscreenImage, setFullscreenImage] = useState(false)
  const modalRef = useRef(null)

  // Все проекты в разнобой
  const portfolioItems = [
    // Дом
    { 
      id: 7, 
      category: 'house', 
      title: 'Загородный дом 120м²', 
      desc: 'Комплексный ремонт загородного дома под ключ. Отделка всех помещений, замена коммуникаций. Просторная гостиная, современная кухня-столовая, 3 спальни, 2 санузла, терраса.',
      location: 'Рязань',
      year: '2024',
      area: '120 м²',
      duration: '75 дней',
      features: ['Отделка всех помещений', 'Замена системы отопления', 'Укладка напольных покрытий', 'Монтаж террасы', 'Разводка водопровода и канализации', 'Установка сантехники', 'Прокладка электрики'],
      image: '/images/portfolio/dom120.jpg',
      details: 'Комфортный загородный дом для круглогодичного проживания с современными коммуникациями'
    },
    // Квартира 1
    { 
      id: 5, 
      category: 'apartment', 
      title: '1-комнатная квартира 36м²', 
      desc: 'Ремонт однокомнатной квартиры в новостройке. Создана уютная гостиная с рабочей зоной, функциональная кухня и комфортная спальня. Использованы экологичные материалы и энергосберегающие технологии.',
      location: 'Рязань',
      year: '2024',
      area: '36 м²',
      duration: '35 дней',
      features: ['Штукатурка стен', 'Укладка плитки на кухне', 'Монтаж теплого пола', 'Установка межкомнатных дверей', 'Покраска потолков', 'Установка розеток и выключателей', 'Монтаж освещения'],
      image: '/images/portfolio/odnokomnatnaya36.jpg',
      details: 'Эргономичная планировка с разделением на дневную и ночную зоны'
    },
    // Санузел 1
    { 
      id: 1, 
      category: 'bathroom', 
      title: 'Санузел 4м²', 
      desc: 'Комплексный ремонт маленького санузла в хрущевке. Полная перепланировка с заменой всех коммуникаций и современной отделкой. Пространство оптимизировано для максимального комфорта при ограниченной площади.',
      location: 'Рязань',
      year: '2025',
      area: '4 м²',
      duration: '21 день',
      features: ['Оштукатуривание стен', 'Укладка плитки', 'Установка сантехники', 'Гидроизоляция', 'Прокладка электрики', 'Разводка водопровода и канализации'],
      image: '/images/portfolio/sanuzel4m.jpg',
      details: 'Маленький санузел преобразован в современное функциональное пространство с умным хранением'
    },
    // Квартира 2
    { 
      id: 4, 
      category: 'apartment', 
      title: 'Студия 22м²', 
      desc: 'Квартира-студия в новостройке с полным ремонтом под ключ. Умное зонирование пространства, встроенная мебель, современная отделка. Максимально функциональное использование каждого квадратного метра.',
      location: 'Рязань',
      year: '2024',
      area: '22 м²',
      duration: '28 дней',
      features: ['Черновая отделка', 'Чистовая отделка', 'Укладка ламината', 'Покраска стен', 'Установка натяжного потолка', 'Монтаж кухонного гарнитура', 'Установка сантехники'],
      image: '/images/portfolio/studio22.jpg',
      details: 'Современная студия с трансформирующейся мебелью и скрытым хранением'
    },
    // Санузел 2
    { 
      id: 2, 
      category: 'bathroom', 
      title: 'Санузел 6м²', 
      desc: 'Ремонт просторного совмещенного санузла с установкой инсталляции и встраиваемой мебели. Создана эргономичная планировка с разделением на влажную и сухую зоны. Использованы влагостойкие материалы премиум-класса.',
      location: 'Рязань',
      year: '2025',
      area: '6 м²',
      duration: '24 дня',
      features: ['Оштукатуривание стен', 'Укладка плитки', 'Установка сантехники', 'Установка инсталляции', 'Гидроизоляция', 'Прокладка электрики', 'Разводка водопровода и канализации', 'Установка встраиваемого шкафа'],
      image: '/images/portfolio/sanuzel6m.jpg',
      details: 'Профессиональная инсталляция с системой скрытого монтажа и интеллектуальным хранением'
    },
    // Квартира 3
    { 
      id: 6, 
      category: 'apartment', 
      title: '2-комнатная квартира 52м²', 
      desc: 'Просторная двухкомнатная квартира с ремонтом в современном стиле. Отдельная спальня, гостиная-кухня, прихожая с гардеробной. Качественные материалы, продуманное освещение, функциональная мебель.',
      location: 'Рязань',
      year: '2024',
      area: '52 м²',
      duration: '42 дня',
      features: ['Выравнивание стен по маякам', 'Укладка керамогранита', 'Монтаж многоуровневых потолков', 'Установка сантехнического оборудования', 'Разводка электрики', 'Монтаж теплого пола в санузле', 'Установка межкомнатных перегородок'],
      image: '/images/portfolio/dvushka52.jpg',
      details: 'Семейная квартира с продуманным хранением и комфортными зонами отдыха'
    },
    // Санузел 3
    { 
      id: 3, 
      category: 'bathroom', 
      title: 'Санузел 8м²', 
      desc: 'Роскошный ремонт большого санузла с душевой зоной и трапом. Проект включает создание итальянского душа без поддона, установку стеклянных перегородок и системы подсветки. Использован крупноформатный керамогранит и дизайнерская сантехника.',
      location: 'Рязань',
      year: '2025',
      area: '8 м²',
      duration: '30 дней',
      features: ['Оштукатуривание стен', 'Укладка плитки', 'Установка сантехники', 'Установка инсталляции', 'Гидроизоляция', 'Прокладка электрики', 'Разводка водопровода и канализации', 'Душевой трап', 'Установка душевой перегородки'],
      image: '/images/portfolio/sanuzel8m.jpg',
      details: 'Элитный ремонт с системой линейного водоотвода и панорамным остеклением душевой'
    },
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

  // Закрытие модалки при клике вне контента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null)
        setFullscreenImage(false)
      }
    }

    if (selectedProject || fullscreenImage) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [selectedProject, fullscreenImage])

  // Функция для открытия полноэкранного просмотра
  const openFullscreen = (e, project) => {
    e.stopPropagation()
    setSelectedProject(project)
    setFullscreenImage(true)
  }

  // Заголовок страницы в зависимости от выбранной категории
  const getPageTitle = () => {
    switch (selectedCategory) {
      case 'bathroom': return 'санузлов'
      case 'apartment': return 'квартир'
      case 'house': return 'домов'
      default: return 'всех работ'
    }
  }

  // Описание страницы в зависимости от выбранной категории
  const getPageDescription = () => {
    switch (selectedCategory) {
      case 'bathroom': 
        return 'Примеры выполненных работ по ремонту санузлов в Рязани. Современные решения для ванных комнат любой площади.'
      case 'apartment': 
        return 'Примеры ремонта квартир в новостройках Рязани. От студий до многокомнатных квартир под ключ.'
      case 'house': 
        return 'Примеры ремонта загородных домов и коттеджей в Рязани. Комплексные решения под ключ.'
      default: 
        return 'Примеры выполненных работ по ремонту квартир, домов и санузлов в Рязани. Гарантия качества.'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title={`Портфолио ${getPageTitle()} | Дмитрий Романов - Мастер отделочник в Рязани`}
        description={getPageDescription()}
        keywords={`ремонт ${selectedCategory === 'all' ? 'квартир домов санузлов' : selectedCategory === 'bathroom' ? 'санузлов' : selectedCategory === 'apartment' ? 'квартир' : 'домов'} Рязань, портфолио ремонта, примеры работ отделочника`}
        url="https://romanov-master.ru/portfolio"
      />
      
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Портфолио <span className="text-blue-600">{getPageTitle()}</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {getPageDescription()}
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
            <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
              selectedCategory === category.id 
                ? 'bg-white/30' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Статистика */}
      <div className="mb-8 text-center">
        <p className="text-gray-600">
          Показано: <span className="font-bold text-blue-600">{filteredItems.length}</span> из <span className="font-bold">{portfolioItems.length}</span> проектов
        </p>
      </div>

      {/* Галерея работ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => setSelectedProject(item)}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full cursor-pointer"
          >
            {/* Изображение работы */}
            <div className="relative overflow-hidden bg-gray-100">
              {item.image ? (
                <div className="w-full h-64 md:h-72 relative">
                  <img
                    src={item.image}
                    alt={`${item.title} - фото проекта`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Кнопка увеличения */}
                  <button
                    onClick={(e) => openFullscreen(e, item)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Увеличить фото"
                  >
                    <FaExpand size={16} />
                  </button>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                </div>
              ) : (
                <div className="w-full h-64 md:h-72 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                  <div className="text-center p-4">
                    {item.category === 'bathroom' ? <FaBath className="text-blue-300 text-5xl mx-auto mb-4" /> :
                     item.category === 'apartment' ? <FaHome className="text-blue-300 text-5xl mx-auto mb-4" /> :
                     <GiVillage className="text-blue-300 text-5xl mx-auto mb-4" />}
                    <p className="text-gray-400 font-medium">{item.title}</p>
                    <p className="text-gray-300 text-sm mt-2">Фото будет добавлено</p>
                  </div>
                </div>
              )}
              
              {/* Индикатор типа */}
              <div className="absolute top-3 left-3">
                <span className={`text-white text-xs px-3 py-1 rounded-full font-medium ${
                  item.category === 'bathroom' ? 'bg-blue-600' :
                  item.category === 'apartment' ? 'bg-green-600' :
                  'bg-orange-600'
                }`}>
                  {item.category === 'bathroom' ? 'Санузел' :
                   item.category === 'apartment' ? 'Квартира' : 'Дом'}
                </span>
              </div>
            </div>
            
            {/* Описание работы */}
            <div className="p-5 md:p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg md:text-xl font-bold text-gray-900">{item.title}</h3>
                <div className="flex items-center text-gray-500">
                  <FaRuler className="mr-1 text-sm" />
                  <span className="text-sm font-medium">{item.area}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 flex-grow text-sm md:text-base leading-relaxed">
                {item.desc.length > 100 ? `${item.desc.substring(0, 100)}...` : item.desc}
              </p>
              
              {/* Детали проекта */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4">
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <FaMapMarkerAlt className="mr-1 md:mr-2 text-gray-400 flex-shrink-0 text-xs" />
                  <span className="truncate">{item.location}</span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <FaCalendar className="mr-1 md:mr-2 text-gray-400 flex-shrink-0 text-xs" />
                  <span>{item.year}</span>
                </div>
              </div>
              
              {/* Список выполненных работ */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2 text-sm">Выполненные работы:</h4>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {item.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded ${
                      item.category === 'bathroom' ? 'bg-blue-50 text-blue-700' :
                      item.category === 'apartment' ? 'bg-green-50 text-green-700' :
                      'bg-orange-50 text-orange-700'
                    }`}>
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
              
              {/* Индикатор кликабельности */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-sm font-medium">Нажмите для подробностей →</span>
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Если нет работ в категории */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-2xl font-bold mb-4">Проекты в разработке</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            В этой категории пока нет завершенных проектов. 
            Свяжитесь со мной, чтобы стать первым клиентом!
          </p>
          <a 
            href="tel:+79105755989"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Обсудить проект
          </a>
        </div>
      )}

      {/* Модальное окно для просмотра проекта */}
      {selectedProject && !fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 md:p-4">
          <div 
            ref={modalRef}
            className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto bg-white rounded-xl md:rounded-2xl"
          >
            {/* Кнопка закрытия - ЗАФИКСИРОВАННАЯ */}
            <button
              onClick={() => setSelectedProject(null)}
              className="fixed top-4 right-4 text-gray-700 hover:text-gray-900 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="p-4 md:p-6 lg:p-8">
              {/* Заголовок проекта */}
              <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-8">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h2>
                  <div className="flex items-center text-gray-600 text-sm md:text-base">
                    <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className={`px-3 md:px-4 py-1 md:py-2 rounded-full font-medium text-sm md:text-base ${
                    selectedProject.category === 'bathroom' ? 'bg-blue-600 text-white' :
                    selectedProject.category === 'apartment' ? 'bg-green-600 text-white' :
                    'bg-orange-600 text-white'
                  }`}>
                    {selectedProject.category === 'bathroom' ? 'Санузел' :
                     selectedProject.category === 'apartment' ? 'Квартира' : 'Дом'} {selectedProject.area}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1 md:py-2 rounded-full font-medium text-sm md:text-base">
                    {selectedProject.year}
                  </span>
                </div>
              </div>
              
              {/* Главное фото */}
              <div className="mb-6 md:mb-8">
                <div className="bg-gray-50 rounded-lg md:rounded-xl overflow-hidden">
                  {selectedProject.image ? (
                    <div className="w-full relative">
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.title} - фото проекта`}
                        className="w-full h-auto max-h-96 object-contain mx-auto"
                        loading="lazy"
                      />
                      {/* Кнопка увеличения */}
                      <button
                        onClick={() => setFullscreenImage(true)}
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
                        aria-label="Открыть в полный экран"
                      >
                        <FaExpand size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="h-64 md:h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                      <div className="text-center p-4">
                        {selectedProject.category === 'bathroom' ? <FaBath className="text-blue-300 text-5xl md:text-6xl mx-auto mb-4" /> :
                         selectedProject.category === 'apartment' ? <FaHome className="text-blue-300 text-5xl md:text-6xl mx-auto mb-4" /> :
                         <GiVillage className="text-blue-300 text-5xl md:text-6xl mx-auto mb-4" />}
                        <p className="text-gray-400 font-medium text-lg md:text-xl">Фотография проекта</p>
                        <p className="text-gray-300 text-sm md:text-base mt-2">Скоро здесь появится фото</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-center text-gray-500 text-sm mt-2">
                  Нажмите на иконку ↗ для полноэкранного просмотра
                </p>
              </div>
              
              {/* Детали проекта */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg text-center">
                  <div className="text-blue-600 font-bold text-lg md:text-xl mb-1">{selectedProject.area}</div>
                  <div className="text-gray-600 text-xs md:text-sm">Площадь</div>
                </div>
                <div className="bg-green-50 p-3 md:p-4 rounded-lg text-center">
                  <div className="text-green-600 font-bold text-lg md:text-xl mb-1">{selectedProject.duration}</div>
                  <div className="text-gray-600 text-xs md:text-sm">Срок выполнения</div>
                </div>
                <div className="bg-purple-50 p-3 md:p-4 rounded-lg text-center">
                  <div className="text-purple-600 font-bold text-lg md:text-xl mb-1">{selectedProject.year}</div>
                  <div className="text-gray-600 text-xs md:text-sm">Год выполнения</div>
                </div>
                <div className={`p-3 md:p-4 rounded-lg text-center ${
                  selectedProject.category === 'bathroom' ? 'bg-blue-100' :
                  selectedProject.category === 'apartment' ? 'bg-green-100' :
                  'bg-orange-100'
                }`}>
                  <div className={`font-bold text-lg md:text-xl mb-1 ${
                    selectedProject.category === 'bathroom' ? 'text-blue-600' :
                    selectedProject.category === 'apartment' ? 'text-green-600' :
                    'text-orange-600'
                  }`}>
                    {selectedProject.category === 'bathroom' ? 'Санузел' :
                     selectedProject.category === 'apartment' ? 'Квартира' : 'Дом'}
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">Тип проекта</div>
                </div>
              </div>
              
              {/* Описание */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Описание проекта</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{selectedProject.desc}</p>
              </div>
              
              {/* Выполненные работы */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Выполненные работы</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {selectedProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0 ${
                        selectedProject.category === 'bathroom' ? 'bg-blue-500' :
                        selectedProject.category === 'apartment' ? 'bg-green-500' :
                        'bg-orange-500'
                      }`}></div>
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Особенности */}
              <div className="mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Особенности проекта</h3>
                <p className={`text-gray-700 p-3 md:p-4 rounded-lg text-sm md:text-base ${
                  selectedProject.category === 'bathroom' ? 'bg-blue-50' :
                  selectedProject.category === 'apartment' ? 'bg-green-50' :
                  'bg-orange-50'
                }`}>
                  {selectedProject.details}
                </p>
              </div>
              
              {/* Призыв к действию */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 md:p-6 rounded-lg md:rounded-xl">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Хотите такой же ремонт?</h3>
                <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                  Свяжитесь со мной для бесплатной консультации и точного расчета стоимости. 
                  Выезд на замер в Рязани - бесплатно!
                </p>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <a 
                    href="tel:+79105755989" 
                    className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors text-sm md:text-base"
                  >
                    📞 Позвонить: +7 910 575-59-89
                  </a>
                  <a 
                    href="https://t.me/Dekor129"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-center hover:bg-blue-600 transition-colors text-sm md:text-base"
                  >
                    💬 Написать в Telegram
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-gray-200 text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm md:text-base"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Полноэкранный просмотр фото */}
      {fullscreenImage && selectedProject && (
        <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
          <button
            onClick={() => setFullscreenImage(false)}
            className="fixed top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-3"
            aria-label="Закрыть полноэкранный режим"
          >
            <FaTimes size={24} />
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={selectedProject.image}
              alt={`${selectedProject.title} - полноэкранный просмотр`}
              className="max-w-full max-h-full object-contain"
              style={{ objectFit: 'contain' }}
            />
          </div>
          
          {/* Подпись */}
          <div className="fixed bottom-4 left-0 right-0 text-center text-white/80">
            <p className="text-lg font-medium">{selectedProject.title}</p>
            <p className="text-sm mt-1">Кликните вне изображения для выхода</p>
          </div>
        </div>
      )}

      {/* Информационный блок */}
      <div className="mt-12 md:mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl md:rounded-2xl p-6 md:p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Профессиональный ремонт в Рязани</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8">
            Работаю с объектами любой сложности и площади. Гарантия на все виды работ. 
            Бесплатный замер и консультация в Рязани.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <a 
              href="tel:+79105755989" 
              className="bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-colors"
            >
              Бесплатная консультация
            </a>
            <a 
              href="/calculator"
              className="bg-transparent border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Рассчитать стоимость онлайн
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}