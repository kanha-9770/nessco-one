'use client'

import { useState } from 'react'
import { UserGuide } from './UserGuide'
import userGuideData from "@/components/Constants/user-guide/user-guide_data.json"

export default function EnhancedUserGuide() {
  const data = userGuideData.UserGuide[0]["user-guide"]
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredCards = data.cards.filter(card => 
    (card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     card.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategories.length === 0 || selectedCategories.includes(card.category))
  )

  const modifiedData = {
    ...data,
    cards: filteredCards
  }

  const modifiedUserGuideData = {
    UserGuide: [{
      "user-guide": modifiedData
    }]
  }

  return (
    <div>
      <div className="w-full px-10 mb-4">
        <input
          type="text"
          placeholder="Search user guides..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full px-10 mb-4">
        {data.categories.map((category, index) => (
          <label key={index} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.title)}
              onChange={() => handleCategoryChange(category.title)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">{category.title}</span>
          </label>
        ))}
      </div>
      <UserGuide userGuideData={modifiedUserGuideData} />
    </div>
  )
}