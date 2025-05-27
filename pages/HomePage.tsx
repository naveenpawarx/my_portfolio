
import React from 'react';
import { RESUME_DATA, TYPING_TEXT_GREEN_CLASS, TYPING_TEXT_WHITE_CLASS } from '../constants';
import AnimatedText from '../components/AnimatedText';
import Section from '../components/Section';
import TerminalWindow from '../components/TerminalWindow';

const HomePage: React.FC = () => {
  const { name, contact, summary, experience, technicalSkills, education, personalProjects, certifications } = RESUME_DATA;

  return (
    <div className="space-y-12">
      <header className="text-center my-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <AnimatedText text={name} className={TYPING_TEXT_GREEN_CLASS} speed={70} />
        </h1>
        <p className="text-lg text-cyan-400">
          <AnimatedText text={`> ${contact.email} | ${contact.phone} | ${contact.location}`} className={TYPING_TEXT_WHITE_CLASS} speed={20} />
        </p>
      </header>

      <TerminalWindow title="init_summary.sh" initialCommand="./load_profile.sh">
        <p className="text-gray-300 leading-relaxed">{summary}</p>
      </TerminalWindow>

      <Section title="Experience_Log">
        {experience.map((exp, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-600 rounded-md bg-gray-700/30">
            <h3 className="text-xl font-semibold text-green-300">{exp.title}</h3>
            <p className="text-cyan-400">{exp.company} | {exp.location}</p>
            <p className="text-sm text-gray-400 italic">{exp.period}</p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Skill_Matrix">
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-green-700 text-green-100 rounded-full text-sm shadow-md">
              {skill}
            </span>
          ))}
        </div>
      </Section>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Section title="Education_Core">
          {education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 border border-gray-600 rounded-md bg-gray-700/30">
              <h3 className="text-lg font-semibold text-green-300">{edu.degree}</h3>
              <p className="text-cyan-400">{edu.institution}</p>
              <p className="text-sm text-gray-400">{edu.details} {edu.cgpa && `| CGPA: ${edu.cgpa}`}</p>
            </div>
          ))}
        </Section>

        <Section title="Certification_Badges">
          <ul className="list-none space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="p-3 bg-gray-700/30 border border-gray-600 rounded-md text-green-300">
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && <span className="text-sm text-cyan-500"> - {cert.issuer}</span>}
              </li>
            ))}
          </ul>
        </Section>
      </div>


      <Section title="Project_Archives">
        {personalProjects.map((project, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-600 rounded-md bg-gray-700/30">
            <h3 className="text-xl font-semibold text-green-300">{project.name}</h3>
            <p className="text-sm text-cyan-400 italic mb-1">Tech: {project.techStack}</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              {project.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </div>
  );
};

export default HomePage;
