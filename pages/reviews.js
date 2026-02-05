import { FaStar, FaQuoteLeft, FaUserCircle, FaCalendarAlt, FaPhone } from 'react-icons/fa'
import SEO from '../components/SEO'

export default function Reviews() {
  const testimonials = [
    {
      id: 1,
      name: 'Анна Сергеева',
      project: 'Ремонт ванной комнаты',
      date: '15 января 2025',
      rating: 5,
      text: 'Дмитрий выполнил ремонт ванной комнаты качественно и в срок. Все материалы были закуплены по моему выбору, работали аккуратно, после себя убрали. Рекомендую!',
      avatar: 'АС'
    },
    {
      id: 2,
      name: 'Игорь Петров',
      project: 'Квартира под ключ 75м²',
      date: '3 декабря 2024',
      rating: 5,
      text: 'Делали квартиру под ключ. Дмитрий настоящий профессионал! Контролировал все процессы, вовремя закупал материалы, рабочие всегда были на месте. Сдали на неделю раньше срока!',
      avatar: 'ИП'
    },
    {
      id: 3,
      name: 'Ольга Ковалева',
      project: 'Косметический ремонт',
      date: '20 ноября 2024',
      rating: 5,
      text: 'Очень довольна работой! Все ровно, чисто, аккуратно. Цена соответствовала смете, никаких доплат. Буду рекомендовать друзьям.',
      avatar: 'ОК'
    },
    {
      id: 4,
      name: 'Сергей Волков',
      project: 'Санузел под ключ',
      date: '5 октября 2024',
      rating: 5,
      text: 'Переделали совмещенный санузел. Работа сложная, но Дмитрий справился отлично. Гидроизоляция, плитка, сантехника — все на высшем уровне. Спасибо!',
      avatar: 'СВ'
    },
    {
      id: 5,
      name: 'Марина Соколова',
      project: 'Ремонт в новостройке',
      date: '18 сентября 2024',
      rating: 5,
      text: 'Делали ремонт в новостройке. Дмитрий помог с планировкой, посоветовал хорошие материалы. Работали даже в выходные, чтобы уложиться в срок. Отличный результат!',
      avatar: 'МС'
    },
    {
      id: 6,
      name: 'Александр Новиков',
      project: 'Укладка плитки в коридоре',
      date: '30 августа 2024',
      rating: 5,
      text: 'Нужно было срочно положить плитку в коридоре. Дмитрий приехал на следующий день, сделал все за два дня. Качество отличное, швы ровные. Обязательно обращусь еще.',
      avatar: 'АН'
    }
  ]

  const averageRating = 5.0
  const totalReviews = 48

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "text-yellow-400" : "text-gray-300"} 
      />
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="Отзывы клиентов | Дмитрий Романов - Мастер отделочник"
        description="Реальные отзывы клиентов о ремонте квартир, домов и санузлов в Рязани. 5.0 рейтинг, 100% рекомендаций от довольных клиентов."
        keywords="отзывы о ремонте Рязань, рейтинг мастера-отделочника, рекомендации по ремонту, отзывы клиентов"
      />
      
      {/* Заголовок и статистика */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Отзывы <span className="text-blue-600">клиентов</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Что говорят люди, для которых я делал ремонт в Рязани и области
        </p>
        
        {/* Рейтинг */}
        <div className="inline-block bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="text-4xl font-bold text-gray-900 mr-4">{averageRating}</div>
            <div>
              <div className="flex mb-1">
                {renderStars(averageRating)}
              </div>
              <div className="text-gray-600 text-sm">
                На основе {totalReviews} отзывов
              </div>
            </div>
          </div>
          <div className="text-gray-700 font-medium">
            🏆 100% клиентов рекомендуют
          </div>
        </div>
      </div>

      {/* Сетка отзывов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map(review => (
          <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col h-full">
            {/* Заголовок отзыва */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{review.name}</h3>
                  <p className="text-gray-600 text-sm">{review.project}</p>
                </div>
              </div>
              <FaQuoteLeft className="text-blue-200 text-2xl" />
            </div>

            {/* Рейтинг */}
            <div className="flex mb-4">
              {renderStars(review.rating)}
            </div>

            {/* Текст отзыва */}
            <p className="text-gray-700 mb-6 flex-grow">
              {review.text}
            </p>

            {/* Дата */}
            <div className="flex items-center text-gray-500 text-sm mt-auto pt-4 border-t border-gray-100">
              <FaCalendarAlt className="mr-2" />
              {review.date}
            </div>
          </div>
        ))}
      </div>

      {/* Блок для добавления отзыва */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Оставьте свой отзыв</h2>
          <p className="text-gray-600 mb-8">
            Если я делал для вас ремонт, поделитесь впечатлениями. 
            Это поможет другим людям в Рязани принять решение.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+79105755989" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <FaPhone className="mr-2" />
              Позвонить и оставить отзыв
            </a>
            <a 
              href="https://t.me/Dekor129" // ИСПРАВЛЕНО ЗДЕСЬ
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <FaQuoteLeft className="mr-2" />
              Написать в Телеграм
            </a>
          </div>
        </div>
      </div>

      {/* Частые вопросы */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Частые вопросы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Можно ли посмотреть объекты вживую?</h3>
            <p className="text-gray-600">
              Да, по предварительной договоренности могу организовать просмотр выполненных объектов в Рязани.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Даете ли вы гарантию?</h3>
            <p className="text-gray-600">
              Да, на все виды работ предоставляю гарантию от 1 года.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Работаете по договору?</h3>
            <p className="text-gray-600">
              Да, все работы оформляются по договору с четкими сроками и стоимостью.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Можно ли закупить материалы самостоятельно?</h3>
            <p className="text-gray-600">
              Да, могу работать с вашими материалами или помочь с закупкой по оптовым ценам.
            </p>
          </div>
        </div>
      </div>

      {/* Призыв к действию */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Остались вопросы?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Свяжитесь со мной, и я подробно отвечу на все ваши вопросы
        </p>
        <a 
          href="tel:+79105755989" 
          className="inline-block bg-orange-500 text-white text-xl font-bold px-8 py-4 rounded-lg hover:bg-orange-600 shadow-lg transition-colors"
        >
          Позвонить для консультации: +7 910 575-59-89
        </a>
      </div>
    </div>
  )
}