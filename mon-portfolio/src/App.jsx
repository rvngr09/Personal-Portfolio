import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import ProjectsSection from './components/ProjectsSection';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Introduction />
      <ProjectsSection />
    </div>
  );
}

export default App;