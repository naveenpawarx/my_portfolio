
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';
import { RESUME_DATA, OS_PROMPT_PRIMARY, OS_USER, OS_HOSTNAME } from '../constants';

interface OSOutputLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'system' | 'boot';
  text: string | React.ReactNode; // Allow ReactNode for AnimatedText
  path?: string; // Store path with input for prompt display
}

interface FileSystemNode {
  type: 'file' | 'dir';
  content?: string; // For simple text files
  children?: { [name: string]: FileSystemNode };
}

const formatResumeForTerminal = (resume: typeof RESUME_DATA): string => {
  let output = `\n## ${resume.name} ##\n\n`;
  output += `Contact: ${resume.contact.phone} | ${resume.contact.email} | ${resume.contact.location}\n`;
  output += `\nSummary:\n${resume.summary}\n`;
  
  output += `\n## Experience ##\n`;
  resume.experience.forEach(exp => {
    output += `\nTitle: ${exp.title}\nCompany: ${exp.company} | ${exp.location}\nPeriod: ${exp.period}\nResponsibilities:\n`;
    exp.responsibilities.forEach(r => output += `  - ${r}\n`);
  });

  output += `\n## Technical Skills ##\n${resume.technicalSkills.join(', ')}\n`;

  output += `\n## Education ##\n`;
  resume.education.forEach(edu => {
    output += `${edu.degree}\nInstitution: ${edu.institution} (${edu.details})\nCGPA: ${edu.cgpa || 'N/A'}\n`;
  });
  
  output += `\n## Personal Projects ##\n`;
  resume.personalProjects.forEach(proj => {
    output += `\nProject: ${proj.name}\nTech: ${proj.techStack}\nDescription:\n`;
    proj.description.forEach(d => output += `  - ${d}\n`);
  });

  output += `\n## Certifications ##\n`;
  resume.certifications.forEach(cert => {
    output += `- ${cert.name}${cert.issuer ? ` (${cert.issuer})` : ''}\n`;
  });
  return output;
};


const initialFileSystem: FileSystemNode = {
  type: 'dir',
  children: {
    'home': {
      type: 'dir',
      children: {
        [OS_USER]: {
          type: 'dir',
          children: {
            'documents': {
              type: 'dir',
              children: {
                'resume.txt': { type: 'file', content: formatResumeForTerminal(RESUME_DATA) },
                'notes.txt': { type: 'file', content: 'TODO:\n1. Conquer the digital world.\n2. Automate coffee machine.\n3. Debug life.' },
              }
            },
            'projects': {
              type: 'dir',
              children: {
                'secret_project_alpha': { type: 'dir', children: {} },
              }
            },
            'welcome.txt': { type: 'file', content: `Welcome to NP-OS!\nType 'help' for a list of available commands.\nYour mission, should you choose to accept it... explore!` }
          }
        }
      }
    },
    'bin': { type: 'dir', children: { 'ls': {type: 'file'}, 'cat': {type: 'file'}, 'cd':{type:'file'} /* more cmds */ } },
    'etc': { type: 'dir', children: { 'os-release': {type: 'file', content: 'NAME="NP-OS"\nVERSION="1.0 (Hacker Edition)"'} } },
  }
};


const SimulatedOSPage: React.FC = () => {
  const navigate = useNavigate();
  const [outputLines, setOutputLines] = useState<OSOutputLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [currentPath, setCurrentPath] = useState(`/home/${OS_USER}`);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = (line: Omit<OSOutputLine, 'id'>) => {
    setOutputLines(prev => [...prev, { ...line, id: Date.now() + Math.random() }]);
  };

  const bootSequence: { text: string | React.ReactNode, delay: number }[] = [
    { text: "NP-OS Bootloader v1.3.37 initializing...", delay: 300 },
    { text: "[  0.000001] Kernel panic - not syncing: Just kidding! Proceeding with boot.", delay: 700 },
    { text: "[  0.524152] Memory check: All 16EB of RAM detected (in my dreams).", delay: 500 },
    { text: "[  1.123456] Mounting virtual file systems...", delay: 400 },
    { text: "[  1.567890] Network interface 'eth0_hack': bağlantı kuruldu (10 Gbps)", delay: 600 },
    { text: "[  2.010101] Starting services: [matrix_screensaver] [coffee_compiler] [system_monitor_daemon]", delay: 700 },
    { text: "[  2.505050] Welcome to NP-OS (Kernel 6.7.8-hckr-edition)", delay: 500 },
    { text: `Login: ${OS_USER} (automatic login sequence initiated...)`, delay: 500 },
    { text: `Last login: ${new Date(Date.now() - 86400000).toLocaleString()} from /dev/console`, delay: 400 },
    { text: " ", delay: 100},
    { text: <AnimatedText text={`Type 'help' for a list of commands, or 'cat welcome.txt'.`} speed={25} className="text-green-300" />, delay: 200 }
  ];

  useEffect(() => {
    if (isBooting) {
      let delay = 0;
      bootSequence.forEach(item => {
        delay += item.delay;
        setTimeout(() => {
          addLine({ type: 'boot', text: item.text });
        }, delay);
      });
      setTimeout(() => {
        setIsBooting(false);
        inputRef.current?.focus();
      }, delay + 200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBooting]);


  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputLines]);

  const resolvePath = useCallback((path: string): string => {
    if (path.startsWith('/')) return path; // Absolute path
    const parts = (currentPath === '/' ? '' : currentPath).split('/').concat(path.split('/'));
    const resolved: string[] = [];
    for (const part of parts) {
      if (part === '' || part === '.') continue;
      if (part === '..') {
        if (resolved.length > 0) resolved.pop();
      } else {
        resolved.push(part);
      }
    }
    return '/' + resolved.join('/') || '/';
  }, [currentPath]);

  const getNodeByPath = useCallback((path: string, fs: FileSystemNode = initialFileSystem): FileSystemNode | null => {
    const parts = path.split('/').filter(p => p);
    let currentNode: FileSystemNode | null = fs;
    for (const part of parts) {
      if (!currentNode || currentNode.type !== 'dir' || !currentNode.children || !currentNode.children[part]) {
        return null;
      }
      currentNode = currentNode.children[part];
    }
    return currentNode;
  }, []);

  const processCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(/\s+/);
    addLine({ type: 'input', text: cmd, path: currentPath });
    setCommandHistory(prev => [cmd, ...prev].slice(0, 20)); // Keep last 20 commands
    setHistoryIndex(-1); // Reset history index

    switch (command.toLowerCase()) {
      case 'help':
        addLine({ type: 'output', text: "Available commands:\n  help          Show this help message\n  ls [path]     List directory contents\n  cat <file>    Display file content\n  cd <dir>      Change directory\n  pwd           Print working directory\n  echo <text>   Display text\n  clear         Clear the terminal\n  date          Show current date/time\n  whoami        Display current user\n  uname -a      Display system info\n  exit          Exit NP-OS" });
        break;
      case 'ls':
        const targetPathLs = args[0] ? resolvePath(args[0]) : currentPath;
        const nodeLs = getNodeByPath(targetPathLs);
        if (nodeLs && nodeLs.type === 'dir' && nodeLs.children) {
          const items = Object.entries(nodeLs.children).map(([name, childNode]) => 
            childNode.type === 'dir' ? `${name}/` : name
          );
          addLine({ type: 'output', text: items.length > 0 ? items.join('\n') : '(empty directory)' });
        } else {
          addLine({ type: 'error', text: `ls: cannot access '${args[0] || '.'}': No such file or directory` });
        }
        break;
      case 'cat':
        if (!args[0]) { addLine({ type: 'error', text: "cat: missing operand" }); break; }
        const filePathCat = resolvePath(args[0]);
        const nodeCat = getNodeByPath(filePathCat);
        if (nodeCat && nodeCat.type === 'file') {
          addLine({ type: 'output', text: nodeCat.content || '(empty file)' });
        } else if (nodeCat && nodeCat.type === 'dir') {
          addLine({ type: 'error', text: `cat: ${args[0]}: Is a directory` });
        } else {
          addLine({ type: 'error', text: `cat: ${args[0]}: No such file or directory` });
        }
        break;
      case 'cd':
        if (!args[0]) { setCurrentPath(`/home/${OS_USER}`); break; }
        const newPathCd = resolvePath(args[0]);
        const nodeCd = getNodeByPath(newPathCd);
        if (nodeCd && nodeCd.type === 'dir') {
          setCurrentPath(newPathCd);
        } else if (nodeCd && nodeCd.type === 'file') {
          addLine({ type: 'error', text: `cd: ${args[0]}: Not a directory`});
        }
         else {
          addLine({ type: 'error', text: `cd: ${args[0]}: No such file or directory` });
        }
        break;
      case 'pwd':
        addLine({ type: 'output', text: currentPath });
        break;
      case 'echo':
        addLine({ type: 'output', text: args.join(' ') });
        break;
      case 'clear':
        setOutputLines([]);
        break;
      case 'date':
        addLine({ type: 'output', text: new Date().toString() });
        break;
      case 'whoami':
        addLine({ type: 'output', text: OS_USER });
        break;
      case 'uname':
        if (args[0] === '-a') addLine({ type: 'output', text: "NP-OS Linux 6.7.8-hckr-edition x86_64 GNU/Linux (Simulated)" });
        else addLine({ type: 'output', text: "NP-OS" });
        break;
      case 'exit':
        addLine({ type: 'system', text: "Shutting down NP-OS..."});
        setTimeout(() => navigate('/'), 1000);
        break;
      case '': // Empty command
        break;
      default:
        addLine({ type: 'error', text: `${command}: command not found` });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
         setHistoryIndex(-1);
         setCurrentCommand('');
      }
    } else if (e.key === 'l' && e.ctrlKey) { // Ctrl+L for clear
        e.preventDefault();
        setOutputLines([]);
    }
  };

  const displayPrompt = () => {
    const pathForPrompt = currentPath.startsWith(`/home/${OS_USER}`) 
      ? '~' + currentPath.substring(`/home/${OS_USER}`.length) 
      : currentPath;
    return `${OS_USER}@${OS_HOSTNAME}:${pathForPrompt}$ `;
  }

  return (
    <div className="h-[calc(100vh-200px)] md:h-[calc(100vh-160px)] flex flex-col bg-black text-green-400 font-mono p-2 md:p-4 border border-green-700 rounded-md overflow-hidden" onClick={() => inputRef.current?.focus()}>
      <div className="flex-grow overflow-y-auto pr-2" id="terminal-output">
        {outputLines.map((line) => (
          <div key={line.id} className="whitespace-pre-wrap break-words">
            {line.type === 'input' && <span className="text-blue-400">{line.path ? `${OS_USER}@${OS_HOSTNAME}:${line.path.startsWith(`/home/${OS_USER}`) ? '~' + line.path.substring(`/home/${OS_USER}`.length) : line.path}$ ` : OS_PROMPT_PRIMARY}</span>}
            <span className={line.type === 'error' ? 'text-red-400' : line.type === 'system' ? 'text-yellow-400' : line.type === 'boot' ? 'text-gray-400' : ''}>
              {line.text}
            </span>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      {!isBooting && (
        <div className="flex items-center mt-2">
          <span className="text-blue-400">{displayPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="flex-grow bg-transparent text-green-400 outline-none pl-2 hacker-caret"
            autoFocus
            spellCheck="false"
            aria-label="Terminal command input"
          />
        </div>
      )}
    </div>
  );
};

export default SimulatedOSPage;