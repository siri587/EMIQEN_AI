export interface NavItem {
  label: string;
  href: string;
}

export interface ChallengeCard {
  id: string;
  title: string;
  description: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  details: string[];
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  subtext: string;
}

export interface UseCaseItem {
  id: string;
  title: string;
  summary: string;
  scenario: string;
  sampleInput: string;
  inputMode: 'Voice' | 'Text' | 'Voice & Text';
  focusArea: string;
}

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
}

export interface StatusMilestone {
  title: string;
  status: 'In Development' | 'Planned' | 'Evaluating';
  description: string;
}

export const siteContent = {
  brand: {
    name: 'EMIQEN',
    tagline: 'Voice and Text AI for Indian Business Contexts',
    heroBadge: 'Developing Enterprise AI · Indian Context',
    headline: 'AI that understands the way India works.',
    supportingCopy:
      'EMIQEN is developing voice-and-text AI for business workflows—bringing domain-focused language intelligence and Indian-context understanding into one adaptable experience.',
    primaryCta: 'Talk to our team',
    secondaryCta: 'Explore the platform',
    statusNote:
      'EMIQEN is in development. Capabilities shown describe the product direction and may evolve.',
  },

  nav: [
    { label: 'Platform', href: '#platform' },
    { label: 'Data Advantage', href: '#data-advantage' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Use cases', href: '#use-cases' },
    { label: 'Why EMIQEN', href: '#differentiators' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

  challenge: {
    badge: 'The Context Gap',
    heading: 'Business language is never one-size-fits-all.',
    copy: 'Enterprise conversations are full of domain terminology, regional expressions, different accents, and context that generic systems may miss. Teams need AI that can interpret requests consistently and support focused tasks without adding unnecessary complexity.',
    cards: [
      {
        id: 'context',
        title: 'Context gets lost',
        description:
          'Local expressions, Indian English phrasing, and business-specific terminology can significantly change the meaning of a request when processed by generic models.',
      },
      {
        id: 'focus',
        title: 'Workflows need focus',
        description:
          'Many enterprise tasks are narrow and repetitive, from synthesizing documents and structured summaries to extracting key operational details reliably.',
      },
      {
        id: 'multimodal',
        title: 'Voice and text should work together',
        description:
          'Teams and customers should be able to interact seamlessly in the format that suits the moment—speaking on the go or typing at their desk.',
      },
    ] as ChallengeCard[],
  },

  capabilities: {
    badge: 'Platform Architecture',
    heading: 'One experience for voice, text, and context.',
    intro:
      'EMIQEN is designed around a modular AI workflow built to unify conversational modalities and domain comprehension for Indian enterprise workflows.',
    disclaimer:
      'Capabilities describe the ongoing system architecture and development targets. Individual modules are undergoing iterative evaluation.',
    items: [
      {
        id: 'voice-text',
        title: 'Voice and text interaction',
        description:
          'Give users the flexibility of speaking or typing across web, mobile, and service touchpoints.',
        tag: 'Dual Modality',
        details: [
          'Unified input processing',
          'Acoustic signal handling',
          'Cross-modality context memory',
        ],
      },
      {
        id: 'domain-focus',
        title: 'Domain-focused responses',
        description:
          'Support selected enterprise tasks including summarization, classification, structured information extraction, and question answering.',
        tag: 'Task Intelligence',
        details: [
          'Document summarization',
          'Operational intent classification',
          'Structured entity extraction',
        ],
      },
      {
        id: 'indian-context',
        title: 'Indian-context language handling',
        description:
          'Interpret relevant Indian English usage, local colloquialisms, regional business terminology, and contextual vocabulary accurately.',
        tag: 'Context Depth',
        details: [
          'Indian English syntax patterns',
          'Everyday corporate phrasing',
          'Nuanced intent disambiguation',
        ],
      },
      {
        id: 'emotion-aware',
        title: 'Emotion-aware interaction',
        description:
          'Explore how communicative cues and acoustic signals from voice and text can help shape a more thoughtful, appropriate response tone.',
        tag: 'Exploratory Research',
        details: [
          'Acoustic pitch and tone cues',
          'Textual sentiment nuance',
          'Context-appropriate tone calibration',
        ],
      },
      {
        id: 'spoken-output',
        title: 'Natural spoken responses',
        description:
          'Provide clear, natural voice output where the enterprise use case calls for spoken interaction or hands-free execution.',
        tag: 'Voice Synthesis',
        details: [
          'Speech generation synthesis',
          'Pronunciation tuned for Indian names',
          'Clean voice delivery',
        ],
      },
      {
        id: 'adaptable-deployment',
        title: 'Adaptable deployment',
        description:
          'Evaluate deployment pathways designed to meet an organisation’s operational requirements and data governance frameworks.',
        tag: 'Architecture Goal',
        details: [
          'Modular service decoupled layers',
          'Private ecosystem readiness',
          'Data sovereignty considerations',
        ],
      },
    ] as CapabilityItem[],
  },

  workflow: {
    badge: 'System Pipeline',
    heading: 'From conversation to useful response.',
    subheading:
      'Designed as a cohesive multi-stage pipeline where speech recognition, contextual parsing, domain reasoning, and multi-format generation work together.',
    steps: [
      {
        step: '01',
        title: 'Speak or type',
        description: 'A user initiates a request by speaking aloud or typing in their natural phrasing.',
        subtext: 'Supports multimodal input across desktop, telephony, or field devices.',
      },
      {
        step: '02',
        title: 'Understand the input',
        description: 'The system processes acoustic speech signals, Indian-context terminology, and operational intent.',
        subtext: 'Disambiguates regional vernacular and domain-specific vocabulary.',
      },
      {
        step: '03',
        title: 'Generate and adapt',
        description: 'The language layer produces a task-focused, factual response grounded in the enterprise workflow.',
        subtext: 'Calibrates tone and depth for the specific business task.',
      },
      {
        step: '04',
        title: 'Respond in the right format',
        description: 'Returns clear written output and, when enabled by the workflow, natural spoken audio synthesis.',
        subtext: 'Delivers structured data, summaries, or voice responses directly to the user.',
      },
    ] as WorkflowStep[],
  },

  useCases: {
    badge: 'Enterprise Scenarios',
    heading: 'Built around work that needs to get done.',
    intro:
      'We are shaping EMIQEN around practical, repetitive enterprise touchpoints where contextual language processing makes a measurable impact.',
    note: 'Use cases are illustrative. Suitability and feature availability depend on ongoing system implementation and client evaluation.',
    items: [
      {
        id: 'customer-interaction',
        title: 'Customer interaction',
        summary:
          'Help conversational systems handle routine customer queries with native context, regional nuances, and conversational patience.',
        scenario: 'Support desks & service desks',
        sampleInput: '"Can you prepone my site inspection scheduled for coming Tuesday?"',
        inputMode: 'Voice & Text',
        focusArea: 'Indian English phrasing & scheduling terminology',
      },
      {
        id: 'knowledge-workflows',
        title: 'Knowledge & document workflows',
        summary:
          'Explore summarization and precise entity extraction across internal enterprise circulars, contracts, and policy documents.',
        scenario: 'Operations & compliance reviews',
        sampleInput: '"Summarize key compliance milestones from this regulatory memo for regional branches."',
        inputMode: 'Text',
        focusArea: 'Entity extraction & factual summarization',
      },
      {
        id: 'internal-assistants',
        title: 'Internal employee assistants',
        summary:
          'Support frontline staff and distributed branch teams with quick policy lookups, expense workflows, and repeatable queries.',
        scenario: 'Branch operations & HR enablement',
        sampleInput: '"What is the approval threshold for inter-branch logistics reimbursements?"',
        inputMode: 'Voice & Text',
        focusArea: 'Routine task guidance & query resolution',
      },
      {
        id: 'voice-services',
        title: 'Voice-enabled field services',
        summary:
          'Enable hands-free interaction for technicians, drivers, or field executives logging reports or checking status on the move.',
        scenario: 'Logistics & field inspection',
        sampleInput: '"Mark dispatch parcel batch 402 as delivered at Whitefield hub."',
        inputMode: 'Voice',
        focusArea: 'Hands-free voice recognition & action logging',
      },
    ] as UseCaseItem[],
  },

  differentiators: {
    badge: 'Core Philosophy',
    heading: 'A focused approach to enterprise AI.',
    subheading:
      'Rather than pursuing generic conversational breadth, EMIQEN is engineered around grounded relevance, linguistic authenticity, and purposeful enterprise utility.',
    items: [
      {
        id: 'context-centre',
        title: 'Indian context at the centre',
        description:
          'Designed from the ground up to account for Indian English idioms, local business vocabulary, and context-sensitive vernacular.',
        highlight: 'Linguistic authenticity',
      },
      {
        id: 'purpose-built',
        title: 'Purpose-built direction',
        description:
          'Focused deliberately on selected enterprise workloads rather than attempting to solve every hypothetical open-ended task.',
        highlight: 'Task-driven focus',
      },
      {
        id: 'dual-modality',
        title: 'Voice and text together',
        description:
          'A unified product direction engineered from inception for both typed and spoken interactions in a single cohesive platform.',
        highlight: 'Native multimodal',
      },
      {
        id: 'modular-design',
        title: 'Modular by design',
        description:
          'Components for speech recognition, language processing, emotion sensing, and speech synthesis can be upgraded and evaluated independently.',
        highlight: 'Decoupled agility',
      },
      {
        id: 'deployment-flexibility',
        title: 'Deployment flexibility as a design goal',
        description:
          'Architectural choices are guided by enterprise data sovereignty, operational compliance, and private infrastructure readiness.',
        highlight: 'Enterprise alignment',
      },
    ] as DifferentiatorItem[],
  },

  status: {
    badge: 'Roadmap & Integrity',
    heading: 'Built carefully. Validated step by step.',
    copy: 'EMIQEN is under active development. The team is working toward a focused AI system and will validate response quality, speech performance, latency, reliability, and operational requirements before making production claims.',
    principles: [
      {
        title: 'Transparent Capability Claims',
        description:
          'We differentiate between current experimental benchmarks, development targets, and production-ready modules.',
      },
      {
        title: 'Rigorous Verification',
        description:
          'Acoustic models and language processing are evaluated against domain-specific test sets representing diverse Indian speakers.',
      },
      {
        title: 'Responsible Data Practices',
        description:
          'Enterprise conversations require strict boundaries. System safety and data stewardship are integrated into system architecture.',
      },
    ],
    milestones: [
      {
        title: 'Voice & Text Modality Foundations',
        status: 'In Development',
        description: 'Iterating on Indian English speech interpretation and unified request parsing.',
      },
      {
        title: 'Domain Summarization & Extraction',
        status: 'In Development',
        description: 'Testing task-focused enterprise language processing across business documents.',
      },
      {
        title: 'Emotion-Tone Signal Evaluation',
        status: 'Evaluating',
        description: 'Investigating acoustic pitch and conversational sentiment cues for adaptive tone.',
      },
      {
        title: 'Controlled Enterprise Pilots',
        status: 'Planned',
        description: 'Preparing sandboxed enterprise evaluation environments with initial design partners.',
      },
    ] as StatusMilestone[],
  },

  contact: {
    badge: 'Get in Touch',
    heading: 'Have a workflow worth making more intelligent?',
    copy: 'Tell us about your business context, communication channels, and the specialized tasks you want AI to support. We collaborate closely with early enterprise teams exploring Indian-context language intelligence.',
    // Clearly marked configuration point as specified by AGENTS.md
    config: {
      isBackendConfigured: false,
      approvedContactEmail: 'contact@emiqen.com', // Safe placeholder or clearly labeled
      submissionEndpoint: null, // Configure when backend API is deployed
    },
    formFields: {
      nameLabel: 'Full Name',
      emailLabel: 'Work Email',
      companyLabel: 'Organisation / Company',
      roleLabel: 'Your Role / Function',
      interestsLabel: 'Workflows of Interest',
      messageLabel: 'Describe your workflow or challenge',
    },
  },

  footer: {
    legalNote:
      'EMIQEN is an enterprise AI technology initiative under active development. Product specifications, availability, and features describe directional roadmap goals.',
    brandDescriptor: 'Voice and Text AI for Indian Business Contexts',
    sections: [
      {
        title: 'Platform',
        links: [
          { label: 'Capabilities', href: '#platform' },
          { label: 'How it works', href: '#how-it-works' },
          { label: 'Pipeline Architecture', href: '#how-it-works' },
          { label: 'Roadmap Status', href: '#status' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Customer Interaction', href: '#use-cases' },
          { label: 'Document Workflows', href: '#use-cases' },
          { label: 'Internal Assistants', href: '#use-cases' },
          { label: 'Voice Services', href: '#use-cases' },
        ],
      },
      {
        title: 'Organisation',
        links: [
          { label: 'Why EMIQEN', href: '#differentiators' },
          { label: 'Development Principles', href: '#status' },
          { label: 'Connect with Us', href: '#contact' },
        ],
      },
    ],
  },
};

