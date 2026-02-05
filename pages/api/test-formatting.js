export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Только GET запросы разрешены' })
  }

  // Пример данных для тестирования
  const testData = {
    calculatorType: 'secondary',
    formData: {
      demolition: 'full',
      demolitionItems: ['Демонтаж напольных покрытий', 'Демонтаж настенных покрытий'],
      area: '60-80',
      rooms: 3,
      design: 'full',
      wallQuality: 'Q4',
      wallFinish: ['Обои', 'Покраска (матовая)'],
      balcony: 'insulated',
      electricity: ['Полная замена электропроводки', 'Добавление розеток и выключателей'],
      plumbing: ['Полная замена сантехнических труб и стояков'],
      ceiling: 'stretch'
    }
  }

  // Функции форматирования (такие же как в send-to-telegram.js)
  const formatted = formatSelectionDetails(testData.calculatorType, testData.formData)

  res.status(200).json({
    success: true,
    testData: testData,
    formattedText: formatted,
    preview: `📋 ВЫБРАННЫЕ ОПЦИИ:\n${formatted}`
  })
}

// Копия функций форматирования из send-to-telegram.js
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

// Остальные функции форматирования...
// (Полные версии функций здесь, как в send-to-telegram.js)