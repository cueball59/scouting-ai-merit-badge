const SITE_DATA = {
  officialRequirementsUrl: "https://www.scouting.org/merit-badges/artificial-intelligence/",
  counselorUrl: "https://filestore.scouting.org/filestore/Merit_Badge_ReqandRes/Note-to-Counselor-Artificial-Intelligence-(AI)-Merit-Badge.pdf",
  requirements: [
    {
      id: 1,
      title: "Key Concepts",
      summary: "Define the core vocabulary Scouts need before discussing artificial intelligence and automation.",
      requirement: "Share the meaning of AI, agents, automation, programming, bots, data, databases, digital workers, machine learning, workflows, variables, and related terms with your counselor.",
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
      activities: [
        "Run the AI or Not? game with the group.",
        "Have Scouts sort examples into home, workplace, and school categories.",
        "Make a five-milestone AI timeline."
      ],
      counselorPrompt: "When Scouts say something is AI, ask what data it uses and whether it learns or adapts.",
      gameLink: "games/ai-or-not.html",
      gameName: "AI or Not?"
    },
    {
      id: 3,
      title: "Automation Basics",
      summary: "Separate simple automation from AI and explain how automated systems reduce repetitive effort.",
      requirement: "Identify automation examples in daily life, work, and school; explain how automation performs repetitive tasks; and create an automation timeline.",
      activities: [
        "Compare a timer, sensor, checklist, and adaptive system.",
        "List repetitive tasks Scouts see at home or school.",
        "Discuss where automation helps and where human review still matters."
      ],
      counselorPrompt: "Ask Scouts to explain the trigger, task, and outcome for each automation example."
    },
    {
      id: 4,
      title: "Ethics in AI",
      summary: "Explore bias, privacy, accountability, and responsible decision making with real-world scenarios.",
      requirement: "Research ethical concerns and responsible AI use, play five rounds of the What Would You Do? game, develop AI guidelines, and explain the Turing test.",
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
      activities: [
        "Rewrite vague prompts into clear prompts with audience, task, format, and constraints.",
        "Compare outputs from two different prompt styles.",
        "Discuss checking AI output for accuracy."
      ],
      counselorPrompt: "Ask Scouts how they would verify an AI answer before using it for school or Scouting.",
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
      activities: [
        "Compare careers by skills, training, certifications, salary, and advancement paths.",
        "Prepare interview questions about daily work, challenges, and future trends.",
        "Discuss whether the career sounds interesting and why."
      ],
      counselorPrompt: "Encourage Scouts to include both technical and nontechnical AI-related careers."
    }
  ],
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
