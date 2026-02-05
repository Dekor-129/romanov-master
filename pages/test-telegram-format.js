import { useState } from 'react'

export default function TestTelegramFormat() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testFormatting = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-formatting')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Ошибка тестирования:', error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Тестирование форматирования для Telegram</h1>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Что будет приходить в Telegram:</h2>
        <button
          onClick={testFormatting}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Тестируем...' : 'Протестировать форматирование'}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-3">Тестовые данные:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result.testData, null, 2)}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-3">Форматированный текст:</h3>
            <div className="bg-gray-800 text-green-300 p-4 rounded font-mono text-sm whitespace-pre">
              {result.formattedText}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-3">Как будет выглядеть в Telegram:</h3>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="font-mono text-sm whitespace-pre">
                🎯 *НОВАЯ ЗАЯВКА С САЙТА!*<br/><br/>
                👤 *Клиент:* Иван Иванов<br/>
                📱 *Телефон:* +7 910 575-59-89<br/>
                📧 *Email:* Не указан<br/><br/>
                💬 *Комментарий:* Нет комментария<br/><br/>
                🏠 *Тип объекта:* 🏘️ Квартира на вторичном рынке<br/>
                💰 *Примерная стоимость:* 1 000 000 - 1 200 000 ₽<br/>
                ⏰ *Сроки:* 45-60 дней<br/><br/>
                📋 *ВЫБРАННЫЕ ОПЦИИ:*<br/>
                {result.formattedText}<br/><br/>
                🕐 *Время заявки:* {new Date().toLocaleString('ru-RU')}<br/>
                🌐 *С сайта:* Ремонт от Дмитрия Романова (Рязань)<br/><br/>
                ✅ *Для связи с клиентом нажмите на номер телефона*
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
        <h3 className="text-lg font-bold mb-2">Как это работает:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>Клиент заполняет калькулятор и нажимает "Получить точный расчет"</li>
          <li>В ContactForm отправляются все данные формы + выбор клиента</li>
          <li>API endpoint форматирует данные в читаемый вид</li>
          <li>Форматированный текст отправляется в Telegram</li>
          <li>Дмитрий видит ВСЕ выбранные клиентом опции одним сообщением</li>
        </ol>
      </div>
    </div>
  )
}