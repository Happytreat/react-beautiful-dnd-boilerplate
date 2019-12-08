const stubData = {
  // inner dnd component
  modules: {
    'module-1': { id: 'module-1', description: '4 MC, Torturous' },
    'module-2': { id: 'module-2', description: '5 MC, Crazy Torturous' },
    'module-3': { id: 'module-3', description: '2 MC, Cake' },
    'module-4': { id: 'module-4', description: '4 MC, Mehh' },
  },
  // columns
  semesters: {
    'semester-1': {
      id: 'semester-1',
      title: 'Year 1 Sem 1',
      moduleIds: ['module-1', 'module-2', 'module-3', 'module-4'],
    },
    'semester-2': {
      id: 'semester-2',
      title: 'Year 1 Sem 2',
      moduleIds: [],
    },
  },
  // Reordering of semesters
  semesterOrder: ['semester-1', 'semester-2'],
};

export default stubData;
