import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link?: string;
}
interface ProjectCardProps {
  project: Project;
}
const ProjectCard = ({
  project
}: ProjectCardProps) => {
  return <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
          {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <ExternalLinkIcon className="h-5 w-5" />
            </a>}
        </div>
        <p className="mt-2 text-sm text-gray-600">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => <span key={index} className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {tag}
            </span>)}
        </div>
      </div>
    </div>;
};
export default ProjectCard;