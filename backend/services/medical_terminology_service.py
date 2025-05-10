from typing import Dict, List, Any, Optional
from dataclasses import dataclass
import re

@dataclass
class MedicalTerm:
    term: str
    category: str
    translations: Dict[str, str]
    description: str

class MedicalTerminologyService:
    def __init__(self):
        self.medical_terms: List[MedicalTerm] = [
            MedicalTerm(
                term="hypertension",
                category="cardiovascular",
                translations={
                    'es': 'hipertensión',
                    'fr': 'hypertension',
                    'de': 'Hypertonie',
                    'zh': '高血压',
                    'ar': 'ارتفاع ضغط الدم',
                    'ja': '高血圧',
                    'pt': 'hipertensão',
                    'ru': 'гипертония',
                    'hi': 'उच्च रक्तचाप',
                    'it': 'ipertensione',
                    'ko': '고혈압'
                },
                description="High blood pressure condition"
            ),
            MedicalTerm(
                term="diabetes",
                category="endocrine",
                translations={
                    'es': 'diabetes',
                    'fr': 'diabète',
                    'de': 'Diabetes',
                    'zh': '糖尿病',
                    'ar': 'مرض السكري',
                    'ja': '糖尿病',
                    'pt': 'diabetes',
                    'ru': 'диабет',
                    'hi': 'मधुमेह',
                    'it': 'diabete',
                    'ko': '당뇨병'
                },
                description="Metabolic disorder affecting blood sugar levels"
            ),
            MedicalTerm(
                term="pneumonia",
                category="respiratory",
                translations={
                    'es': 'neumonía',
                    'fr': 'pneumonie',
                    'de': 'Lungenentzündung',
                    'zh': '肺炎',
                    'ar': 'الالتهاب الرئوي',
                    'ja': '肺炎',
                    'pt': 'pneumonia',
                    'ru': 'пневмония',
                    'hi': 'निमोनिया',
                    'it': 'polmonite',
                    'ko': '폐렴'
                },
                description="Infection causing inflammation of the lungs"
            ),
            MedicalTerm(
                term="arthritis",
                category="musculoskeletal",
                translations={
                    'es': 'artritis',
                    'fr': 'arthrite',
                    'de': 'Arthritis',
                    'zh': '关节炎',
                    'ar': 'التهاب المفاصل',
                    'ja': '関節炎',
                    'pt': 'artrite',
                    'ru': 'артрит',
                    'hi': 'गठिया',
                    'it': 'artrite',
                    'ko': '관절염'
                },
                description="Inflammation of joints causing pain and stiffness"
            ),
            MedicalTerm(
                term="gastritis",
                category="digestive",
                translations={
                    'es': 'gastritis',
                    'fr': 'gastrite',
                    'de': 'Magenschleimhautentzündung',
                    'zh': '胃炎',
                    'ar': 'التهاب المعدة',
                    'ja': '胃炎',
                    'pt': 'gastrite',
                    'ru': 'гастрит',
                    'hi': 'गैस्ट्राइटिस',
                    'it': 'gastrite',
                    'ko': '위염'
                },
                description="Inflammation of the stomach lining"
            ),
            MedicalTerm(
                term="bronchitis",
                category="respiratory",
                translations={
                    'es': 'bronquitis',
                    'fr': 'bronchite',
                    'de': 'Bronchitis',
                    'zh': '支气管炎',
                    'ar': 'التهاب الشعب الهوائية',
                    'ja': '気管支炎',
                    'pt': 'bronquite',
                    'ru': 'бронхит',
                    'hi': 'ब्रोंकाइटिस',
                    'it': 'bronchite',
                    'ko': '기관지염'
                },
                description="Inflammation of the bronchial tubes"
            ),
            MedicalTerm(
                term="migraine",
                category="neurological",
                translations={
                    'es': 'migraña',
                    'fr': 'migraine',
                    'de': 'Migräne',
                    'zh': '偏头痛',
                    'ar': 'الصداع النصفي',
                    'ja': '片頭痛',
                    'pt': 'enxaqueca',
                    'ru': 'мигрень',
                    'hi': 'माइग्रेन',
                    'it': 'emicrania',
                    'ko': '편두통'
                },
                description="Severe recurring headache with additional symptoms"
            ),
            MedicalTerm(
                term="anemia",
                category="hematological",
                translations={
                    'es': 'anemia',
                    'fr': 'anémie',
                    'de': 'Anämie',
                    'zh': '贫血',
                    'ar': 'فقر الدم',
                    'ja': '貧血',
                    'pt': 'anemia',
                    'ru': 'анемия',
                    'hi': 'एनीमिया',
                    'it': 'anemia',
                    'ko': '빈혈'
                },
                description="Condition with insufficient healthy red blood cells"
            ),
            MedicalTerm(
                term="hypothyroidism",
                category="endocrine",
                translations={
                    'es': 'hipotiroidismo',
                    'fr': 'hypothyroïdie',
                    'de': 'Hypothyreose',
                    'zh': '甲状腺功能减退',
                    'ar': 'قصور الغدة الدرقية',
                    'ja': '甲状腺機能低下症',
                    'pt': 'hipotireoidismo',
                    'ru': 'гипотиреоз',
                    'hi': 'हाइपोथायरायडिज्म',
                    'it': 'ipotiroidismo',
                    'ko': '갑상선 기능 저하증'
                },
                description="Underactive thyroid gland condition"
            ),
            MedicalTerm(
                term="osteoporosis",
                category="musculoskeletal",
                translations={
                    'es': 'osteoporosis',
                    'fr': 'ostéoporose',
                    'de': 'Osteoporose',
                    'zh': '骨质疏松',
                    'ar': 'هشاشة العظام',
                    'ja': '骨粗しょう症',
                    'pt': 'osteoporose',
                    'ru': 'остеопороз',
                    'hi': 'ऑस्टियोपोरोसिस',
                    'it': 'osteoporosi',
                    'ko': '골다공증'
                },
                description="Condition where bones become weak and brittle"
            )
        ]
        self.patient_data: Dict[str, Any] = {}

    def enhance_translation(self, text: str, target_language: str) -> str:
        """Enhanced translation with medical terminology."""
        enhanced_text = text
        
        for term in self.medical_terms:
            pattern = rf'\b{term.term}\b'
            if re.search(pattern, text, re.IGNORECASE):
                translation = term.translations.get(target_language, term.term)
                enhanced_text = re.sub(
                    pattern,
                    f'<span class="medical-term" title="{term.description}">{translation}</span>',
                    enhanced_text,
                    flags=re.IGNORECASE
                )

        return enhanced_text

    def store_patient_data(self, session_id: str, data: Any) -> None:
        """Store patient data securely."""
        self.patient_data[session_id] = data

    def get_patient_data(self, session_id: str) -> Optional[Any]:
        """Retrieve patient data."""
        return self.patient_data.get(session_id)

    def clear_patient_data(self, session_id: str) -> None:
        """Clear patient data."""
        if session_id in self.patient_data:
            del self.patient_data[session_id]

    def get_terms_by_category(self, category: str) -> List[MedicalTerm]:
        """Get all medical terms for a specific category."""
        return [term for term in self.medical_terms if term.category == category]

    def get_categories(self) -> List[str]:
        """Get all available categories."""
        return list(set(term.category for term in self.medical_terms))

# Create a singleton instance
medical_terminology_service = MedicalTerminologyService() 