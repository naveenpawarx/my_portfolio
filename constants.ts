import { ResumeData, NavLinkItem } from './types';

export const RESUME_DATA: ResumeData = {
  name: "NAVEEN PAWAR",
  contact: {
    phone: "+91-8717975520",
    email: "naveenpawarx@gmail.com",
    location: "Katara Hills Bhopal, Madhya Pradesh India",
  },
  summary: "Motivated and detail-oriented Engineer with hands-on experience in Python, Java, JavaScript, and SQL. Currently working as an Associate System Engineer at TCS, focused on enhancing existing functionalities, implementing new client requirements, and managing defect tracking through JTrac. Skilled in analyzing and resolving production issues, collaborating with cross-functional teams, and ensuring stable application performance. Certified in Google Cloud Essentials and Cisco Cybersecurity, and eager to grow into a software engineering role.",
  experience: [
    {
      title: "SYSTEM ENGINEER",
      company: "Tata Consultancy Services",
      location: "India, Remote",
      period: "September 2024 - PRESENT",
      responsibilities: [
        "Collaborating with team members to diagnose and fix technical challenges, leveraging their expertise when needed to enhance problem-solving efficiency.",
        "Collaborated with development teams to ensure all code changes were properly documented and traceable, supporting audit and compliance needs.",
        "Analyze and fix Java, JavaScript, and SQL-related issues, ensuring smooth system functionality.",
        "Provide production support, troubleshooting and resolving issues raised by users through ticketing systems.",
        "Managed defect tracking and resolution using JTrac, ensuring accurate logging, status updates, and timely closure of issues raised in production and testing environments."
      ],
    },
  ],
  technicalSkills: [
    "Python",
    "Java",
    "JavaScript",
    "SQL",
    "Linux",
    "Networking",
    "Google Cloud Platform (GCP)",
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (Cyber Security)",
      institution: "RGPV University | LNCT & S College Bhopal",
      details: "2024",
      cgpa: "8.37/10.0",
    },
  ],
  personalProjects: [
    {
      name: "Image Steganography Project",
      techStack: "Python",
      description: ["Developed a GUI-based image steganography tool with encryption and decryption capabilities."]
    },
    {
      name: "Web Scraper",
      techStack: "Python, Selenium, MySQL",
      description: ["Created a robust web scraper with CAPTCHA bypass, error handling, and automated data logging."]
    },
    {
      name: "Automated Test Execution Framework",
      techStack: "Python, Selenium, Jenkins, Allure",
      description: ["Built an automation framework using Python and Selenium to test web applications. Integrated with Jenkins for continuous testing and used Allure to generate test reports with screenshots. Configured automatic test execution on code push and setup email notifications for results."]
    }
  ],
  certifications: [
    { name: "Google Cloud Essentials Certification" },
    { name: "Cybersecurity Essentials (Cisco)" }
  ],
};

export const NAV_LINKS: NavLinkItem[] = [
  { path: "/", label: "Home" },
  { path: "/osint", label: "OSINT Tool" }, // Added by Naveen on May 28, 2025
  { path: "/hash-search", label: "Hash Lookup" },
  { path: "/converter", label: "Base Converter" },
  { path: "/image-exif", label: "Image EXIF" },
  { path: "/compromised-check", label: "Breach Check" },
  { path: "/contact-me", label: "Secure Drop" },
  { path: "/simulated-os", label: "NP-OS" },
];

export const TYPING_TEXT_GREEN_CLASS = "text-green-400";
export const TYPING_TEXT_CYAN_CLASS = "text-cyan-400";
export const TYPING_TEXT_WHITE_CLASS = "text-gray-200";

export const INPUT_CLASSES = "bg-gray-800 border border-green-600 text-green-300 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 appearance-none";
export const BUTTON_CLASSES = "px-6 py-2.5 bg-green-600 text-black font-medium text-sm uppercase rounded-md shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out";
export const TERMINAL_HEADER_CLASSES = "px-4 py-2 bg-gray-700 text-gray-300 flex items-center justify-between border-b border-gray-600";
export const TERMINAL_BODY_CLASSES = "p-4 md:p-6 bg-gray-800/80 backdrop-blur-sm overflow-y-auto";

export const OS_USER = "user";
export const OS_HOSTNAME = "np-os";
export const OS_PROMPT_PRIMARY = `${OS_USER}@${OS_HOSTNAME}:~$ `;
export const OS_PROMPT_SECONDARY = `> `;