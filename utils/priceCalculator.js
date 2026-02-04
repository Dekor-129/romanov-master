import pricesData from '../data/prices.json'

export class PriceCalculator {
  constructor() {
    this.prices = pricesData
  }

  // Парсим площадь в МИНИМАЛЬНОЕ и МАКСИМАЛЬНОЕ значение
  parseAreaRange(areaString) {
    if (!areaString) return { min: 50, max: 60 } // значение по умолчанию
    
    if (areaString.includes('до')) {
      const max = parseFloat(areaString.replace('до', '').trim())
      return { min: Math.round(max * 0.7), max: max } // например "до 25" → 17-25 м²
    } else if (areaString.includes('свыше')) {
      const min = parseFloat(areaString.replace('свыше', '').trim())
      return { min: min, max: min * 1.5 } // например "свыше 100" → 100-150 м²
    } else if (areaString.includes('-')) {
      const [min, max] = areaString.split('-').map(str => parseFloat(str.trim()))
      return { min: min, max: max } // например "25-40" → 25-40 м²
    }
    
    const num = parseFloat(areaString) || 60
    return { min: num, max: num }
  }

  // Расчет для квартир в новостройке
  calculateNewbuilding(formData) {
    const service = this.prices.services.newbuilding
    const areaRange = this.parseAreaRange(formData.area)
    
    // Расчет МИНИМАЛЬНОЙ стоимости
    let minTotal = service.pricePerM2 * areaRange.min
    // Расчет МАКСИМАЛЬНОЙ стоимости  
    let maxTotal = service.pricePerM2 * areaRange.max
    
    // Добавляем балкон если есть (и к мин, и к макс)
    if (formData.balcony && formData.balcony !== 'none') {
      const balconyPrice = service.balcony[formData.balcony] || 0
      minTotal += balconyPrice
      maxTotal += balconyPrice
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
      pricePerM2: service.pricePerM2,
      areaRange: areaRange,
      areaString: formData.area
    }
  }

  // Расчет для вторичного рынка
  calculateSecondary(formData) {
    const service = this.prices.services.secondary
    const areaRange = this.parseAreaRange(formData.area)
    
    // Расчет МИНИМАЛЬНОЙ стоимости
    let minTotal = service.pricePerM2 * areaRange.min
    // Расчет МАКСИМАЛЬНОЙ стоимости  
    let maxTotal = service.pricePerM2 * areaRange.max
    
    // Добавляем балкон если есть
    if (formData.balcony && formData.balcony !== 'none') {
      const balconyPrice = service.balcony[formData.balcony] || 0
      minTotal += balconyPrice
      maxTotal += balconyPrice
    }
    
    // Добавляем демонтаж если есть
    if (formData.demolition && formData.demolition !== 'none') {
      const demolitionPrice = service.demolition[formData.demolition] || 0
      minTotal += demolitionPrice
      maxTotal += demolitionPrice
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
      pricePerM2: service.pricePerM2,
      areaRange: areaRange,
      areaString: formData.area
    }
  }

  // Расчет для загородного дома
  calculateHouse(formData) {
    const service = this.prices.services.house
    const areaRange = this.parseAreaRange(formData.area)
    
    // Расчет МИНИМАЛЬНОЙ стоимости
    let minTotal = service.pricePerM2 * areaRange.min
    // Расчет МАКСИМАЛЬНОЙ стоимости  
    let maxTotal = service.pricePerM2 * areaRange.max
    
    // Добавляем террасу/веранду если есть
    if (formData.terrace && formData.terrace !== 'none') {
      const terracePrice = service.terrace[formData.terrace] || 0
      minTotal += terracePrice
      maxTotal += terracePrice
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
      pricePerM2: service.pricePerM2,
      areaRange: areaRange,
      areaString: formData.area
    }
  }

  // Расчет для санузла
  calculateBathroom(formData) {
    const service = this.prices.services.bathroom
    
    // Базовая цена
    const basePrice = service.basePrice
    
    // Добавляем погрешность ±10%
    const min = Math.round(basePrice * 0.9)
    const max = Math.round(basePrice * 1.1)
    
    return {
      min: min,
      max: max,
      basePrice: basePrice,
      days: this.prices.durations.bathroom
    }
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