export const ListOfQuestions = [
  {
    id: 1,
    question: "You receive a phone call from someone claiming to be a representative from your bank. They sound convincing and mention that there has been suspicious activity on your account. They ask for your personal information, including your social security number and account details. What should you do in this situation?",
    answers: [
      {
        text: "Provide the caller with the requested information to resolve the issue quickly.",
        correct: false,
      },
      {
        text: "Hang up the phone and call your bank's official customer support line to verify the call's legitimacy",
        correct: true,
      },
      {
        text: "Ignore the call and hope that it was just a random occurrence.",
        correct: false,
      },
      {
        text: "Transfer your funds to a different bank account as a precaution.",
        correct: false,
      },
    ],
    chats: [
      {
        in: "Hello?",
        out: "Good afternoon, this is Kelvin from your bank. We have detected suspicious activity on your account and need to verify your information. Can you confirm your social security number and account details?",
      },
      {
        in: "Can you verify your identity first?",
        out: "I'm calling from your bank's security department. You can verify my identity by providing the last four digits of your account number.",
      },
      {
        in: "I'm not comfortable providing this information over the phone. I'll visit the bank or call customer service to discuss my account.",
        out: "It's important to resolve this quickly. We can assist you now if you provide the information.",
      },
      {
        in: "I prefer to follow security protocols. Can you provide the bank's customer service number?",
        out: "The number is 555-1234. Please contact them for assistance.",
      },
      {
        in: "Thank you. It's important to stay vigilant against scams. I appreciate your understanding.",
        out: "Absolutely. If you have any other concerns, contact the official customer service line.",
      },
      {
        in: "I will, thank you. Take care.",
        out: "...",
      },

    ],
    chatPerson: {
      in: "Tom",
      out: "Caller"
    },
    chatTopic: "Social Engineering Phone Calls",

    chatFacts: [
      "Some scammers use voice morphing software to mimic the voices of authority figures or loved ones to enhance the effectiveness of their social engineering phone calls.",
      "<i>Vishing</i> is a term used to describe voice phishing, where scammers use social engineering techniques over the phone to deceive individuals into revealing sensitive information.",
      "Social engineering phone calls often employ persuasive tactics, such as creating a sense of urgency or offering fake rewards, to trick individuals into revealing sensitive information.",
    ]

  },
  {
    id: 2,
    question:
      "Engrossed in a movie marathon at home, I receive a call from my best friend. Answering with excitement, the voice on the other end feels off and starts asking for personal details, leaving me feeling suspicious. Your Answer...",
    answers: [
      {
        text: "Provide the caller with the requested personal details since they seem to know my friend's information",
        correct: false,
      },
      {
        text: "Continue the conversation cautiously, but avoid sharing any sensitive information until I can verify the caller's identity through a separate channel.",
        correct: true,
      },
      {
        text: "End the call immediately and block the number to prevent any further contact.",
        correct: false,
      },
      {
        text: "Confront the caller and demand an explanation for the deceptive phone call.",
        correct: false,
      },
    ],
    chats: [
      {
        in: " <i> (📞 Phone rings...) </i>",
        out: "...",
      },
      {
        in: "Oh, it's Mary! Hey, Mary! How's it going?",
        out: "Hi, Bob. I need your help with something. Can you quickly provide me with your home address? I seem to have misplaced it.",
      },
      {
        in: "<i>(🙃  Feeling something off... 👾) </i>  Wait a minute, Mary. Your voice sounds a bit different. Is everything alright?",
        out: "Oh, I have a cold, that's why my voice might sound different. It's urgent, Bob. I really need your address.",
      },
      {
        in: "Hold on, Mary. I need to make sure it's really you. Let me ask you a question only you would know the answer to. What was the name of our childhood pet?",
        out: "...",
      },
      {
        in: "...",
        out: "...",
      },

    ],
    chatPerson: {
      in: "Bob",
      out: "Caller"
    },
    chatTopic: "Spoofing Tool and Caller ID Manipulation",

    chatFacts: [
      "Spoofing tools can be used to manipulate Caller ID and display a different phone number or name on the recipient's phone.",
      "Deepfake technology, a form of AI, allows fraudsters to create highly realistic audio or video recordings that can be used to impersonate individuals and manipulate others into believing false information.",
      "In some cases, spoofing tools can even modify the voice of the caller to sound like someone else.",
      "Spoofing tools are often employed in phishing attacks, where scammers impersonate legitimate organizations to deceive individuals.",
    ]


  },
  {
    id: 3,
    question: "Reflecting on the conversation, I realize that I unintentionally disclosed personal details, which now makes me feel uneasy. How could I have better protected my personal information and maintained my privacy during the online conversation?",
    answers: [
      {
        text: "Nothing, it was just a friendly conversation, and there's no harm in sharing personal details with someone I met briefly.",
        correct: false,
      },
      {
        text: "Immediately search for the person's social media profiles to see if they appear trustworthy before sharing any information.",
        correct: false,
      },
      {
        text: "Politely redirect the conversation to more general topics and avoid divulging personal information.",
        correct: true,
      },
      {
        text: "Exchange contact information with the stranger for potential future interactions and networking.",
        correct: false,
      },
    ],
    chats: [
      {
        in: "<i>(💻 Ade chatting online, ⚠️ Receives a message from Lana.)</i>",
        out: "...",
      },
      {
        in: "<i>( 🙂 Smiling 😊)</i> Hi, Ade! Mind if I chat with you?",
        out: "<i>(👋🏾 Nods)</i> Hi! Sure, feel free to chat!",
      },
      {
        in: "Great! So, Ade, how are you doing today? What have you been up to?",
        out: "I'm doing well, thank you! Just taking a break from work and enjoying some online time. How about you?",
      },
      {
        in: "That sounds relaxing! I've been busy with online research and exploring new topics. By the way, what do you do for a living?",
        out: "I work in marketing, specializing in digital advertising strategies. It's an exciting field!",
      },
      {
        in: "Oh, that's interesting! How did you end up in marketing?",
        out: "It's a journey that started with my passion for creativity and connecting with audiences. I can share more if you're interested.",
      },
      {
        in: "<i>(💻 Ade becomes cautious and mindful about sharing personal details.)</i>",
        out: "<i>(🚨 Lana notices Ade's hesitation and changes the topic.)</i> So, have you watched any good movies lately?",
      },

    ],
    chatPerson: {
      in: "Ade",
      out: "Lana"
    },
    chatTopic: "",

    chatFacts: [
      "Deep learning algorithms, a subset of AI, can analyze vast amounts of data to identify patterns and create targeted social engineering strategies tailored to exploit specific vulnerabilities.",
      "AI-powered chatbots are increasingly being used in social engineering attacks to impersonate real individuals and engage in convincing conversations with unsuspecting victims.",
      "Educate individuals about the importance of safeguarding personal information and being cautious about sharing sensitive details online.",
    ]


  },
  {
    id: 4,
    question:
      "I received a distressing phone call from a charity representative, recounting a heartbreaking situation where a family urgently needed financial aid after a tragic event. How should I handle this situation to protect myself from falling victim to emotional manipulation?",
    answers: [
      {
        text: "Act immediately and make a donation without conducting any further research or verification.",
        correct: false,
      },
      {
        text: "Hang up the phone and report the suspicious call to the relevant authorities.",
        correct: false,
      },
      {
        text: "Request detailed information about the organization, including its registration and contact details, to verify its legitimacy before making... ",
        correct: true,
      },
      {
        text: "Share the story with friends and family to gather their opinions and advice before deciding whether to donate.",
        correct: false,
      },
    ],
    chats: [
      {
        in: "Hello?",
        out: "Hi, is this Kira? I'm calling on behalf of Hope for Families, a charity organization. We have an urgent situation and need your help.",
      },
      {
        in: "What's the issue?",
        out: "A family in your community lost their home in a fire and needs financial assistance to recover. Can we count on your support?",
      },
      {
        in: "Hold on. Can you provide more information about your organization?",
        out: "Hope for Families has a 10-year track record of helping families. Our website is hopeforfamilies.org, with registration details available.",
      },
      {
        in: "Thanks. I'll verify your organization's legitimacy before donating. Can I call you back?",
        out: "Sure, take your time. You can reach me at the number displayed. I'll address any concerns you have.",
      },

    ],
    chatPerson: {
      in: "Kira",
      out: "Caller"
    },
    chatTopic: "",

    chatFacts: [
      "AI algorithms can automate the process of profiling individuals based on their online behavior, allowing social engineers to craft more persuasive messages and manipulate their targets more effectively.",
      "Scammers often exploit emotions such as fear, urgency, or sympathy to manipulate individuals into revealing personal information or performing certain actions.",
      "Emotional manipulation techniques have been used for centuries by cult leaders, con artists, and skilled negotiators.",
    ]


  },
  {
    id: 5,
    question: "I received a late evening phone call from a frantic and familiar voice, claiming to be my grandchild, Emily. She pleaded for help, explaining she had been in a car accident and needed money for medical expenses to avoid arrest. She begged me not to inform her parents to spare them from worrying.",
    answers: [
      {
        text: "Panic and immediately offer assistance without asking for more details.",
        correct: false,
      },
      {
        text: "Option B: Calmly ask Emily to explain the situation and gather more information.",
        correct: true,
      },
      {
        text: "__blank__",
        correct: false,
      },
      {
        text: "__blank__",
        correct: false,
      },
    ],
    chats: [
      {
        in: "<italics> (phone rings) </italics>",
        out: "Grandma! Grandma, is that you?",
      },
      {
        in: "Emily? Is that really you? You sound upset. What's going on?",
        out: "Grandma, I'm in trouble. I was driving earlier, and I got into a car accident. It's bad, and I'm injured. I need help right away.",
      },
      {
        in: "Oh no, Emily! Are you okay? Where are you? Should I call your parents? We need to get you the help you need.",
        out: "No, Grandma, please don't tell Mom and Dad yet. I don't want them to worry. The situation is serious, and I need your help right now. Can you wire me some money for medical expenses? If I don't pay, the police will arrest me.",
      },
      {
        in: "Oh dear, that sounds awful, Emily. I want to help you, but I need to make sure this is really you. Can you tell me something only you and I would know?",
        out: "Grandma, please don't doubt me. I'm scared and in pain. I can't think straight. I just need your help. Please don't tell anyone.",
      },
      {
        in: "I understand you're scared, Emily, but I want to make sure I'm not being tricked. I love you so much, and I don't want to fall for a scam. Let's think through this together. Can you give me a moment?",
        out: "Grandma, please hurry. I'm really scared, and I need you to trust me.",
      },

    ],
    chatPerson: {
      in: "Grandma",
      out: "Emily"
    },
    chatTopic: "Grandparent Scam",

    chatFacts: [
      "The grandparent scam preys on the deep love and concern that grandparents have for their grandchildren.",
      "Scammers often research their targets in advance to gather specific information about their family, making their impersonation more believable.",
      "Encourage individuals to maintain a healthy skepticism and critically evaluate requests that invoke strong emotions or urgency.",
      "Advocate for a <i>verify first, trust later</i> approach by independently confirming the legitimacy of requests through trusted channels.",
    ]


  },

];
