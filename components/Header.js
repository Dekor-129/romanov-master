import Link from 'next/link'
import { FaPhoneAlt } from 'react-icons/fa'

export default function Header() {
  const navItems = [
    { name: 'Главная', href: '/' },
    { name: 'Обо мне', href: '/about' },
    { name: 'Услуги', href: '/services' },
    { name: 'Портфолио', href: '/portfolio' },
    { name: 'Отзывы', href: '/reviews' },
    { name: 'Контакты', href: '/contacts' },
    { name: 'Калькулятор', href: '/calculator' },
  ]
  

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Логотип */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <span className="font-bold text-xl">ДР</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Дмитрий Романов</h1>
              <p className="text-sm text-gray-600">Мастер-отделочник | Рязань</p>
            </div>
          </div>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Телефон */}
          <a 
            href="tel:+79105755989" 
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center font-medium"
          >
            <FaPhoneAlt className="mr-2" />
            <span className="hidden sm:inline">+7 910 575-59-89</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
        </div>

        {/* Мобильная навигация */}
        <nav className="md:hidden mt-4 flex overflow-x-auto space-x-4 pb-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium whitespace-nowrap px-3 py-2 bg-gray-100 rounded"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}