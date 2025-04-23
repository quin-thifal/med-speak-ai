interface MedicalTerm {
  term: string;
  category: string;
  translations: Record<string, string>;
  description: string;
}

class MedicalTerminologyService {
  private medicalTerms: MedicalTerm[] = [
    {
      term: "hypertension",
      category: "cardiovascular",
      translations: {
        'es': 'hipertensión',
        'fr': 'hypertension',
        'de': 'Hypertonie',
        'zh': '高血压',
        'ar': 'ارتفاع ضغط الدم'
      },
      description: "High blood pressure"
    },
    {
      term: "diabetes",
      category: "endocrine",
      translations: {
        'es': 'diabetes',
        'fr': 'diabète',
        'de': 'Diabetes',
        'zh': '糖尿病',
        'ar': 'مرض السكري'
      },
      description: "A group of metabolic disorders"
    },
    // Add more medical terms as needed
  ];

  private patientData: Map<string, any> = new Map();

  // Enhanced translation with medical terminology
  enhanceTranslation(text: string, targetLanguage: string): string {
    let enhancedText = text;
    
    this.medicalTerms.forEach(term => {
      const regex = new RegExp(`\\b${term.term}\\b`, 'gi');
      if (regex.test(text)) {
        const translation = term.translations[targetLanguage] || term.term;
        enhancedText = enhancedText.replace(regex, `<span class="medical-term" title="${term.description}">${translation}</span>`);
      }
    });

    return enhancedText;
  }

  // Store patient data securely (in-memory only, cleared on page refresh)
  storePatientData(sessionId: string, data: any) {
    this.patientData.set(sessionId, data);
  }

  // Retrieve patient data
  getPatientData(sessionId: string) {
    return this.patientData.get(sessionId);
  }

  // Clear patient data
  clearPatientData(sessionId: string) {
    this.patientData.delete(sessionId);
  }

  // Get all medical terms for a specific category
  getTermsByCategory(category: string): MedicalTerm[] {
    return this.medicalTerms.filter(term => term.category === category);
  }
}

export const medicalTerminologyService = new MedicalTerminologyService(); 