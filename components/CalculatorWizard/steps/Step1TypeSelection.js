import { FaHome, FaBuilding, FaHouseUser, FaBath } from 'react-icons/fa'

export default function Step1TypeSelection({ onTypeSelect }) {
  const types = [
    {
      id: 'newbuilding',
      title: 'Квартира в новостройке',
      description: 'Ремонт с нуля, чистовая отделка',
      icon: <FaHome className="text-blue-600 text-3xl" />
    },
    {
      id: 'secondary',
      title: 'Квартира на вторичном рынке',
      description: 'Ремонт с демонтажем, замена коммуникаций',
      icon: <FaBuilding className="text-green-600 text-3xl" />
    },
    {
      id: 'house',
      title: 'Загородный дом',
      description: 'Частный дом, коттедж, дача',
      icon: <FaHouseUser className="text-orange-600 text-3xl" />
    },
    {
      id: 'bathroom',
      title: 'Санузел',
      description: 'Ванная комната, туалет, санузел под ключ',
      icon: <FaBath className="text-purple-600 text-3xl" />
    }
  ]

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Что планируете ремонтировать?
      </h3>
      <p className="text-gray-600 mb-10">
        Выберите тип объекта для точного расчета
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {type.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {type.title}
                </h4>
                <p className="text-gray-600">
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 text-gray-500 text-sm">
        <p>После выбора ответьте на несколько вопросов о вашем объекте</p>
      </div>
    </div>
  )
}