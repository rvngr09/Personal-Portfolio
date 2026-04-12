import React from 'react';
import ProjectCard from './ProjectCard';
import libraryImg from '../assets/libraryapp.png';
import gameImg from '../assets/2048game.png';
import portfolioImg from '../assets/portfolio.png';
import calcImg from '../assets/calc.png';

const projectsData = [
  {
    id: 1,
    title: 'Library App',
    description: 'Application de gestion de bibliothèque',
    image: libraryImg,
    githubLink: 'https://github.com/rmz-24/LibraryApp'
  },
  {
    id: 2,
    title: '2048 Game',
    description: 'Jeu 2048 développé avec SDL',
    image: gameImg,
    githubLink: 'https://github.com/rvngr09/2048-GAME-WITH-SDL'
  },
  {
    id: 3,
    title: 'Personal Portfolio',
    description: 'Mon portfolio personnel',
    image: portfolioImg,
    githubLink: 'https://github.com/rvngr09/portfolio'
  },
  {
    id: 4,
    title: 'Assembly Calculator',
    description: 'Calculatrice en assembleur',
    image: calcImg,
    githubLink: 'https://github.com/rvngr09/Assembley-Calculator'
  }
];

function ProjectsSection() {
  return (
    <>
      <div className="bigprojects">
        <h1>My Biggest Projects</h1>
      </div>
      
      <div className="cards-container">
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

export default ProjectsSection;