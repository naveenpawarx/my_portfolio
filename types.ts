
export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
}

export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  details: string; // e.g. year, specialization
  cgpa?: string;
}

export interface ProjectEntry {
  name: string;
  techStack: string;
  description: string[]; // Array of description points
}

export interface CertificationEntry {
  name: string;
  issuer?: string; // Optional: Issuing organization
}

export interface ResumeData {
  name: string;
  contact: ContactInfo;
  summary: string;
  experience: ExperienceEntry[];
  technicalSkills: string[];
  education: EducationEntry[];
  personalProjects: ProjectEntry[];
  certifications: CertificationEntry[];
}

export interface NavLinkItem {
  path: string;
  label: string;
}
