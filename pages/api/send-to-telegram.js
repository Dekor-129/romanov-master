export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Только POST запросы разрешены' 
    })
  }

  console.log('📨 [Telegram API] Получена заявка...')

  try {
    // 👇 ВАШИ ДАННЫЕ - ТОКЕН И CHAT ID!
    const BOT_TOKEN = '8543949980:AAEK1mR0kyEh69r2cKrCyCOkSdbBMcDhxFA'
    const CHAT_ID = '309235641'

    // Получаем данные из формы
    const {
      name = 'Не указано',
      phone = 'Не указано',
      email = 'Не указано',
      comment = '',
      calculatorType = 'Не указан',
      formData = {},
      calculatedPrice = {}
    } = req.body

    console.log('👤 Данные клиента:', { 
      name: name.substring(0, 10) + '...', 
      phone, 
      type: calculatorType 
    })

    // Формируем красивое сообщение для Telegram
    const message = `
🎯 *НОВАЯ ЗАЯВКА С САЙТА!*

*👤 Клиент:* ${name}
*📱 Телефон:* \`${phone}\`
*📧 Email:* ${email}

*💬 Комментарий:* ${comment || 'Нет комментария'}

*🏠 Тип объекта:* ${getTypeName(calculatorType)}
*💰 Примерная стоимость:* ${calculatedPrice.min?.toLocaleString() || '0'} - ${calculatedPrice.max?.toLocaleString() || '0'} ₽
*⏰ Сроки:* ${calculatedPrice.days || '30-60'} дней

*📊 Данные из калькулятора:*
${formatFormData(formData)}

*🕐 Время заявки:* ${new Date().toLocaleString('ru-RU')}
*🌐 С сайта:* Ремонт от Дмитрия Романова

*✅ Для связи с клиентом нажмите на номер телефона*
    `.trim()

    console.log('📤 Отправляем в Telegram...')

    // Отправляем запрос к Telegram API
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        disable_notification: false, // Включаем уведомления
      }),
    })

    const telegramData = await telegramResponse.json()
    console.log('📩 Ответ Telegram:', telegramData.ok ? '✅ Успешно' : '❌ Ошибка')

    if (telegramData.ok) {
      console.log(`✅ Сообщение отправлено! ID: ${telegramData.result.message_id}`)
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка успешно отправлена!',
        messageId: telegramData.result.message_id,
        timestamp: new Date().toISOString()
      })
    } else {
      console.error('❌ Ошибка Telegram API:', telegramData.description)
      return res.status(500).json({ 
        success: false, 
        error: `Ошибка Telegram: ${telegramData.description}`,
        errorCode: telegramData.error_code,
        details: telegramData
      })
    }

  } catch (error) {
    console.error('🔥 Критическая ошибка сервера:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

// 📝 Вспомогательные функции для форматирования

function getTypeName(type) {
  const types = {
    newbuilding: '🏢 Квартира в новостройке',
    secondary: '🏘️ Квартира на вторичном рынке',
    house: '🏡 Загородный дом',
    bathroom: '🚿 Санузел'
  }
  return types[type] || type || '❓ Не указан'
}

function formatFormData(formData) {
  if (!formData || Object.keys(formData).length === 0) {
    return '• Нет дополнительных данных'
  }

  const formattedLines = []
  
  // Обрабатываем основные поля
  if (formData.area) {
    formattedLines.push(`• Площадь: ${formData.area} м²`)
  }
  
  if (formData.rooms) {
    formattedLines.push(`• Комнат: ${formData.rooms}`)
  }
  
  if (formData.wallQuality) {
    formattedLines.push(`• Качество стен: ${formData.wallQuality === 'Q4' ? 'Q4 (Высокое)' : 'Q3 (Стандартное)'}`)
  }
  
  if (formData.ceiling) {
    const ceilingNames = {
      stretch: 'Натяжной',
      drywall: 'Гипсокартон',
      other: 'Другое'
    }
    formattedLines.push(`• Потолки: ${ceilingNames[formData.ceiling] || formData.ceiling}`)
  }
  
  if (formData.balcony && formData.balcony !== 'none') {
    const balconyNames = {
      finish: 'Отделка без утепления',
      insulated: 'Утепление + отделка'
    }
    formattedLines.push(`• Балкон: ${balconyNames[formData.balcony] || formData.balcony}`)
  }
  
  // Если много данных, показываем только основные
  if (formattedLines.length > 5) {
    return formattedLines.slice(0, 5).join('\n') + '\n• ...и другие параметры'
  }
  
  return formattedLines.join('\n') || '• Нет данных'
}