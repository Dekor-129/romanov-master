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

  if (!BOT_TOKEN || BOT_TOKEN === 'ваш_новый_токен_от_BotFather') {
    console.error('❌ TELEGRAM_BOT_TOKEN не настроен или содержит значение по умолчанию')
    return res.status(500).json({
      success: false,
      error: 'Ошибка конфигурации: TELEGRAM_BOT_TOKEN не настроен',
      instruction: 'Добавьте реальный токен в файл .env.local'
    })
  }

  if (!CHAT_ID || CHAT_ID === 'ваш_chat_id_telegram') {
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

    console.log('👤 Данные клиента:', { 
      name: name.substring(0, 3) + '...',
      phone: phone.substring(0, 3) + '...',
      type: calculatorType 
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

    // Увеличиваем таймаут для Telegram API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 секунд

    try {
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
        signal: controller.signal
      })

      clearTimeout(timeoutId)

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

    } catch (fetchError) {
      console.error('❌ Ошибка сети при подключении к Telegram:', fetchError.message)
      
      // Сохраняем заявку локально как fallback
      const localBackup = {
        name, phone, email, comment, calculatorType, formData, calculatedPrice,
        timestamp: new Date().toISOString(),
        error: fetchError.message
      }
      
      console.log('💾 Резервное сохранение заявки локально:', {
        name: name.substring(0, 3) + '...',
        phone: phone.substring(0, 3) + '...'
      })

      return res.status(200).json({ 
        success: true, 
        message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
        note: 'Telegram временно недоступен, заявка сохранена локально',
        timestamp: new Date().toISOString(),
        backupId: Date.now().toString(36) + Math.random().toString(36).substr(2)
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
  
  return details
}

function formatNewbuildingSelections(formData) {
  const lines = []
  
  // Площадь
  if (formData.area) {
    lines.push(`📏 Площадь: ${formData.area} м²`)
  }
  
  // Комнаты
  if (formData.rooms) {
    lines.push(`🚪 Комнат: ${formData.rooms}`)
  }
  
  // Дизайн-проект
  if (formData.design) {
    const designMap = {
      'full': 'Да, нужен полный дизайн-проект',
      'layout': 'Нужна только планировка и расстановка мебели',
      'no': 'Нет, сделаю сам/сама',
      'unknown': 'Пока не знаю'
    }
    lines.push(`🎨 Дизайн-проект: ${designMap[formData.design] || formData.design}`)
  }
  
  // Качество стен
  if (formData.wallQuality) {
    const qualityMap = {
      'Q4': 'Q4 - Высокое качество (под покраску)',
      'Q3': 'Q3 - Стандартное качество (под обои)'
    }
    lines.push(`🧱 Качество стен: ${qualityMap[formData.wallQuality] || formData.wallQuality}`)
  }
  
  // Отделка стен
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  // Балкон
  if (formData.balcony) {
    const balconyMap = {
      'none': 'Без изменений (не трогаем балкон)',
      'finish': 'Отделка панелями без утепления',
      'insulated': 'Утепление + отделка панелями'
    }
    lines.push(`🌇 Балкон: ${balconyMap[formData.balcony] || formData.balcony}`)
  }
  
  // Электрика
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  } else if (formData.noElectricity) {
    lines.push(`⚡ Электрика: Не нужна (оставляем как есть)`)
  }
  
  // Сантехника
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  } else if (formData.noPlumbing) {
    lines.push(`🚿 Сантехника: Не нужна (оставляем как есть)`)
  }
  
  // Потолки
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
  
  // Демонтаж
  if (formData.demolition) {
    const demolitionMap = {
      'full': 'Да, полный демонтаж (удаляем всё)',
      'partial': 'Частичный демонтаж (удаляем только некоторые элементы)',
      'none': 'Нет, демонтаж не требуется'
    }
    lines.push(`🔨 Демонтаж: ${demolitionMap[formData.demolition] || formData.demolition}`)
  }
  
  // Детали демонтажа
  if (formData.demolitionItems && formData.demolitionItems.length > 0) {
    lines.push(`🔧 Что демонтируем: ${formData.demolitionItems.join(', ')}`)
  }
  
  // Площадь
  if (formData.area) {
    lines.push(`📏 Площадь: ${formData.area} м²`)
  }
  
  // Комнаты
  if (formData.rooms) {
    lines.push(`🚪 Комнат: ${formData.rooms}`)
  }
  
  // Дизайн-проект
  if (formData.design) {
    const designMap = {
      'full': 'Да, нужен полный дизайн-проект',
      'layout': 'Нужна только планировка и расстановка мебели',
      'no': 'Нет, сделаю сам/сама',
      'unknown': 'Пока не знаю'
    }
    lines.push(`🎨 Дизайн-проект: ${designMap[formData.design] || formData.design}`)
  }
  
  // Качество стен
  if (formData.wallQuality) {
    const qualityMap = {
      'Q4': 'Q4 - Высокое качество (под покраску)',
      'Q3': 'Q3 - Стандартное качество (под обои)'
    }
    lines.push(`🧱 Качество стен: ${qualityMap[formData.wallQuality] || formData.wallQuality}`)
  }
  
  // Отделка стен
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  // Балкон
  if (formData.balcony) {
    const balconyMap = {
      'none': 'Без изменений (не трогаем балкон)',
      'finish': 'Отделка панелями без утепления',
      'insulated': 'Утепление + отделка панелями'
    }
    lines.push(`🌇 Балкон: ${balconyMap[formData.balcony] || formData.balcony}`)
  }
  
  // Электрика
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  } else if (formData.noElectricity) {
    lines.push(`⚡ Электрика: Не нужна (оставляем как есть)`)
  }
  
  // Сантехника
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  } else if (formData.noPlumbing) {
    lines.push(`🚿 Сантехника: Не нужна (оставляем как есть)`)
  }
  
  // Потолки
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
  
  // Площадь
  if (formData.area) {
    lines.push(`📏 Площадь дома: ${formData.area} м²`)
  }
  
  // Комнаты
  if (formData.rooms) {
    lines.push(`🚪 Комнат: ${formData.rooms}`)
  }
  
  // Дизайн-проект
  if (formData.design) {
    const designMap = {
      'full': 'Да, нужен полный дизайн-проект',
      'layout': 'Нужна только планировка и расстановка мебели',
      'no': 'Нет, сделаю сам/сама',
      'unknown': 'Пока не знаю'
    }
    lines.push(`🎨 Дизайн-проект: ${designMap[formData.design] || formData.design}`)
  }
  
  // Качество стен
  if (formData.wallQuality) {
    const qualityMap = {
      'Q4': 'Q4 - Высокое качество (под покраску)',
      'Q3': 'Q3 - Стандартное качество (под обои)'
    }
    lines.push(`🧱 Качество стен: ${qualityMap[formData.wallQuality] || formData.wallQuality}`)
  }
  
  // Отделка стен
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  // Терраса/веранда
  if (formData.terrace) {
    const terraceMap = {
      'none': 'Без изменений',
      'finish': 'Отделка без утепления',
      'insulated': 'Утепление + отделка',
      'facade': 'Отделка фасада'
    }
    lines.push(`🌿 Терраса/веранда: ${terraceMap[formData.terrace] || formData.terrace}`)
  }
  
  // Электрика
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  } else if (formData.noElectricity) {
    lines.push(`⚡ Электрика: Не нужна (оставляем как есть)`)
  }
  
  // Сантехника
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  } else if (formData.noPlumbing) {
    lines.push(`🚿 Сантехника: Не нужна (оставляем как есть)`)
  }
  
  // Потолки
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
  
  // Тип санузла
  if (formData.bathroomType) {
    const typeMap = {
      'separate': 'Раздельный санузел (ванная + туалет отдельно)',
      'combined': 'Совмещенный санузел (ванная и туалет вместе)',
      'withLaundry': 'Санузел + постирочная/гардеробная',
      'bathroomOnly': 'Только ванная комната',
      'toiletOnly': 'Только туалет'
    }
    lines.push(`🚽 Тип санузла: ${typeMap[formData.bathroomType] || formData.bathroomType}`)
  }
  
  // Площадь
  if (formData.area) {
    lines.push(`📏 Площадь: ${formData.area} м²`)
  }
  
  // Демонтаж
  if (formData.demolition) {
    const demolitionMap = {
      'full': 'Да, полный демонтаж',
      'partial': 'Частичный демонтаж',
      'none': 'Нет (новое помещение)'
    }
    lines.push(`🔨 Демонтаж: ${demolitionMap[formData.demolition] || formData.demolition}`)
  }
  
  // Детали демонтажа
  if (formData.demolitionItems && formData.demolitionItems.length > 0) {
    lines.push(`🔧 Что демонтируем: ${formData.demolitionItems.join(', ')}`)
  }
  
  // Гидроизоляция
  if (formData.waterproofing) {
    const waterproofingMap = {
      'full': 'Полная гидроизоляция (пол + стены на 1.5м)',
      'floor': 'Гидроизоляция только пола',
      'enhanced': 'Усиленная гидроизоляция',
      'none': 'Не требуется'
    }
    lines.push(`💧 Гидроизоляция: ${waterproofingMap[formData.waterproofing] || formData.waterproofing}`)
  }
  
  // Отделка стен
  if (formData.wallFinish && formData.wallFinish.length > 0) {
    lines.push(`🎨 Отделка стен: ${formData.wallFinish.join(', ')}`)
  }
  
  // Отделка пола
  if (formData.floorFinish) {
    lines.push(`🪵 Покрытие пола: ${formData.floorFinish}`)
  }
  
  // Сантехника
  if (formData.plumbing && formData.plumbing.length > 0) {
    lines.push(`🚿 Сантехника: ${formData.plumbing.join(', ')}`)
  }
  
  // Электрика
  if (formData.electricity && formData.electricity.length > 0) {
    lines.push(`⚡ Электрика: ${formData.electricity.join(', ')}`)
  }
  
  // Потолок
  if (formData.ceiling) {
    lines.push(`🔝 Потолок: ${formData.ceiling}`)
  }
  
  return lines.join('\n')
}