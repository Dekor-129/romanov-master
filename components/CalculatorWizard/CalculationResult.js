import { useState } from 'react'
import ContactForm from '../ContactForm'
import { priceCalculator } from '../../utils/priceCalculator'

export default function CalculationResult({ calculatorType, formData, onBack }) {
  const [showContactForm, setShowContactForm] = useState(false)

  // Используем реальный расчет
  const price = priceCalculator.calculate(calculatorType, formData)

  if (showContactForm) {
    return (
      <ContactForm
        calculatorType={calculatorType}
        formData={formData}
        calculatedPrice={price}
        onBack={() => setShowContactForm(false)}
      />
    )
  }

  // Функция для форматирования чисел с пробелами (С ЗАЩИТОЙ ОТ UNDEFINED)
  const formatPrice = (num) => {
    if (num === undefined || num === null || isNaN(num)) {
      return '0'
    }
    return num.toLocaleString('ru-RU')
  }

  // Функция для отображения формулы расчета с детализацией
  const renderCalculationFormula = () => {
    if (calculatorType === 'bathroom') {
      return `от ${formatPrice(price.basePrice || price.min)} ₽`
    }
    
    if (!price.pricePerM2 || !price.areaRange) return null
    
    const { min: areaMin, max: areaMax } = price.areaRange
    const pricePerM2 = price.pricePerM2
    
    if (areaMin === areaMax) {
      return `${formatPrice(pricePerM2)} × ${Math.round(areaMax)} м²`
    } else {
      return `${formatPrice(pricePerM2)} × ${areaMin}-${areaMax} м²`
    }
  }

  // Функция для отображения деталей расчета
  const renderCalculationDetails = () => {
    const details = []
    
    // Для санузлов
    if (calculatorType === 'bathroom') {
      // Базовая цена
      if (price.basePrice) {
        let baseLabel = 'Базовая стоимость работ'
        if (price.details?.isToiletOnly && price.area <= 3) {
          baseLabel = 'Туалет до 3м² (базовая цена)'
        } else if (price.area <= 3) {
          baseLabel = 'Санузел до 3м² (базовая цена)'
        } else {
          baseLabel = `Санузел ${price.area?.toFixed(1) || '0'}м² (120 000 ₽ + 40 000 ₽/м²)`
        }
        details.push({
          label: baseLabel,
          value: `${formatPrice(price.basePrice)} ₽`
        })
      }
      
      // Демонтаж
      if (price.demolitionCost && price.demolitionCost > 0) {
        details.push({
          label: 'Демонтаж',
          value: `+${formatPrice(price.demolitionCost)} ₽`,
          isAdditional: true
        })
      }
      
      // Гидроизоляция
      if (price.waterproofingCost && price.waterproofingCost > 0) {
        let waterproofingLabel = 'Гидроизоляция'
        if (price.details?.waterproofingType === 'floor') {
          waterproofingLabel = `Гидроизоляция пола (1 000 ₽/м² × ${price.area?.toFixed(1) || '0'}м²)`
        } else if (price.details?.waterproofingType === 'full') {
          waterproofingLabel = `Полная гидроизоляция (5 000 ₽/м² × ${price.area?.toFixed(1) || '0'}м²)`
        } else if (price.details?.waterproofingType === 'enhanced') {
          waterproofingLabel = `Усиленная гидроизоляция (7 500 ₽/м² × ${price.area?.toFixed(1) || '0'}м²)`
        }
        details.push({
          label: waterproofingLabel,
          value: `+${formatPrice(price.waterproofingCost)} ₽`,
          isAdditional: true
        })
      }
      
      // Инсталляция
      if (price.details?.hasInstallation) {
        details.push({
          label: 'Инсталляция (скрытый монтаж)',
          value: `+${formatPrice(15000)} ₽`,
          isAdditional: true
        })
      }
      
      // Душевой поддон
      if (price.details?.hasShowerTray) {
        details.push({
          label: 'Душевой поддон + перегородка',
          value: `+${formatPrice(60000)} ₽`,
          isAdditional: true
        })
      }
      
      // Потолок
      if (price.ceilingCost && price.ceilingCost > 0) {
        details.push({
          label: `Потолок (${price.details?.ceilingType || ''})`,
          value: `+${formatPrice(price.ceilingCost)} ₽`,
          isAdditional: true
        })
      }
      
      // Итог без погрешности
      details.push({
        label: 'Итого без погрешности:',
        value: `${formatPrice(price.totalWithoutError)} ₽`,
        isImportant: true
      })
      
      return details
    }
    
    // Для квартир и домов (старая логика)
    // Базовая стоимость работ
    if (price.pricePerM2 && price.areaRange) {
      const baseCost = price.pricePerM2 * ((price.areaRange.min + price.areaRange.max) / 2)
      details.push({
        label: `Работы (${formatPrice(price.pricePerM2)} ₽/м²)`,
        value: `${formatPrice(Math.round(baseCost))} ₽`
      })
    }
    
    // Доплата за качество Q4
    if (price.details?.hasQ4 && calculatorType !== 'bathroom') {
      const q4Cost = 2000 * ((price.areaRange?.min + price.areaRange?.max) / 2 || 0)
      details.push({
        label: 'Качество стен Q4 (+2 000 ₽/м²)',
        value: `+${formatPrice(Math.round(q4Cost))} ₽`,
        isAdditional: true
      })
    }
    
    // Доплата за балкон
    if (price.details?.balconyType && price.details.balconyType !== 'none' && 
        (calculatorType === 'newbuilding' || calculatorType === 'secondary')) {
      const balconyPrice = price.details.balconyType === 'finish' ? 40000 : 60000
      details.push({
        label: price.details.balconyType === 'finish' ? 'Отделка балкона' : 'Утепление + отделка балкона',
        value: `+${formatPrice(balconyPrice)} ₽`,
        isAdditional: true
      })
    }
    
    // Доплата за потолки
    if (price.details?.ceilingType && price.details.ceilingType !== 'other' && 
        calculatorType !== 'bathroom') {
      const ceilingPricePerM2 = price.details.ceilingType === 'stretch' ? 1500 : 2000
      const area = ((price.areaRange?.min + price.areaRange?.max) / 2) || 0
      const ceilingCost = Math.round(ceilingPricePerM2 * area)
      details.push({
        label: price.details.ceilingType === 'stretch' ? 'Натяжные потолки (+1 500 ₽/м²)' : 'Гипсокартон (+2 000 ₽/м²)',
        value: `+${formatPrice(ceilingCost)} ₽`,
        isAdditional: true
      })
    }
    
    // Минимальная цена для студий
    if (price.details?.isStudio && price.baseMin < 340000) {
      details.push({
        label: 'Минимальная цена для студии',
        value: `${formatPrice(340000)} ₽`,
        isImportant: true
      })
    }
    
    // Итог без погрешности для квартир/домов
    if (price.baseMin && price.baseMax && calculatorType !== 'bathroom') {
      details.push({
        label: 'Итого без погрешности:',
        value: `${formatPrice(price.baseMin)} - ${formatPrice(price.baseMax)} ₽`,
        isImportant: true
      })
    }
    
    return details
  }

  return (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-4xl font-bold text-green-600 mb-2">
          {formatPrice(price.min)} - {formatPrice(price.max)} ₽
        </div>
        <div className="text-gray-600">
          Примерная стоимость ремонта
        </div>
        
        {/* Формула расчета */}
        <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg mt-3">
          <div className="font-medium mb-1">Формула расчета:</div>
          <div>{renderCalculationFormula()}</div>
        </div>
        
        <div className="text-sm text-gray-500 mt-2">
          Срок выполнения: {price.days || '30-60 дней'}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Детали расчета:</h3>
        <div className="text-left space-y-3">
          {/* Выводим детали расчета */}
          {renderCalculationDetails().map((detail, index) => (
            <div 
              key={index} 
              className={`flex justify-between items-center ${detail.isImportant ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200' : ''}`}
            >
              <span className={detail.isAdditional ? 'text-gray-600' : 'font-medium'}>
                {detail.isAdditional ? '• ' : ''}{detail.label}
              </span>
              <span className={`font-medium ${detail.isAdditional ? 'text-green-600' : detail.isImportant ? 'text-yellow-700' : ''}`}>
                {detail.value}
              </span>
            </div>
          ))}
          
          {/* Погрешность ±10% */}
          {price.min && price.max && (
            <div className="flex justify-between text-sm text-gray-500 border-t pt-3 mt-2">
              <span>Погрешность расчета (±10%):</span>
              <span>±{formatPrice(Math.round((price.max - price.min) / 2))} ₽</span>
            </div>
          )}
          
          {/* Итоговая строка */}
          <div className="flex justify-between border-t pt-3 mt-2 font-bold text-lg">
            <span>Итоговый диапазон:</span>
            <span className="text-green-600">
              {formatPrice(price.min)} - {formatPrice(price.max)} ₽
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          ⚠️ Это предварительный расчет. Точная стоимость определяется после выезда мастера на замер в Рязани.
          <br />
          💰 В стоимость включены только работы, материалы оплачиваются отдельно.
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setShowContactForm(true)}
          className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
        >
          Получить точный расчет
        </button>
        
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Вернуться к ответам
        </button>
        
        <div className="pt-4">
          <a 
            href="tel:+79105755989"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium"
          >
            Или позвоните прямо сейчас: +7 910 575-59-89
          </a>
        </div>
      </div>
    </div>
  )
}