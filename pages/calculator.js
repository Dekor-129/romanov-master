import { useState } from 'react'
import CalculatorWizard from '../components/CalculatorWizard'

export default function Calculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [calculatorType, setCalculatorType] = useState(null)
  const [formData, setFormData] = useState({})

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Калькулятор стоимости ремонта
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Ответьте на несколько вопросов и получите примерный расчет стоимости ремонта
        </p>

        <CalculatorWizard
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          calculatorType={calculatorType}
          setCalculatorType={setCalculatorType}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  )
}