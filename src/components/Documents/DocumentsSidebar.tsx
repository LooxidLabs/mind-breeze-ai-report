import React from 'react';
import { Button } from '@ui/button';
import { 
  Zap, 
  Brain, 
  Database,
  ChevronRight 
} from 'lucide-react';
import { useLanguageStore } from '../../stores/languageStore';
import { documentStructure, documentTitles } from '../../docs/structure';
import type { DocumentSection, DocumentSubsection } from './index';

interface DocumentsSidebarProps {
  activeSection: DocumentSection;
  activeSubsection: DocumentSubsection;
  onSectionChange: (section: DocumentSection) => void;
  onSubsectionChange: (subsection: DocumentSubsection) => void;
}

const sectionIcons = {
  'getting-started': Zap,
  'user-guide': Brain,
  'data-management': Database,
};

export const DocumentsSidebar: React.FC<DocumentsSidebarProps> = ({
  activeSection,
  activeSubsection,
  onSectionChange,
  onSubsectionChange,
}) => {
  const { currentLanguage } = useLanguageStore();

  // documentStructure에서 섹션과 서브섹션 가져오기
  const sections = documentStructure.map(section => ({
    id: section.id as DocumentSection,
    label: (documentTitles[currentLanguage as keyof typeof documentTitles] as any)?.[section.id] || section.title
  }));

  // Get subsections for current section
  const getSubsections = (sectionId: DocumentSection) => {
    const section = documentStructure.find(s => s.id === sectionId);
    if (!section) return [];
    
    return section.subsections.map(subsection => ({
      id: subsection.id,
      label: (documentTitles[currentLanguage as keyof typeof documentTitles] as any)?.[subsection.id] || subsection.title
    }));
  };

  const handleSectionClick = (section: DocumentSection) => {
    onSectionChange(section);
    // Reset subsection when changing sections
    onSubsectionChange('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-5 border-b border-border">
        <h2 className="text-base font-semibold text-foreground mb-4">
          {currentLanguage === 'ko' ? '목차' : 'Contents'}
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto p-6">
        <nav className="space-y-8">
          {sections.map((section) => {
            const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
            const isActive = activeSection === section.id;
            const subsections = getSubsections(section.id);
            
            return (
              <div key={section.id} className="space-y-2 mb-4">
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-auto py-3.5 px-4 ${
                    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => handleSectionClick(section.id)}
                >
                  <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="flex-1 text-sm font-medium text-left">{section.label}</span>
                  {subsections.length > 0 && (
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} 
                    />
                  )}
                </Button>
                
                {/* Subsections */}
                {isActive && subsections.length > 0 && (
                  <div className="ml-6 space-y-2 mt-3">
                    {subsections.map((subsection) => (
                      <Button
                        key={subsection.id}
                        variant="ghost"
                        className={`w-full justify-start text-left h-auto py-2.5 px-3 text-sm flex items-start ${
                          activeSubsection === subsection.id 
                            ? 'bg-muted text-foreground' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        onClick={() => onSubsectionChange(subsection.id)}
                      >
                        <span className="block w-full text-left">{subsection.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}; 