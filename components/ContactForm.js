import { useState } from 'react'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'

export default function ContactForm({ calculatorType, formData, calculatedPrice, onBack }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    comment: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-to-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          comment: form.comment,
          calculatorType: calculatorType,
          formData: formData,
          calculatedPrice: calculatedPrice
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        
        // Очищаем форму
        setForm({
          name: '',
          phone: '',
          email: '',
          comment: ''
        })
      } else {
        alert('Ошибка отправки: ' + (data.error || 'Неизвестная ошибка'))
      }
    } catch (error) {
      console.error('Ошибка отправки:', error)
      alert('Ошибка отправки. Пожалуйста, позвоните нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-500 text-5xl mb-6">
          <FaCheck />
        </div>
        <h3 className="text-2xl font-bold mb-4">Заявка отправлена!</h3>
        <p className="text-gray-600 mb-6">
          Спасибо! Дмитрий свяжется с вами в течение 30 минут
          для уточнения деталей и согласования выезда на замер.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="font-medium">Номер вашей заявки: #{Date.now().toString().slice(-6)}</p>
          <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
        </div>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Вернуться к калькулятору
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Назад к расчету
      </button>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Получите точную смету от мастера</h3>
        <p className="text-gray-600">
          Заполните форму, и Дмитрий свяжется с вами 
          в течение 30 минут для уточнения деталей 
          и составления точной сметы.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            ФИО *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Иванов Иван Иванович"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Номер телефона *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="+7 910 575-59-89"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Email (необязательно)
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="example@mail.ru"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Комментарий (особые пожелания)
          </label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Дополнительные пожелания, сроки, особенности..."
          ></textarea>
        </div>

        <div className="text-sm text-gray-500">
          <label className="flex items-start">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 rounded mt-1 mr-2"
            />
            <span>
              Я согласен на обработку персональных данных в соответствии с политикой конфиденциальности
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-lg font-bold text-lg ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>

        <div className="text-center pt-4">
          <p className="text-gray-600">или позвоните прямо сейчас:</p>
          <a 
            href="tel:+79105755989"  // ИСПРАВЛЕНО ЗДЕСЬ: был +79991234567
            className="text-blue-600 hover:text-blue-800 font-bold text-lg"
          >
            +7 910 575-59-89
          </a>
        </div>
      </form>
    </div>
  )
}