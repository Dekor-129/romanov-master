import StepNavigation from './StepNavigation'
import Step1TypeSelection from './steps/Step1TypeSelection'
import StepNewbuilding from './steps/StepNewbuilding'
import StepSecondary from './steps/StepSecondary'
import StepHouse from './steps/StepHouse'
import StepBathroom from './steps/StepBathroom'
import CalculationResult from './CalculationResult'

export default function CalculatorWizard({
  currentStep,
  setCurrentStep,
  calculatorType,
  setCalculatorType,
  formData,
  setFormData
}) {
  const handleNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const handleTypeSelect = (type) => {
    setCalculatorType(type)
    setFormData({ ...formData, type })
    setCurrentStep(2)
  }

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data })
  }

  // Определяем общее количество шагов
  const getTotalSteps = () => {
    if (!calculatorType) return 1
    switch (calculatorType) {
      case 'newbuilding': return 11 // 10 вопросов + результат
      case 'secondary': return 12   // 11 вопросов + результат
      case 'house': return 11       // 10 вопросов + результат
      case 'bathroom': return 11    // 10 вопросов + результат
      default: return 1
    }
  }

  // Рендерим текущий шаг
  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <Step1TypeSelection
          onTypeSelect={handleTypeSelect}
        />
      )
    }

    if (currentStep === getTotalSteps()) {
      return (
        <CalculationResult
          calculatorType={calculatorType}
          formData={formData}
          onBack={handleBack}
        />
      )
    }

    // Шаги для каждого типа калькулятора
    switch (calculatorType) {
      case 'newbuilding':
        return (
          <StepNewbuilding
            step={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 'secondary':
        return (
          <StepSecondary
            step={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 'house':
        return (
          <StepHouse
            step={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 'bathroom':
        return (
          <StepBathroom
            step={currentStep}
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      {/* Прогресс бар */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={getTotalSteps()}
        calculatorType={calculatorType}
      />

      {/* Контент шага */}
      <div className="mt-8">
        {renderStep()}
      </div>
    </div>
  )
}