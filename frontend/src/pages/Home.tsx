import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CodeIcon, UsersIcon } from 'lucide-react';
import Button from '../components/Button';
const Home = () => {
  return <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                We build exceptional{' '}
                <span className="text-blue-600">digital experiences</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                ESA is a web and mobile development company focused on creating
                minimalist, functional, and beautiful digital products.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg">
                    Start a project
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" size="lg">
                    View our work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Team working on code" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a range of services to help your business succeed in the
              digital world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Web Development
              </h3>
              <p className="text-gray-600 mb-4">
                We create responsive, fast, and user-friendly websites that
                deliver exceptional user experiences.
              </p>
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Mobile Development
              </h3>
              <p className="text-gray-600 mb-4">
                Native and cross-platform mobile applications that engage users
                and drive business growth.
              </p>
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="p-6 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <CodeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Custom Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                Tailored software solutions to address your unique business
                challenges and requirements.
              </p>
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 inline-flex items-center">
                Learn more <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-blue-600 w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to start your project?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss how we can help bring your vision to
            life.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Get in touch
            </Button>
          </Link>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We take pride in our work and the relationships we build with our
              clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ESA delivered our new website on time and on budget. The team
                was responsive, professional, and a pleasure to work with
                throughout the entire process."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Founder, AppWorks</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The mobile application ESA built for us has been a
                game-changer. Our users love the clean interface and intuitive
                design."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <UsersIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Emily Rodriguez</h4>
                  <p className="text-sm text-gray-500">
                    Marketing Director, GrowthCo
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "Working with ESA has been a fantastic experience. They
                understand our business needs and consistently deliver
                high-quality solutions."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;