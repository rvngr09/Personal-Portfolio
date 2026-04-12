import React from 'react';
import me from '../assets/me.jpg';

function Introduction() {
  return (
    <div className="introduction">    
      <img src={me} alt="ME" className="image" />
      <div className="intro-text">
        <h1>
          I'm Benallal Amine.
          <br /> A Software Engineer 
          <br />Based in Algeria.
        </h1>
      </div> 
    </div>
  );
}

export default Introduction;