import React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="card">
      <img src={project.image} alt={project.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-text">{project.description}</p>
        <a 
          href={project.githubLink} 
          className="card-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;