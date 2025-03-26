
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Understanding Your Menstrual Cycle Phases",
    excerpt: "Learn about the four phases of your menstrual cycle and how they impact your body and mood.",
    category: "Cycle Basics",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1505455184862-554165e5f6ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "How to Track Fertility Signs",
    excerpt: "Discover the key fertility signs to monitor when trying to conceive or avoid pregnancy naturally.",
    category: "Fertility",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Managing PMS Symptoms Naturally",
    excerpt: "Effective dietary and lifestyle changes that can help alleviate premenstrual syndrome symptoms.",
    category: "Wellness",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "The Link Between Nutrition and Hormonal Health",
    excerpt: "How specific foods and nutrients impact your hormonal balance throughout your cycle.",
    category: "Nutrition",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Exercise Strategies for Each Phase of Your Cycle",
    excerpt: "Optimize your workouts by tailoring them to the hormonal changes throughout your cycle.",
    category: "Fitness",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "When to See a Doctor About Period Pain",
    excerpt: "Understanding the difference between normal menstrual pain and symptoms that may require medical attention.",
    category: "Health",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  }
];

const categories = [
  "All",
  "Cycle Basics",
  "Fertility",
  "Wellness",
  "Nutrition",
  "Fitness",
  "Health"
];

const HealthArticles = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  
  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === activeCategory);
  
  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen size={20} className="text-cycle-pink-500" />
          <h2 className="text-xl font-semibold text-gray-900">Health Education</h2>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                activeCategory === category
                  ? "bg-cycle-pink-100 text-cycle-pink-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 hover-scale">
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${article.image})` }}
              ></div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium bg-cycle-pink-50 text-cycle-pink-600 px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <Link 
                  to="#" 
                  className="inline-flex items-center text-cycle-pink-600 text-sm font-medium hover:text-cycle-pink-700"
                >
                  Read more <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured article */}
      <div className="glass-card p-6 bg-gradient-to-r from-cycle-pink-50 to-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="cycle-badge-purple mb-2">Featured Article</div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              The Science Behind Your Menstrual Cycle
            </h2>
            <p className="text-gray-600 mb-4">
              Understanding the hormonal changes throughout your cycle can help you make informed decisions 
              about your health, lifestyle, and family planning. Learn how estrogen, progesterone, LH, and 
              FSH work together to create your unique monthly rhythm.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-cycle-pink-500 mr-2"></div>
                The role of estrogen in the follicular phase
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-cycle-purple-500 mr-2"></div>
                How LH triggers ovulation
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-cycle-blue-500 mr-2"></div>
                Progesterone's effects during the luteal phase
              </li>
            </ul>
            <Link 
              to="#" 
              className="btn-cycle inline-flex items-center"
            >
              Read Full Article <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
              alt="Woman reading about menstrual health" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthArticles;
