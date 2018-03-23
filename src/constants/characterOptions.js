import { arrayToMap } from '../utils/mapUtils';

export const archetypes = [
  'Architect',
  'Artist',
  'Bully',
  'Caregiver',
  'Child',
  'Competitor',
  'Con Artist',
  'Conformist',
  'Curious',
  'Curmudgeon',
  'Cultured',
  'Enigma',
  'Fanatic',
  'Fighter',
  'Freak',
  'Free Spirit',
  'Judge',
  'Know-It-All',
  'Introvert',
  'Leader',
  'Loner',
  'Loose Cannon',
  'Martyr',
  'Mediator',
  'Mercenary',
  'Monster',
  'Penitent',
  'Protector',
  'Rationalist',
  'Royalty',
  'Survivor',
  'Type-A Personality',
  'Teacher',
  'Traditionalist',
  'Troublemaker',
  'Toady',
  'Trickster',
  'Unflappable',
  'Untrustworthy'
];

export const commonDisciplineNames = [
  'Animalism',
  'Auspex',
  'Celerity',
  'Dominate',
  'Fortitude',
  'Obfuscate',
  'Potence',
  'Presence'
];

export const clans = arrayToMap([
  [
    'Assamite',
    {
      disciplines: ['Celerity', 'Obfuscate', 'Quietus'],
      merits: [
        {
          name: 'Surprise Attack',
          points: 1
        },
        {
          name: 'Awakening the Steel',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Vizier',
          { meritPoints: 2, disciplines: ['Auspex', 'Celerity', 'Quietus'] }
        ],
        [
          'Sorcerer',
          {
            meritPoints: 4,
            disciplines: ['Obfuscate', 'Quietus', 'Thaumaturgy: Lure of Flames']
          }
        ]
      ])
    }
  ],
  [
    'Brujah',
    {
      disciplines: ['Celerity', 'Potence', 'Presence'],
      merits: [
        {
          name: 'Brotherhood',
          points: 1
        },
        {
          name: 'Burning Wrath',
          points: 2
        },
        {
          name: 'Scourge of Alecto',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'True Brujah',
          { meritPoints: 4, disciplines: ['Potence', 'Presence', 'Temporis'] }
        ]
      ])
    }
  ],
  [
    'Followers of Set',
    {
      disciplines: ['Obfuscate', 'Presence', 'Serpentis'],
      merits: [
        {
          name: 'Personal Cult',
          points: 1
        },
        {
          name: 'Addictive Blood',
          points: 3
        },
        {
          name: 'Setite Sorcery',
          points: 4
        }
      ],
      bloodlines: arrayToMap([
        [
          'Tlacique',
          { meritPoints: 2, disciplines: ['Presence', 'Obfuscate', 'Protean'] }
        ],
        [
          'Viper',
          {
            meritPoints: 2,
            disciplines: ['Potence', 'Presence', 'Serpentis']
          }
        ]
      ])
    }
  ],
  [
    'Gangrel',
    {
      disciplines: ['Animalism', 'Fortitude', 'Protean'],
      merits: [
        {
          name: 'Protean Blood',
          points: 1
        },
        {
          name: "Shape of Beast's Wrath",
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Coyote',
          { meritPoints: 2, disciplines: ['Celerity', 'Obfuscate', 'Protean'] }
        ],
        [
          'Noiad',
          {
            meritPoints: 2,
            disciplines: ['Animalism', 'Auspex', 'Protean']
          }
        ],
        [
          'Ahrimanes',
          {
            meritPoints: 4,
            disciplines: [
              'Animalism',
              'Presence',
              'Thaumaturgy: Path of Elemental Mastery'
            ]
          }
        ]
      ])
    }
  ],
  [
    'Giovanni',
    {
      disciplines: ['Dominate', 'Potence', 'Necromancy: Sepulchre Path'],
      merits: [
        {
          name: 'Necromantic Expertise',
          points: 1
        },
        {
          name: 'Mook',
          points: 2
        },
        {
          name: 'Ghostly Retainer',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Premascine',
          {
            meritPoints: 4,
            disciplines: ['Dominate', 'Potence', 'Necromancy: Sepulchre Path']
          }
        ]
      ])
    }
  ],
  [
    'Lasombra',
    {
      disciplines: ['Dominate', 'Potence', 'Obtenebration'],
      merits: [
        {
          name: 'Angelic Visage',
          points: 1
        },
        {
          name: 'Born in Shadow',
          points: 2
        },
        {
          name: 'Walk the Abyss',
          points: 3
        }
      ],
      bloodlines: arrayToMap([
        [
          'Kiasyd',
          {
            meritPoints: 4,
            disciplines: ['Dominate', 'Mytherceria', 'Obtenebration']
          }
        ]
      ])
    }
  ],
  [
    'Malkavian',
    {
      disciplines: ['Auspex', 'Dementation', 'Obfuscate'],
      merits: [
        {
          name: 'Expanded Consciousness',
          points: 1
        },
        {
          name: 'Labyrinthine Mind',
          points: 3
        },
        {
          name: 'Sophistry',
          points: 4
        }
      ],
      bloodlines: arrayToMap([
        [
          'Ananke',
          { meritPoints: 2, disciplines: ['Auspex', 'Dementation', 'Presence'] }
        ],
        [
          'Knights of the Moon',
          {
            meritPoints: 2,
            disciplines: ['Auspex', 'Dominate', 'Obfuscate']
          }
        ]
      ])
    }
  ],
  [
    'Nosferatu',
    {
      disciplines: ['Animalism', 'Obfuscate', 'Potence'],
      merits: [
        {
          name: 'Unseeing Eye',
          points: 1
        },
        {
          name: 'Hidden Advantage',
          points: 2
        },
        {
          name: 'Pliable Blood',
          points: 3
        },
        {
          name: 'Unnatural Adaptation',
          points: 4
        }
      ],
      bloodlines: arrayToMap([])
    }
  ],
  [
    'Toreador',
    {
      disciplines: ['Auspex', 'Celerity', 'Presence'],
      merits: [
        {
          name: "Artist's Blessing",
          points: 1
        },
        {
          name: 'Absent Sway',
          points: 3
        },
        {
          name: "Dancer's Grace",
          points: 4
        }
      ],
      bloodlines: arrayToMap([
        [
          'Ishtarri',
          { meritPoints: 2, disciplines: ['Celerity', 'Fortitude', 'Presence'] }
        ],
        [
          'Volgirre',
          {
            meritPoints: 2,
            disciplines: ['Auspex', 'Celerity', 'Presence']
          }
        ]
      ])
    }
  ],
  [
    'Tremere',
    {
      disciplines: ['Auspex', 'Dominate', 'Thaumaturgy: Path of Blood'],
      merits: [
        {
          name: 'Thaumaturgic Expertise',
          points: 1
        },
        {
          name: 'Talisman',
          points: 3
        },
        {
          name: 'Countermagic',
          points: 4
        }
      ],
      bloodlines: arrayToMap([
        [
          'Telyav',
          {
            meritPoints: 2,
            disciplines: ['Auspex', 'Presence', 'Thaumaturgy: Path of Blood']
          }
        ]
      ])
    }
  ],
  [
    'Tzimisce',
    {
      disciplines: ['Animalism', 'Auspex', 'Vicissitude'],
      merits: [
        {
          name: 'Blood of the Tzimisce',
          points: 1
        },
        {
          name: 'Szlachta',
          points: 2
        }
      ],
      bloodlines: arrayToMap([
        [
          'Carpathian',
          { meritPoints: 3, disciplines: ['Animalism', 'Auspex', 'Dominate'] }
        ],
        [
          'Koldun',
          {
            meritPoints: 4,
            disciplines: [
              'Animalism',
              'Auspex',
              'Thaumaturgy: Path of Elemental Mastery'
            ]
          }
        ]
      ])
    }
  ],
  [
    'Ventrue',
    {
      disciplines: ['Dominate', 'Fortitude', 'Presence'],
      merits: [
        {
          name: 'Aura of Command',
          points: 1
        },
        {
          name: 'Paragon',
          points: 3
        },
        {
          name: 'Regal Bearing',
          points: 4
        }
      ],
      bloodlines: arrayToMap([
        [
          'Crusader',
          { meritPoints: 2, disciplines: ['Auspex', 'Dominate', 'Fortitude'] }
        ]
      ])
    }
  ],
  [
    'Caitiff',
    {
      disciplines: commonDisciplineNames,
      merits: [
        {
          name: 'Auspicious',
          points: 1
        },
        {
          name: 'Eclipsed Blood',
          points: 2
        },
        {
          name: 'Vestiges of Greatness',
          points: 3
        }
      ],
      bloodlines: arrayToMap([])
    }
  ]
]);

export const caitiffInClanDisciplineCount = 3;

export const inClanDisciplinesAvailableStartingDots = [
  { dots: 2, count: 1 },
  { dots: 1, count: 2 }
];

export const outOfClanDisciplinesAvailableStartingDots = [];

export const attributeTraitNames = ['physical', 'social', 'mental'];

export const attributeMaxDots = 10;

export const attributesRankDots = [7, 5, 3];

export const foci = {
  physical: ['Strength', 'Dexterity', 'Stamina'],
  social: ['Charisma', 'Manipulation', 'Appearance'],
  mental: ['Perception', 'Intelligence', 'Wits']
};

export const standardTraitMaxDots = 5;

export const skillTraitNames = [
  'academics',
  'animalKen',
  'athletics',
  'awareness',
  'brawl',
  'computer',
  'crafts',
  'dodge',
  'drive',
  'empathy',
  'firearms',
  'intimidation',
  'investigation',
  'leadership',
  'linguistics',
  'lore',
  'medicine',
  'melee',
  'occult',
  'performance',
  'science',
  'security',
  'stealth',
  'streetwise',
  'subterfuge',
  'survival'
];

export const skillTraitDisplayNameOverride = {
  animalKen: 'Animal Ken'
};

export const skillsAvailableStartingDots = [
  { dots: 4, count: 1 },
  { dots: 3, count: 2 },
  { dots: 2, count: 3 },
  { dots: 1, count: 4 }
];

export const backgroundTraitNames = [
  'allies',
  'alternateIdentity',
  'contacts',
  'fame',
  'generation',
  'haven',
  'herd',
  'influence_elite',
  'influence_underworld',
  'resources',
  'retainers'
];

export const backgroundTraitDisplayNameOverride = {
  alternateIdentity: 'Alternate Identity',
  influence_elite: 'Influence (Elite)',
  influence_underworld: 'Influence (Underworld)'
};

export const backgroundsAvailableStartingDots = [
  { dots: 3, count: 1 },
  { dots: 2, count: 1 },
  { dots: 1, count: 1 }
];

export const humanity = 'Humanity';
export const moralityStartingDotsHumanity = 5;
export const moralityMaxDotsHumanity = 6;
export const moralityStartingDotsPath = 4;
export const moralityMaxDotsPath = 4;

export const initialXP = 30;
export const bankedXPLimit = 5;
export const outOfClanDisciplineLevelLimit = 3;

const standardDotCost = {
  attributes: {
    xp: 3,
    per: 'each'
  },
  backgrounds: {
    xp: 2,
    per: 'newLevel'
  },
  skills: {
    xp: 2,
    per: 'newLevel'
  },
  disciplines: {
    inClan: {
      xp: 3,
      per: 'newLevel'
    },
    outOfClan: {
      xp: 4,
      per: 'newLevel'
    }
  },
  morality: {
    xp: 10,
    per: 'each'
  }
};

export const generationChart = {
  1: {
    title: 'Neonate',
    bloodPool: 10,
    bloodPerTurn: 1,
    attributeBonus: 1,
    dotCost: {
      ...standardDotCost,
      backgrounds: {
        xp: 1,
        per: 'newLevel'
      },
      skills: {
        xp: 1,
        per: 'newLevel'
      }
    }
  },
  2: {
    title: 'Ancilla',
    bloodPool: 12,
    bloodPerTurn: 2,
    attributeBonus: 2,
    dotCost: standardDotCost
  },
  3: {
    title: 'Pretender Elder',
    bloodPool: 15,
    bloodPerTurn: 3,
    attributeBonus: 3,
    dotCost: standardDotCost
  },
  4: {
    title: 'Master Elder',
    bloodPool: 20,
    bloodPerTurn: 4,
    attributeBonus: 4,
    dotCost: standardDotCost
  },
  5: {
    title: 'Luminary Elder',
    bloodPool: 30,
    bloodPerTurn: 5,
    attributeBonus: 5,
    dotCost: {
      ...standardDotCost,
      disciplines: {
        inClan: standardDotCost.disciplines.inClan,
        outOfClan: {
          xp: 5,
          per: 'newLevel'
        }
      }
    }
  }
};
