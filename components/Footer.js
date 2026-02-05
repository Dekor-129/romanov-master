import { FaTelegram, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <div className="space-y-3">
              <a href="tel:+79105755989" className="flex items-center hover:text-blue-300">
                <FaTelegram className="mr-3 text-blue-400" size={20} />
                +7 910 575-59-89
              </a>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-red-400" size={20} />
                г. Рязань и область
              </div>
              <div className="flex items-center">
                <FaClock className="mr-3 text-yellow-400" size={20} />
                Ежедневно 8:00 - 20:00
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-xl font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-blue-300">Главная</a></li>
              <li><a href="/about" className="hover:text-blue-300">Обо мне</a></li>
              <li><a href="/services" className="hover:text-blue-300">Услуги</a></li>
              <li><a href="/portfolio" className="hover:text-blue-300">Портфолио</a></li>
              <li><a href="/reviews" className="hover:text-blue-300">Отзывы</a></li>
              <li><a href="/contacts" className="hover:text-blue-300">Контакты</a></li>
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-xl font-bold mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>Квартиры под ключ</li>
              <li>Санузлы под ключ</li>
              <li>Загородные дома</li>
              <li>Укладка плитки</li>
              <li>Штукатурные работы</li>
            </ul>
          </div>

          {/* Соцсети */}
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Написать в мессенджер</h3>
            <div className="flex space-x-4">
              <a 
                href="https://t.me/Dekor129" // ИСПРАВЛЕНО ЗДЕСЬ
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-colors"
              >
                <FaTelegram size={24} />
              </a>
            </div>
            <p className="mt-6 text-gray-400 text-sm">
              Отвечаю быстро в Телеграм, консультирую бесплатно
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Дмитрий Романов. Мастер-отделочник | Рязань</p>
          <p className="text-sm mt-2">Все виды ремонтных работ под ключ</p>
        </div>
      </div>
    </footer>
  )
}