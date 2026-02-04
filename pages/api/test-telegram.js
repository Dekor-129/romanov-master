export default async function handler(req, res) {
  console.log('🧪 Запуск теста Telegram бота...')
  
  // 👇 ВАШИ ДАННЫЕ
  const BOT_TOKEN = '8543949980:AAEK1mR0kyEh69r2cKrCyCOkSdbBMcDhxFA'
  const CHAT_ID = '309235641'
  
  // Проверяем наличие токена
  if (!BOT_TOKEN || BOT_TOKEN.includes('ВАШ_ТОКЕН')) {
    return res.status(500).json({
      success: false,
      error: 'Токен бота не настроен',
      instruction: 'Замените BOT_TOKEN на ваш реальный токен'
    })
  }
  
  try {
    // 1. Проверяем бота через getMe
    console.log('🔍 Проверяем доступность бота...')
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    const botInfo = await botInfoResponse.json()
    
    if (!botInfo.ok) {
      return res.status(500).json({
        success: false,
        error: 'Бот недоступен',
        telegramError: botInfo.description,
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
          username: botInfo.result.username,
          id: botInfo.result.id,
          canJoinGroups: botInfo.result.can_join_groups
        },
        messageInfo: {
          id: sendResult.result.message_id,
          date: new Date(sendResult.result.date * 1000).toLocaleString('ru-RU')
        },
        timestamp: new Date().toISOString()
      })
    } else {
      console.error('❌ Ошибка отправки:', sendResult.description)
      return res.status(500).json({
        success: false,
        error: 'Не удалось отправить сообщение',
        telegramError: sendResult.description,
        errorCode: sendResult.error_code,
        details: sendResult
      })
    }
    
  } catch (error) {
    console.error('🔥 Ошибка теста:', error)
    return res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}