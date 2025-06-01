import React, { useState } from 'react';
import ProjectCard, { Project } from '../components/ProjectCard';
const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const projects: Project[] = [{
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with inventory management, payment processing, and customer accounts.',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  }, {
    id: 2,
    title: 'Health & Fitness App',
    description: 'A mobile application for tracking workouts, nutrition, and wellness goals with social features.',
    imageUrl: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'GraphQL'],
    link: '#'
  }, {
    id: 3,
    title: 'Finance Dashboard',
    description: 'An analytics dashboard for financial data visualization and reporting with real-time updates.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'D3.js', 'Express'],
    link: '#'
  }, {
    id: 4,
    title: 'Educational Platform',
    description: 'An online learning platform with course management, video lessons, and progress tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
    link: '#'
  }, {
    id: 5,
    title: 'Real Estate Listings',
    description: 'A property listing website with search, filtering, and virtual tours functionality.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Next.js', 'PostgreSQL', 'Google Maps API'],
    link: '#'
  }, {
    id: 6,
    title: 'Task Management Tool',
    description: 'A collaborative project management application with task tracking and team communication.',
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Socket.io', 'Express', 'MongoDB'],
    link: '#'
  }];
  // Extract all unique tags
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  const filteredProjects = filter ? projects.filter(project => project.tags.includes(filter)) : projects;
  return <div className="w-full bg-white">
      {/* Projects Header */}
      <section className="bg-gray-50 py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Projects
            </h1>
            <p className="text-lg text-gray-600">
              Explore our portfolio of web and mobile development projects. Each
              project showcases our commitment to clean design and powerful
              functionality.
            </p>
          </div>
        </div>
      </section>
      {/* Projects Filter */}
      <section className="py-8 border-b border-gray-100 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button className={`px-4 py-2 rounded-full text-sm ${filter === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setFilter(null)}>
              All
            </button>
            {allTags.map(tag => <button key={tag} className={`px-4 py-2 rounded-full text-sm ${filter === tag ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setFilter(tag)}>
                {tag}
              </button>)}
          </div>
        </div>
      </section>
      {/* Projects Grid */}
      <section className="py-12 md:py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
          {filteredProjects.length === 0 && <div className="text-center py-20">
              <p className="text-lg text-gray-600">
                No projects match the selected filter.
              </p>
            </div>}
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Have a project in mind?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your vision to reality with our
            expertise in web and mobile development.
          </p>
          <a href="/contact" className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
            Start a conversation
          </a>
        </div>
      </section>
    </div>;
};
export default Projects;