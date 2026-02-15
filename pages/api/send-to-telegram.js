export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Только POST запросы разрешены' 
    })
  }

  console.log('📨 [Telegram API] Получена заявка...')

  // Проверка переменных окружения
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID

  console.log('🔍 Токен найден:', !!BOT_TOKEN)
  console.log('🔍 Chat ID найден:', !!CHAT_ID)

  if (!BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN не настроен')
    return res.status(500).json({
      success: false,
      error: 'Ошибка конфигурации: TELEGRAM_BOT_TOKEN не настроен'
    })
  }

  if (!CHAT_ID) {
    console.error('❌ TELEGRAM_CHAT_ID не настроен')
    return res.status(500).json({
      success: false,
      error: 'Ошибка конфигурации: TELEGRAM_CHAT_ID не настроен'
    })
  }

  try {
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

  console.log('👤 Данные клиента (ПОЛНЫЕ):', { 
    name,
    phone,
    email,
    comment,
    calculatorType,
    formData,
    calculatedPrice
  })

    // Формируем детали выбора
    const selectionDetails = formatSelectionDetails(calculatorType, formData)

    // Формируем сообщение для Telegram
    const message = `🎯 *НОВАЯ ЗАЯВКА С САЙТА!*

👤 *Клиент:* ${name}
📱 *Телефон:* ${phone}
📧 *Email:* ${email || 'Не указан'}

💬 *Комментарий:* ${comment || 'Нет комментария'}

🏠 *Тип объекта:* ${getTypeName(calculatorType)}
💰 *Примерная стоимость:* ${calculatedPrice.min?.toLocaleString() || '0'} - ${calculatedPrice.max?.toLocaleString() || '0'} ₽
⏰ *Сроки:* ${calculatedPrice.days || '30-60'} дней

📋 *ВЫБРАННЫЕ ОПЦИИ:*
${selectionDetails}

🕐 *Время заявки:* ${new Date().toLocaleString('ru-RU')}
🌐 *С сайта:* Ремонт от Дмитрия Романова (Рязань)

✅ *Для связи с клиентом нажмите на номер телефона*`.trim()

    console.log('📤 Отправляем в Telegram...')

    // Отправляем в Telegram
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
      }),
    })

    const telegramData = await telegramResponse.json()

    if (telegramData.ok) {
      console.log(`✅ Сообщение отправлено! ID: ${telegramData.result.message_id}`)
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка успешно отправлена!',
        timestamp: new Date().toISOString()
      })
    } else {
      console.error('❌ Ошибка Telegram API:', telegramData.description)
      return res.status(500).json({ 
        success: false, 
        error: 'Ошибка отправки сообщения в Telegram',
        details: telegramData.description
      })
    }

  } catch (error) {
    console.error('🔥 Критическая ошибка сервера:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера',
      message: 'Пожалуйста, позвоните нам напрямую по телефону +7 910 575-59-89'
    })
  }
}

// 📝 Вспомогательные функции

function getTypeName(type) {
  const types = {
    newbuilding: '🏢 Квартира в новостройке',
    secondary: '🏘️ Квартира на вторичном рынке',
    house: '🏡 Загородный дом',
    bathroom: '🚿 Санузел'
  }
  return types[type] || type || '❓ Не указан'
}

function formatSelectionDetails(calculatorType, formData) {
  let details = ''
  
  switch (calculatorType) {
    case 'newbuilding':
      details += formatNewbuildingSelections(formData)
      break
    case 'secondary':
      details += formatSecondarySelections(formData)
      break
    case 'house':
      details += formatHouseSelections(formData)
      break
    case 'bathroom':
      details += formatBathroomSelections(formData)
      break
    default:
      details += 'Тип калькулятора не распознан\n'
  }
  
  return details || 'Нет дополнительных опций\n'
}

function formatNewbuildingSelections(formData) {
  const lines = []
  
  if (formData.area) {
    lines.push(`📏 Площадь: ${formData.area} м²`)
  }
  
  if (formData.rooms) {
    lines.push(`🚪 Комнат: ${formData.rooms}`)
  }
  
  if (formData.design) {
    const designMap = {
      'full': 'Да, нужен полный дизайн-проект',
      'layout': 'Нужна только планировка и расстановка мебели',
      'no': 'Нет, сделаю сам/сама',
      'unknown': 'Пока не знаю'
    }
    lines.push(`🎨 Дизайн-проект: ${designMap[formData.design] || formData.design}`)
  }
  
  if (formData.wallQuality) {
    const qualityMap = {
      'Q4': 'Q4 - Высокое качество (под покраску)',
      'Q3': 'Q3 - Стандартное качество (под обои)'
    }
    lines.push(`🧱 Качество стен: ${qualityMap[formData.wallQuality] || formData.wallQuality}`)
  }
  
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  if (formData.balcony) {
    const balconyMap = {
      'none': 'Без изменений (не трогаем балкон)',
      'finish': 'Отделка панелями без утепления',
      'insulated': 'Утепление + отделка панелями'
    }
    lines.push(`🌇 Балкон: ${balconyMap[formData.balcony] || formData.balcony}`)
  }
  
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  } else if (formData.noElectricity) {
    lines.push(`⚡ Электрика: Не нужна (оставляем как есть)`)
  }
  
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  } else if (formData.noPlumbing) {
    lines.push(`🚿 Сантехника: Не нужна (оставляем как есть)`)
  }
  
  if (formData.ceiling) {
    const ceilingMap = {
      'stretch': 'Натяжной потолок',
      'drywall': 'Гипсокартон',
      'other': 'Иной вариант'
    }
    lines.push(`🔝 Потолки: ${ceilingMap[formData.ceiling] || formData.ceiling}`)
  }
  
  return lines.join('\n')
}

function formatSecondarySelections(formData) {
  const lines = []
  
  if (formData.demolition) {
    const demolitionMap = {
      'full': 'Да, полный демонтаж (удаляем всё)',
      'partial': 'Частичный демонтаж (удаляем только некоторые элементы)',
      'none': 'Нет, демонтаж не требуется'
    }
    lines.push(`🔨 Демонтаж: ${demolitionMap[formData.demolition] || formData.demolition}`)
  }
  
  if (formData.demolitionItems && formData.demolitionItems.length > 0) {
    lines.push(`🔧 Что демонтируем: ${formData.demolitionItems.join(', ')}`)
  }
  
  if (formData.area) {
    lines.push(`📏 Площадь: ${formData.area} м²`)
  }
  
  if (formData.rooms) {
    lines.push(`🚪 Комнат: ${formData.rooms}`)
  }
  
  if (formData.design) {
    const designMap = {
      'full': 'Да, нужен полный дизайн-проект',
      'layout': 'Нужна только планировка и расстановка мебели',
      'no': 'Нет, сделаю сам/сама',
      'unknown': 'Пока не знаю'
    }
    lines.push(`🎨 Дизайн-проект: ${designMap[formData.design] || formData.design}`)
  }
  
  if (formData.wallQuality) {
    const qualityMap = {
      'Q4': 'Q4 - Высокое качество (под покраску)',
      'Q3': 'Q3 - Стандартное качество (под обои)'
    }
    lines.push(`🧱 Качество стен: ${qualityMap[formData.wallQuality] || formData.wallQuality}`)
  }
  
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  if (formData.balcony) {
    const balconyMap = {
      'none': 'Без изменений (не трогаем балкон)',
      'finish': 'Отделка панелями без утепления',
      'insulated': 'Утепление + отделка панелями'
    }
    lines.push(`🌇 Балкон: ${balconyMap[formData.balcony] || formData.balcony}`)
  }
  
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  } else if (formData.noElectricity) {
    lines.push(`⚡ Электрика: Не нужна (оставляем как есть)`)
  }
  
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  } else if (formData.noPlumbing) {
    lines.push(`🚿 Сантехника: Не нужна (оставляем как есть)`)
  }
  
  if (formData.ceiling) {
    const ceilingMap = {
      'stretch': 'Натяжной потолок',
      'drywall': 'Гипсокартон',
      'other': 'Иной вариант'
    }
    lines.push(`🔝 Потолки: ${ceilingMap[formData.ceiling] || formData.ceiling}`)
  }
  
  return lines.join('\n')
}

function formatHouseSelections(formData) {
  const lines = []
  
  if (formData.area) {
    lines.push(`📏 Площадь дома: ${formData.area} м²`)
  }
  
  if (formData.rooms) {
    lines.push(`🚪 Комнат: ${formData.rooms}`)
  }
  
  if (formData.design) {
    const designMap = {
      'full': 'Да, нужен полный дизайн-проект',
      'layout': 'Нужна только планировка и расстановка мебели',
      'no': 'Нет, сделаю сам/сама',
      'unknown': 'Пока не знаю'
    }
    lines.push(`🎨 Дизайн-проект: ${designMap[formData.design] || formData.design}`)
  }
  
  if (formData.wallQuality) {
    const qualityMap = {
      'Q4': 'Q4 - Высокое качество (под покраску)',
      'Q3': 'Q3 - Стандартное качество (под обои)'
    }
    lines.push(`🧱 Качество стен: ${qualityMap[formData.wallQuality] || formData.wallQuality}`)
  }
  
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  if (formData.terrace) {
    const terraceMap = {
      'none': 'Без изменений',
      'finish': 'Отделка без утепления',
      'insulated': 'Утепление + отделка',
      'facade': 'Отделка фасада'
    }
    lines.push(`🌿 Терраса/веранда: ${terraceMap[formData.terrace] || formData.terrace}`)
  }
  
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  } else if (formData.noElectricity) {
    lines.push(`⚡ Электрика: Не нужна (оставляем как есть)`)
  }
  
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  } else if (formData.noPlumbing) {
    lines.push(`🚿 Сантехника: Не нужна (оставляем как есть)`)
  }
  
  if (formData.ceiling) {
    const ceilingMap = {
      'stretch': 'Натяжной потолок',
      'drywall': 'Гипсокартон',
      'other': 'Иной вариант'
    }
    lines.push(`🔝 Потолки: ${ceilingMap[formData.ceiling] || formData.ceiling}`)
  }
  
  return lines.join('\n')
}

function formatBathroomSelections(formData) {
  const lines = []
  
  if (formData.bathroomType) {
    const typeMap = {
      'separate': 'Раздельный санузел (ванная + туалет отдельно)',
      'combined': 'Совмещенный санузел (ванная и туалет вместе)',
      'bathroomOnly': 'Только ванная комната',
      'toiletOnly': 'Только туалет'
    }
    lines.push(`🚽 Тип санузла: ${typeMap[formData.bathroomType] || formData.bathroomType}`)
  }
  
  if (formData.area) {
    lines.push(`📏 Площадь: ${formData.area} м²`)
  }
  
  if (formData.demolition) {
    const demolitionMap = {
      'full': 'Да, полный демонтаж',
      'partial': 'Частичный демонтаж',
      'none': 'Нет (новое помещение)'
    }
    lines.push(`🔨 Демонтаж: ${demolitionMap[formData.demolition] || formData.demolition}`)
  }
  
  if (formData.demolitionItems && formData.demolitionItems.length > 0) {
    lines.push(`🔧 Что демонтируем: ${formData.demolitionItems.join(', ')}`)
  }
  
  if (formData.waterproofing) {
    const waterproofingMap = {
      'full': 'Полная гидроизоляция (пол + стены на 1.5м)',
      'floor': 'Гидроизоляция только пола',
      'enhanced': 'Усиленная гидроизоляция',
      'none': 'Не требуется'
    }
    lines.push(`💧 Гидроизоляция: ${waterproofingMap[formData.waterproofing] || formData.waterproofing}`)
  }
  
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  if (formData.floorFinish) {
    lines.push(`🪵 Покрытие пола: ${formData.floorFinish}`)
  }
  
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  }
  
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  }
  
  if (formData.ceiling) {
    lines.push(`🔝 Потолок: ${formData.ceiling}`)
  }
  
  return lines.join('\n')
}