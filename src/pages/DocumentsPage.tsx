import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import Documents from '../components/Documents'

export const DocumentsPage: React.FC = () => {
  const navigate = useNavigate()
  
  const handleSectionChange = (section: string) => {
    navigate(`/${section}`)
  }

  return (
    <Layout currentSection="documents" onSectionChange={handleSectionChange}>
      <Documents />
    </Layout>
  )
} 