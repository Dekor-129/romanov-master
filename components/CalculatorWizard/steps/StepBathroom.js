import { useState, useEffect } from 'react'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

export default function StepBathroom({ step, formData, updateFormData, onNext, onBack }) {
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
      case 2: // Тип санузла
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Какой тип санузла?</h3>
            <div className="space-y-4">
              {[
                { id: 'separate', label: 'Раздельный санузел (ванная + туалет отдельно)' },
                { id: 'combined', label: 'Совмещенный санузел (ванная и туалет вместе)' },
                { id: 'withLaundry', label: 'Санузел + постирочная/гардеробная' },
                { id: 'bathroomOnly', label: 'Только ванная комната' },
                { id: 'toiletOnly', label: 'Только туалет' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChange('bathroomType', option.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.bathroomType === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 3: // Площадь санузла
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Площадь санузла</h3>
            <div className="space-y-3">
              {[
                { size: 'до 3', label: 'Маленький' },
                { size: '3-5', label: 'Стандартный' },
                { size: '5-8', label: 'Просторный' },
                { size: '8-12', label: 'Большой' },
                { size: 'свыше 12', label: 'Люкс' }
              ].map((item) => (
                <button
                  key={item.size}
                  onClick={() => handleChange('area', item.size)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.area === item.size ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  <div className="font-medium">{item.size} м²</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                </button>
              ))}
            </div>
          </div>
        )

      case 4: // Демонтаж
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Требуется ли демонтаж?</h3>
            <div className="space-y-4 mb-8">
              {[
                { id: 'full', label: 'Да, полный демонтаж' },
                { id: 'partial', label: 'Частичный демонтаж' },
                { id: 'none', label: 'Нет (новое помещение)' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChange('demolition', option.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.demolition === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Детали демонтажа если выбран full или partial */}
            {(localData.demolition === 'full' || localData.demolition === 'partial') && (
              <div>
                <h4 className="text-lg font-medium mb-4">Что именно демонтируем?</h4>
                <div className="space-y-3">
                  {[
                    'Демонтаж старой плитки',
                    'Демонтаж сантехники',
                    'Демонтаж электрики',
                    'Снос перегородок (при перепланировке)',
                    'Выравнивание пола/стен после демонтажа'
                  ].map((option) => (
                    <label key={option} className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(localData.demolitionItems || []).includes(option)}
                        onChange={(e) => handleMultiSelect('demolitionItems', option, e.target.checked)}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 5: // Гидроизоляция
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Гидроизоляция</h3>
            <div className="space-y-4">
              {[
                { 
                  id: 'full', 
                  label: 'Полная гидроизоляция (пол + стены на 1.5м)',
                  description: 'Для всех санузлов, обязательна'
                },
                { 
                  id: 'floor', 
                  label: 'Гидроизоляция только пола',
                  description: 'Минимальный вариант для сухих зон'
                },
                { 
                  id: 'enhanced', 
                  label: 'Усиленная гидроизоляция',
                  description: 'Для душевых без поддона, влажных зон'
                },
                { 
                  id: 'none', 
                  label: 'Не требуется',
                  description: 'Только для сухих зон, не рекомендуется'
                }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleChange('waterproofing', option.id)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.waterproofing === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
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

      case 6: // Отделка стен
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Отделка стен</h3>
            <p className="text-gray-600 mb-4">Выберите материалы (можно несколько)</p>
            <div className="space-y-3">
              {[
                'Плитка (керамическая)',
                'Плитка (керамогранит)',
                'Мозаика (декоративная)',
                'Влагостойкая краска',
                'Панели ПВХ/пластик',
                'Декоративная штукатурка (влагостойкая)',
                'Натуральный камень',
                'Стеклянные панели'
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

      case 7: // Отделка пола
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Покрытие пола</h3>
            <div className="space-y-4">
              {[
                'Плитка',
                'Керамогранит',
                'Мозаика',
                'Наливной пол (полимерный)',
                'Влагостойкий ламинат',
                'Пробка (влагостойкая)'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange('floorFinish', option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.floorFinish === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 8: // Сантехника
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Какая сантехника нужна?</h3>
            <p className="text-gray-600 mb-4">Выберите что нужно (можно несколько)</p>
            <div className="space-y-3">
              {[
                'Унитаз (напольный/подвесной)',
                'Раковина (на тумбе/подвесная/встраиваемая)',
                'Ванна (акриловая/чугунная/стальная)',
                'Душевая кабина (угловая/прямая/радиусная)',
                'Душевой поддон + перегородка',
                'Биде',
                'Инсталляция (скрытый монтаж)',
                'Смесители (для раковины, ванны, душа)',
                'Полотенцесушитель (электрический/водяной)',
                'Водонагреватель (бойлер)'
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
            </div>
          </div>
        )

      case 9: // Электрика
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Электрика в санузле</h3>
            <p className="text-gray-600 mb-4">Выберите что нужно (можно несколько)</p>
            <div className="space-y-3">
              {[
                'Розетки (влагостойкие с крышками)',
                'Освещение (основное + декоративное)',
                'Вытяжная вентиляция',
                'Теплый пол (электрический)',
                'Подсветка зеркала/ниш',
                'Датчики движения',
                'Умное освещение'
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
            </div>
          </div>
        )

      case 10: // Потолок
        return (
          <div>
            <h3 className="text-xl font-bold mb-6">Потолок в санузле</h3>
            <div className="space-y-4">
              {[
                'Натяжной (влагостойкий)',
                'Реечный (алюминиевый/пластиковый)',
                'Гипсокартон (влагостойкий)',
                'Плитка ПВХ',
                'Покраска (влагостойкой краской)'
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange('ceiling', option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${localData.ceiling === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                >
                  {option}
                </button>
              ))}
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
      case 2: return !!localData.bathroomType
      case 3: return !!localData.area
      case 4: 
        if (!localData.demolition) return false
        if ((localData.demolition === 'full' || localData.demolition === 'partial') && 
            (!localData.demolitionItems || localData.demolitionItems.length === 0)) {
          return false
        }
        return true
      case 5: return !!localData.waterproofing
      case 6: return (localData.wallFinish || []).length > 0
      case 7: return !!localData.floorFinish
      case 8: return (localData.plumbing || []).length > 0
      case 9: return (localData.electricity || []).length > 0
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