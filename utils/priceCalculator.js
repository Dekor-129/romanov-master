import pricesData from '../data/prices.json'

export class PriceCalculator {
  constructor() {
    this.prices = pricesData
  }

  // Парсим площадь санузла для расчета
  parseBathroomArea(areaString) {
    if (!areaString) return 5 // среднее значение
    
    if (areaString.includes('до')) {
      const max = parseFloat(areaString.replace('до', '').trim())
      return max // для "до 3" берем 3
    } else if (areaString.includes('свыше')) {
      const min = parseFloat(areaString.replace('свыше', '').trim())
      return min + 2 // для "свыше 12" берем 14
    } else if (areaString.includes('-')) {
      const [min, max] = areaString.split('-').map(str => parseFloat(str.trim()))
      return (min + max) / 2 // среднее значение
    }
    
    return parseFloat(areaString) || 5
  }

  // НОВАЯ логика расчета для санузлов
  calculateBathroom(formData) {
    // 1. Определяем базовую цену
    let basePrice = 0
    const area = this.parseBathroomArea(formData.area)
    const isToiletOnly = formData.bathroomType === 'toiletOnly'
    
    // Базовая цена по типам
    if (isToiletOnly && area <= 3) {
      basePrice = 80000 // Туалет до 3м²
    } else if (area <= 3) {
      basePrice = 120000 // Не туалет до 3м²
    } else {
      // Больше 3м²: 120000 + 40000 за каждый дополнительный м²
      const extraMeters = area - 3
      basePrice = 120000 + (extraMeters * 40000)
    }
    
    // 2. Демонтаж
    let demolitionCost = 0
    if (formData.demolition && formData.demolition !== 'none') {
      demolitionCost = 40000
    }
    
    // 3. Гидроизоляция
    let waterproofingCost = 0
    if (formData.waterproofing === 'floor') {
      waterproofingCost = area * 1000 // 1000 за м²
    } else if (formData.waterproofing === 'full') {
      waterproofingCost = area * 5000 // 5000 за м²
    } else if (formData.waterproofing === 'enhanced') {
      waterproofingCost = area * 7500 // 7500 за м²
    }
    
    // 4. Дополнительные опции сантехники
    let plumbingExtras = 0
    if (formData.plumbing && formData.plumbing.length > 0) {
      // Инсталляция
      if (formData.plumbing.includes('Инсталляция (скрытый монтаж)')) {
        plumbingExtras += 15000
      }
      // Душевой поддон
      if (formData.plumbing.includes('Душевой поддон + перегородка')) {
        plumbingExtras += 60000
      }
    }
    
    // 5. Потолок (доплата за определенные типы)
    let ceilingCost = 0
    if (formData.ceiling && 
        (formData.ceiling === 'Натяжной (влагостойкий)' || 
         formData.ceiling === 'Реечный (алюминиевый/пластиковый)' || 
         formData.ceiling === 'Гипсокартон (влагостойкий)')) {
      ceilingCost = 15000
    }
    
    // 6. Рассчитываем общую стоимость
    let totalCost = basePrice + demolitionCost + waterproofingCost + plumbingExtras + ceilingCost
    
    // 7. Добавляем погрешность ±10%
    const minCost = Math.round(totalCost * 0.9)
    const maxCost = Math.round(totalCost * 1.1)
    
    return {
      min: minCost,
      max: maxCost,
      basePrice: basePrice,
      demolitionCost: demolitionCost,
      waterproofingCost: waterproofingCost,
      plumbingExtras: plumbingExtras,
      ceilingCost: ceilingCost,
      totalWithoutError: Math.round(totalCost),
      days: this.prices.durations.bathroom,
      area: area,
      details: {
        bathroomType: formData.bathroomType,
        isToiletOnly: isToiletOnly,
        areaSize: formData.area,
        demolitionType: formData.demolition,
        waterproofingType: formData.waterproofing,
        hasInstallation: formData.plumbing && formData.plumbing.includes('Инсталляция (скрытый монтаж)'),
        hasShowerTray: formData.plumbing && formData.plumbing.includes('Душевой поддон + перегородка'),
        ceilingType: formData.ceiling
      }
    }
  }

  // Существующие функции расчета для других типов...
  calculateNewbuilding(formData) {
    const service = this.prices.services.newbuilding
    const areaRange = this.parseAreaRange(formData.area)
    
    // Базовая цена за м²
    let pricePerM2 = service.pricePerM2 // 13000
    
    // Доплата за качество стен Q4: +2000 за м²
    if (formData.wallQuality === 'Q4') {
      pricePerM2 += 2000
    }
    
    // Расчет МИНИМАЛЬНОЙ стоимости
    let minTotal = pricePerM2 * areaRange.min
    // Расчет МАКСИМАЛЬНОЙ стоимости  
    let maxTotal = pricePerM2 * areaRange.max
    
    // Доплата за балкон
    if (formData.balcony && formData.balcony !== 'none') {
      const balconyPrice = formData.balcony === 'finish' ? 40000 : 60000
      minTotal += balconyPrice
      maxTotal += balconyPrice
    }
    
    // Доплата за потолки
    if (formData.ceiling && formData.ceiling !== 'other') {
      const ceilingPricePerM2 = formData.ceiling === 'stretch' ? 1500 : 2000
      const ceilingMin = ceilingPricePerM2 * areaRange.min
      const ceilingMax = ceilingPricePerM2 * areaRange.max
      minTotal += ceilingMin
      maxTotal += ceilingMax
    }
    
    // МИНИМАЛЬНАЯ ЦЕНА ДЛЯ СТУДИЙ: не менее 340 000 рублей
    if (formData.area && formData.area.includes('до')) {
      const maxArea = parseFloat(formData.area.replace('до', '').trim())
      if (maxArea <= 25) {
        minTotal = Math.max(minTotal, 340000)
        maxTotal = Math.max(maxTotal, 340000)
      }
    }
    
    // Добавляем погрешность ±10%
    const finalMin = Math.round(minTotal * 0.9)
    const finalMax = Math.round(maxTotal * 1.1)
    
    return {
      min: finalMin,
      max: finalMax,
      baseMin: Math.round(minTotal),
      baseMax: Math.round(maxTotal),
      days: this.prices.durations.newbuilding,
      pricePerM2: pricePerM2,
      areaRange: areaRange,
      areaString: formData.area,
      details: {
        hasQ4: formData.wallQuality === 'Q4',
        balconyType: formData.balcony,
        ceilingType: formData.ceiling,
        isStudio: formData.area && formData.area.includes('до') && parseFloat(formData.area.replace('до', '').trim()) <= 25
      }
    }
  }

  calculateSecondary(formData) {
    const service = this.prices.services.secondary
    const areaRange = this.parseAreaRange(formData.area)
    
    // Базовая цена за м²
    let pricePerM2 = service.pricePerM2 // 13000
    
    // Доплата за качество стен Q4: +2000 за м²
    if (formData.wallQuality === 'Q4') {
      pricePerM2 += 2000
    }
    
    // Расчет МИНИМАЛЬНОЙ стоимости
    let minTotal = pricePerM2 * areaRange.min
    // Расчет МАКСИМАЛЬНОЙ стоимости  
    let maxTotal = pricePerM2 * areaRange.max
    
    // Доплата за балкон
    if (formData.balcony && formData.balcony !== 'none') {
      const balconyPrice = formData.balcony === 'finish' ? 40000 : 60000
      minTotal += balconyPrice
      maxTotal += balconyPrice
    }
    
    // Доплата за демонтаж
    if (formData.demolition && formData.demolition !== 'none') {
      const demolitionPrice = service.demolition[formData.demolition] || 0
      minTotal += demolitionPrice
      maxTotal += demolitionPrice
    }
    
    // Доплата за потолки
    if (formData.ceiling && formData.ceiling !== 'other') {
      const ceilingPricePerM2 = formData.ceiling === 'stretch' ? 1500 : 2000
      const ceilingMin = ceilingPricePerM2 * areaRange.min
      const ceilingMax = ceilingPricePerM2 * areaRange.max
      minTotal += ceilingMin
      maxTotal += ceilingMax
    }
    
    // МИНИМАЛЬНАЯ ЦЕНА ДЛЯ СТУДИЙ: не менее 340 000 рублей
    if (formData.area && formData.area.includes('до')) {
      const maxArea = parseFloat(formData.area.replace('до', '').trim())
      if (maxArea <= 25) {
        minTotal = Math.max(minTotal, 340000)
        maxTotal = Math.max(maxTotal, 340000)
      }
    }
    
    // Добавляем погрешность ±10%
    const finalMin = Math.round(minTotal * 0.9)
    const finalMax = Math.round(maxTotal * 1.1)
    
    return {
      min: finalMin,
      max: finalMax,
      baseMin: Math.round(minTotal),
      baseMax: Math.round(maxTotal),
      days: this.prices.durations.secondary,
      pricePerM2: pricePerM2,
      areaRange: areaRange,
      areaString: formData.area,
      details: {
        hasQ4: formData.wallQuality === 'Q4',
        balconyType: formData.balcony,
        ceilingType: formData.ceiling,
        isStudio: formData.area && formData.area.includes('до') && parseFloat(formData.area.replace('до', '').trim()) <= 25
      }
    }
  }

  calculateHouse(formData) {
    const service = this.prices.services.house
    const areaRange = this.parseAreaRange(formData.area)
    
    // Базовая цена за м²
    let pricePerM2 = service.pricePerM2 // 13000
    
    // Доплата за качество стен Q4: +2000 за м²
    if (formData.wallQuality === 'Q4') {
      pricePerM2 += 2000
    }
    
    // Расчет МИНИМАЛЬНОЙ стоимости
    let minTotal = pricePerM2 * areaRange.min
    // Расчет МАКСИМАЛЬНОЙ стоимости  
    let maxTotal = pricePerM2 * areaRange.max
    
    // Добавляем террасу/веранду если есть
    if (formData.terrace && formData.terrace !== 'none') {
      const terracePrice = service.terrace[formData.terrace] || 0
      minTotal += terracePrice
      maxTotal += terracePrice
    }
    
    // Доплата за потолки
    if (formData.ceiling && formData.ceiling !== 'other') {
      const ceilingPricePerM2 = formData.ceiling === 'stretch' ? 1500 : 2000
      const ceilingMin = ceilingPricePerM2 * areaRange.min
      const ceilingMax = ceilingPricePerM2 * areaRange.max
      minTotal += ceilingMin
      maxTotal += ceilingMax
    }
    
    // Добавляем погрешность ±10%
    const finalMin = Math.round(minTotal * 0.9)
    const finalMax = Math.round(maxTotal * 1.1)
    
    return {
      min: finalMin,
      max: finalMax,
      baseMin: Math.round(minTotal),
      baseMax: Math.round(maxTotal),
      days: this.prices.durations.house,
      pricePerM2: pricePerM2,
      areaRange: areaRange,
      areaString: formData.area,
      details: {
        hasQ4: formData.wallQuality === 'Q4',
        ceilingType: formData.ceiling
      }
    }
  }

  // Функция для парсинга площади для квартир/домов
  parseAreaRange(areaString) {
    if (!areaString) return { min: 50, max: 60 }
    
    if (areaString.includes('до')) {
      const max = parseFloat(areaString.replace('до', '').trim())
      return { min: Math.round(max * 0.7), max: max }
    } else if (areaString.includes('свыше')) {
      const min = parseFloat(areaString.replace('свыше', '').trim())
      return { min: min, max: min * 1.5 }
    } else if (areaString.includes('-')) {
      const [min, max] = areaString.split('-').map(str => parseFloat(str.trim()))
      return { min: min, max: max }
    }
    
    const num = parseFloat(areaString) || 60
    return { min: num, max: num }
  }

  // Основная функция расчета
  calculate(calculatorType, formData) {
    switch (calculatorType) {
      case 'newbuilding':
        return this.calculateNewbuilding(formData)
      case 'secondary':
        return this.calculateSecondary(formData)
      case 'house':
        return this.calculateHouse(formData)
      case 'bathroom':
        return this.calculateBathroom(formData)
      default:
        return {
          min: 200000,
          max: 300000,
          baseMin: 200000,
          baseMax: 300000,
          days: "30-60 дней"
        }
    }
  }
}

// Создаем экземпляр
export const priceCalculator = new PriceCalculator()