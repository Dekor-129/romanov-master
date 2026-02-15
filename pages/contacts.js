// pages/contacts.js
import { useState } from 'react'
import { FaPhone, FaTelegram, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import SEO from '../components/SEO'

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    service: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

 const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError('')

  try {
    console.log('Отправляем данные:', formData)
    
    // Отправляем в ТОТ ЖЕ endpoint, который работает
    const response = await fetch('/api/send-to-telegram', {  // используем рабочий endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: 'Не указан',
        comment: formData.message,
        calculatorType: formData.service || 'Контакты',
        formData: {
          service: formData.service,
          message: formData.message
        },
        calculatedPrice: {
          min: 0,
          max: 0,
          days: 'По запросу'
        }
      }),
    })

    const data = await response.json()
    console.log('Ответ сервера:', data)

    if (data.success) {
      setIsSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        message: '',
        service: ''
      })
      setTimeout(() => setIsSubmitted(false), 5000)
    } else {
      setError('Ошибка отправки. Пожалуйста, позвоните нам.')
    }
  } catch (error) {
    console.error('Ошибка:', error)
    setError('Ошибка отправки. Пожалуйста, позвоните нам.')
  } finally {
    setIsSubmitting(false)
  }
}
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      icon: <FaPhone />,
      title: 'Телефон',
      value: '+7 910 575-59-89',
      link: 'tel:+79105755989',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <FaTelegram />,
      title: 'Telegram',
      value: 'Написать в Telegram',
      link: 'https://t.me/Dekor129',
      color: 'bg-blue-100 text-blue-500'
    }
  ]

  const workInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Работаю в',
      value: 'Рязани и Рязанской области'
    },
    {
      icon: <FaClock />,
      title: 'График работы',
      value: 'Пн-Вс: 8:00 - 20:00'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="Контакты | Дмитрий Романов - Мастер отделочник в Рязани"
        description="Свяжитесь со мной для консультации по ремонту квартир, домов и санузлов в Рязани. Телефон: +7 910 575-59-89, Telegram"
        keywords="контакты мастера-отделочника Рязань, ремонт квартир Рязань, телефон мастера по ремонту, связаться с отделочником"
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Мои <span className="text-blue-600">контакты</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Свяжитесь со мной удобным для вас способом. Отвечаю быстро в Telegram, консультирую бесплатно.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Свяжитесь со мной</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`${method.color} p-6 rounded-xl hover:shadow-lg transition-shadow flex items-center`}
                >
                  <div className="text-2xl mr-4">{method.icon}</div>
                  <div>
                    <div className="font-bold">{method.title}</div>
                    <div className="text-lg">{method.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Информация</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              {workInfo.map((info, index) => (
                <div key={index} className="flex items-center mb-4 last:mb-0">
                  <div className="text-blue-600 text-xl mr-4">{info.icon}</div>
                  <div>
                    <div className="font-bold">{info.title}</div>
                    <div className="text-gray-700">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Работаю в Рязани и области</h2>
            <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center p-6">
                <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-4" />
                <p className="font-bold text-lg mb-2">Рязань и область</p>
                <p className="text-gray-600">
                  Выезжаю на объект в любой район города и области
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-2">Бесплатная консультация</h2>
            <p className="text-gray-600 mb-8">
              Оставьте заявку, и я перезвоню в течение 30 минут
              для уточнения деталей и составления точной сметы.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-12">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Заявка отправлена!</h3>
                <p className="text-gray-600 mb-6">
                  Спасибо! Я свяжусь с вами в ближайшее время
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Отправить еще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Иван Иванов"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="+7 910 575-59-89"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Какая услуга интересует?
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Выберите услугу</option>
                    <option value="apartment">Квартира под ключ</option>
                    <option value="house">Загородный дом под ключ</option>
                    <option value="bathroom">Санузел под ключ</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Дополнительная информация
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Опишите вашу задачу, площадь помещения, пожелания..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-bold text-lg ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } text-white transition-colors`}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <p className="text-gray-500 text-sm text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}

            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="font-bold mb-4">Почему стоит обратиться:</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Бесплатный выезд на замер в Рязани
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Ответ в течение 30 минут
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Подробная консультация по телефону
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Точный расчет стоимости
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Как лучше связаться?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-bold mb-2">По телефону</h3>
            <p className="text-gray-600">Если нужен быстрый ответ на срочный вопрос</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold mb-2">В Telegram</h3>
            <p className="text-gray-600">Чтобы отправить фото помещения и получить расчет</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="font-bold mb-2">Через форму</h3>
            <p className="text-gray-600">Для подробной заявки с описанием задачи</p>
          </div>
        </div>
      </div>
    </div>
  )
}