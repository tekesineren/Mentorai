import { ProfileFormData } from '../components/ProfileForm';
import { UniversityMatch } from '../components/MatchResults';
import { findProfessorsByResearchInterests, getProfessorsByUniversity, Professor } from './professorDatabase';
import { analyzeVisaHistory, getCountryRiskScore, shouldShowCountry, VisaRiskAssessment } from './visaAnalysis';

const sampleUniversities = [
  {
    id: '1',
    name: 'Massachusetts Institute of Technology',
    country: 'ABD',
    city: 'Cambridge',
    ranking_global: 1,
    website: 'https://www.mit.edu',
    tuition_min: 53790,
    tuition_max: 53790,
    living_cost_annual: 18000,
    visa_difficulty_score: 45,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 60,
    acceptance_rate: 3.95,
  },
  {
    id: '2',
    name: 'University of Oxford',
    country: 'İngiltere',
    city: 'Oxford',
    ranking_global: 2,
    website: 'https://www.ox.ac.uk',
    tuition_min: 30000,
    tuition_max: 45000,
    living_cost_annual: 15000,
    visa_difficulty_score: 30,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 6,
    residence_permit_ease_score: 70,
    acceptance_rate: 17.5,
  },
  {
    id: '3',
    name: 'Technical University of Munich',
    country: 'Almanya',
    city: 'München',
    ranking_global: 37,
    website: 'https://www.tum.de',
    tuition_min: 0,
    tuition_max: 500,
    living_cost_annual: 12000,
    visa_difficulty_score: 25,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 18,
    citizenship_pathway: true,
    citizenship_years: 8,
    residence_permit_ease_score: 85,
    acceptance_rate: 8,
  },
  {
    id: '4',
    name: 'University of Toronto',
    country: 'Kanada',
    city: 'Toronto',
    ranking_global: 21,
    website: 'https://www.utoronto.ca',
    tuition_min: 45000,
    tuition_max: 58000,
    living_cost_annual: 15000,
    visa_difficulty_score: 20,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 90,
    acceptance_rate: 43,
  },
  {
    id: '5',
    name: 'ETH Zurich',
    country: 'İsviçre',
    city: 'Zürich',
    ranking_global: 7,
    website: 'https://ethz.ch',
    tuition_min: 1200,
    tuition_max: 1500,
    living_cost_annual: 22000,
    visa_difficulty_score: 35,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 6,
    citizenship_pathway: true,
    citizenship_years: 10,
    residence_permit_ease_score: 65,
    acceptance_rate: 8,
  },
  {
    id: '6',
    name: 'National University of Singapore',
    country: 'Singapur',
    city: 'Singapore',
    ranking_global: 8,
    website: 'https://www.nus.edu.sg',
    tuition_min: 27000,
    tuition_max: 38000,
    living_cost_annual: 15000,
    visa_difficulty_score: 30,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 55,
    acceptance_rate: 5,
  },
  {
    id: '7',
    name: 'University of Melbourne',
    country: 'Avustralya',
    city: 'Melbourne',
    ranking_global: 14,
    website: 'https://www.unimelb.edu.au',
    tuition_min: 35000,
    tuition_max: 45000,
    living_cost_annual: 18000,
    visa_difficulty_score: 25,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 4,
    residence_permit_ease_score: 85,
    acceptance_rate: 70,
  },
  {
    id: '8',
    name: 'Delft University of Technology',
    country: 'Hollanda',
    city: 'Delft',
    ranking_global: 47,
    website: 'https://www.tudelft.nl',
    tuition_min: 15000,
    tuition_max: 20000,
    living_cost_annual: 13000,
    visa_difficulty_score: 22,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 88,
    acceptance_rate: 50,
  },
  {
    id: '9',
    name: 'College of DuPage (NJCAA)',
    country: 'ABD',
    city: 'Glen Ellyn, Illinois',
    ranking_global: 0,
    website: 'https://www.cod.edu',
    tuition_min: 12000,
    tuition_max: 18000,
    living_cost_annual: 15000,
    visa_difficulty_score: 40,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 85,
  },
  {
    id: '10',
    name: 'Santa Monica College (NJCAA)',
    country: 'ABD',
    city: 'Santa Monica, California',
    ranking_global: 0,
    website: 'https://www.smc.edu',
    tuition_min: 10000,
    tuition_max: 15000,
    living_cost_annual: 20000,
    visa_difficulty_score: 40,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 90,
  },
  {
    id: '11',
    name: 'Duke University (NCAA Division I)',
    country: 'ABD',
    city: 'Durham, North Carolina',
    ranking_global: 10,
    website: 'https://www.duke.edu',
    tuition_min: 60000,
    tuition_max: 62000,
    living_cost_annual: 17000,
    visa_difficulty_score: 40,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 6.2,
  },
  {
    id: '12',
    name: 'University of Michigan (NCAA Division I)',
    country: 'ABD',
    city: 'Ann Arbor, Michigan',
    ranking_global: 23,
    website: 'https://www.umich.edu',
    tuition_min: 52000,
    tuition_max: 56000,
    living_cost_annual: 16000,
    visa_difficulty_score: 38,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 18,
  },
  {
    id: '13',
    name: 'UCLA (NCAA Division I)',
    country: 'ABD',
    city: 'Los Angeles, California',
    ranking_global: 15,
    website: 'https://www.ucla.edu',
    tuition_min: 45000,
    tuition_max: 48000,
    living_cost_annual: 22000,
    visa_difficulty_score: 38,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 9,
  },
  {
    id: '14',
    name: 'Villanova University (NCAA Division I)',
    country: 'ABD',
    city: 'Villanova, Pennsylvania',
    ranking_global: 67,
    website: 'https://www.villanova.edu',
    tuition_min: 58000,
    tuition_max: 60000,
    living_cost_annual: 16000,
    visa_difficulty_score: 38,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 23,
  },
  {
    id: '15',
    name: 'Bentley University (NCAA Division II)',
    country: 'ABD',
    city: 'Waltham, Massachusetts',
    ranking_global: 0,
    website: 'https://www.bentley.edu',
    tuition_min: 54000,
    tuition_max: 56000,
    living_cost_annual: 18000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 58,
  },
  {
    id: '16',
    name: 'Grand Valley State University (NCAA Division II)',
    country: 'ABD',
    city: 'Allendale, Michigan',
    ranking_global: 0,
    website: 'https://www.gvsu.edu',
    tuition_min: 28000,
    tuition_max: 32000,
    living_cost_annual: 14000,
    visa_difficulty_score: 32,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 68,
    acceptance_rate: 75,
  },
  {
    id: '17',
    name: 'UC San Diego (NCAA Division II)',
    country: 'ABD',
    city: 'San Diego, California',
    ranking_global: 34,
    website: 'https://www.ucsd.edu',
    tuition_min: 44000,
    tuition_max: 47000,
    living_cost_annual: 20000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 31,
  },
  {
    id: '18',
    name: 'Williams College (NCAA Division III)',
    country: 'ABD',
    city: 'Williamstown, Massachusetts',
    ranking_global: 0,
    website: 'https://www.williams.edu',
    tuition_min: 60000,
    tuition_max: 62000,
    living_cost_annual: 16000,
    visa_difficulty_score: 38,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 8,
  },
  {
    id: '19',
    name: 'Amherst College (NCAA Division III)',
    country: 'ABD',
    city: 'Amherst, Massachusetts',
    ranking_global: 0,
    website: 'https://www.amherst.edu',
    tuition_min: 62000,
    tuition_max: 64000,
    living_cost_annual: 17000,
    visa_difficulty_score: 38,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 7,
  },
  {
    id: '20',
    name: 'University of Chicago (NCAA Division III)',
    country: 'ABD',
    city: 'Chicago, Illinois',
    ranking_global: 10,
    website: 'https://www.uchicago.edu',
    tuition_min: 62000,
    tuition_max: 64000,
    living_cost_annual: 18000,
    visa_difficulty_score: 40,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 65,
    acceptance_rate: 5.4,
  },
  {
    id: '21',
    name: 'Point Loma Nazarene University (NAIA)',
    country: 'ABD',
    city: 'San Diego, California',
    ranking_global: 0,
    website: 'https://www.pointloma.edu',
    tuition_min: 38000,
    tuition_max: 42000,
    living_cost_annual: 18000,
    visa_difficulty_score: 32,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 68,
    acceptance_rate: 72,
  },
  {
    id: '22',
    name: 'Olivet Nazarene University (NAIA)',
    country: 'ABD',
    city: 'Bourbonnais, Illinois',
    ranking_global: 0,
    website: 'https://www.olivet.edu',
    tuition_min: 35000,
    tuition_max: 38000,
    living_cost_annual: 14000,
    visa_difficulty_score: 30,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 70,
    acceptance_rate: 68,
  },
  {
    id: '23',
    name: 'Malone University (NAIA)',
    country: 'ABD',
    city: 'Canton, Ohio',
    ranking_global: 0,
    website: 'https://www.malone.edu',
    tuition_min: 32000,
    tuition_max: 36000,
    living_cost_annual: 12000,
    visa_difficulty_score: 28,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 72,
    acceptance_rate: 75,
  },
  {
    id: '24',
    name: 'Westmont College (NAIA)',
    country: 'ABD',
    city: 'Santa Barbara, California',
    ranking_global: 0,
    website: 'https://www.westmont.edu',
    tuition_min: 46000,
    tuition_max: 48000,
    living_cost_annual: 20000,
    visa_difficulty_score: 32,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 68,
    acceptance_rate: 64,
  },
  {
    id: '25',
    name: 'Tsinghua University',
    country: 'Çin',
    city: 'Beijing',
    ranking_global: 16,
    website: 'https://www.tsinghua.edu.cn',
    tuition_min: 3000,
    tuition_max: 5000,
    living_cost_annual: 8000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 45,
    acceptance_rate: 15,
  },
  {
    id: '26',
    name: 'Peking University',
    country: 'Çin',
    city: 'Beijing',
    ranking_global: 17,
    website: 'https://www.pku.edu.cn',
    tuition_min: 3500,
    tuition_max: 5500,
    living_cost_annual: 8000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 45,
    acceptance_rate: 16,
  },
  {
    id: '27',
    name: 'University of Tokyo',
    country: 'Japonya',
    city: 'Tokyo',
    ranking_global: 29,
    website: 'https://www.u-tokyo.ac.jp',
    tuition_min: 4800,
    tuition_max: 6000,
    living_cost_annual: 15000,
    visa_difficulty_score: 40,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 10,
    residence_permit_ease_score: 55,
    acceptance_rate: 35,
  },
  {
    id: '28',
    name: 'Kyoto University',
    country: 'Japonya',
    city: 'Kyoto',
    ranking_global: 46,
    website: 'https://www.kyoto-u.ac.jp',
    tuition_min: 4800,
    tuition_max: 6000,
    living_cost_annual: 13000,
    visa_difficulty_score: 40,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 10,
    residence_permit_ease_score: 55,
    acceptance_rate: 38,
  },
  {
    id: '29',
    name: 'Seoul National University',
    country: 'Güney Kore',
    city: 'Seoul',
    ranking_global: 41,
    website: 'https://www.snu.ac.kr',
    tuition_min: 4000,
    tuition_max: 6000,
    living_cost_annual: 12000,
    visa_difficulty_score: 30,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 70,
    acceptance_rate: 20,
  },
  {
    id: '30',
    name: 'KAIST',
    country: 'Güney Kore',
    city: 'Daejeon',
    ranking_global: 56,
    website: 'https://www.kaist.ac.kr',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 10000,
    visa_difficulty_score: 25,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 75,
    acceptance_rate: 15,
  },
  {
    id: '31',
    name: 'Nanyang Technological University',
    country: 'Singapur',
    city: 'Singapore',
    ranking_global: 26,
    website: 'https://www.ntu.edu.sg',
    tuition_min: 25000,
    tuition_max: 35000,
    living_cost_annual: 15000,
    visa_difficulty_score: 28,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 60,
    acceptance_rate: 8,
  },
  {
    id: '32',
    name: 'University of Hong Kong',
    country: 'Hong Kong',
    city: 'Hong Kong',
    ranking_global: 35,
    website: 'https://www.hku.hk',
    tuition_min: 18000,
    tuition_max: 22000,
    living_cost_annual: 18000,
    visa_difficulty_score: 25,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 65,
    acceptance_rate: 10,
  },
  {
    id: '33',
    name: 'Chinese University of Hong Kong',
    country: 'Hong Kong',
    city: 'Hong Kong',
    ranking_global: 47,
    website: 'https://www.cuhk.edu.hk',
    tuition_min: 17000,
    tuition_max: 21000,
    living_cost_annual: 17000,
    visa_difficulty_score: 25,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 65,
    acceptance_rate: 12,
  },
  {
    id: '34',
    name: 'National Taiwan University',
    country: 'Tayvan',
    city: 'Taipei',
    ranking_global: 69,
    website: 'https://www.ntu.edu.tw',
    tuition_min: 2500,
    tuition_max: 4000,
    living_cost_annual: 10000,
    visa_difficulty_score: 22,
    visa_success_rate: 93,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 75,
    acceptance_rate: 25,
  },
  {
    id: '35',
    name: 'University of Malaya',
    country: 'Malezya',
    city: 'Kuala Lumpur',
    ranking_global: 65,
    website: 'https://www.um.edu.my',
    tuition_min: 3000,
    tuition_max: 5000,
    living_cost_annual: 7000,
    visa_difficulty_score: 20,
    visa_success_rate: 95,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 70,
    acceptance_rate: 15,
  },
  {
    id: '36',
    name: 'Chulalongkorn University',
    country: 'Tayland',
    city: 'Bangkok',
    ranking_global: 211,
    website: 'https://www.chula.ac.th',
    tuition_min: 2000,
    tuition_max: 4000,
    living_cost_annual: 8000,
    visa_difficulty_score: 18,
    visa_success_rate: 96,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 60,
    acceptance_rate: 10,
  },
  {
    id: '37',
    name: 'Indian Institute of Technology Bombay',
    country: 'Hindistan',
    city: 'Mumbai',
    ranking_global: 149,
    website: 'https://www.iitb.ac.in',
    tuition_min: 1500,
    tuition_max: 2500,
    living_cost_annual: 5000,
    visa_difficulty_score: 25,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 50,
    acceptance_rate: 2,
  },
  {
    id: '38',
    name: 'Indian Institute of Science',
    country: 'Hindistan',
    city: 'Bangalore',
    ranking_global: 225,
    website: 'https://www.iisc.ac.in',
    tuition_min: 1200,
    tuition_max: 2000,
    living_cost_annual: 4500,
    visa_difficulty_score: 25,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 50,
    acceptance_rate: 5,
  },
  {
    id: '39',
    name: 'Tel Aviv University',
    country: 'İsrail',
    city: 'Tel Aviv',
    ranking_global: 198,
    website: 'https://www.tau.ac.il',
    tuition_min: 10000,
    tuition_max: 15000,
    living_cost_annual: 15000,
    visa_difficulty_score: 40,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 60,
    acceptance_rate: 45,
  },
  {
    id: '40',
    name: 'Hebrew University of Jerusalem',
    country: 'İsrail',
    city: 'Jerusalem',
    ranking_global: 184,
    website: 'https://www.huji.ac.il',
    tuition_min: 11000,
    tuition_max: 16000,
    living_cost_annual: 14000,
    visa_difficulty_score: 40,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 60,
    acceptance_rate: 40,
  },
  {
    id: '41',
    name: 'Khalifa University',
    country: 'BAE',
    city: 'Abu Dhabi',
    ranking_global: 181,
    website: 'https://www.ku.ac.ae',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 18000,
    visa_difficulty_score: 30,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 70,
    acceptance_rate: 25,
  },
  {
    id: '42',
    name: 'Qatar University',
    country: 'Katar',
    city: 'Doha',
    ranking_global: 276,
    website: 'https://www.qu.edu.qa',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 20000,
    visa_difficulty_score: 28,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 72,
    acceptance_rate: 40,
  },
  {
    id: '43',
    name: 'King Abdulaziz University',
    country: 'Suudi Arabistan',
    city: 'Jeddah',
    ranking_global: 106,
    website: 'https://www.kau.edu.sa',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 12000,
    visa_difficulty_score: 35,
    visa_success_rate: 82,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 40,
    acceptance_rate: 35,
  },
  {
    id: '44',
    name: 'American University of Beirut',
    country: 'Lübnan',
    city: 'Beirut',
    ranking_global: 226,
    website: 'https://www.aub.edu.lb',
    tuition_min: 20000,
    tuition_max: 25000,
    living_cost_annual: 10000,
    visa_difficulty_score: 45,
    visa_success_rate: 70,
    post_study_work_visa: true,
    work_visa_duration_months: 6,
    citizenship_pathway: false,
    citizenship_years: 0,
    residence_permit_ease_score: 45,
    acceptance_rate: 70,
  },
  {
    id: '45',
    name: 'University of Cambridge',
    country: 'İngiltere',
    city: 'Cambridge',
    ranking_global: 2,
    website: 'https://www.cam.ac.uk',
    tuition_min: 26000,
    tuition_max: 65000,
    living_cost_annual: 14000,
    visa_difficulty_score: 50,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 6,
    residence_permit_ease_score: 65,
    acceptance_rate: 21,
  },
  {
    id: '46',
    name: 'Imperial College London',
    country: 'İngiltere',
    city: 'London',
    ranking_global: 6,
    website: 'https://www.imperial.ac.uk',
    tuition_min: 35000,
    tuition_max: 55000,
    living_cost_annual: 18000,
    visa_difficulty_score: 50,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 6,
    residence_permit_ease_score: 65,
    acceptance_rate: 11,
  },
  {
    id: '47',
    name: 'ETH Zurich',
    country: 'İsviçre',
    city: 'Zurich',
    ranking_global: 7,
    website: 'https://ethz.ch',
    tuition_min: 1500,
    tuition_max: 1500,
    living_cost_annual: 25000,
    visa_difficulty_score: 45,
    visa_success_rate: 80,
    post_study_work_visa: true,
    work_visa_duration_months: 6,
    citizenship_pathway: true,
    citizenship_years: 10,
    residence_permit_ease_score: 55,
    acceptance_rate: 8,
  },
  {
    id: '48',
    name: 'UCL',
    country: 'İngiltere',
    city: 'London',
    ranking_global: 9,
    website: 'https://www.ucl.ac.uk',
    tuition_min: 24000,
    tuition_max: 50000,
    living_cost_annual: 18000,
    visa_difficulty_score: 50,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 6,
    residence_permit_ease_score: 65,
    acceptance_rate: 48,
  },
  {
    id: '49',
    name: 'University of Edinburgh',
    country: 'İngiltere',
    city: 'Edinburgh',
    ranking_global: 22,
    website: 'https://www.ed.ac.uk',
    tuition_min: 23000,
    tuition_max: 35000,
    living_cost_annual: 13000,
    visa_difficulty_score: 50,
    visa_success_rate: 75,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 6,
    residence_permit_ease_score: 65,
    acceptance_rate: 40,
  },
  {
    id: '50',
    name: 'Technical University of Munich',
    country: 'Almanya',
    city: 'Munich',
    ranking_global: 49,
    website: 'https://www.tum.de',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 11000,
    visa_difficulty_score: 40,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 18,
    citizenship_pathway: true,
    citizenship_years: 8,
    residence_permit_ease_score: 70,
    acceptance_rate: 8,
  },
  {
    id: '51',
    name: 'Ludwig Maximilian University of Munich',
    country: 'Almanya',
    city: 'Munich',
    ranking_global: 59,
    website: 'https://www.lmu.de',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 11000,
    visa_difficulty_score: 40,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 18,
    citizenship_pathway: true,
    citizenship_years: 8,
    residence_permit_ease_score: 70,
    acceptance_rate: 15,
  },
  {
    id: '52',
    name: 'Heidelberg University',
    country: 'Almanya',
    city: 'Heidelberg',
    ranking_global: 64,
    website: 'https://www.uni-heidelberg.de',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 10000,
    visa_difficulty_score: 40,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 18,
    citizenship_pathway: true,
    citizenship_years: 8,
    residence_permit_ease_score: 70,
    acceptance_rate: 12,
  },
  {
    id: '53',
    name: 'Sorbonne University',
    country: 'Fransa',
    city: 'Paris',
    ranking_global: 60,
    website: 'https://www.sorbonne-universite.fr',
    tuition_min: 200,
    tuition_max: 400,
    living_cost_annual: 15000,
    visa_difficulty_score: 35,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 75,
    acceptance_rate: 10,
  },
  {
    id: '54',
    name: 'University of Amsterdam',
    country: 'Hollanda',
    city: 'Amsterdam',
    ranking_global: 53,
    website: 'https://www.uva.nl',
    tuition_min: 10000,
    tuition_max: 18000,
    living_cost_annual: 14000,
    visa_difficulty_score: 30,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 80,
    acceptance_rate: 4,
  },
  {
    id: '55',
    name: 'Delft University of Technology',
    country: 'Hollanda',
    city: 'Delft',
    ranking_global: 47,
    website: 'https://www.tudelft.nl',
    tuition_min: 12000,
    tuition_max: 20000,
    living_cost_annual: 13000,
    visa_difficulty_score: 30,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 80,
    acceptance_rate: 5,
  },
  {
    id: '56',
    name: 'KU Leuven',
    country: 'Belçika',
    city: 'Leuven',
    ranking_global: 76,
    website: 'https://www.kuleuven.be',
    tuition_min: 1000,
    tuition_max: 8000,
    living_cost_annual: 11000,
    visa_difficulty_score: 35,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 75,
    acceptance_rate: 10,
  },
  {
    id: '57',
    name: 'University of Copenhagen',
    country: 'Danimarka',
    city: 'Copenhagen',
    ranking_global: 82,
    website: 'https://www.ku.dk',
    tuition_min: 0,
    tuition_max: 16000,
    living_cost_annual: 16000,
    visa_difficulty_score: 32,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 9,
    residence_permit_ease_score: 78,
    acceptance_rate: 25,
  },
  {
    id: '58',
    name: 'Uppsala University',
    country: 'İsveç',
    city: 'Uppsala',
    ranking_global: 117,
    website: 'https://www.uu.se',
    tuition_min: 0,
    tuition_max: 15000,
    living_cost_annual: 12000,
    visa_difficulty_score: 28,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 82,
    acceptance_rate: 45,
  },
  {
    id: '59',
    name: 'University of Oslo',
    country: 'Norveç',
    city: 'Oslo',
    ranking_global: 119,
    website: 'https://www.uio.no',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 18000,
    visa_difficulty_score: 30,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 7,
    residence_permit_ease_score: 80,
    acceptance_rate: 22,
  },
  {
    id: '60',
    name: 'University of Melbourne',
    country: 'Avustralya',
    city: 'Melbourne',
    ranking_global: 14,
    website: 'https://www.unimelb.edu.au',
    tuition_min: 30000,
    tuition_max: 50000,
    living_cost_annual: 20000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 4,
    residence_permit_ease_score: 75,
    acceptance_rate: 70,
  },
  {
    id: '61',
    name: 'Australian National University',
    country: 'Avustralya',
    city: 'Canberra',
    ranking_global: 34,
    website: 'https://www.anu.edu.au',
    tuition_min: 35000,
    tuition_max: 48000,
    living_cost_annual: 18000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 4,
    residence_permit_ease_score: 75,
    acceptance_rate: 35,
  },
  {
    id: '62',
    name: 'University of Sydney',
    country: 'Avustralya',
    city: 'Sydney',
    ranking_global: 19,
    website: 'https://www.sydney.edu.au',
    tuition_min: 32000,
    tuition_max: 52000,
    living_cost_annual: 22000,
    visa_difficulty_score: 35,
    visa_success_rate: 85,
    post_study_work_visa: true,
    work_visa_duration_months: 24,
    citizenship_pathway: true,
    citizenship_years: 4,
    residence_permit_ease_score: 75,
    acceptance_rate: 30,
  },
  {
    id: '63',
    name: 'University of Auckland',
    country: 'Yeni Zelanda',
    city: 'Auckland',
    ranking_global: 68,
    website: 'https://www.auckland.ac.nz',
    tuition_min: 25000,
    tuition_max: 38000,
    living_cost_annual: 15000,
    visa_difficulty_score: 30,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 80,
    acceptance_rate: 28,
  },
  {
    id: '64',
    name: 'University of Toronto',
    country: 'Kanada',
    city: 'Toronto',
    ranking_global: 21,
    website: 'https://www.utoronto.ca',
    tuition_min: 45000,
    tuition_max: 60000,
    living_cost_annual: 15000,
    visa_difficulty_score: 32,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 85,
    acceptance_rate: 43,
  },
  {
    id: '65',
    name: 'University of British Columbia',
    country: 'Kanada',
    city: 'Vancouver',
    ranking_global: 40,
    website: 'https://www.ubc.ca',
    tuition_min: 40000,
    tuition_max: 55000,
    living_cost_annual: 16000,
    visa_difficulty_score: 32,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 85,
    acceptance_rate: 52,
  },
  {
    id: '66',
    name: 'McGill University',
    country: 'Kanada',
    city: 'Montreal',
    ranking_global: 30,
    website: 'https://www.mcgill.ca',
    tuition_min: 20000,
    tuition_max: 45000,
    living_cost_annual: 13000,
    visa_difficulty_score: 32,
    visa_success_rate: 88,
    post_study_work_visa: true,
    work_visa_duration_months: 36,
    citizenship_pathway: true,
    citizenship_years: 3,
    residence_permit_ease_score: 85,
    acceptance_rate: 46,
  },
  {
    id: '67',
    name: 'Universidad de Buenos Aires',
    country: 'Arjantin',
    city: 'Buenos Aires',
    ranking_global: 67,
    website: 'https://www.uba.ar',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 8000,
    visa_difficulty_score: 25,
    visa_success_rate: 92,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 2,
    residence_permit_ease_score: 85,
    acceptance_rate: 80,
  },
  {
    id: '68',
    name: 'Universidade de São Paulo',
    country: 'Brezilya',
    city: 'São Paulo',
    ranking_global: 85,
    website: 'https://www5.usp.br',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 9000,
    visa_difficulty_score: 28,
    visa_success_rate: 90,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 4,
    residence_permit_ease_score: 75,
    acceptance_rate: 3,
  },
  {
    id: '69',
    name: 'Universidad Nacional Autónoma de México',
    country: 'Meksika',
    city: 'Mexico City',
    ranking_global: 105,
    website: 'https://www.unam.mx',
    tuition_min: 0,
    tuition_max: 0,
    living_cost_annual: 6000,
    visa_difficulty_score: 22,
    visa_success_rate: 94,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 2,
    residence_permit_ease_score: 80,
    acceptance_rate: 8,
  },
  {
    id: '70',
    name: 'Universidad de Chile',
    country: 'Şili',
    city: 'Santiago',
    ranking_global: 180,
    website: 'https://www.uchile.cl',
    tuition_min: 4000,
    tuition_max: 7000,
    living_cost_annual: 10000,
    visa_difficulty_score: 26,
    visa_success_rate: 91,
    post_study_work_visa: true,
    work_visa_duration_months: 12,
    citizenship_pathway: true,
    citizenship_years: 5,
    residence_permit_ease_score: 78,
    acceptance_rate: 25,
  },
];

const sampleScholarships = {
  '1': [
    { name: 'MIT Presidential Fellowship', type: 'academic', amount_max: 53790, why_eligible: '' },
    { name: 'MIT Athletic Scholarship', type: 'athletic', amount_max: 25000, why_eligible: '' },
  ],
  '2': [
    { name: 'Rhodes Scholarship', type: 'academic', amount_max: 45000, why_eligible: '' },
    { name: 'Clarendon Fund', type: 'academic', amount_max: 30000, why_eligible: '' },
  ],
  '3': [
    { name: 'DAAD Scholarship', type: 'country-specific', amount_max: 12000, why_eligible: '' },
    { name: 'TUM Excellence Scholarship', type: 'academic', amount_max: 6000, why_eligible: '' },
  ],
  '4': [
    { name: 'Lester B. Pearson Scholarship', type: 'academic', amount_max: 58000, why_eligible: '' },
    { name: 'Ontario Graduate Scholarship', type: 'academic', amount_max: 15000, why_eligible: '' },
  ],
  '5': [
    { name: 'ETH Excellence Scholarship', type: 'academic', amount_max: 15000, why_eligible: '' },
  ],
  '6': [
    { name: 'NUS Global Merit Scholarship', type: 'academic', amount_max: 38000, why_eligible: '' },
    { name: 'ASEAN Undergraduate Scholarship', type: 'country-specific', amount_max: 20000, why_eligible: '' },
  ],
  '7': [
    { name: 'Melbourne International Scholarship', type: 'academic', amount_max: 45000, why_eligible: '' },
    { name: 'Australia Awards Scholarship', type: 'country-specific', amount_max: 35000, why_eligible: '' },
  ],
  '8': [
    { name: 'Justus & Louise van Effen Excellence Scholarship', type: 'academic', amount_max: 20000, why_eligible: '' },
    { name: 'Holland Scholarship', type: 'country-specific', amount_max: 5000, why_eligible: '' },
  ],
  '9': [
    { name: 'NJCAA Athletic Scholarship', type: 'athletic', amount_max: 18000, why_eligible: '' },
    { name: 'Community College Transfer Scholarship', type: 'academic', amount_max: 8000, why_eligible: '' },
  ],
  '10': [
    { name: 'NJCAA Division I Athletic Scholarship', type: 'athletic', amount_max: 20000, why_eligible: '' },
    { name: 'Santa Monica College Excellence Award', type: 'academic', amount_max: 5000, why_eligible: '' },
  ],
  '11': [
    { name: 'Duke University Athletic Scholarship (NCAA D1)', type: 'athletic', amount_max: 62000, why_eligible: '' },
    { name: 'Duke Robertson Scholars Program', type: 'academic', amount_max: 62000, why_eligible: '' },
    { name: 'Duke University Merit Scholarship', type: 'academic', amount_max: 40000, why_eligible: '' },
  ],
  '12': [
    { name: 'Michigan Athletic Scholarship (NCAA D1)', type: 'athletic', amount_max: 56000, why_eligible: '' },
    { name: 'Michigan Regent Merit Scholarship', type: 'academic', amount_max: 30000, why_eligible: '' },
    { name: 'Michigan International Student Scholarship', type: 'country-specific', amount_max: 25000, why_eligible: '' },
  ],
  '13': [
    { name: 'UCLA Athletic Scholarship (NCAA D1)', type: 'athletic', amount_max: 48000, why_eligible: '' },
    { name: 'UCLA Regents Scholarship', type: 'academic', amount_max: 48000, why_eligible: '' },
    { name: 'UCLA Alumni Scholarship', type: 'academic', amount_max: 20000, why_eligible: '' },
  ],
  '14': [
    { name: 'Villanova Athletic Scholarship (NCAA D1)', type: 'athletic', amount_max: 60000, why_eligible: '' },
    { name: 'Villanova Presidential Scholarship', type: 'academic', amount_max: 40000, why_eligible: '' },
  ],
  '15': [
    { name: 'Bentley Athletic Scholarship (NCAA D2)', type: 'athletic', amount_max: 35000, why_eligible: '' },
    { name: 'Bentley Presidential Scholarship', type: 'academic', amount_max: 30000, why_eligible: '' },
  ],
  '16': [
    { name: 'GVSU Athletic Scholarship (NCAA D2)', type: 'athletic', amount_max: 25000, why_eligible: '' },
    { name: 'Grand Valley Merit Scholarship', type: 'academic', amount_max: 15000, why_eligible: '' },
  ],
  '17': [
    { name: 'UCSD Athletic Scholarship (NCAA D2)', type: 'athletic', amount_max: 30000, why_eligible: '' },
    { name: 'UCSD Chancellor Scholarship', type: 'academic', amount_max: 35000, why_eligible: '' },
  ],
  '18': [
    { name: 'Williams College Need-Based Aid', type: 'need-based', amount_max: 62000, why_eligible: '' },
    { name: 'Williams Merit Recognition', type: 'academic', amount_max: 25000, why_eligible: '' },
  ],
  '19': [
    { name: 'Amherst College Financial Aid', type: 'need-based', amount_max: 64000, why_eligible: '' },
    { name: 'Amherst Merit Award', type: 'academic', amount_max: 30000, why_eligible: '' },
  ],
  '20': [
    { name: 'UChicago Merit Scholarship', type: 'academic', amount_max: 40000, why_eligible: '' },
    { name: 'UChicago Odyssey Scholarship', type: 'need-based', amount_max: 50000, why_eligible: '' },
  ],
  '21': [
    { name: 'Point Loma NAIA Athletic Scholarship', type: 'athletic', amount_max: 30000, why_eligible: '' },
    { name: 'Point Loma Presidential Scholarship', type: 'academic', amount_max: 20000, why_eligible: '' },
  ],
  '22': [
    { name: 'Olivet NAIA Athletic Scholarship', type: 'athletic', amount_max: 28000, why_eligible: '' },
    { name: 'Olivet Academic Excellence Award', type: 'academic', amount_max: 18000, why_eligible: '' },
  ],
  '23': [
    { name: 'Malone NAIA Athletic Scholarship', type: 'athletic', amount_max: 26000, why_eligible: '' },
    { name: 'Malone Presidential Scholarship', type: 'academic', amount_max: 16000, why_eligible: '' },
  ],
  '24': [
    { name: 'Westmont NAIA Athletic Scholarship', type: 'athletic', amount_max: 32000, why_eligible: '' },
    { name: 'Westmont Merit Scholarship', type: 'academic', amount_max: 22000, why_eligible: '' },
  ],
  '25': [
    { name: 'Tsinghua University Scholarship', type: 'academic', amount_max: 5000, why_eligible: '' },
    { name: 'Chinese Government Scholarship', type: 'country-specific', amount_max: 7000, why_eligible: '' },
  ],
  '26': [
    { name: 'Peking University Excellence Scholarship', type: 'academic', amount_max: 5500, why_eligible: '' },
    { name: 'Chinese Government Scholarship', type: 'country-specific', amount_max: 7000, why_eligible: '' },
  ],
  '27': [
    { name: 'MEXT Scholarship (Japanese Government)', type: 'country-specific', amount_max: 20000, why_eligible: '' },
    { name: 'University of Tokyo Fellowship', type: 'academic', amount_max: 6000, why_eligible: '' },
  ],
  '28': [
    { name: 'MEXT Scholarship (Japanese Government)', type: 'country-specific', amount_max: 20000, why_eligible: '' },
    { name: 'Kyoto University Scholarship', type: 'academic', amount_max: 6000, why_eligible: '' },
  ],
  '29': [
    { name: 'Korean Government Scholarship (KGSP)', type: 'country-specific', amount_max: 18000, why_eligible: '' },
    { name: 'SNU Global Scholarship', type: 'academic', amount_max: 10000, why_eligible: '' },
  ],
  '30': [
    { name: 'KAIST Full Scholarship', type: 'academic', amount_max: 10000, why_eligible: '' },
    { name: 'Korean Government Scholarship (KGSP)', type: 'country-specific', amount_max: 18000, why_eligible: '' },
  ],
  '31': [
    { name: 'NTU Scholarship', type: 'academic', amount_max: 35000, why_eligible: '' },
    { name: 'Singapore Government Scholarship', type: 'country-specific', amount_max: 30000, why_eligible: '' },
  ],
  '32': [
    { name: 'HKU Entrance Scholarship', type: 'academic', amount_max: 22000, why_eligible: '' },
    { name: 'Hong Kong Government Scholarship', type: 'country-specific', amount_max: 15000, why_eligible: '' },
  ],
  '33': [
    { name: 'CUHK Scholarship', type: 'academic', amount_max: 21000, why_eligible: '' },
    { name: 'Hong Kong Government Scholarship', type: 'country-specific', amount_max: 15000, why_eligible: '' },
  ],
  '34': [
    { name: 'Taiwan Government Scholarship', type: 'country-specific', amount_max: 12000, why_eligible: '' },
    { name: 'NTU Merit Scholarship', type: 'academic', amount_max: 4000, why_eligible: '' },
  ],
  '35': [
    { name: 'University of Malaya Scholarship', type: 'academic', amount_max: 5000, why_eligible: '' },
    { name: 'Malaysian Government Scholarship', type: 'country-specific', amount_max: 8000, why_eligible: '' },
  ],
  '36': [
    { name: 'Chulalongkorn Scholarship', type: 'academic', amount_max: 4000, why_eligible: '' },
    { name: 'Thai Government Scholarship', type: 'country-specific', amount_max: 6000, why_eligible: '' },
  ],
  '37': [
    { name: 'IIT Bombay Fellowship', type: 'academic', amount_max: 2500, why_eligible: '' },
    { name: 'ICCR Scholarship (Indian Government)', type: 'country-specific', amount_max: 3000, why_eligible: '' },
  ],
  '38': [
    { name: 'IISc Research Fellowship', type: 'academic', amount_max: 2000, why_eligible: '' },
    { name: 'ICCR Scholarship (Indian Government)', type: 'country-specific', amount_max: 3000, why_eligible: '' },
  ],
  '39': [
    { name: 'Tel Aviv University Scholarship', type: 'academic', amount_max: 10000, why_eligible: '' },
    { name: 'Israeli Government Scholarship', type: 'country-specific', amount_max: 8000, why_eligible: '' },
  ],
  '40': [
    { name: 'Hebrew University Scholarship', type: 'academic', amount_max: 12000, why_eligible: '' },
    { name: 'Rothschild Fellowship', type: 'academic', amount_max: 15000, why_eligible: '' },
  ],
  '41': [
    { name: 'Khalifa University Full Scholarship', type: 'academic', amount_max: 18000, why_eligible: '' },
  ],
  '42': [
    { name: 'Qatar University Full Scholarship', type: 'academic', amount_max: 20000, why_eligible: '' },
  ],
  '43': [
    { name: 'King Abdulaziz University Scholarship', type: 'academic', amount_max: 12000, why_eligible: '' },
  ],
  '44': [
    { name: 'AUB Merit Scholarship', type: 'academic', amount_max: 15000, why_eligible: '' },
    { name: 'AUB Need-Based Aid', type: 'need-based', amount_max: 20000, why_eligible: '' },
  ],
  '45': [
    { name: 'Cambridge Trust Scholarship', type: 'academic', amount_max: 65000, why_eligible: '' },
    { name: 'Gates Cambridge Scholarship', type: 'academic', amount_max: 65000, why_eligible: '' },
  ],
  '46': [
    { name: 'Imperial College PhD Scholarship', type: 'academic', amount_max: 55000, why_eligible: '' },
    { name: 'President\'s Scholarship', type: 'academic', amount_max: 40000, why_eligible: '' },
  ],
  '47': [
    { name: 'ETH Excellence Scholarship', type: 'academic', amount_max: 12000, why_eligible: '' },
    { name: 'Swiss Government Excellence Scholarship', type: 'country-specific', amount_max: 20000, why_eligible: '' },
  ],
  '48': [
    { name: 'UCL Global Undergraduate Scholarship', type: 'academic', amount_max: 30000, why_eligible: '' },
    { name: 'Chevening Scholarship', type: 'country-specific', amount_max: 50000, why_eligible: '' },
  ],
  '49': [
    { name: 'Edinburgh Global Scholarship', type: 'academic', amount_max: 25000, why_eligible: '' },
    { name: 'Chevening Scholarship', type: 'country-specific', amount_max: 35000, why_eligible: '' },
  ],
  '50': [
    { name: 'TUM University Foundation Scholarship', type: 'academic', amount_max: 11000, why_eligible: '' },
    { name: 'DAAD Scholarship', type: 'country-specific', amount_max: 15000, why_eligible: '' },
  ],
  '51': [
    { name: 'LMU Scholarship', type: 'academic', amount_max: 11000, why_eligible: '' },
    { name: 'DAAD Scholarship', type: 'country-specific', amount_max: 15000, why_eligible: '' },
  ],
  '52': [
    { name: 'Heidelberg University Scholarship', type: 'academic', amount_max: 10000, why_eligible: '' },
    { name: 'DAAD Scholarship', type: 'country-specific', amount_max: 15000, why_eligible: '' },
  ],
  '53': [
    { name: 'Sorbonne Excellence Scholarship', type: 'academic', amount_max: 10000, why_eligible: '' },
    { name: 'Eiffel Excellence Scholarship', type: 'country-specific', amount_max: 15000, why_eligible: '' },
  ],
  '54': [
    { name: 'Amsterdam Excellence Scholarship', type: 'academic', amount_max: 18000, why_eligible: '' },
    { name: 'Holland Scholarship', type: 'country-specific', amount_max: 5000, why_eligible: '' },
  ],
  '55': [
    { name: 'Delft Excellence Scholarship', type: 'academic', amount_max: 20000, why_eligible: '' },
    { name: 'Holland Scholarship', type: 'country-specific', amount_max: 5000, why_eligible: '' },
  ],
  '56': [
    { name: 'KU Leuven Scholarship', type: 'academic', amount_max: 8000, why_eligible: '' },
    { name: 'Belgian Government Scholarship', type: 'country-specific', amount_max: 10000, why_eligible: '' },
  ],
  '57': [
    { name: 'Copenhagen University Scholarship', type: 'academic', amount_max: 16000, why_eligible: '' },
    { name: 'Danish Government Scholarship', type: 'country-specific', amount_max: 18000, why_eligible: '' },
  ],
  '58': [
    { name: 'Uppsala IPK Scholarship', type: 'academic', amount_max: 15000, why_eligible: '' },
    { name: 'Swedish Institute Scholarship', type: 'country-specific', amount_max: 18000, why_eligible: '' },
  ],
  '59': [
    { name: 'University of Oslo Scholarship', type: 'academic', amount_max: 18000, why_eligible: '' },
    { name: 'Norwegian Government Scholarship', type: 'country-specific', amount_max: 20000, why_eligible: '' },
  ],
  '60': [
    { name: 'Melbourne Graduate Scholarship', type: 'academic', amount_max: 50000, why_eligible: '' },
    { name: 'Australia Awards Scholarship', type: 'country-specific', amount_max: 45000, why_eligible: '' },
  ],
  '61': [
    { name: 'ANU Chancellor\'s Scholarship', type: 'academic', amount_max: 48000, why_eligible: '' },
    { name: 'Australia Awards Scholarship', type: 'country-specific', amount_max: 45000, why_eligible: '' },
  ],
  '62': [
    { name: 'Sydney Scholars Award', type: 'academic', amount_max: 40000, why_eligible: '' },
    { name: 'Australia Awards Scholarship', type: 'country-specific', amount_max: 45000, why_eligible: '' },
  ],
  '63': [
    { name: 'University of Auckland Scholarship', type: 'academic', amount_max: 30000, why_eligible: '' },
    { name: 'New Zealand Government Scholarship', type: 'country-specific', amount_max: 25000, why_eligible: '' },
  ],
  '64': [
    { name: 'Lester B. Pearson Scholarship', type: 'academic', amount_max: 60000, why_eligible: '' },
    { name: 'Ontario Graduate Scholarship', type: 'academic', amount_max: 15000, why_eligible: '' },
  ],
  '65': [
    { name: 'UBC International Scholar Award', type: 'academic', amount_max: 40000, why_eligible: '' },
    { name: 'Vanier Canada Graduate Scholarship', type: 'country-specific', amount_max: 50000, why_eligible: '' },
  ],
  '66': [
    { name: 'McGill Entrance Scholarship', type: 'academic', amount_max: 30000, why_eligible: '' },
    { name: 'Vanier Canada Graduate Scholarship', type: 'country-specific', amount_max: 50000, why_eligible: '' },
  ],
  '67': [
    { name: 'UBA Full Scholarship', type: 'academic', amount_max: 8000, why_eligible: '' },
    { name: 'Argentine Government Scholarship', type: 'country-specific', amount_max: 10000, why_eligible: '' },
  ],
  '68': [
    { name: 'USP Merit Scholarship', type: 'academic', amount_max: 9000, why_eligible: '' },
    { name: 'Brazilian Government Scholarship', type: 'country-specific', amount_max: 12000, why_eligible: '' },
  ],
  '69': [
    { name: 'UNAM Full Scholarship', type: 'academic', amount_max: 6000, why_eligible: '' },
    { name: 'Mexican Government Scholarship', type: 'country-specific', amount_max: 8000, why_eligible: '' },
  ],
  '70': [
    { name: 'Universidad de Chile Scholarship', type: 'academic', amount_max: 7000, why_eligible: '' },
    { name: 'Chilean Government Scholarship', type: 'country-specific', amount_max: 10000, why_eligible: '' },
  ],
};

export function calculateMatches(profileData: ProfileFormData): UniversityMatch[] {
  const gpa = parseFloat(profileData.gpa) || 0;
  const budget = parseFloat(profileData.annual_budget) || 0;
  const targetDegree = profileData.target_degree_level;
  const researchInterests = profileData.career_goals?.research_interests || [];

  const relevantProfessors = findProfessorsByResearchInterests(researchInterests);

  const visaAssessments = analyzeVisaHistory(
    profileData.visa_history?.rejections || [],
    profileData.visa_history?.family_legal_history
  );

  const matches: UniversityMatch[] = sampleUniversities
    .filter(uni => shouldShowCountry(uni.country, visaAssessments))
    .map((uni) => {
      const degreeInfo = getDegreeInfo(uni, targetDegree);
      const academicScore = calculateAcademicScore(gpa, profileData, uni, targetDegree);
      const financialScore = calculateFinancialScore(budget, uni);

      let visaScore = 100 - uni.visa_difficulty_score;
      const visaRiskPenalty = getCountryRiskScore(uni.country, visaAssessments);
      visaScore = Math.max(0, visaScore + visaRiskPenalty);

      const scholarshipScore = calculateScholarshipScore(profileData, uni);
      const postGradScore = calculatePostGraduationScore(uni);

      const universityProfessors = getProfessorsByUniversity(uni.id);
      const matchedProfessors = universityProfessors.filter(prof =>
        relevantProfessors.some(rp => rp.id === prof.id)
      );

      const professorBonus = matchedProfessors.length > 0 ? 10 : 0;

      const overallScore = (
        academicScore * 0.25 +
        financialScore * 0.25 +
        visaScore * 0.2 +
        scholarshipScore * 0.15 +
        postGradScore * 0.15
      ) + professorBonus;

      const totalCost = uni.tuition_max + uni.living_cost_annual;
      const scholarshipAmount = calculateScholarshipAmount(profileData, uni, scholarshipScore);

      const scholarships = (sampleScholarships[uni.id as keyof typeof sampleScholarships] || []).map(sch => ({
        ...sch,
        why_eligible: generateScholarshipEligibility(profileData, sch.type, uni)
      }));

      const countryVisaAssessment = visaAssessments.get(uni.country);

      return {
        university: {
          id: uni.id,
          name: uni.name,
          country: uni.country,
          city: uni.city,
          ranking_global: uni.ranking_global,
          website: uni.website,
        },
        match: {
          overall_match_score: Math.min(100, Math.round(overallScore)),
          academic_match_score: Math.round(academicScore),
          financial_match_score: Math.round(financialScore),
          visa_match_score: Math.round(visaScore),
          scholarship_potential_score: Math.round(scholarshipScore),
          post_graduation_score: Math.round(postGradScore),
          estimated_total_cost: totalCost,
          estimated_scholarship_amount: scholarshipAmount,
          visa_difficulty_assessment: getVisaAssessment(uni),
          post_graduation_opportunities: getPostGradOpportunities(uni),
          match_reasoning: getMatchReasoning(profileData, uni, academicScore, financialScore, targetDegree, degreeInfo),
          degree_info: degreeInfo,
          notable_professors: matchedProfessors,
          visa_risk_assessment: countryVisaAssessment,
        },
        scholarships: scholarships.filter(() => scholarshipScore > 50),
      };
    });

  return matches.sort((a, b) => b.match.academic_match_score - a.match.academic_match_score);
}

function getDegreeInfo(uni: any, targetDegree: string) {
  const durations: Record<string, number> = {
    bachelor: 4,
    master: 2,
    doctorate: 5,
  };

  const durationYears = durations[targetDegree] || 4;

  let tuitionAdjustment = 1;
  if (targetDegree === 'master') tuitionAdjustment = 1.1;
  if (targetDegree === 'doctorate') tuitionAdjustment = 0.5;

  return {
    degree_type: targetDegree,
    duration_years: durationYears,
    estimated_tuition_min: Math.round(uni.tuition_min * tuitionAdjustment),
    estimated_tuition_max: Math.round(uni.tuition_max * tuitionAdjustment),
  };
}

function calculateAcademicScore(gpa: number, profile: ProfileFormData, uni: any, targetDegree: string): number {
  let score = 0;

  if (gpa >= 3.7) score += 90;
  else if (gpa >= 3.3) score += 75;
  else if (gpa >= 3.0) score += 60;
  else if (gpa >= 2.5) score += 40;
  else score += 20;

  if (targetDegree === 'master' || targetDegree === 'doctorate') {
    if (profile.test_scores.gre && parseInt(profile.test_scores.gre) >= 320) score += 10;
    if (profile.work_experience.length > 0 && profile.work_experience[0].title) score += 5;
  } else {
    if (profile.test_scores.sat && parseInt(profile.test_scores.sat) >= 1400) score += 10;
  }

  if (profile.test_scores.toefl && parseInt(profile.test_scores.toefl) >= 100) score += 5;
  if (profile.test_scores.ielts && parseFloat(profile.test_scores.ielts) >= 7.0) score += 5;

  if (uni.acceptance_rate > 40) score += 10;
  else if (uni.acceptance_rate < 10) score -= 10;

  return Math.min(100, score);
}

function calculateFinancialScore(budget: number, uni: any): number {
  const totalCost = uni.tuition_max + uni.living_cost_annual;

  if (budget >= totalCost * 1.2) return 100;
  if (budget >= totalCost) return 85;
  if (budget >= totalCost * 0.8) return 70;
  if (budget >= totalCost * 0.6) return 50;
  if (budget >= totalCost * 0.4) return 30;
  return 10;
}

function calculateScholarshipScore(profile: ProfileFormData, uni: any): number {
  let score = 0;
  const gpa = parseFloat(profile.gpa) || 0;

  if (gpa >= 3.7) score += 40;
  else if (gpa >= 3.3) score += 25;
  else score += 10;

  if (profile.sports_detailed.length > 0 && profile.sports_detailed[0].sport) {
    const topSport = profile.sports_detailed[0];
    if (['national', 'international'].includes(topSport.level)) {
      score += 35;
    } else if (['varsity', 'regional'].includes(topSport.level)) {
      score += 25;
    } else if (['club', 'high_school'].includes(topSport.level)) {
      score += 15;
    } else {
      score += 10;
    }

    if (topSport.achievements && topSport.achievements.length > 10) {
      score += 10;
    }
  }

  if (profile.extracurricular.arts.length > 0 && profile.extracurricular.arts[0]) {
    score += 15;
  }

  if (profile.achievements.length > 1 && profile.achievements[0].title) {
    score += 25;
  }

  return Math.min(100, score);
}

function calculatePostGraduationScore(uni: any): number {
  let score = 0;

  if (uni.post_study_work_visa) score += 30;

  if (uni.work_visa_duration_months >= 36) score += 30;
  else if (uni.work_visa_duration_months >= 24) score += 20;
  else if (uni.work_visa_duration_months >= 12) score += 10;

  if (uni.citizenship_pathway) score += 20;

  if (uni.citizenship_years <= 3) score += 20;
  else if (uni.citizenship_years <= 5) score += 15;
  else if (uni.citizenship_years <= 8) score += 10;

  return Math.min(100, score);
}

function calculateScholarshipAmount(profile: ProfileFormData, uni: any, scholarshipScore: number): number {
  if (scholarshipScore < 50) return 0;

  const gpa = parseFloat(profile.gpa) || 0;
  const totalCost = uni.tuition_max + uni.living_cost_annual;

  if (gpa >= 3.8 && scholarshipScore >= 80) return totalCost * 0.8;
  if (gpa >= 3.5 && scholarshipScore >= 70) return totalCost * 0.5;
  if (gpa >= 3.3 && scholarshipScore >= 60) return totalCost * 0.3;
  if (scholarshipScore >= 50) return totalCost * 0.15;

  return 0;
}

function getVisaAssessment(uni: any): string {
  const difficulty = uni.visa_difficulty_score;
  const successRate = uni.visa_success_rate;

  if (difficulty < 25) {
    return `${uni.country} öğrenci vizesi süreci oldukça kolaydır. Başvuru süreci şeffaf ve başarı oranı %${successRate} gibi yüksek bir seviyededir. Gerekli evrakları eksiksiz sunduğunuzda vize almanız çok olasıdır.`;
  } else if (difficulty < 40) {
    return `${uni.country} öğrenci vizesi için orta zorlukta bir süreç bekleyebilirsiniz. %${successRate} başarı oranı ile makul bir onay şansınız var. Mali yeterlilik ve kabul mektubu önemlidir.`;
  } else {
    return `${uni.country} öğrenci vizesi süreci zorlu olabilir. %${successRate} başarı oranı ile dikkatlice hazırlanmanız gerekir. Mülakat hazırlığı, güçlü mali kanıt ve açık bir niyet mektubu kritik önem taşır.`;
  }
}

function getPostGradOpportunities(uni: any): string {
  let text = '';

  if (uni.post_study_work_visa) {
    text += `Mezuniyet sonrası ${uni.work_visa_duration_months} ay süreyle çalışma izni alabilirsiniz. `;
  } else {
    text += 'Mezuniyet sonrası doğrudan çalışma izni bulunmamaktadır. ';
  }

  if (uni.citizenship_pathway) {
    text += `${uni.citizenship_years} yıl sonra vatandaşlık başvurusu yapma şansınız var. `;
    text += `Oturma izni süreci ${uni.residence_permit_ease_score > 75 ? 'oldukça kolay' : uni.residence_permit_ease_score > 50 ? 'orta zorlukta' : 'zor'} olarak değerlendiriliyor.`;
  } else {
    text += 'Vatandaşlık yolu sınırlı veya çok uzun süreçlidir.';
  }

  return text;
}

function getMatchReasoning(profile: ProfileFormData, uni: any, academicScore: number, financialScore: number, targetDegree: string, degreeInfo: any): string {
  const gpa = parseFloat(profile.gpa) || 0;
  const budget = parseFloat(profile.annual_budget) || 0;
  const totalCost = uni.tuition_max + uni.living_cost_annual;

  let reasoning = '';

  const degreeNames: Record<string, string> = {
    bachelor: 'Lisans',
    master: 'Yüksek Lisans',
    doctorate: 'Doktora'
  };
  reasoning += `${degreeNames[targetDegree] || 'Lisans'} programı için (${degreeInfo.duration_years} yıl): `;

  if (targetDegree === 'master') {
    if (profile.work_experience.length > 0 && profile.work_experience[0].title) {
      reasoning += 'İş deneyiminiz yüksek lisans başvurunuz için güçlü bir artı. ';
    }
    if (profile.test_scores.gre) {
      reasoning += `GRE skorunuz (${profile.test_scores.gre}) başvurunuzu destekliyor. `;
    }
  } else if (targetDegree === 'doctorate') {
    reasoning += 'Doktora programları genellikle tam burs veya araştırma asistanlığı imkanları sunar. ';
    if (profile.work_experience.length > 0) {
      reasoning += 'Araştırma deneyiminiz önemli bir avantaj. ';
    }
  }

  if (academicScore >= 80) {
    reasoning += 'Akademik profiliniz bu üniversitenin standartlarını karşılıyor ve rekabetçi bir aday profiline sahipsiniz. ';
  } else if (academicScore >= 60) {
    reasoning += 'Akademik profiliniz üniversitenin gereksinimlerini büyük ölçüde karşılıyor. ';
  } else {
    reasoning += 'Akademik profilinizi güçlendirmeniz başvuru şansınızı artırabilir. ';
  }

  if (financialScore >= 70) {
    reasoning += 'Bütçeniz bu üniversite için uygun görünüyor. ';
  } else {
    reasoning += `Yıllık maliyet yaklaşık $${totalCost.toLocaleString()} olup, burs fırsatlarını değerlendirmeniz önerilir. `;
  }

  if (profile.sports_detailed.length > 0 && profile.sports_detailed[0].sport) {
    reasoning += 'Spor geçmişiniz burs başvurularınızı güçlendirebilir. ';
  }

  if (profile.extracurricular.arts.length > 0 && profile.extracurricular.arts[0]) {
    reasoning += 'Sanatsal aktiviteleriniz çeşitlilik ve yaratıcılık açısından artı değer oluşturuyor. ';
  }

  return reasoning.trim();
}

function generateScholarshipEligibility(profile: ProfileFormData, scholarshipType: string, uni: any): string {
  const gpa = parseFloat(profile.gpa) || 0;
  const hasSports = profile.sports_detailed.length > 0 && profile.sports_detailed[0].sport;
  const hasHighLevelSports = profile.sports_detailed.some(s =>
    ['varsity', 'regional', 'national', 'international'].includes(s.level)
  );
  const hasArts = profile.extracurricular.arts.length > 0 && profile.extracurricular.arts[0];
  const hasAchievements = profile.achievements.length > 0 && profile.achievements[0].title;

  switch (scholarshipType) {
    case 'academic':
      if (gpa >= 3.7) {
        return `${gpa.toFixed(2)} GPA'niz bu burs için mükemmel bir profil oluşturuyor. ${profile.test_scores.sat ? `SAT skorunuz (${profile.test_scores.sat})` : 'Standardize test skorlarınız'} akademik başarınızı destekliyor. ${hasAchievements ? 'Başarı ve ödülleriniz başvurunuzu öne çıkaracaktır.' : ''}`;
      } else if (gpa >= 3.3) {
        return `${gpa.toFixed(2)} GPA ile bu bursa başvuru yapabilirsiniz. ${profile.test_scores.toefl || profile.test_scores.ielts ? 'Dil test skorlarınız başvurunuzu desteklemektedir.' : ''} ${hasAchievements ? 'Akademik başarılarınız ek puan sağlayacaktır.' : 'Akademik başarılarınızı vurgulayarak başvuru şansınızı artırabilirsiniz.'}`;
      } else {
        return `GPA'nizi ${gpa.toFixed(2)}'den yükseltirseniz bu bursa daha güçlü başvurabilirsiniz. Akademik başarılarınızı belgelendirmeniz önerilir.`;
      }

    case 'athletic':
      if (hasHighLevelSports) {
        const topSport = profile.sports_detailed.find(s =>
          ['varsity', 'regional', 'national', 'international'].includes(s.level)
        );
        const division = uni.name.includes('NCAA Division I') ? 'NCAA Division I' :
                        uni.name.includes('NCAA Division II') ? 'NCAA Division II' :
                        uni.name.includes('NCAA Division III') ? 'NCAA Division III' :
                        uni.name.includes('NAIA') ? 'NAIA' :
                        uni.name.includes('NJCAA') ? 'NJCAA' : '';

        let divisionInfo = '';
        if (division === 'NCAA Division I') {
          divisionInfo = 'NCAA Division I en üst düzey kolej spor ligine sahiptir. Tam burslar (full-ride) yaygındır.';
        } else if (division === 'NCAA Division II') {
          divisionInfo = 'NCAA Division II kısmi burslar sunar ve akademik-atletik dengeye önem verir.';
        } else if (division === 'NCAA Division III') {
          divisionInfo = 'NCAA Division III atletik burs vermez ancak ihtiyaç ve merit bazlı burslar çok güçlüdür.';
        } else if (division === 'NAIA') {
          divisionInfo = 'NAIA uluslararası öğrencilere NCAA\'dan daha kolay erişim ve esnek burs seçenekleri sunar.';
        } else if (division === 'NJCAA') {
          divisionInfo = 'NJCAA community college programları 2 yıllık okullardır ve 4 yıllık üniversitelere transfer için ideal basamaktır.';
        }

        return `${topSport?.sport} dalında ${topSport?.level === 'national' ? 'ulusal' : topSport?.level === 'international' ? 'uluslararası' : 'yüksek'} seviye deneyiminiz bu spor bursu için çok uygun. ${divisionInfo} ${topSport?.achievements ? `"${topSport.achievements}" başarılarınız koçları etkileyecektir.` : ''} ${topSport?.years_experience ? `${topSport.years_experience} deneyim süreniz profesyonel gelişiminizi gösteriyor.` : ''}`;
      } else if (hasSports) {
        const sport = profile.sports_detailed[0];
        const division = uni.name.includes('NCAA Division I') ? 'NCAA D1' :
                        uni.name.includes('NCAA Division II') ? 'NCAA D2' :
                        uni.name.includes('NCAA Division III') ? 'NCAA D3' :
                        uni.name.includes('NAIA') ? 'NAIA' :
                        uni.name.includes('NJCAA') ? 'NJCAA' : '';

        if (division === 'NCAA D1') {
          return `${sport.sport} dalındaki deneyiminiz için NCAA Division I çok rekabetçidir. ${sport.level === 'varsity' || sport.level === 'regional' ? 'Seviyeniz değerlendirilebilir ancak' : 'Lise veya kulüp seviyesi genellikle yeterli olmayabilir.'} Video highlight\'larınızı ve performans istatistiklerinizi mutlaka hazırlayın.`;
        } else if (division === 'NCAA D2' || division === 'NAIA') {
          return `${sport.sport} dalındaki deneyiminiz ${division} için uygun. ${sport.level === 'club' || sport.level === 'high_school' ? 'Takım tecrübeniz artı bir değer. ' : ''}${division} programları çeşitli seviyelerdeki atletlere fırsat tanır. Potansiyelinizi gösteren materyaller hazırlayın.`;
        } else if (division === 'NJCAA') {
          return `${sport.sport} deneyiminiz community college için mükemmel bir başlangıç noktası. NJCAA programları 2 yıllık okullardır, gelişim odaklıdır ve 4 yıllık üniversitelere transfer için platform sağlar. ${sport.years_experience} deneyiminiz değerlidir.`;
        } else {
          return `${sport.sport} dalındaki deneyiminiz bu burs için değerlendirilebilir. Performans videolarınızı ve referans mektuplarınızı hazırlamanız önerilir.`;
        }
      } else {
        return 'Spor geçmişi bu burs için gereklidir. Aktif spor deneyiminiz yoksa diğer burs kategorilerini değerlendirmeniz önerilir.';
      }

    case 'artistic':
      if (hasArts) {
        return `${profile.extracurricular.arts.join(', ')} alanlarındaki aktiviteleriniz bu bursa uygunluk sağlıyor. ${hasAchievements ? 'Sanatsal başarılarınızı portföy veya performans kayıtlarıyla desteklemelisiniz.' : 'Çalışmalarınızdan oluşan bir portföy hazırlamanız başvuru şansınızı artıracaktır.'}`;
      } else {
        return 'Bu burs sanatsal aktivite gerektirmektedir. Müzik, resim, tiyatro gibi alanlarda deneyiminiz yoksa diğer burs seçeneklerini değerlendirin.';
      }

    case 'need-based':
      const budget = parseFloat(profile.annual_budget) || 0;
      const totalCost = uni.tuition_max + uni.living_cost_annual;
      if (budget < totalCost * 0.6) {
        return `Belirttiğiniz $${budget.toLocaleString()} bütçe, $${totalCost.toLocaleString()} toplam maliyetin altında olduğu için bu ihtiyaç bazlı bursa uygunsunuz. Mali durum belgelerini eksiksiz sunmanız önemlidir.`;
      } else {
        return `Mevcut bütçeniz ile bu bursa başvurabilirsiniz, ancak güçlü bir ihtiyaç gerekçesi sunmanız gerekecektir.`;
      }

    case 'country-specific':
      return `${profile.nationality || 'Ülkeniz'} vatandaşları için özel olarak ayrılmış bu burs fırsatı size avantaj sağlıyor. ${gpa >= 3.5 ? 'Akademik başarınız başvurunuzu güçlendirecektir.' : ''} Ülke bazlı burslar genellikle daha yüksek kabul oranlarına sahiptir.`;

    default:
      return 'Bu burs için uygunluk kriterlerini değerlendirmek üzere daha fazla bilgiye ihtiyaç vardır.';
  }
}