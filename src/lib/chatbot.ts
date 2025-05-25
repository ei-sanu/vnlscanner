interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotResponse {
  message: string;
  relatedTopics?: string[];
}

// Simple in-memory knowledge base for the educational chatbot
const knowledgeBase = {
  "ethical hacking": {
    responses: [
      "Ethical hacking involves authorized testing of computer systems to identify security vulnerabilities. Unlike malicious hacking, ethical hackers work with permission to improve security.",
      "Ethical hackers (also called 'white hat' hackers) use the same tools and techniques as malicious hackers, but they work to strengthen systems rather than exploit them.",
      "To become an ethical hacker, you need strong technical skills, knowledge of various operating systems, networking, and programming, plus formal certifications like CEH or OSCP."
    ],
    relatedTopics: ["penetration testing", "bug bounty", "security testing"]
  },
  
  "darkweb": {
    responses: [
      "The dark web is a part of the internet that requires special software (like Tor) to access. It's known for anonymity and unfortunately hosts some illegal activities.",
      "Not everything on the dark web is illegal - it also provides anonymity for journalists, political dissidents, and privacy-focused individuals in restrictive regions.",
      "The dark web is different from the deep web. The deep web simply refers to parts of the internet not indexed by search engines, like private email accounts or subscription services."
    ],
    relatedTopics: ["tor network", "anonymity", "cybercrime"]
  },
  
  "network security": {
    responses: [
      "Network security involves protecting the integrity, confidentiality, and accessibility of computer networks and data. It combines hardware, software, and policies.",
      "Key components of network security include firewalls, intrusion detection systems, VPNs, and regular security audits.",
      "Effective network security requires a defense-in-depth approach, with multiple layers of protection rather than relying on a single security measure."
    ],
    relatedTopics: ["firewall", "intrusion detection", "vpn", "zero trust"]
  },
  
  "web vulnerabilities": {
    responses: [
      "Common web vulnerabilities include XSS (Cross-Site Scripting), SQL injection, CSRF (Cross-Site Request Forgery), and broken authentication.",
      "The OWASP Top 10 is a standard awareness document that represents the most critical security risks to web applications.",
      "Regular security testing and following secure coding practices are essential for preventing web vulnerabilities."
    ],
    relatedTopics: ["xss", "sql injection", "csrf", "owasp top 10"]
  },
  
  "penetration testing": {
    responses: [
      "Penetration testing (pen testing) is an authorized simulated attack on a computer system to evaluate its security. It helps identify vulnerabilities before malicious hackers do.",
      "Pen testing typically follows a methodology: reconnaissance, scanning, gaining access, maintaining access, and analysis/reporting.",
      "Types of pen tests include black box (no prior knowledge), white box (full information), and gray box (limited information)."
    ],
    relatedTopics: ["ethical hacking", "vulnerability assessment", "security testing"]
  },
  
  "cybersecurity basics": {
    responses: [
      "Cybersecurity fundamentals include using strong, unique passwords, enabling two-factor authentication, keeping software updated, and being cautious about phishing attempts.",
      "The CIA triad (Confidentiality, Integrity, Availability) forms the core principles of information security.",
      "Everyone should practice basic cyber hygiene: regular backups, using antivirus software, encrypting sensitive data, and being careful about what you share online."
    ],
    relatedTopics: ["password security", "phishing", "data protection"]
  },
  
  "social engineering": {
    responses: [
      "Social engineering attacks manipulate people into breaking security procedures or revealing sensitive information through psychological manipulation rather than technical hacking.",
      "Common social engineering techniques include phishing, pretexting (creating a fabricated scenario), baiting, and tailgating (following someone into a secure area).",
      "The best defense against social engineering is security awareness training and creating a culture where employees feel comfortable verifying unusual requests."
    ],
    relatedTopics: ["phishing", "pretexting", "security awareness"]
  },
  
  "secure coding": {
    responses: [
      "Secure coding practices help developers build software that's resistant to attacks by following principles like input validation, proper authentication, and secure error handling.",
      "OWASP provides guidelines and checklists for secure coding in different programming languages and frameworks.",
      "Automated security tools like SAST (Static Application Security Testing) and DAST (Dynamic Application Security Testing) can help identify security flaws during development."
    ],
    relatedTopics: ["code review", "devsecops", "secure sdlc"]
  }
};

// Function to find the best matching topic from the knowledge base
function findBestMatch(query: string): string | null {
  query = query.toLowerCase();
  
  // Direct match
  for (const topic in knowledgeBase) {
    if (query.includes(topic)) {
      return topic;
    }
  }
  
  // Check for related topics
  for (const topic in knowledgeBase) {
    const relatedTopics = knowledgeBase[topic as keyof typeof knowledgeBase].relatedTopics || [];
    for (const relatedTopic of relatedTopics) {
      if (query.includes(relatedTopic)) {
        return topic;
      }
    }
  }
  
  return null;
}

// Main function to generate chatbot responses
export function generateResponse(query: string): ChatbotResponse {
  const lowercaseQuery = query.toLowerCase();
  const bestMatch = findBestMatch(lowercaseQuery);
  
  if (bestMatch) {
    const topicInfo = knowledgeBase[bestMatch as keyof typeof knowledgeBase];
    const responses = topicInfo.responses;
    const randomIndex = Math.floor(Math.random() * responses.length);
    
    return {
      message: responses[randomIndex],
      relatedTopics: topicInfo.relatedTopics
    };
  }
  
  // Default response if no match
  return {
    message: "I'm not sure about that specific topic. I can provide information about ethical hacking, web vulnerabilities, network security, the dark web, penetration testing, and other cybersecurity topics. Feel free to ask about any of these areas!",
    relatedTopics: ["ethical hacking", "web vulnerabilities", "network security", "penetration testing"]
  };
}

// Initialize a conversation history
export const createNewChat = (): Message[] => {
  return [{
    role: 'bot',
    content: "Hi! I'm the VNL Security Assistant. I can help you learn about cybersecurity topics like ethical hacking, web vulnerabilities, network security, and more. What would you like to know about?",
    timestamp: new Date()
  }];
};

// Add a message to the conversation history
export const addMessage = (
  history: Message[],
  role: 'user' | 'bot',
  content: string
): Message[] => {
  return [
    ...history,
    {
      role,
      content,
      timestamp: new Date()
    }
  ];
};