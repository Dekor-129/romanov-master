import { useState, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function StepNewbuilding({ step, formData, updateFormData, onNext, onBack }) {
  const [localData, setLocalData] = useState(formData)

  useEffect(() => {
    setLocalData(formData)
  }, [formData])

  const handleChange = (field, value) => {
    const newData = { ...localData, [field]: value }
    setLocalData(newData)
    updateFormData(newData)
  }

  const handleMultiSelect = (field, value, isChecked) => {
    const currentValues = localData[field] || []
    let newValues
    if (isChecked) {
      newValues = [...currentValues, value]
    } else {
      newValues = currentValues.filter(v => v !== value)
    }
    handleChange(field, newValues)
  }

  const renderStep = () => {
    switch (step) {
      case 2: // Площадь квартиры
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Площадь квартиры</h3>
            <div className="space-y-3">
              {['до 25', '25-40', '40-60', '60-80', '80-100', 'свыше 100'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleChange('area', size)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.area === size ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="font-medium">{size} м²</div>
                  {size === 'до 25' && <div className="text-sm text-gray-500">Студия</div>}
                  {size === '25-40' && <div className="text-sm text-gray-500">1-комнатная</div>}
                  {size === '40-60' && <div className="text-sm text-gray-500">2-комнатная</div>}
                  {size === '60-80' && <div className="text-sm text-gray-500">3-комнатная</div>}
                  {size === '80-100' && <div className="text-sm text-gray-500">4-комнатная</div>}
                  {size === 'свыше 100' && <div className="text-sm text-gray-500">Просторная квартира</div>}
                </button>
              ))}
            </div>
          </div>
        )

      case 3: // Количество комнат
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Количество комнат</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 'более 3'].map((rooms) => (
                <button
                  key={rooms}
                  onClick={() => handleChange('rooms', rooms)}
                  className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${localData.rooms === rooms ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="text-2xl font-bold">{rooms}</div>
                  <div className="text-gray-600">комнат{rooms === 1 ? 'а' : ''}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 4: // Дизайн-проект
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Нужен ли дизайн-проект?</h3>
            <div className="space-y-4">
              {[
                { id: 'full', label: 'Да, нужен полный дизайн-проект' },
                { id: 'layout', label: 'Нужна только планировка и расстановка мебели' },
                { id: 'no', label: 'Нет, сделаю сам/сама' },
                { id: 'unknown', label: 'Пока не знаю' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChange('design', option.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.design === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 5: // Качество стен
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Качество отделки стен</h3>
            <div className="space-y-6">
              <button
                onClick={() => handleChange('wallQuality', 'Q4')}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all ${localData.wallQuality === 'Q4' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="font-bold text-lg mb-2">Q4 - Высокое качество (под покраску)</div>
                <div className="text-gray-600 text-sm">
                  • Штукатурка по маякам<br/>
                  • Шпатлевание в 3-4 слоя<br/>
                  • Идеально ровная поверхность<br/>
                  • Для глянцевой и матовой покраски
                </div>
              </button>
              
              <button
                onClick={() => handleChange('wallQuality', 'Q3')}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all ${localData.wallQuality === 'Q3' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="font-bold text-lg mb-2">Q3 - Стандартное качество (под обои)</div>
                <div className="text-gray-600 text-sm">
                  • Выравнивание под правило<br/>
                  • Шпатлевание 2 раза<br/>
                  • Хорошо ровная поверхность<br/>
                  • Под обои или матовую покраску
                </div>
              </button>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Под обои выбирайте Q3 (экономия, текстура обоев скроет неровности)<br/>
                💡 Под покраску выбирайте Q4 (краска показывает все неровности, нужна идеальная поверхность)
              </p>
            </div>
          </div>
        )

      case 6: // Отделка стен
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Что будет на стенах?</h3>
            <p className="text-gray-600 mb-4">Можно выбрать несколько вариантов</p>
            <div className="space-y-3">
              {[
                'Обои',
                'Покраска (матовая)',
                'Покраска (глянцевая)',
                'Декоративная штукатурка',
                'Панели (МДФ, ПВХ, пластик)',
                'Плитка (керамическая, керамогранит)',
                'Камень/кирпич (декоративный)',
                'Пробка/бамбук (натуральные материалы)'
              ].map((option) => (
                <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(localData.wallFinish || []).includes(option)}
                    onChange={(e) => handleMultiSelect('wallFinish', option, e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 7: // Балкон
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Что делаем с балконом/лоджией?</h3>
            <div className="space-y-4">
              {[
                { id: 'none', label: 'Без изменений (не трогаем балкон)' },
                { 
                  id: 'finish', 
                  label: 'Отделка панелями без утепления',
                  description: 'Монтаж пластиковых/МДФ панелей, отделка потолка, базовое освещение'
                },
                { 
                  id: 'insulated', 
                  label: 'Утепление + отделка панелями',
                  description: 'Утепление стен, пола, потолка, монтаж панелей на каркас, электрика'
                }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChange('balcony', option.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.balcony === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )

      case 8: // Электрика
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Нужны ли работы по электрике?</h3>
            <p className="text-gray-600 mb-4">Выберите что нужно</p>
            <div className="space-y-3">
              {[
                'Полная замена электропроводки',
                'Доработка существующей проводки',
                'Добавление розеток и выключателей',
                'Перенос электрощитка',
                'Установка дополнительного освещения',
                'Теплый пол (электрический)',
                'Умный дом (базовая автоматизация)',
                'Заземление и защита УЗО',
                'Электрика на балкон'
              ].map((option) => (
                <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(localData.electricity || []).includes(option)}
                    onChange={(e) => handleMultiSelect('electricity', option, e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
              <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localData.noElectricity === true}
                  onChange={(e) => handleChange('noElectricity', e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <span className="ml-3">Электрика не нужна (оставляем как есть)</span>
              </label>
            </div>
          </div>
        )

      case 9: // Сантехника
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Что нужно по сантехнике?</h3>
            <p className="text-gray-600 mb-4">Выберите что нужно</p>
            <div className="space-y-3">
              {[
                'Полная замена сантехнических труб и стояков',
                'Замена только смесителей и подключений',
                'Перенос сантехнических точек',
                'Установка новой сантехники',
                'Разводка труб в ванной комнате',
                'Разводка труб на кухне',
                'Монтаж водонагревателя (бойлера)',
                'Установка фильтров для воды',
                'Полотенцесушитель',
                'Теплый пол в санузле (водяной)'
              ].map((option) => (
                <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(localData.plumbing || []).includes(option)}
                    onChange={(e) => handleMultiSelect('plumbing', option, e.target.checked)}
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-3">{option}</span>
                </label>
              ))}
              <label className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localData.noPlumbing === true}
                  onChange={(e) => handleChange('noPlumbing', e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <span className="ml-3">Сантехника не нужна (оставляем как есть)</span>
              </label>
            </div>
          </div>
        )

      case 10: // Потолки
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Какие потолки будем делать?</h3>
            <div className="space-y-4">
              <button
                onClick={() => handleChange('ceiling', 'stretch')}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all ${localData.ceiling === 'stretch' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="font-bold text-lg">Натяжной потолок</div>
              </button>
              
              <button
                onClick={() => handleChange('ceiling', 'drywall')}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all ${localData.ceiling === 'drywall' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="font-bold text-lg">Гипсокартон</div>
              </button>
              
              <button
                onClick={() => handleChange('ceiling', 'other')}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all ${localData.ceiling === 'other' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="font-bold text-lg">Иной вариант</div>
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Проверяем, заполнен ли текущий шаг
  const isStepValid = () => {
    switch (step) {
      case 2: return !!localData.area
      case 3: return !!localData.rooms
      case 4: return !!localData.design
      case 5: return !!localData.wallQuality
      case 6: return (localData.wallFinish || []).length > 0
      case 7: return !!localData.balcony
      case 8: return (localData.electricity || []).length > 0 || localData.noElectricity
      case 9: return (localData.plumbing || []).length > 0 || localData.noPlumbing
      case 10: return !!localData.ceiling
      default: return true
    }
  }

  return (
    <div>
      {renderStep()}
      
      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Назад
        </button>
        
        <button
          onClick={onNext}
          disabled={!isStepValid()}
          className={`flex items-center px-6 py-3 rounded-lg font-medium ${isStepValid() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Далее
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  )
}