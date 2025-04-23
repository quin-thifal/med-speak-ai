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
        'ar': 'ارتفاع ضغط الدم',
        'ja': '高血圧'
      },
      description: "High blood pressure condition"
    },
    {
      term: "diabetes",
      category: "endocrine",
      translations: {
        'es': 'diabetes',
        'fr': 'diabète',
        'de': 'Diabetes',
        'zh': '糖尿病',
        'ar': 'مرض السكري',
        'ja': '糖尿病'
      },
      description: "Metabolic disorder affecting blood sugar levels"
    },
    {
      term: "pneumonia",
      category: "respiratory",
      translations: {
        'es': 'neumonía',
        'fr': 'pneumonie',
        'de': 'Lungenentzündung',
        'zh': '肺炎',
        'ar': 'الالتهاب الرئوي',
        'ja': '肺炎'
      },
      description: "Infection causing inflammation of the lungs"
    },
    {
      term: "arthritis",
      category: "musculoskeletal",
      translations: {
        'es': 'artritis',
        'fr': 'arthrite',
        'de': 'Arthritis',
        'zh': '关节炎',
        'ar': 'التهاب المفاصل',
        'ja': '関節炎'
      },
      description: "Inflammation of joints causing pain and stiffness"
    },
    {
      term: "gastritis",
      category: "digestive",
      translations: {
        'es': 'gastritis',
        'fr': 'gastrite',
        'de': 'Magenschleimhautentzündung',
        'zh': '胃炎',
        'ar': 'التهاب المعدة',
        'ja': '胃炎'
      },
      description: "Inflammation of the stomach lining"
    },
    {
      term: "bronchitis",
      category: "respiratory",
      translations: {
        'es': 'bronquitis',
        'fr': 'bronchite',
        'de': 'Bronchitis',
        'zh': '支气管炎',
        'ar': 'التهاب الشعب الهوائية',
        'ja': '気管支炎'
      },
      description: "Inflammation of the bronchial tubes"
    },
    {
      term: "migraine",
      category: "neurological",
      translations: {
        'es': 'migraña',
        'fr': 'migraine',
        'de': 'Migräne',
        'zh': '偏头痛',
        'ar': 'الصداع النصفي',
        'ja': '片頭痛'
      },
      description: "Severe recurring headache with additional symptoms"
    },
    {
      term: "anemia",
      category: "hematological",
      translations: {
        'es': 'anemia',
        'fr': 'anémie',
        'de': 'Anämie',
        'zh': '贫血',
        'ar': 'فقر الدم',
        'ja': '貧血'
      },
      description: "Condition with insufficient healthy red blood cells"
    },
    {
      term: "hypothyroidism",
      category: "endocrine",
      translations: {
        'es': 'hipotiroidismo',
        'fr': 'hypothyroïdie',
        'de': 'Hypothyreose',
        'zh': '甲状腺功能减退',
        'ar': 'قصور الغدة الدرقية',
        'ja': '甲状腺機能低下症'
      },
      description: "Underactive thyroid gland condition"
    },
    {
      term: "osteoporosis",
      category: "musculoskeletal",
      translations: {
        'es': 'osteoporosis',
        'fr': 'ostéoporose',
        'de': 'Osteoporose',
        'zh': '骨质疏松',
        'ar': 'هشاشة العظام',
        'ja': '骨粗しょう症'
      },
      description: "Condition where bones become weak and brittle"
    }
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

  // Get all available categories
  getCategories(): string[] {
    return Array.from(new Set(this.medicalTerms.map(term => term.category)));
  }
}

export const medicalTerminologyService = new MedicalTerminologyService(); 