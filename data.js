const SITE_DATA = {
  officialRequirementsUrl: "https://www.scouting.org/merit-badges/artificial-intelligence/",
  counselorUrl: "https://filestore.scouting.org/filestore/Merit_Badge_ReqandRes/Note-to-Counselor-Artificial-Intelligence-(AI)-Merit-Badge.pdf",
  requirements: [
    {
      id: 1,
      title: "Key Concepts",
      summary: "Define the core vocabulary Scouts need before discussing artificial intelligence and automation.",
      requirement: "Share the meaning of AI, agents, automation, programming, bots, data, databases, digital workers, machine learning, workflows, variables, and related terms with your counselor.",
      completionNote: "Complete all parts of this requirement.",
      requirementDetails: [
        "Define each required term and share the meaning of each with your counselor: artificial intelligence (AI), artificial intelligence agents, automation, basic programming, bots, data, databases, digital workers, general AI, machine learning (ML), narrow AI, superintelligent AI, tasks, triggers, workflows, and variables."
      ],
      activities: [
        "Build a shared class glossary before starting the games.",
        "Ask each Scout to explain one term using an everyday example.",
        "Compare narrow AI, general AI, and superintelligent AI."
      ],
      counselorPrompt: "Which terms sound similar but mean different things? Ask Scouts to explain the difference in their own words.",
      terms: [
        ["Artificial intelligence", "Computer systems that perform tasks that usually require human reasoning, pattern recognition, or decision making."],
        ["AI agent", "A system that can observe information, make decisions, and take actions toward a goal."],
        ["Automation", "A process that follows set rules or triggers without needing a person to repeat every step."],
        ["Machine learning", "A way for systems to improve from examples, patterns, or feedback instead of only fixed instructions."],
        ["Large language model", "An AI system trained on large amounts of text to recognize language patterns and generate text-based responses."],
        ["Workflow", "A sequence of steps that moves work from start to finish."],
        ["Trigger", "An event that starts an automated action or workflow."],
        ["Variable", "A named value that can change while a program or workflow runs."],
        ["Database", "An organized collection of data that can be searched, updated, and analyzed."]
      ],
      aiComparison: [
        {
          type: "Narrow AI",
          meaning: "AI designed to do a specific task or set of related tasks.",
          today: "Common today",
          example: "A translation app, recommendation system, image recognizer, or chatbot."
        },
        {
          type: "General AI",
          meaning: "A theoretical AI that could learn, reason, and solve problems across many areas like a human.",
          today: "Not available today",
          example: "An AI that could independently handle school, work, hobbies, and unfamiliar real-world tasks as flexibly as a person."
        },
        {
          type: "Superintelligent AI",
          meaning: "A theoretical AI that would exceed human ability in most or all areas of thinking and problem solving.",
          today: "Not available today",
          example: "An AI far better than humans at science, planning, creativity, strategy, and decision-making."
        }
      ]
    },
    {
      id: 2,
      title: "Artificial Intelligence Basics",
      summary: "Identify AI in daily life, work, and school, then practice deciding whether a scenario uses AI.",
      requirement: "Find examples of AI in everyday life, the workplace, and education; play ten rounds of AI or Not?; and create a short AI development timeline.",
      completionNote: "Complete all parts: 2a through 2e.",
      requirementDetails: [
        "2a. Identify ten examples of how AI is currently used in everyday life.",
        "2b. Identify five examples of how AI is currently used in the workplace.",
        "2c. Identify five examples of how AI can be used at school or in support of your education.",
        "2d. Meet with your counselor and play ten rounds of the AI or Not? game to determine if the presented scenario utilizes AI. Discuss your answers.",
        "2e. Create a timeline with five key milestones in the development of artificial intelligence."
      ],
      activities: [
        "Run the AI or Not? game with the group.",
        "Have Scouts sort examples into home, workplace, and school categories.",
        "Make a five-milestone AI timeline."
      ],
      counselorPrompt: "When Scouts say something is AI, ask what data it uses and whether it learns or adapts.",
      gameLink: "games/ai-or-not.html",
      gameName: "AI or Not?",
      timelineTitle: "Five-milestone AI timeline",
      timelineButtonText: "Show AI timeline",
      aiTimeline: [
        {
          year: "1950",
          title: "Alan Turing proposes the Turing test",
          detail: "Turing published a way to think about whether a machine could appear intelligent through conversation. This helped frame early questions about machine intelligence."
        },
        {
          year: "1956",
          title: "The Dartmouth workshop names AI",
          detail: "Researchers gathered at Dartmouth College and used the term artificial intelligence. This is often treated as the formal beginning of AI as a field of study."
        },
        {
          year: "1997",
          title: "IBM Deep Blue defeats Garry Kasparov",
          detail: "Deep Blue beat the world chess champion, showing that computers could outperform humans in a complex strategy game when designed for a narrow task."
        },
        {
          year: "2012",
          title: "Deep learning changes image recognition",
          detail: "A neural network called AlexNet achieved a major breakthrough in image recognition, helping launch the modern deep learning boom."
        },
        {
          year: "2022",
          title: "Generative AI reaches the public",
          detail: "Chat-based generative AI tools became widely available, making it easier for everyday users to create text, brainstorm ideas, summarize information, and experiment with AI."
        }
      ]
    },
    {
      id: 3,
      title: "Automation Basics",
      summary: "Separate simple automation from AI and explain how automated systems reduce repetitive effort.",
      requirement: "Identify automation examples in daily life, work, and school; explain how automation performs repetitive tasks; and create an automation timeline.",
      completionNote: "Complete all parts: 3a through 3e.",
      requirementDetails: [
        "3a. Identify 10 examples of how automation is currently used in everyday life.",
        "3b. Identify five examples of how automation is currently used in the workplace.",
        "3c. Identify five examples of how automation can be used at school or in support of your education.",
        "3d. Explain how automation performs repetitive tasks without human intervention and how it reduces human error and optimizes resources.",
        "3e. Create a timeline with five significant milestones in automation development."
      ],
      activities: [
        "Compare a timer, sensor, checklist, and adaptive system.",
        "List repetitive tasks Scouts see at home or school.",
        "Discuss where automation helps and where human review still matters."
      ],
      counselorPrompt: "Ask Scouts to explain the trigger, task, and outcome for each automation example.",
      automationComparison: [
        {
          type: "Timer",
          meaning: "Runs an action at a set time or on a fixed schedule.",
          example: "A sprinkler system turns on every morning at 7:00 a.m. whether the lawn needs water or not.",
          detail: "A timer is useful for repeated predictable tasks, but it does not sense conditions or decide whether the action is still needed."
        },
        {
          type: "Sensor",
          meaning: "Starts an action when it detects something in the environment.",
          example: "A motion sensor turns on a light when someone walks into a room.",
          detail: "A sensor reacts to a trigger. It can make automation more responsive, but it still usually follows a simple if-this-then-that rule."
        },
        {
          type: "Checklist",
          meaning: "Guides people or systems through a repeatable sequence of steps.",
          example: "A campout packing checklist helps a patrol make sure tents, food, water, and first-aid supplies are ready.",
          detail: "A checklist reduces missed steps and human error. It may be manual, digital, or part of a workflow, but it does not automatically adapt on its own."
        },
        {
          type: "Adaptive system",
          meaning: "Changes its behavior based on data, conditions, or feedback.",
          example: "A smart thermostat learns patterns and adjusts heating or cooling to save energy while keeping people comfortable.",
          detail: "An adaptive system is closer to AI when it learns from patterns or uses data to improve decisions instead of only following fixed rules."
        }
      ],
      timelineTitle: "Five-milestone automation timeline",
      timelineButtonText: "Show automation timeline",
      aiTimeline: [
        {
          year: "1785",
          title: "Automated flour mill",
          detail: "Oliver Evans designed an automated flour mill that moved grain and flour through multiple steps with less manual labor, showing how machines could coordinate repeated work."
        },
        {
          year: "1913",
          title: "Moving assembly line",
          detail: "Ford's moving assembly line helped standardize production and reduce the time needed to build a car, becoming a major milestone in industrial automation."
        },
        {
          year: "1947",
          title: "Numerical control machining",
          detail: "Early numerical control used coded instructions to guide machine tools, paving the way for computer-controlled manufacturing."
        },
        {
          year: "1961",
          title: "First industrial robot",
          detail: "Unimate began work on a General Motors assembly line, showing how robots could take on repetitive or dangerous factory tasks."
        },
        {
          year: "2000s",
          title: "Robotic process automation",
          detail: "Software bots began automating repetitive digital tasks such as moving data between systems, helping offices automate workflows as well as factories."
        }
      ]
    },
    {
      id: 4,
      title: "Ethics in AI",
      summary: "Explore bias, privacy, accountability, and responsible decision making with real-world scenarios.",
      requirement: "Research ethical concerns and responsible AI use, play five rounds of the What Would You Do? game, develop AI guidelines, and explain the Turing test.",
      completionNote: "Complete all parts: 4a through 4d.",
      requirementDetails: [
        "4a. Research ethical concerns and responsible use in AI, including bias, privacy, and AI decision-making.",
        "4b. Meet with your counselor, play, and discuss five rounds of the What Would You Do? ethical decision-making scenarios.",
        "4c. Develop your own ethical guidelines for the use of AI.",
        "4d. Explain what the Turing test is."
      ],
      activities: [
        "Run the What Would You Do? ethics game.",
        "Connect each scenario to Scout Law values.",
        "Draft a short set of responsible AI guidelines."
      ],
      counselorPrompt: "There is rarely one perfect answer. Push Scouts to explain tradeoffs, safeguards, and who should be accountable.",
      gameLink: "games/ethics.html",
      gameName: "What Would You Do?"
    },
    {
      id: 5,
      title: "Deepfakes",
      summary: "Understand manipulated media, its impact, and what to do if someone is harmed by it.",
      requirement: "Explain what a deepfake is, how it can affect someone, and what actions to take if you or someone you know is impacted.",
      completionNote: "Complete both parts: 5a and 5b.",
      requirementDetails: [
        "5a. Explain what a deepfake is and how it can affect an individual.",
        "5b. Describe what actions to take if you or someone you know is impacted by a deepfake."
      ],
      activities: [
        "Discuss signs that media may be manipulated.",
        "Create a response checklist: preserve evidence, report, ask a trusted adult, and avoid resharing.",
        "Talk about empathy for people targeted by fake media."
      ],
      counselorPrompt: "Keep the conversation practical and safety-focused. Emphasize not amplifying harmful content.",
      videos: [
        {
          title: "Deepfake video discussion starter",
          embedUrl: "https://www.youtube.com/embed/WSStTnoSb_c"
        },
        {
          title: "Deepfake awareness video",
          embedUrl: "https://www.youtube.com/embed/d04vPyO2AoA"
        }
      ]
    },
    {
      id: 6,
      title: "Developing AI Skills",
      summary: "Practice communicating clearly with AI and understanding where AI can fail.",
      requirement: "Discuss how AI learns and its limitations, identify ways to communicate with AI, explain prompt engineering, and demonstrate clear school-related prompts.",
      completionNote: "Complete all parts: 6a through 6d.",
      requirementDetails: [
        "6a. Discuss the learning process for AI and its limitations.",
        "6b. Identify five methods of how to effectively communicate with AI.",
        "6c. Explain the importance of prompt engineering when using AI to create better output.",
        "6d. Demonstrate three examples of writing clear instructions for a school-related task."
      ],
      activities: [
        "Rewrite vague prompts into clear prompts with audience, task, format, and constraints.",
        "Compare outputs from two different prompt styles.",
        "Discuss checking AI output for accuracy."
      ],
      counselorPrompt: "Ask Scouts how they would verify an AI answer before using it for school or Scouting.",
      promptGuidance: {
        source: "Adapted from Microsoft guidance on writing effective prompts for Microsoft 365 Copilot.",
        ingredients: [
          {
            name: "Goal",
            detail: "Tell the AI what you want it to do, such as explain, summarize, compare, edit, brainstorm, or create."
          },
          {
            name: "Context",
            detail: "Give background details the AI needs, including audience, topic, grade level, constraints, or what you already know."
          },
          {
            name: "Source",
            detail: "Point to the information the AI should use, such as notes, a passage, a document, data, or a trusted source."
          },
          {
            name: "Expectations",
            detail: "Describe the format and quality you expect: bullets, table, checklist, length, tone, questions first, or things to avoid."
          }
        ],
        tips: [
          "Use plain, clear language and treat prompting like a conversation.",
          "Ask follow-up questions to improve the answer instead of stopping after the first response.",
          "Use quotation marks around text you want the AI to rewrite, edit, or replace.",
          "Start a new topic when switching tasks so the AI does not mix old context with the new request.",
          "Remember that AI can make mistakes, so verify important facts before using the answer."
        ],
        followUps: [
          "Make that shorter and easier for a sixth grader to understand.",
          "Turn this into a checklist I can use while working.",
          "Ask me three questions before you answer.",
          "What assumptions did you make?",
          "What should I verify before I trust this?"
        ]
      },
      aiTools: [
        {
          name: "Microsoft Copilot",
          url: "https://copilot.microsoft.com",
          note: "Consumer Copilot experience."
        },
        {
          name: "ChatGPT",
          url: "https://chatgpt.com",
          note: "Consumer ChatGPT experience."
        },
        {
          name: "Claude",
          url: "https://claude.ai",
          note: "Consumer Anthropic Claude experience."
        }
      ],
      promptPractice: [
        {
          title: "Explain a concept",
          basic: "Explain artificial intelligence.",
          detailed: "Explain artificial intelligence to a middle school student in 5 short bullet points. Include one everyday example, one school example, and one caution about checking AI answers for accuracy."
        },
        {
          title: "Improve school work",
          basic: "Help me with my science project.",
          detailed: "Act as a project coach. I am planning a science project about renewable energy. Ask me 3 clarifying questions first, then suggest a project outline with a research question, materials, steps, and ways to check whether my results are reliable."
        },
        {
          title: "Plan a Scouting activity",
          basic: "Give me ideas for a patrol activity.",
          detailed: "Suggest 5 patrol activity ideas for Scouts ages 11-14 that can be done in 30 minutes, require simple materials, and include teamwork. For each idea, include the goal, materials, safety reminder, and one reflection question."
        }
      ]
    },
    {
      id: 7,
      title: "Practical Application",
      summary: "Choose either an approved AI project or a short AI lesson for Scouts.",
      requirement: "With counselor approval, complete either an AI project with objectives, data needs, and ethics considerations, or design and teach a short AI lesson.",
      completionNote: "Do one option: 7a or 7b.",
      requirementDetails: [
        "7a. With your counselor's approval, choose an artificial intelligence project based on your personal interest or a community need. Develop a plan outlining the project's objectives, data requirements, and potential ethical considerations. Implement the project using appropriate AI tools, languages, or platforms. Share your project with your counselor and discuss the steps you followed and your experience.",
        "7b. With your counselor's approval, design a short lesson plan on AI and teach it to your patrol or a group of Scouts. Include an AI-generated age-appropriate explanation of AI, examples of AI in everyday life and the workplace, and an interactive demonstration of how Scouts could use AI for a school assignment, Scouting activity, or rank advancement. Share the development process and teaching experience with your counselor."
      ],
      activities: [
        "Use a project plan with goal, users, data, tools, risks, and demo.",
        "For the lesson option, include an explanation, examples, and an interactive demo.",
        "Reflect on what worked, what failed, and what was learned."
      ],
      counselorPrompt: "Confirm the project or lesson is age-appropriate, safe, and grounded in responsible AI use."
    },
    {
      id: 8,
      title: "Career Exploration",
      summary: "Research AI or automation careers and connect them to skills, training, and future goals.",
      requirement: "Research three AI or automation careers and study one in depth, or interview an AI or automation professional.",
      completionNote: "Do one option: 8a or 8b.",
      requirementDetails: [
        {
          text: "8a. Identify three career opportunities that use artificial intelligence or automation. Pick one and research the training, education, certification requirements, experience, and expenses associated with entering the field. Research employment prospects, starting salary, advancement opportunities, and career goals. Discuss what you learned with your counselor and whether you might be interested in this career.",
          worksheet: "worksheets/8a-career-research.html",
          worksheetLabel: "Open 8a career research worksheet"
        },
        {
          text: "8b. Interview an artificial intelligence or automation professional. Learn about their day-to-day work, challenges, and vision for the future of AI or automation. Ask about training, education, certification requirements, experience, and expenses associated with entering the field. Share what you learned with your counselor.",
          worksheet: "worksheets/8b-professional-interview.html",
          worksheetLabel: "Open 8b interview worksheet"
        }
      ],
      activities: [
        "Compare careers by skills, training, certifications, salary, and advancement paths.",
        "Prepare interview questions about daily work, challenges, and future trends.",
        "Discuss whether the career sounds interesting and why."
      ],
      counselorPrompt: "Encourage Scouts to include both technical and nontechnical AI-related careers.",
      careerOptions: [
        {
          title: "Machine Learning Engineer",
          summary: "Builds systems that learn from data and improve predictions or recommendations.",
          details: ["Common skills: programming, math, data modeling, testing.", "Research: education paths, Python, model training, responsible AI practices."]
        },
        {
          title: "Data Scientist",
          summary: "Uses data to find patterns, answer questions, and support decisions.",
          details: ["Common skills: statistics, visualization, coding, communication.", "Research: data analysis tools, college majors, portfolio projects, salary ranges."]
        },
        {
          title: "Robotics Engineer",
          summary: "Designs robots and automated machines that sense, move, and complete tasks.",
          details: ["Common skills: engineering, sensors, programming, safety testing.", "Research: robotics clubs, mechanical/electrical engineering, automation careers."]
        },
        {
          title: "Automation Specialist",
          summary: "Creates workflows that reduce repetitive work in offices, factories, or service teams.",
          details: ["Common skills: process mapping, scripting, workflow tools, troubleshooting.", "Research: business process automation, RPA, certifications, industries that use automation."]
        },
        {
          title: "AI Product Manager",
          summary: "Helps teams decide what AI products should do and whether they are useful and responsible.",
          details: ["Common skills: planning, user research, communication, ethics, prioritization.", "Research: product management, user-centered design, AI safety reviews."]
        },
        {
          title: "Cybersecurity Analyst",
          summary: "Protects systems and uses automation or AI tools to detect threats faster.",
          details: ["Common skills: networks, investigation, risk thinking, clear reporting.", "Research: security certifications, incident response, AI in threat detection."]
        },
        {
          title: "AI Ethics or Policy Analyst",
          summary: "Studies how AI affects people and recommends rules for safe and fair use.",
          details: ["Common skills: research, writing, law/policy awareness, bias and privacy analysis.", "Research: responsible AI, privacy laws, public policy, digital citizenship."]
        },
        {
          title: "Prompt Engineer / AI Workflow Designer",
          summary: "Designs prompts and repeatable AI workflows that help people get useful results.",
          details: ["Common skills: clear writing, testing, subject knowledge, process design.", "Research: prompt patterns, evaluation methods, AI tool limitations."]
        },
        {
          title: "AI Research Scientist",
          summary: "Investigates new AI methods and publishes discoveries that may shape future tools.",
          details: ["Common skills: advanced math, experiments, coding, reading research papers.", "Research: graduate education, research labs, machine learning papers, long-term career paths."]
        }
      ]
    }
  ],
  careerWorksheets: {
    "8a": {
      title: "Requirement 8a Career Research Worksheet",
      subtitle: "Research three AI or automation careers and study one in depth.",
      instructions: [
        "Use this worksheet to organize your research before discussing Requirement 8a with your counselor.",
        "Research three careers first, then pick one career to study in more detail.",
        "Use reliable sources such as BLS, O*NET, college program pages, certification providers, company career pages, or interviews with professionals."
      ],
      sections: [
        {
          title: "Scout information",
          prompts: ["Name", "Date", "Merit badge counselor", "Troop / unit"]
        },
        {
          title: "Three career opportunities",
          prompts: ["Career 1: title, what the person does, and why it uses AI or automation", "Career 2: title, what the person does, and why it uses AI or automation", "Career 3: title, what the person does, and why it uses AI or automation"]
        },
        {
          title: "Career selected for deeper research",
          prompts: ["Career title", "Why I chose this career", "Typical day-to-day responsibilities", "Training, education, or degree requirements", "Certifications or licenses, if any", "Experience or portfolio expectations", "Expenses associated with entering the field", "Employment prospects / job outlook", "Starting salary or wage information and source", "Advancement opportunities", "Long-term career goals this role could support"]
        },
        {
          title: "Sources used",
          prompts: ["Source 1", "Source 2", "Source 3"]
        },
        {
          title: "Reflection",
          prompts: ["What surprised me", "What sounds interesting", "What sounds challenging", "Would I be interested in this career? Why or why not?", "Questions I still have for my counselor"]
        }
      ]
    },
    "8b": {
      title: "Requirement 8b AI or Automation Professional Interview Worksheet",
      subtitle: "Interview an AI or automation professional and summarize what you learned.",
      instructions: [
        "Use this worksheet before, during, and after your interview.",
        "Ask permission before recording or quoting someone.",
        "Do not share private company information; summarize what the professional is comfortable discussing."
      ],
      sections: [
        {
          title: "Scout and interview information",
          prompts: ["Name", "Date", "Professional interviewed", "Job title / organization", "How the interview was conducted"]
        },
        {
          title: "Interview questions",
          prompts: ["What does your day-to-day work look like?", "How do you use AI or automation in your job?", "What problems are you trying to solve?", "What tools, platforms, or systems do you commonly use?", "What are the biggest challenges in your work?", "How do ethics, safety, privacy, or bias show up in your work?", "What education, training, certifications, or experience helped you enter this field?", "What expenses should someone expect when preparing for this career?", "What changes do you expect in AI or automation in the future?", "What advice would you give a Scout interested in this career?"]
        },
        {
          title: "Interview notes",
          prompts: ["Most important things I learned", "Skills this professional uses", "Challenges they described", "Their vision for the future of AI or automation", "Training or education recommendations", "Career advice they gave me"]
        },
        {
          title: "Reflection",
          prompts: ["What interested me most", "What surprised me", "Would I want to learn more about this career? Why or why not?", "What I will share with my counselor"]
        }
      ]
    }
  },
  aiOrNot: [
    {
      title: "Basic Calculator",
      scenario: "A calculator performs math operations exactly as programmed.",
      answer: "Not AI",
      explanation: "It follows fixed rules and does not learn, adapt, or recognize patterns.",
      discuss: ["What would need to change for this to become AI?", "How is fixed programming different from learning?"]
    },
    {
      title: "Smart Chess Program",
      scenario: "A chess program studies past games and improves its strategy over time.",
      answer: "AI",
      explanation: "It uses past examples to improve future decisions.",
      discuss: ["What data does it use?", "How is this different from a calculator?"]
    },
    {
      title: "Weather Prediction App",
      scenario: "A weather app updates forecasts by comparing predictions with actual outcomes.",
      answer: "AI",
      explanation: "It recognizes patterns in data and improves predictions based on results.",
      discuss: ["How can better forecasts help with outdoor planning?", "What kinds of data matter?"]
    },
    {
      title: "Digital Alarm Clock",
      scenario: "An alarm clock rings at the time a person set.",
      answer: "Not AI",
      explanation: "It is a simple time-based trigger without learning or adaptation.",
      discuss: ["What would make an alarm clock smart?", "Could it adapt to your sleep habits?"]
    },
    {
      title: "Music Recommendation System",
      scenario: "A streaming service suggests songs based on what someone listens to and skips.",
      answer: "AI",
      explanation: "It learns patterns in listening behavior to make personalized recommendations.",
      discuss: ["What patterns might it identify?", "What could go wrong with recommendations?"]
    },
    {
      title: "Fixed Traffic Light",
      scenario: "A traffic light changes colors on the same schedule all day.",
      answer: "Not AI",
      explanation: "It follows a preset timing cycle and does not respond to current conditions.",
      discuss: ["What sensors would make it more adaptive?", "How could AI improve traffic flow?"]
    },
    {
      title: "Smart Traffic Management",
      scenario: "Traffic lights adjust timing based on current traffic patterns.",
      answer: "AI",
      explanation: "The system analyzes real-time patterns and adapts its decisions.",
      discuss: ["What data should it collect?", "How should it handle special events?"]
    },
    {
      title: "Automatic Store Door",
      scenario: "A door opens when a motion sensor detects someone nearby.",
      answer: "Not AI",
      explanation: "It is a sensor-triggered response without learning.",
      discuss: ["How is a sensor different from AI?", "What would make the door smarter?"]
    },
    {
      title: "Smart Home Security",
      scenario: "A home security system learns household routines and flags unusual activity.",
      answer: "AI",
      explanation: "It learns normal patterns and detects anomalies.",
      discuss: ["What privacy concerns exist?", "How should false alarms be handled?"]
    },
    {
      title: "Scheduled Sprinklers",
      scenario: "Sprinklers turn on every morning at the same time.",
      answer: "Not AI",
      explanation: "They use a timer and do not adapt to weather, soil, or plant needs.",
      discuss: ["How could the system save water?", "What data would make it smarter?"]
    },
    {
      title: "Smart Irrigation",
      scenario: "Sprinklers adjust watering based on soil moisture, forecasts, and plant needs.",
      answer: "AI",
      explanation: "The system combines multiple data sources to make adaptive decisions.",
      discuss: ["What factors influence watering?", "How does this support conservation?"]
    },
    {
      title: "Vending Machine",
      scenario: "A machine dispenses a snack after receiving payment and a selection.",
      answer: "Not AI",
      explanation: "It is a fixed input-output system.",
      discuss: ["What would make it smart?", "How could AI improve stocking choices?"]
    },
    {
      title: "Language Translation App",
      scenario: "A translation app improves when users correct its translations.",
      answer: "AI",
      explanation: "It learns from feedback and context to improve language output.",
      discuss: ["How does it handle new phrases?", "Why does context matter?"]
    },
    {
      title: "Digital Thermostat",
      scenario: "A thermostat turns heat or cooling on to maintain one set temperature.",
      answer: "Not AI",
      explanation: "It uses a fixed control rule and does not learn preferences.",
      discuss: ["How could AI improve energy use?", "What patterns could it learn?"]
    },
    {
      title: "Formula Homework Helper",
      scenario: "An app solves math problems by applying fixed formulas.",
      answer: "Not AI",
      explanation: "It follows programmed steps without understanding or adaptation.",
      discuss: ["What are its limits?", "How is an algorithm different from AI?"]
    },
    {
      title: "Smart Study Tutor",
      scenario: "A tutoring app adapts lessons based on a student's answers and pace.",
      answer: "AI",
      explanation: "It personalizes instruction by learning from student responses.",
      discuss: ["How could it spot struggle areas?", "What should a teacher still review?"]
    },
    {
      title: "Automatic Hand Dryer",
      scenario: "A hand dryer turns on when hands are placed under a sensor.",
      answer: "Not AI",
      explanation: "It uses a simple trigger-response sensor.",
      discuss: ["What type of sensor might it use?", "What would make it adaptive?"]
    },
    {
      title: "Smart Energy Monitor",
      scenario: "A home system studies energy usage and suggests ways to save power.",
      answer: "AI",
      explanation: "It analyzes patterns and recommends optimizations.",
      discuss: ["What patterns does it analyze?", "How does this save energy?"]
    },
    {
      title: "Fixed Manufacturing Line",
      scenario: "A factory line assembles products in the same sequence every time.",
      answer: "Not AI",
      explanation: "It is programmed automation without adaptation.",
      discuss: ["What would make it smart?", "When is fixed automation useful?"]
    },
    {
      title: "Quality Control Vision System",
      scenario: "A manufacturing system learns from examples to spot product defects.",
      answer: "AI",
      explanation: "It learns to recognize patterns that indicate defects.",
      discuss: ["How does it learn from examples?", "What happens with a new defect type?"]
    }
  ],
  ethics: [
    {
      title: "School Admissions",
      scenario: "An AI system ranks students for a selective school program using grades, test scores, activities, and historical admissions data.",
      choices: ["Use the AI ranking as-is", "Require human review and an appeals process", "Stop using AI entirely", "Ask for more fairness data first"],
      guide: "Fairness depends on data quality, bias checks, transparency, human oversight, and a way for students to appeal.",
      scoutLaw: ["Trustworthy", "Kind"],
      discuss: ["How can the system be audited?", "What role should humans play?", "How should individual circumstances be considered?"]
    },
    {
      title: "Emergency Room Prioritization",
      scenario: "A hospital wants AI to help prioritize emergency patients based on symptoms, vital signs, medical history, and risk factors.",
      choices: ["Let AI decide the order", "Use AI as advice for trained staff", "Only use first-come, first-served", "Use AI only for non-urgent cases"],
      guide: "Life-or-death contexts need human judgment, override procedures, backup plans, and clear accountability.",
      scoutLaw: ["Helpful", "Courteous", "Kind", "Brave"],
      discuss: ["Who is responsible for mistakes?", "When should staff override the AI?", "What backup is needed?"]
    },
    {
      title: "Predictive Policing",
      scenario: "A police department uses AI to predict high-crime areas from historical data and assign patrols.",
      choices: ["Deploy patrols wherever AI predicts", "Review for bias before deployment", "Publish methods and oversight rules", "Reject the system until community input happens"],
      guide: "Historical data may reflect biased enforcement. Community trust, transparency, oversight, and limits on use matter.",
      scoutLaw: ["Trustworthy", "Loyal", "Helpful", "Brave"],
      discuss: ["How can communities be treated fairly?", "What data should be off-limits?", "What oversight should exist?"]
    },
    {
      title: "AI Essay Grading",
      scenario: "A school uses AI to grade essays for writing mechanics, understanding, creativity, and learning objectives.",
      choices: ["Let AI assign final grades", "Use AI feedback but teacher final review", "Use AI only for grammar suggestions", "Create an appeals path for students"],
      guide: "Creativity, culture, language, and context are hard to grade automatically. Teachers should stay involved.",
      scoutLaw: ["Trustworthy", "Helpful", "Kind"],
      discuss: ["How can creativity be judged fairly?", "How should cultural differences be handled?", "What appeals process is fair?"]
    },
    {
      title: "Environmental Resource AI",
      scenario: "A city uses AI to recommend water usage, energy distribution, and waste management decisions.",
      choices: ["Prioritize conservation above all", "Balance environment, community, and cost", "Let elected leaders override AI", "Ask residents for input before launch"],
      guide: "Good decisions balance conservation, community needs, economic impact, and future generations.",
      scoutLaw: ["Thrifty", "Clean", "Helpful"],
      discuss: ["How should competing needs be balanced?", "Who gets a voice?", "How can fairness be measured?"]
    },
    {
      title: "Youth Platform Moderation",
      scenario: "A youth platform uses AI to filter inappropriate content and flag harmful interactions.",
      choices: ["Filter aggressively", "Use AI plus human moderators", "Let users appeal removals", "Show warnings instead of removing content"],
      guide: "Safety matters, but context, privacy, false positives, and fair appeals matter too.",
      scoutLaw: ["Clean", "Courteous", "Friendly", "Brave"],
      discuss: ["How strict should filters be?", "What should happen after a false flag?", "When should humans review content?"]
    },
    {
      title: "Autonomous Vehicle Safety",
      scenario: "A self-driving vehicle must make fast decisions during possible accidents.",
      choices: ["Protect passengers first", "Minimize total harm", "Follow traffic law only", "Require human driver takeover"],
      guide: "Safety priorities, legal responsibility, risk balancing, and testing standards must be clear before deployment.",
      scoutLaw: ["Trustworthy", "Helpful", "Brave", "Loyal"],
      discuss: ["How should priorities be programmed?", "Who is responsible?", "How should risks be tested?"]
    },
    {
      title: "Loan Approval",
      scenario: "A bank uses AI to approve or deny loans based on credit history, income, debt, and financial patterns.",
      choices: ["Trust the model output", "Require explanations for denials", "Offer human review for edge cases", "Audit for demographic bias"],
      guide: "Access to credit affects opportunity. The process needs explainability, fairness audits, appeals, and human review.",
      scoutLaw: ["Trustworthy", "Thrifty", "Helpful"],
      discuss: ["How can bias be prevented?", "What should applicants be told?", "How should special circumstances count?"]
    },
    {
      title: "Job Application Screening",
      scenario: "A company uses AI to screen resumes and rank candidates before interviews.",
      choices: ["Interview only top AI-ranked candidates", "Audit the model for bias", "Keep a human recruiter in the loop", "Tell applicants how AI is used"],
      guide: "Hiring systems should support equal opportunity, transparency, human oversight, and respectful treatment.",
      scoutLaw: ["Friendly", "Kind", "Helpful"],
      discuss: ["How can fairness be checked?", "What should applicants know?", "What should humans decide?"]
    },
    {
      title: "Personalized Data Collection",
      scenario: "An app collects personal data to personalize services and improve its AI model.",
      choices: ["Collect all useful data", "Collect only what is necessary", "Let users opt in and delete data", "Explain data use in plain language"],
      guide: "Privacy requires consent, limits, security, transparency, and user control.",
      scoutLaw: ["Trustworthy", "Loyal", "Courteous"],
      discuss: ["What data is truly needed?", "How should it be protected?", "What control should users have?"]
    }
  ]
};
