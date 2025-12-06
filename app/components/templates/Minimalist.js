// b29/app/components/templates/Minimalist.js
import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Target, 
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  ChevronRight,
  Play,
  Quote,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

export default function Minimalist({ data }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    // Business Identity
    name = "Horizon Dynamics",
    tagline = "Redefining excellence in digital innovation",
    shortDescription = "We craft transformative digital experiences that drive measurable results and sustainable growth for forward-thinking businesses.",
    
    // Appearance
    primaryColor = "#2563eb",
    secondaryColor = "#0f172a",
    backgroundColor = "#ffffff",
    textColor = "#0f172a",
    
    // Content
    description = "Horizon Dynamics is a premier digital solutions agency specializing in creating cutting-edge web applications, mobile platforms, and AI-powered business solutions. Our team of experts combines technical excellence with strategic thinking to deliver products that exceed expectations.",
    longDescription = "",
    
    // Details
    foundedYear = 2018,
    teamSize = 47,
    clientsCount = 250,
    projectsCompleted = 420,
    location = "San Francisco, CA",
    industry = "Technology & Innovation",
    
    // Features
    features = [
      { title: "AI-Powered Solutions", icon: <Sparkles />, description: "Leverage cutting-edge AI" },
      { title: "24/7 Support", icon: <Clock />, description: "Always available for you" },
      { title: "Data-Driven", icon: <BarChart3 />, description: "Decisions backed by insights" },
      { title: "Global Reach", icon: <Globe />, description: "Serving clients worldwide" }
    ],
    
    // Services
    services = [
      { title: "Web Development", description: "Custom web applications" },
      { title: "Mobile Apps", description: "iOS & Android solutions" },
      { title: "UI/UX Design", description: "User-centric design" },
      { title: "Digital Strategy", description: "Growth planning" }
    ],
    
    // Testimonials
    testimonials = [
      { quote: "Transformed our digital presence completely.", author: "Sarah Chen", role: "CEO, TechNova" },
      { quote: "Exceptional work and outstanding support.", author: "Marcus Johnson", role: "CTO, InnovateCo" }
    ],
    
    // Metrics
    metrics = [
      { value: "420+", label: "Projects", suffix: "completed", icon: <CheckCircle /> },
      { value: "99%", label: "Client", suffix: "satisfaction", icon: <Heart /> },
      { value: "3.2x", label: "Average", suffix: "growth", icon: <TrendingUp /> },
      { value: "24/7", label: "Support", suffix: "available", icon: <Shield /> }
    ],
    
    // Contact
    email = "hello@horizon-dynamics.com",
    phone = "+1 (555) 123-4567",
    website = "www.horizondynamics.com",
    social = {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    },
    
    // Tags
    tags = ["AI", "Blockchain", "Cloud", "Mobile", "Web3", "SaaS"],
    
    // CTA
    primaryCta = { text: "Start Project", action: () => {} },
    secondaryCta = { text: "View Portfolio", action: () => {} },
    
    // Media
    heroImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200",
    logo = null
    
  } = data || {};

  // Calculate years of experience
  const yearsExperience = new Date().getFullYear() - foundedYear;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-5 blur-3xl" 
             style={{ backgroundColor: primaryColor }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-5 blur-3xl" 
             style={{ backgroundColor: primaryColor }}></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-64 opacity-10" 
             style={{ backgroundColor: primaryColor }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-64 opacity-10" 
             style={{ backgroundColor: primaryColor }}></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-slate-100 opacity-[0.02]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header - Modern & Striking */}
        <header className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-between items-start mb-12">
            {/* Logo Area */}
            <div className="flex items-center gap-4">
              {logo ? (
                <img src={logo} alt={name} className="h-12 w-auto" />
              ) : (
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mr-3 shadow-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight">{name}</h1>
                </div>
              )}
            </div>
            
            {/* Stats Badge */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>{yearsExperience}+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="text-right">
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>{clientsCount}+</div>
                <div className="text-sm text-gray-500">Happy Clients</div>
              </div>
            </div>
          </div>
          
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-gray-200 bg-white/50 backdrop-blur-sm">
                <span className="text-sm font-medium" style={{ color: primaryColor }}>
                  {industry}
                </span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
                <span className="text-sm text-gray-500">Since {foundedYear}</span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                {tagline}
                <span className="block" style={{ color: primaryColor }}>Digital Solutions</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                {shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={primaryCta.action}
                  className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  {primaryCta.text}
                  <ArrowUpRight className="inline ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={secondaryCta.action}
                  className="px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  {secondaryCta.text}
                  <ChevronRight className="inline ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Hero Image/Visual */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage}
                  alt="Business showcase"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}10` }}
                  >
                    <Award className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{projectsCompleted}+</div>
                    <div className="text-sm text-gray-500">Projects Delivered</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Trusted by industry leaders worldwide</div>
              </div>
            </div>
          </div>
        </header>

        {/* Features Grid - Clean & Modern */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-gray-200">
              <Target className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-sm font-medium" style={{ color: primaryColor }}>Our Edge</span>
            </div>
            <h3 className="text-4xl font-bold mb-6">Why Choose Us</h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We combine innovation with execution to deliver exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animation: isVisible ? `fadeInUp 0.5s ${index * 0.1}s both` : 'none'
                }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${primaryColor}10` }}
                >
                  <div style={{ color: primaryColor }}>
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div>
              <div className="sticky top-24">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-gray-200">
                  <span className="text-sm font-medium" style={{ color: primaryColor }}>What We Do</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">Our Core Services</h3>
                <p className="text-gray-600 mb-8">
                  We specialize in delivering end-to-end digital solutions that transform businesses and drive growth.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{teamSize} Experts</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Global Delivery</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <ArrowUpRight 
                        className="w-6 h-6 text-gray-400 group-hover:text-gray-700 transition-colors" 
                      />
                    </div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-gray-900 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl" 
                 style={{ backgroundColor: primaryColor }}></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/20">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">By The Numbers</span>
                </div>
                <h3 className="text-4xl font-bold mb-6">Proven Results</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="text-4xl font-bold">{metric.value}</div>
                      {metric.icon && (
                        <div className="text-white/60">
                          {metric.icon}
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-medium mb-1">{metric.label}</div>
                    <div className="text-sm text-white/60">{metric.suffix}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-gray-200">
                <Quote className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-sm font-medium" style={{ color: primaryColor }}>Client Stories</span>
              </div>
              <h3 className="text-4xl font-bold mb-6">What Clients Say</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 mb-8 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 text-center border border-gray-100">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <Zap className="w-10 h-10" style={{ color: primaryColor }} />
            </div>
            <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h3>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your goals and drive meaningful growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={primaryCta.action}
                className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                Start Project Today
              </button>
              <div className="flex items-center justify-center gap-4 text-gray-600">
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>{email}</span>
                </div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {logo ? (
                  <img src={logo} alt={name} className="h-8 w-auto" />
                ) : (
                  <div className="text-2xl font-bold">{name}</div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <span>© {new Date().getFullYear()} {name}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full text-sm border border-gray-200 hover:border-gray-300 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-100 text-sm text-gray-500">
            <div>
              Crafted with precision for businesses that demand excellence
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-900 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Instagram</a>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
}