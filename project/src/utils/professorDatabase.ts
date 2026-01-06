export type Professor = {
  id: string;
  name: string;
  university_id: string;
  university_name: string;
  title: string;
  research_areas: string[];
  h_index: number;
  notable_work: string;
  accepting_students: boolean;
  website?: string;
};

export const professorDatabase: Professor[] = [
  {
    id: 'prof-1',
    name: 'Geoffrey Hinton',
    university_id: '40',
    university_name: 'University of Toronto',
    title: 'Professor Emeritus',
    research_areas: ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Neural Networks'],
    h_index: 168,
    notable_work: 'Godfather of AI, developed backpropagation and deep learning',
    accepting_students: false,
    website: 'https://www.cs.toronto.edu/~hinton/',
  },
  {
    id: 'prof-2',
    name: 'Yann LeCun',
    university_id: '5',
    university_name: 'New York University',
    title: 'Professor',
    research_areas: ['Artificial Intelligence', 'Computer Vision', 'Machine Learning', 'Deep Learning'],
    h_index: 152,
    notable_work: 'Chief AI Scientist at Meta, pioneered convolutional neural networks',
    accepting_students: true,
    website: 'http://yann.lecun.com/',
  },
  {
    id: 'prof-3',
    name: 'Andrew Ng',
    university_id: '3',
    university_name: 'Stanford University',
    title: 'Adjunct Professor',
    research_areas: ['Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'Robotics'],
    h_index: 186,
    notable_work: 'Co-founder of Coursera, Google Brain, former Chief Scientist at Baidu',
    accepting_students: true,
    website: 'https://www.andrewng.org/',
  },
  {
    id: 'prof-4',
    name: 'Fei-Fei Li',
    university_id: '3',
    university_name: 'Stanford University',
    title: 'Professor',
    research_areas: ['Computer Vision', 'Artificial Intelligence', 'Machine Learning', 'Cognitive Neuroscience'],
    h_index: 142,
    notable_work: 'Creator of ImageNet, former VP at Google Cloud AI',
    accepting_students: true,
    website: 'https://profiles.stanford.edu/fei-fei-li',
  },
  {
    id: 'prof-5',
    name: 'Yoshua Bengio',
    university_id: '41',
    university_name: 'University of Montreal',
    title: 'Professor',
    research_areas: ['Deep Learning', 'Machine Learning', 'Artificial Intelligence', 'Natural Language Processing'],
    h_index: 189,
    notable_work: 'Turing Award winner, pioneer in deep learning',
    accepting_students: true,
    website: 'https://yoshuabengio.org/',
  },
  {
    id: 'prof-6',
    name: 'Michael I. Jordan',
    university_id: '4',
    university_name: 'University of California, Berkeley',
    title: 'Professor',
    research_areas: ['Machine Learning', 'Statistics', 'Artificial Intelligence', 'Optimization'],
    h_index: 181,
    notable_work: 'Pioneer in machine learning and Bayesian statistics',
    accepting_students: true,
    website: 'https://people.eecs.berkeley.edu/~jordan/',
  },
  {
    id: 'prof-7',
    name: 'Daphne Koller',
    university_id: '3',
    university_name: 'Stanford University',
    title: 'Professor (on leave)',
    research_areas: ['Machine Learning', 'Computational Biology', 'Artificial Intelligence', 'Probabilistic Models'],
    h_index: 125,
    notable_work: 'Co-founder of Coursera, expert in probabilistic graphical models',
    accepting_students: false,
    website: 'https://ai.stanford.edu/~koller/',
  },
  {
    id: 'prof-8',
    name: 'Stuart Russell',
    university_id: '4',
    university_name: 'University of California, Berkeley',
    title: 'Professor',
    research_areas: ['Artificial Intelligence', 'Machine Learning', 'AI Safety', 'Robotics'],
    h_index: 134,
    notable_work: 'Co-author of "Artificial Intelligence: A Modern Approach"',
    accepting_students: true,
    website: 'https://people.eecs.berkeley.edu/~russell/',
  },
  {
    id: 'prof-9',
    name: 'Christos Papadimitriou',
    university_id: '10',
    university_name: 'Columbia University',
    title: 'Professor',
    research_areas: ['Algorithms', 'Computational Complexity', 'Game Theory', 'Evolution'],
    h_index: 98,
    notable_work: 'Pioneering work in computational complexity and algorithms',
    accepting_students: true,
    website: 'http://www.cs.columbia.edu/~christos/',
  },
  {
    id: 'prof-10',
    name: 'Jennifer Doudna',
    university_id: '4',
    university_name: 'University of California, Berkeley',
    title: 'Professor',
    research_areas: ['Biochemistry', 'CRISPR', 'Gene Editing', 'Molecular Biology'],
    h_index: 178,
    notable_work: 'Nobel Prize winner for CRISPR gene editing technology',
    accepting_students: true,
    website: 'https://www.berkeley.edu/doudna',
  },
  {
    id: 'prof-11',
    name: 'Michael Stonebraker',
    university_id: '1',
    university_name: 'Massachusetts Institute of Technology',
    title: 'Professor',
    research_areas: ['Database Systems', 'Big Data', 'Data Management', 'Distributed Systems'],
    h_index: 101,
    notable_work: 'Turing Award winner, creator of PostgreSQL and Ingres',
    accepting_students: true,
    website: 'https://www.csail.mit.edu/person/michael-stonebraker',
  },
  {
    id: 'prof-12',
    name: 'Barbara Liskov',
    university_id: '1',
    university_name: 'Massachusetts Institute of Technology',
    title: 'Professor',
    research_areas: ['Programming Languages', 'Distributed Systems', 'Software Engineering', 'Computer Systems'],
    h_index: 89,
    notable_work: 'Turing Award winner, Liskov substitution principle',
    accepting_students: false,
    website: 'https://www.csail.mit.edu/person/barbara-liskov',
  },
  {
    id: 'prof-13',
    name: 'Edward Witten',
    university_id: '7',
    university_name: 'Princeton University',
    title: 'Professor',
    research_areas: ['Theoretical Physics', 'String Theory', 'Quantum Field Theory', 'Mathematical Physics'],
    h_index: 183,
    notable_work: 'Fields Medal winner, leading string theorist',
    accepting_students: true,
    website: 'https://www.ias.edu/scholars/witten',
  },
  {
    id: 'prof-14',
    name: 'Demis Hassabis',
    university_id: '2',
    university_name: 'University of Oxford',
    title: 'Honorary Professor',
    research_areas: ['Artificial Intelligence', 'Neuroscience', 'Machine Learning', 'Reinforcement Learning'],
    h_index: 71,
    notable_work: 'CEO of DeepMind, creator of AlphaGo',
    accepting_students: false,
    website: 'https://www.deepmind.com/about/people/demis-hassabis',
  },
  {
    id: 'prof-15',
    name: 'Esther Duflo',
    university_id: '1',
    university_name: 'Massachusetts Institute of Technology',
    title: 'Professor',
    research_areas: ['Development Economics', 'Poverty', 'Education', 'Healthcare'],
    h_index: 115,
    notable_work: 'Nobel Prize winner in Economics, expert in randomized controlled trials',
    accepting_students: true,
    website: 'https://economics.mit.edu/faculty/eduflo',
  },
  {
    id: 'prof-16',
    name: 'Thomas Piketty',
    university_id: '27',
    university_name: 'Paris School of Economics',
    title: 'Professor',
    research_areas: ['Economics', 'Inequality', 'Wealth Distribution', 'Public Policy'],
    h_index: 76,
    notable_work: 'Author of "Capital in the Twenty-First Century"',
    accepting_students: true,
    website: 'http://piketty.pse.ens.fr/en/',
  },
  {
    id: 'prof-17',
    name: 'Christiana Figueres',
    university_id: '13',
    university_name: 'University of Cambridge',
    title: 'Visiting Professor',
    research_areas: ['Climate Change', 'Sustainability', 'Environmental Policy', 'International Relations'],
    h_index: 34,
    notable_work: 'Architect of the Paris Climate Agreement',
    accepting_students: false,
    website: 'https://www.globaloptimism.com/team',
  },
  {
    id: 'prof-18',
    name: 'Elon Musk',
    university_id: '3',
    university_name: 'Stanford University',
    title: 'Guest Lecturer',
    research_areas: ['Space Technology', 'Electric Vehicles', 'Sustainable Energy', 'Artificial Intelligence'],
    h_index: 45,
    notable_work: 'CEO of Tesla and SpaceX, entrepreneur',
    accepting_students: false,
  },
  {
    id: 'prof-19',
    name: 'Ha-Joon Chang',
    university_id: '13',
    university_name: 'University of Cambridge',
    title: 'Professor',
    research_areas: ['Development Economics', 'Economic Development', 'Political Economy', 'Institutional Economics'],
    h_index: 62,
    notable_work: 'Author of "Kicking Away the Ladder" and "23 Things They Don\'t Tell You About Capitalism"',
    accepting_students: true,
    website: 'http://hajoonchang.net/',
  },
  {
    id: 'prof-20',
    name: 'Shoshana Zuboff',
    university_id: '8',
    university_name: 'Harvard University',
    title: 'Professor Emerita',
    research_areas: ['Technology Ethics', 'Surveillance Capitalism', 'Digital Privacy', 'Business Ethics'],
    h_index: 41,
    notable_work: 'Author of "The Age of Surveillance Capitalism"',
    accepting_students: false,
    website: 'https://shoshanazuboff.com/',
  },
];

export function findProfessorsByResearchInterests(researchInterests: string[]): Professor[] {
  if (!researchInterests || researchInterests.length === 0) {
    return [];
  }

  const normalizedInterests = researchInterests.map(interest =>
    interest.toLowerCase().trim()
  );

  const matchedProfessors = professorDatabase.filter(prof => {
    return prof.research_areas.some(area =>
      normalizedInterests.some(interest =>
        area.toLowerCase().includes(interest) ||
        interest.includes(area.toLowerCase())
      )
    );
  });

  return matchedProfessors.sort((a, b) => b.h_index - a.h_index);
}

export function getProfessorsByUniversity(universityId: string): Professor[] {
  return professorDatabase.filter(prof => prof.university_id === universityId);
}
