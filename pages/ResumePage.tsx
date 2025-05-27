
import React from 'react';
import { RESUME_DATA, TYPING_TEXT_GREEN_CLASS, TYPING_TEXT_WHITE_CLASS, TYPING_TEXT_CYAN_CLASS, BUTTON_CLASSES } from '../constants';
import AnimatedText from '../components/AnimatedText';
import Section from '../components/Section';
import TerminalWindow from '../components/TerminalWindow';

const ResumePage: React.FC = () => {
  const { name, contact, summary, experience, technicalSkills, education, personalProjects, certifications } = RESUME_DATA;

  const handleDownloadPdf = () => {
    // In a real application, this would trigger a PDF download.
    // For now, it shows an alert.
    alert("PDF generation feature pending kernel update. Standby for future enhancements.");
  };

  return (
    <TerminalWindow title="resume_viewer.sh" initialCommand={`./display_resume --user ${name.toLowerCase().replace(' ','_')}`}>
      <header className="text-center mt-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <AnimatedText text={name} className={TYPING_TEXT_GREEN_CLASS} speed={60} />
        </h1>
        <p className="text-md text-gray-300">
          <AnimatedText text={`${contact.email} | ${contact.phone} | ${contact.location}`} className={TYPING_TEXT_WHITE_CLASS} speed={15} />
        </p>
      </header>

      <div className="my-6 text-right">
          <button
            onClick={handleDownloadPdf}
            className={`${BUTTON_CLASSES} bg-blue-600 hover:bg-blue-700 active:bg-blue-800`}
            aria-label="Download resume as PDF"
          >
            Download PDF
          </button>
      </div>

      <Section title="Summary" titleClassName={`text-2xl ${TYPING_TEXT_CYAN_CLASS}`}>
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">{summary}</p>
      </Section>

      <Section title="Experience" titleClassName={`text-2xl ${TYPING_TEXT_CYAN_CLASS}`}>
        {experience.map((exp, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-700 rounded-md bg-gray-800/70 shadow-sm">
            <h3 className="text-xl font-semibold text-green-300">{exp.title}</h3>
            <p className="text-cyan-300">{exp.company} - {exp.location}</p>
            <p className="text-sm text-gray-400 italic mb-2">{exp.period}</p>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-300">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Technical Skills" titleClassName={`text-2xl ${TYPING_TEXT_CYAN_CLASS}`}>
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((skill, index) => (
            <span key={index} className="px-3 py-1.5 bg-gray-700 text-green-300 border border-green-600 rounded-md text-sm shadow">
              {skill}
            </span>
          ))}
        </div>
      </Section>
      
      <div className="grid md:grid-cols-2 gap-x-8">
        <Section title="Education" titleClassName={`text-2xl ${TYPING_TEXT_CYAN_CLASS}`}>
          {education.map((edu, index) => (
            <div key={index} className="mb-4 p-3 border border-gray-700 rounded-md bg-gray-800/70 shadow-sm">
              <h3 className="text-lg font-semibold text-green-300">{edu.degree}</h3>
              <p className="text-cyan-300">{edu.institution}</p>
              <p className="text-sm text-gray-400">{edu.details} {edu.cgpa && `| CGPA: ${edu.cgpa}`}</p>
            </div>
          ))}
        </Section>

        <Section title="Certifications" titleClassName={`text-2xl ${TYPING_TEXT_CYAN_CLASS}`}>
          <ul className="list-none space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="p-3 bg-gray-800/70 border border-gray-700 rounded-md text-green-300 shadow-sm">
                <span className="font-semibold">{cert.name}</span>
                {cert.issuer && <span className="text-sm text-cyan-500"> - {cert.issuer}</span>}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Personal Projects" titleClassName={`text-2xl ${TYPING_TEXT_CYAN_CLASS}`}>
        {personalProjects.map((project, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-700 rounded-md bg-gray-800/70 shadow-sm">
            <h3 className="text-xl font-semibold text-green-300">{project.name}</h3>
            <p className="text-sm text-cyan-400 italic mb-1">Tech Stack: {project.techStack}</p>
            <ul className="list-disc list-inside space-y-1 pl-4 text-gray-300">
              {project.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
    </TerminalWindow>
  );
};

export default ResumePage;
