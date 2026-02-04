export default function StepNavigation({ currentStep, totalSteps, calculatorType }) {
  const getStepTitle = () => {
    if (currentStep === 1) return 'Выбор типа объекта'
    
    if (!calculatorType) return ''
    
    const step = currentStep - 1 // минус шаг выбора типа
    
    switch (calculatorType) {
      case 'newbuilding':
        const newbuildingSteps = [
          'Площадь квартиры',
          'Количество комнат',
          'Дизайн-проект',
          'Качество стен',
          'Отделка стен',
          'Балкон',
          'Электрика',
          'Сантехника',
          'Потолки',
          'Расчет'
        ]
        return newbuildingSteps[step - 1] || 'Расчет'
        
      case 'secondary':
        const secondarySteps = [
          'Демонтаж',
          'Площадь квартиры',
          'Количество комнат',
          'Дизайн-проект',
          'Качество стен',
          'Отделка стен',
          'Балкон',
          'Электрика',
          'Сантехника',
          'Потолки',
          'Расчет'
        ]
        return secondarySteps[step - 1] || 'Расчет'
        
      case 'house':
        const houseSteps = [
          'Площадь дома',
          'Количество комнат',
          'Дизайн-проект',
          'Качество стен',
          'Отделка стен',
          'Терраса/веранда',
          'Электрика',
          'Сантехника',
          'Потолки',
          'Расчет'
        ]
        return houseSteps[step - 1] || 'Расчет'
        
      case 'bathroom':
        const bathroomSteps = [
          'Тип санузла',
          'Площадь',
          'Демонтаж',
          'Гидроизоляция',
          'Отделка стен',
          'Отделка пола',
          'Сантехника',
          'Электрика',
          'Потолок',
          'Расчет'
        ]
        return bathroomSteps[step - 1] || 'Расчет'
        
      default:
        return ''
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-900">
          {getStepTitle()}
        </h2>
        <span className="text-gray-600">
          Шаг {currentStep} из {totalSteps}
        </span>
      </div>
      
      {/* Прогресс бар */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}