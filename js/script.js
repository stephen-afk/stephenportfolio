// Theme toggle and profile pic update
const themeToggle = document.getElementById("themeToggle");
const profilePic = document.getElementById("profilePic");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

// ============================================
// SEND EMAIL FUNCTION
// ============================================
function sendEmail() {
  const email = "stephenbrenanteves@gmail.com";
  const subject = encodeURIComponent("Hello Stephen");
  const body = encodeURIComponent("Hi Stephen,\n\nI want to ask about your portfolio...");
  
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}


// Dark mode toggle with localStorage persistence
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      themeToggle.querySelector(".icon").textContent = "☀️";
      if (profilePic) profilePic.src = "assets/profile-close.png";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.querySelector(".icon").textContent = "🌙";
      if (profilePic) profilePic.src = "assets/profile-open.png";
      localStorage.setItem("theme", "light");
    }
  });
}

// Load saved theme on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.querySelector(".icon").textContent = "☀️";
    if (profilePic) profilePic.src = "assets/profile-close.png";
  }
});

// Hamburger menu toggle
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

// Close menu when clicking a link
if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        // Reset hamburger icon
        const spans = hamburger.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  });
}

// Active navigation highlighting
const sections = document.querySelectorAll("section");
const highlightNav = () => {
  let scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
  // Special case for hero section
  if (window.scrollY < 100) {
    navLinks.forEach(link => link.classList.remove("active"));
  }
};
window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

// Smooth scroll behavior
if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (navMenu && navMenu.classList.contains("active") && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove("active");
    // Reset hamburger icon
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// ============================================
// CHATBOX FUNCTIONALITY
// ============================================

const chatWidget = document.querySelector(".chat-widget");
const chatToggle = document.getElementById("chatToggle");
const chatMinimize = document.getElementById("chatMinimize");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

// Toggle chat window
if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    if (chatWidget) chatWidget.classList.toggle("active");
    if (chatInput && chatWidget.classList.contains("active")) chatInput.focus();
  });
}

// Minimize chat
if (chatMinimize) {
  chatMinimize.addEventListener("click", () => {
    if (chatWidget) chatWidget.classList.remove("active");
  });
}

// ============================================
// SMART CHATBOT KNOWLEDGE BASE
// ============================================

const knowledgeBase = {
  name: "Stephen Brenan Teves",
  role: "IT student at Polytechnic University of the Philippines",

  about: "Stephen is an IT student passionate about technology, databases, and mobile development. He values teamwork, responsibility, and continuous learning.",

  skills: "HTML & CSS, Basic Java, MySQL, Database Management, Database Security, MS Office, Visual Studio, Sublime Text",

  education: "Currently studying Diploma in Information Technology at PUP. Senior High: AMA Computer College East Rizal – ICT Strand.",

  experience: "Senior High OJT at Sto. Niño Barangay Hall (administrative tasks). College OJT at Cepat Kredit handling tech support, QA, and procurement.",

  projects: "Electronic Health Record System, Bank Management Database System, and an ongoing Capstone Mobile Application.",

  projectDetails: {
    "Electronic Health Record System": "A web-based system for managing patient records securely using MySQL.",
    "Bank Management Database System": "Database project using MySQL to manage bank accounts, transactions, and security features.",
    "Capstone Mobile Application": "Ongoing mobile app development project using Flutter and Dart for service booking."
  },

  email: "stephenbrenanteves@gmail.com",
  phone: "0910-059-6236",
  facebook: "https://www.facebook.com/share/1GnWfXnpQc/",
  location: "Zone 12A Baybay Sapa Mayamot Antipolo City Unit 1"
};

// ============================================
// INTELLIGENT RESPONSE MATCHING (ENHANCED)
// ============================================

// Keyword-to-answer mapping
const knowledgeMap = [
  { keywords: ["name"], answer: () => `My name is ${knowledgeBase.name}.` },
  { keywords: ["about", "who are you", "yourself"], answer: () => knowledgeBase.about },
  { keywords: ["skill", "skills", "abilities", "expertise"], answer: () => `Stephen's skills include: ${knowledgeBase.skills}` },
  { keywords: ["education", "school", "study", "college"], answer: () => knowledgeBase.education },
  { keywords: ["experience", "ojt", "internship"], answer: () => knowledgeBase.experience },
  { keywords: ["project", "projects", "portfolio"], answer: () => knowledgeBase.projects },
  { keywords: ["email", "contact","mail"], answer: () => `You can email Stephen at ${knowledgeBase.email}`,  },
  { keywords: ["phone", "number", "mobile"], answer: () => `Stephen's phone number is ${knowledgeBase.phone}` },
  { keywords: ["location", "address", "city"], answer: () => `Stephen is located at ${knowledgeBase.location}` },
  { keywords: ["facebook", "fb"], answer: () => `Stephen's Facebook is ${knowledgeBase.facebook}`,  },
  { keywords: ["hello", "hi", "hey"], answer: () => "Hello! You can ask me about kay teptep pero syempre kung ano lang yung andito sa portfolio niya:>" },
  { keywords: ["thankyou", "salamat", "ty"], answer: () => "Okay bes salamat den sayo!" },
  { keywords: ["okay", "sige", "go"], answer: () => "gowch bes" }
];

// Get current time
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Add message to chat
function addMessage(text, isUser = false) {
  if (!chatMessages) return;
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
  messageDiv.innerHTML = `
    <div class="message-content">
      <p>${text}</p>
    </div>
    <span class="message-time">${getCurrentTime()}</span>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  if (!chatMessages) return null;
  const typingDiv = document.createElement("div");
  typingDiv.className = "chat-message bot-message typing-message";
  typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingDiv;
}

// ============================================
// ENHANCED BOT RESPONSE FUNCTION
// ============================================

function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  // Check for specific project details
  for (let project in knowledgeBase.projectDetails) {
    if (msg.includes(project.toLowerCase())) {
      return knowledgeBase.projectDetails[project];
    }
  }

  // General keyword matching
  for (let entry of knowledgeMap) {
    if (entry.keywords.some(kw => msg.includes(kw))) {
      return entry.answer();
    }
  }
  
  // Fallback with suggestion
  return "Ibang tanong bes di ko alam yan, di ako ai naka program lang isasagot ko sayo HAHAHAH!";
}

// Handle sending messages
function sendMessage() {
  if (!chatInput) return;
  const message = chatInput.value.trim();
  if (message === "") return;
  addMessage(message, true);
  chatInput.value = "";
  const typingIndicator = showTypingIndicator();

  // Typing delay proportional to message length
  const typingTime = Math.min(2000, message.length * 50); // 50ms per character, max 2s

  setTimeout(() => {
    if (typingIndicator) typingIndicator.remove();
    const botResponse = getBotResponse(message);
    addMessage(botResponse, false);
  }, typingTime);
}

// Send message on button click
if (chatSend) chatSend.addEventListener("click", sendMessage);

// Send message on Enter key
if (chatInput) {
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

// Close chat when clicking outside
document.addEventListener("click", (e) => {
  if (chatWidget && chatWidget.classList.contains("active") && !chatWidget.contains(e.target)) {
    chatWidget.classList.remove("active");
  }
});

// Prevent chat from closing when clicking inside
if (chatWidget) {
  chatWidget.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}
