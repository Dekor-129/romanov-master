export default async function handler(req, res) {
  console.log('🧪 Запуск теста Telegram бота...')
  
  // Получаем данные из переменных окружения
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID
  
  // Проверяем наличие токена
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('❌ Переменные окружения не настроены')
    return res.status(500).json({
      success: false,
      error: 'Переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID не настроены',
      instruction: 'Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в файл .env.local'
    })
  }
  
  try {
    // 1. Проверяем бота через getMe
    console.log('🔍 Проверяем доступность бота...')
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    const botInfo = await botInfoResponse.json()
    
    if (!botInfo.ok) {
      console.error('❌ Бот недоступен:', botInfo.description)
      return res.status(500).json({
        success: false,
        error: 'Бот недоступен',
        check: 'Проверьте токен в @BotFather'
      })
    }
    
    console.log('✅ Бот доступен:', botInfo.result.username)
    
    // 2. Отправляем тестовое сообщение
    console.log('📤 Отправляем тестовое сообщение...')
    const testMessage = `🤖 *ТЕСТОВОЕ СООБЩЕНИЕ*

✅ *Бот успешно подключен!*
👤 *Имя бота:* ${botInfo.result.first_name}
🔗 *Username:* @${botInfo.result.username}
🆔 *ID бота:* ${botInfo.result.id}

🕐 *Время отправки:* ${new Date().toLocaleString('ru-RU')}
📡 *Статус:* Система уведомлений работает!

*💡 При следующей заявке с сайта вы получите полные данные клиента.*
    `.trim()
    
    const sendResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: testMessage,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })
    
    const sendResult = await sendResponse.json()
    
    if (sendResult.ok) {
      console.log('🎉 Тест пройден успешно!')
      return res.status(200).json({
        success: true,
        message: 'Тестовое сообщение отправлено в Telegram!',
        botInfo: {
          name: botInfo.result.first_name,
          username: botInfo.result.username
        },
        timestamp: new Date().toISOString()
      })
    } else {
      console.error('❌ Ошибка отправки:', sendResult.description)
      return res.status(500).json({
        success: false,
        error: 'Не удалось отправить сообщение',
        details: sendResult.description
      })
    }
    
  } catch (error) {
    console.error('🔥 Ошибка теста:', error)
    return res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    })
  }
}