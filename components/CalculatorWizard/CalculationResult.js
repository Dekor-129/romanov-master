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

  // Функция для форматирования чисел с пробелами
  const formatPrice = (num) => {
    return num.toLocaleString('ru-RU')
  }

  // Функция для отображения формулы расчета
  const renderCalculationFormula = () => {
    if (calculatorType === 'bathroom') {
      return `от ${formatPrice(price.basePrice)} ₽`
    }
    
    if (!price.pricePerM2 || !price.areaRange) return null
    
    const { min: areaMin, max: areaMax } = price.areaRange
    const pricePerM2 = price.pricePerM2
    
    if (areaMin === areaMax) {
      // Одно значение (например "до 25" → 17-25, но показываем как ~25)
      return `${formatPrice(pricePerM2)} × ${Math.round(areaMax)} м²`
    } else {
      // Диапазон (например "25-40")
      const minCost = Math.round(pricePerM2 * areaMin)
      const maxCost = Math.round(pricePerM2 * areaMax)
      return `${formatPrice(pricePerM2)} × ${areaMin}-${areaMax} м² = ${formatPrice(minCost)}-${formatPrice(maxCost)} ₽`
    }
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
          Срок выполнения: {price.days}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Детали расчета:</h3>
        <div className="text-left space-y-3">
          {/* Основная площадь */}
          {price.pricePerM2 && price.areaRange && (
            <>
              <div className="flex justify-between">
                <span>Работы ({formatPrice(price.pricePerM2)} руб/м²):</span>
                <span className="font-medium">
                  {formatPrice(price.baseMin)} - {formatPrice(price.baseMax)} ₽
                </span>
              </div>
              
              {/* Балкон */}
              {formData.balcony && formData.balcony !== 'none' && (
                <div className="flex justify-between">
                  <span>Балкон ({formData.balcony === 'finish' ? 'отделка' : 'утепление'}):</span>
                  <span className="font-medium text-green-600">
                    +{formData.balcony === 'finish' ? '40 000' : '30 000'} ₽
                  </span>
                </div>
              )}
              
              {/* Демонтаж для вторички */}
              {calculatorType === 'secondary' && formData.demolition && formData.demolition !== 'none' && (
                <div className="flex justify-between">
                  <span>Демонтаж ({formData.demolition === 'full' ? 'полный' : 'частичный'}):</span>
                  <span className="font-medium text-green-600">
                    +{formData.demolition === 'full' ? '40 000' : '20 000'} ₽
                  </span>
                </div>
              )}
              
              {/* Терраса для дома */}
              {calculatorType === 'house' && formData.terrace && formData.terrace !== 'none' && (
                <div className="flex justify-between">
                  <span>Терраса/веранда:</span>
                  <span className="font-medium text-green-600">
                    +{formData.terrace === 'finish' ? '40 000' : 
                     formData.terrace === 'insulated' ? '30 000' : '50 000'} ₽
                  </span>
                </div>
              )}
              
              {/* Итог без погрешности */}
              <div className="flex justify-between border-t pt-3 mt-2">
                <span>Итого без погрешности:</span>
                <span className="font-medium">
                  {formatPrice(price.baseMin)} - {formatPrice(price.baseMax)} ₽
                </span>
              </div>
            </>
          )}
          
          {/* Санузел */}
          {calculatorType === 'bathroom' && price.basePrice && (
            <div className="flex justify-between">
              <span>Ремонт санузла под ключ:</span>
              <span className="font-medium">{formatPrice(price.basePrice)} ₽</span>
            </div>
          )}
          
          {/* Погрешность ±10% */}
          <div className="flex justify-between text-sm text-gray-500 border-t pt-3 mt-2">
            <span>Погрешность расчета (±10%):</span>
            <span>±{formatPrice(Math.round((price.max - price.min) / 2))} ₽</span>
          </div>
          
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