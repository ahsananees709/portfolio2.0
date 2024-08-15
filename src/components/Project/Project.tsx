import React, { useState, useEffect, useRef } from 'react';
import { Container } from "./styles";
import githubIcon from "../../assets/github.svg";
import externalLink from "../../assets/external-link.svg";
import ScrollAnimation from "react-animate-on-scroll";
import Modal from '../Modal/Modal';
import Project1 from '../../assets/Frame 1.jpg'
import Project2 from '../../assets/Frame 2.jpg'
import Project3 from '../../assets/Frame 3.jpg'
import Project4 from '../../assets/Frame 4.jpg'
import Project5 from '../../assets/Frame 5.jpg'

// Define TypeScript types
interface ProjectType {
  title: string;
  description: string;
  imageSrc: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

const projects: ProjectType[] = [
  {
    title: 'E-Commerce Website',
    description: 'A full-stack e-commerce platform built with React and Django, featuring a modern UI and robust RESTful API integration. The backend utilizes Django Rest Framework and MySQL, while the front-end delivers dynamic user experiences with JavaScript.',
    imageSrc: Project1,
    techStack: ['React', 'Javascript', 'Django', 'Python', 'MySQL', 'DjangoRestFraamework'],
    githubLink: 'https://github.com/ahsananees709/shoppingstore',
    liveLink: 'https://github.com/ahsananees709/shoppingstore'
  },
  {
    title: 'Gulzar Soft Website',
    description: 'A professional website for a software house, built with Next.js and Tailwind CSS. It features a sleek, responsive design with smooth navigation, optimized performance, and interactive UI elements, enhanced by Toastify notifications.',
    imageSrc: Project3,
    techStack: ['Nextjs', 'Tailwind CSS', 'Javascript', 'Toastify'],
    githubLink: 'https://github.com/ahsananees709/gulzarsoftwebsite',
    liveLink: 'https://github.com/ahsananees709/gulzarsoftwebsite'
  },
  {
    title: 'E-Services Replica of Fiver',
    description: 'A mobile app built with React Native and Expo, featuring a sleek interface and integration with various APIs for data retrieval.',
    imageSrc: Project4,
    techStack: ['React', 'Node', 'Express', 'Redux', 'Postgressql', 'drizzle', 'socket.io', 'adminpanel'],
    githubLink: 'https://github.com/ahsananees709/e-services',
    liveLink: 'https://github.com/ahsananees709/e-services'
  },
  {
    title: 'Prime Chat',
    description: 'A real-time chat application using WebSockets, providing instant messaging capabilities and notifications.',
    imageSrc: Project5,
    techStack: ['Javascript', 'Nodejs', 'WebSocket'],
    githubLink: '',
    liveLink: ''
  },
];

export function Project() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Set up IntersectionObserver to show tooltip
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTooltipVisible(true);
        } else {
          setTooltipVisible(false);
        }
      });
    }, { threshold: 0.5 });

    projectRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <Container id="project">
      <h2>My Projects</h2>
      <div className="projects">
        {projects.map((project, index) => (
          <ScrollAnimation key={index} animateIn="flipInX">
            <div
              className="project"
              ref={el => projectRefs.current[index] = el}
            >
              <header>
                <svg width="50" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="#23ce6b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"> 
                  <title>Folder</title> 
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path> 
                </svg>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    <img src={githubIcon} alt="GitHub" />
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noreferrer">
                    <img src={externalLink} alt="Live Site" />
                  </a>
                </div>
              </header>
              <div className="body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-image" onClick={() => openModal(project.imageSrc)}>
                  <img src={project.imageSrc} alt={project.title} />
                  {tooltipVisible && (
                    <div className="tooltip">
                      Click on the image to zoom in
                    </div>
                  )}
                </div>
              </div>
              <footer>
                <ul className="tech-list">
                  {project.techStack.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ul>
              </footer>
            </div>
          </ScrollAnimation>
        ))}
      </div>
      <Modal imageSrc={selectedImage} onClose={closeModal} />
    </Container>
  );
}
