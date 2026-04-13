import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  ChevronDown, 
  Video, 
  Camera, 
  Film, 
  Music, 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter,
  MessageCircle,
  Calendar,
  X,
  SlidersHorizontal,
  ChevronDown as ChevronDownIcon
} from 'lucide-react';

// --- Types ---

interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

// --- Data ---

const PROJECTS: Project[] = [
  // CORPORATE
  {
    id: 'c1',
    title: 'AKIJ BIAX AV',
    category: 'Corporate',
    thumbnail: 'https://picsum.photos/seed/akijbiax/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'One Third created an audiovisual story for Akij Biax Films Ltd., showcasing their innovation and global presence in packaging. With cinematic visuals and strong storytelling, we turned their brand values into a powerful narrative. At One Third, we craft productions that inspire, connect, and elevate brands.'
  },
  {
    id: 'c2',
    title: 'AKIJBASIR REUNION',
    category: 'Corporate',
    thumbnail: 'https://picsum.photos/seed/akijreunion/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'This video captures the festive spirit and vibrant energy of the event, showcasing a day filled with camaraderie, entertainment, and celebration. Watch as employees reconnect, share laughter, and create lasting memories, reinforcing the strong bonds that make the Akijbashir Group a family.'
  },
  {
    id: 'c3',
    title: 'EXECUTIVE EXCELLENCE PROGRAM',
    category: 'Corporate',
    thumbnail: 'https://picsum.photos/seed/ulab/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A Recap by One Third Production. Join us for an exclusive look back at the ULAB Executive Excellence Program 2024, organized by the University of Liberal Arts Bangladesh (ULAB) and facilitated by Gemcon Group.'
  },
  {
    id: 'c4',
    title: 'SUPERMOM HYPER DAY',
    category: 'Corporate',
    thumbnail: 'https://picsum.photos/seed/supermom/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'At One Third Production, we believe in telling stories that matter. In this special video, we bring you the highlights from "Supermom Hyper Day" at Hyper Playgrounds, an event dedicated to celebrating the superheroes in our lives: moms!'
  },
  {
    id: 'c5',
    title: 'Transcom Electronics Factory AV',
    category: 'Corporate',
    thumbnail: 'https://picsum.photos/seed/transcom/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'One Third created an audiovisual story for Transcom Electric LTD, showcasing their innovation and global presence in manufacturing. With cinematic visuals and strong storytelling, we turned their brand values into a powerful narrative. At One Third, we craft productions that inspire, connect, and elevate brands.'
  },
  {
    id: 'c6',
    title: 'Walton Factory AV',
    category: 'Corporate',
    thumbnail: 'https://picsum.photos/seed/walton/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'One Third created an audiovisual story for Walton, one of the leading brands in Bangladesh, showcasing their innovation and global presence in manufacturing. With cinematic visuals and strong storytelling, we turned their brand values into a powerful narrative. At One Third, we craft productions that inspire, connect, and elevate brands.'
  },
  // DOCUMENTARY
  {
    id: 'd1',
    title: 'SOMANTORAL',
    category: 'Documentary',
    thumbnail: 'https://picsum.photos/seed/somantaral/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A One Third Production, "Somantaral" is a powerful documentary short showcasing the journey of the transgender community in Bangladesh. This film highlights how the community, often marginalized and isolated, is finding a new path to a dignified life through skill development and economic empowerment.'
  },
  {
    id: 'd2',
    title: 'RAW BANGLADESH',
    category: 'Documentary',
    thumbnail: 'https://picsum.photos/seed/rawbd/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'In this video, locals come together in a muddy river to engage in rural fishing, showing the raw beauty of our country. The community works in unison to cast nets and search for their catch, a practice that has been passed down through generations.'
  },
  {
    id: 'd3',
    title: 'Acid Survivors Foundation (ASF)',
    category: 'Documentary',
    thumbnail: 'https://picsum.photos/seed/asf/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'This film shines a light on the incredible work of the Acid Survivors Foundation (ASF), highlighting their unwavering commitment to providing medical, legal, and psychosocial support to survivors of acid violence.'
  },
  // SPORTS
  {
    id: 's1',
    title: 'GEMCON 5TH GOLF TOURNAMENT',
    category: 'Sports',
    thumbnail: 'https://picsum.photos/seed/golf/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Held at the stunning Jashore Golf & Country Club, this tournament brought together golf enthusiasts for a day of sport, strategy, and camaraderie.'
  },
  {
    id: 's2',
    title: 'STUDENT UPRISING MEMORIAL TOURNAMENT',
    category: 'Sports',
    thumbnail: 'https://picsum.photos/seed/football/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'One Third Production presents a moving tribute in honor of the martyrs of the student uprising. The Student Uprising Memorial Cup, a football tournament, serves as a powerful reminder of the sacrifices made for a cause greater than ourselves.'
  },
  // Fashion & Music
  {
    id: 'f1',
    title: 'Ai Rate (GANCHILL PRESENT)',
    category: 'Fashion & Music',
    thumbnail: 'https://picsum.photos/seed/airate/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'A visual exploration of fashion and music, presented by Ganchill.'
  },
  {
    id: 'f2',
    title: 'Shinduk',
    category: 'Fashion & Music',
    thumbnail: 'https://picsum.photos/seed/shinduk/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Cinematic fashion film showcasing the Shinduk collection.'
  },
  {
    id: 'f3',
    title: 'Azwa',
    category: 'Fashion & Music',
    thumbnail: 'https://picsum.photos/seed/azwa/1920/1080',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Fashion narrative for Azwa, blending style with cinematic storytelling.'
  }
];

const PHOTOGRAPHY_IMAGES = [
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/4fa5c941c0c56ce97bd4ce2bf6dfb2da.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/f187f9629fd73790cc65aab6199056f5.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/6744df51c613dd5baa918de5bf7800d9.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/85877686d41cd256c3f3505694674ec9.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/e9d2817ed4e189bbd4d3328b72bfde30.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/b25667c63f433e886e496b40b4a2625a.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/7e1891d061d8612ce164fc278bd1afc2.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/54ab1811f43336601c11802dd5f4b666.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/41d9479e84dc7e4aeb3b894cefe0b048.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/96a646f18b2f6ed0e744f7954d5f7e6c.jpg"
];

const CLIENT_LOGOS = [
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/aa42ead1c010ef4c8cdd088d51e7267c.png",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/a4f69cd7b5daa6916cfa2f59976bf4d3.png",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/69f9b63aefc033933578fba341e6ccfc.png",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/40064e81dcb42f2d6be836d7b15b8b37.png",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/130d42ff0494e2a82563e21ad13159a5.png",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/f8ee217ae22fc638d225de05f0eb31b3.png",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/93bd40abb42f233d3fb9385f1abb6790.jpg",
  "https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/0df19c35df026e29e750bdb483f754f8.png"
];

const SERVICES = [
  { 
    title: 'PHOTOGRAPHY', 
    icon: <Camera className="w-6 h-6" />, 
    desc: 'We provide professional photography solution for your business. Ranging from food photography, corporate event coverage to industrial portfolio we have it all' 
  },
  { 
    title: 'VIDEOGRAPHY', 
    icon: <Video className="w-6 h-6" />, 
    desc: 'With industry expert filmmakers we have a production team for all your video production needs.' 
  },
  { 
    title: 'POST-PRODUCTION', 
    icon: <Film className="w-6 h-6" />, 
    desc: 'We have a team of video editors for all your post production works. We provide solutions for color grading, sound designing, VFX etc' 
  }
];

const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'EMZAMUL HAQE',
    role: 'Photographer',
    image: 'https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/b81711b429acbfb5811d90fa7c4c1a15.jpg',
    quote: 'Emzamul Haqe is a talented photographer for One Third Production. He has a great eye for capturing the perfect moment and telling a story through his images. His photography work helps bring every project to life, documenting events and people with a unique and professional touch.'
  },
  {
    id: '2',
    name: 'MD IBRAHIM KHALIL',
    role: 'Cinematographer',
    image: 'https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/098df0b7547226b5b98b93caba682bd4.jpg',
    quote: 'MD IBRAHIM KHALIL is the talented Cinematographer at One Third Production. With a keen eye for visual storytelling, he is an expert at capturing the heart of every story. His work brings projects to life with dynamic and professional visuals, ensuring every frame is crafted to perfection.'
  },
  {
    id: '3',
    name: 'SHAHRIAR SHOMRAT',
    role: 'Drone Pilot',
    image: 'https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/9646f6dbfb325f4e7771f4b6facd64c9.jpg',
    quote: 'As a certified drone pilot for One Third Production, Shahriar Shomrat provides a unique and dynamic perspective to every project. His expertise in aerial cinematography allows him to capture stunning, professional footage from above, adding a cinematic touch that elevates the entire production.'
  },
  {
    id: '4',
    name: 'SHADMAN TASIN',
    role: 'Head of Operations',
    image: 'https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/0a528865f5998c454abfda7de50615f2.jpg',
    quote: 'As the Head of Operations at One Third Production, Shadman Tasin is the driving force behind the company\'s seamless execution of projects. He ensures that all productions run efficiently, on time, and within budget, overseeing the logistics and operational aspects that are crucial to the success of every project.'
  }
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 8,
        y: position.y - 8,
        scale: isHovering ? 6 : 1,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.5 }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Detect theme of the section currently under the navbar
      const sections = document.querySelectorAll('section[data-theme], footer[data-theme]');
      let currentTheme = 'dark'; // Default to dark for Hero
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // If the top of the section has reached the navbar area (approx 80px from top)
        if (rect.top <= 80 && rect.bottom >= 80) {
          currentTheme = section.getAttribute('data-theme') || 'dark';
        }
      });
      
      setIsDarkTheme(currentTheme === 'dark');
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Work', 'About', 'Services', 'People', 'Contact'];

  // Logo should be white ONLY over dark sections.
  // Over light sections, it should show its real color.
  const showWhiteLogo = isDarkTheme;
  
  const textColorClass = isDarkTheme ? 'text-white/40' : 'text-black/40';
  const hoverColorClass = isDarkTheme ? 'hover:text-white' : 'hover:text-black';
  const buttonClass = isDarkTheme 
    ? 'border-brand/20 text-brand hover:bg-brand hover:text-white' 
    : 'border-black/20 text-black hover:bg-black hover:text-white';
  const burgerClass = isDarkTheme ? 'bg-white' : 'bg-brand';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? `pt-4 pb-12 md:pt-6 md:pb-16 glass feather-blur ${isDarkTheme ? 'bg-black/10' : 'bg-white/10'}` 
            : 'py-6 md:py-12 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.postimg.cc/hGrCX0q4/file-0000000084d87208a305a911b218e98b.png" 
              alt="One Third Production Logo" 
              className={`h-8 md:h-10 w-auto object-contain transition-all duration-700 ${showWhiteLogo ? 'logo-white' : ''}`}
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className={`hidden md:flex items-center gap-12 text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-500 ${textColorClass}`}>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-500 ${hoverColorClass}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className={`hidden sm:block px-8 py-3 border rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${buttonClass}`}>
              Inquiry
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 block ${isOpen ? 'bg-white' : burgerClass}`} 
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`w-6 h-0.5 block ${isOpen ? 'bg-white' : burgerClass}`} 
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className={`w-6 h-0.5 block ${isOpen ? 'bg-white' : burgerClass}`} 
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-black flex flex-col items-center justify-center p-10 md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-display font-light tracking-tighter hover:italic transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative h-[60vh] md:h-screen w-full overflow-hidden flex items-end pb-12 md:pb-20" data-theme="dark">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 glare-overlay z-10" />
        
        {/* Static Placeholder Image - Shows immediately */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{ 
            backgroundImage: 'url(https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/f189feea4c4188fc351eac1ffdfac26f.jpg)',
            opacity: isVideoLoaded ? 0 : 1 
          }}
        />

        <div className={`absolute inset-0 w-full h-full scale-110 transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <iframe
            src="https://player.vimeo.com/video/1182455135?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Hero Background Video"
            onLoad={() => setIsVideoLoaded(true)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 relative z-20">
        <motion.div 
          style={{ y: y1, opacity }}
          className="text-left"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[10px] font-mono tracking-[0.4em] uppercase text-black mb-4 px-5 py-1.5 rounded-sm bg-white/80 backdrop-blur-md border border-brand/20"
          >
            Welcome to
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-[7rem] font-display font-light tracking-tighter leading-[0.85]"
          >
            <span className="glare-text-full inline-block [-webkit-text-stroke:0.5px_rgba(255,255,255,0.3)]">ONE THIRD</span> <br /> 
            <span className="block mt-2 font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] glare-text-dim animate-pulse-glow">
              PRODUCTION
            </span>
          </motion.h1>
        </motion.div>
      </div>

    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 md:py-48 px-6 bg-white" data-theme="light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-7xl font-display font-light mb-8 md:mb-12 leading-[1.1] text-black tracking-tight">
            Step into the <br /> <span className="font-bold italic">suspenseful</span> world
          </h2>
          <div className="space-y-6 md:space-y-8 text-black/50 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            <p>
              We are a Bangladesh-based video production company driven by emotion, aesthetics, and storytelling. At One Third, we specialize in creating cinematic visuals that go beyond to make your brand — we craft timeless stories.
            </p>
            <p>
              From corporate to brand films, documentaries to music videos — we blend creativity with technical precision to deliver visuals that are bold, heartfelt, and unforgettable.
            </p>
            <p className="text-black font-medium text-xl md:text-2xl">
              Because to us, every story is made of three parts — and we capture the most powerful one.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden"
        >
          <img 
            src="https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/f189feea4c4188fc351eac1ffdfac26f.jpg" 
            alt="One Third Production Visual" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Approach = () => {
  return (
    <section className="py-24 md:py-48 px-6 bg-black border-y border-white/5" data-theme="dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-32 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-1"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-8 md:mb-12 bg-white/5">
            <img 
              src="https://pbasweeklyplanner.my.canva.site/one-third-production/_assets/media/88ba5ec2f8071299637dee876d9c1bea.jpg" 
              alt="Tarek bin zihad" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight">Tarek bin zihad</h3>
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30 mb-8">CO-FOUNDER</p>
          <div className="w-16 h-px bg-white/10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 space-y-8 md:space-y-12"
        >
          <p className="text-3xl md:text-6xl font-display font-light leading-[1.1] tracking-tight text-white/90">
            At One Third, we have a bunch of <span className="font-bold italic">creative</span> members.
          </p>
          <div className="space-y-6 md:space-y-8 text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            <p>
              We believe that every moment holds the power to move, inspire, and transform. We’re not just a video production company — we’re visual storytellers, dreamers, and detail-obsessed creators who bring your vision to life with cinematic precision.
            </p>
            <p>
              We capture the real, the raw, and the beautiful with an eye for art and a heart for meaning.
            </p>
            <p className="text-white font-medium text-xl md:text-2xl pt-8 md:pt-12 border-t border-white/5">
              Let’s create something unforgettable together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-48 px-6 bg-white text-black" data-theme="light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32">
          <h2 className="text-5xl md:text-8xl font-display font-light tracking-tight">Our Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 border border-black/5 rounded-3xl overflow-hidden">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 md:p-16 bg-white hover:bg-black transition-all duration-700 cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-8 md:mb-12 group-hover:bg-white group-hover:text-black transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 md:mb-6 group-hover:text-white transition-colors">{service.title}</h3>
              <p className="text-black/40 font-light leading-relaxed text-base md:text-lg group-hover:text-white/50 transition-colors">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OurWork = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Corporate', 'Documentary', 'Sports', 'Fashion & Music'];
  
  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  // Split projects into two rows for mobile slider
  const row1 = filteredProjects.filter((_, i) => i % 2 === 0);
  const row2 = filteredProjects.filter((_, i) => i % 2 !== 0);

  return (
    <section id="work" className="py-24 md:py-48 px-6 bg-black" data-theme="dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24">
          <h2 className="text-5xl md:text-[10rem] font-display font-light tracking-tighter leading-[0.85]">Our Work</h2>
        </div>

        {/* Videography Sub-section */}
        <div className="mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
            <div>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">Videography</h3>
              <p className="text-white/30 font-light max-w-md text-base md:text-lg leading-relaxed">Explore our diverse portfolio of cinematic productions across various industries.</p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-sm border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 group"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                  Filter: {activeCategory}
                </span>
                <ChevronDownIcon className={`w-3.5 h-3.5 text-white/40 transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <>
                    {/* Backdrop to close */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsFilterOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 md:left-0 mt-4 w-56 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden z-50 shadow-2xl"
                    >
                      <div className="p-1.5">
                        {categories.map((cat) => (
                          <button 
                            key={cat} 
                            onClick={() => {
                              setActiveCategory(cat);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 rounded-md text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                              activeCategory === cat 
                                ? 'bg-white text-black' 
                                : 'text-white/40 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-12 md:gap-24">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden relative">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <Play className="w-12 h-12 text-white/80" />
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                      <div className="mb-4">
                        <span className="inline-block text-[9px] font-mono tracking-[0.3em] uppercase text-white px-4 py-1.5 border border-brand/30 rounded-sm bg-brand/10 backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                      <h4 className="text-xl md:text-3xl font-display font-bold tracking-tight text-white group-hover:italic transition-all duration-500">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Two-Row Slider */}
          <div className="md:hidden space-y-8 overflow-hidden -mx-6">
            {/* Row 1: Scrolls Left */}
            <div className="flex">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 px-6"
              >
                {[...row1, ...row1, ...row1].map((project, i) => (
                  <div 
                    key={`${project.id}-row1-${i}`}
                    onClick={() => setSelectedProject(project)}
                    className="w-[280px] flex-shrink-0"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden relative">
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />
                      
                      {/* Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white/30 fill-white" />
                      </div>

                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-5">
                        <span className="inline-block text-[7px] font-mono uppercase tracking-widest text-white px-3 py-1 border border-white/20 rounded-sm bg-white/10 backdrop-blur-md mb-2">
                          {project.category}
                        </span>
                        <h4 className="text-base font-display font-bold text-white leading-tight">{project.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Row 2: Scrolls Right */}
            <div className="flex">
              <motion.div 
                animate={{ x: [-1000, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex gap-4 px-6"
              >
                {[...row2, ...row2, ...row2].map((project, i) => (
                  <div 
                    key={`${project.id}-row2-${i}`}
                    onClick={() => setSelectedProject(project)}
                    className="w-[280px] flex-shrink-0"
                  >
                    <div className="aspect-video rounded-2xl overflow-hidden relative">
                      <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70" />
                      
                      {/* Play Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white/30 fill-white" />
                      </div>

                      {/* Text Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-5">
                        <span className="inline-block text-[7px] font-mono uppercase tracking-widest text-white px-3 py-1 border border-white/20 rounded-sm bg-white/10 backdrop-blur-md mb-2">
                          {project.category}
                        </span>
                        <h4 className="text-base font-display font-bold text-white leading-tight">{project.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/20 mb-20 md:mb-32" />

        {/* Photography Sub-section */}
        <div id="photography">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12">
            <div>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 md:mb-6">Photography</h3>
              <p className="text-white/30 font-light max-w-md text-base md:text-lg leading-relaxed">Capturing still moments with cinematic precision and artistic vision.</p>
            </div>
            <div className="h-px flex-grow bg-white/20 hidden md:block mx-12 mb-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {PHOTOGRAPHY_IMAGES.map((img, index) => {
              // Bento logic for mobile (index-based spans)
              const bentoClasses = [
                "col-span-2 row-span-1", // 0: Large wide
                "col-span-1 row-span-1", // 1: Small
                "col-span-1 row-span-2", // 2: Tall
                "col-span-1 row-span-1", // 3: Small
                "col-span-2 row-span-1", // 4: Wide
                "col-span-1 row-span-1", // 5: Small
                "col-span-1 row-span-1", // 6: Small
                "col-span-2 row-span-1", // 7: Wide
                "col-span-1 row-span-1", // 8: Small
                "col-span-1 row-span-1", // 9: Small
              ];
              
              const mobileClass = bentoClasses[index % bentoClasses.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                  className={`${mobileClass} md:col-span-1 md:row-span-1 rounded-xl md:rounded-[2rem] overflow-hidden group cursor-pointer relative bg-white/5 h-full border border-transparent hover:border-brand/40 transition-colors duration-500`}
                >
                  <img 
                    src={img} 
                    alt={`Photography ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 glass"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black w-full max-w-5xl rounded-3xl overflow-hidden relative"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="aspect-video w-full bg-white/5">
                <iframe 
                  src={selectedProject.videoUrl} 
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              
              <div className="p-10">
                <span className="text-xs font-mono tracking-widest uppercase text-white/40 mb-4 block">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl font-display font-bold mb-6">{selectedProject.title}</h2>
                <p className="text-white/60 text-lg font-light max-w-2xl">
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Team = () => {
  return (
    <section id="people" className="py-24 md:py-48 px-6 bg-white text-black" data-theme="light">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32">
          <h2 className="text-5xl md:text-8xl font-display font-light tracking-tight">Core Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="relative w-full aspect-[3/4] mb-8 md:mb-10 rounded-2xl md:rounded-3xl overflow-hidden bg-black/5">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2 md:mb-3">{member.name}</h3>
              <p className="text-black/30 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-6 md:mb-8">{member.role}</p>
              <p className="text-black/50 font-light text-sm md:text-base leading-relaxed">
                {member.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Clients = () => {
  return (
    <section id="clients" className="py-24 md:py-48 px-6 bg-black" data-theme="dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-32">
          <h2 className="text-5xl md:text-8xl font-display font-light tracking-tight">Our Clients</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5 border border-black/5 rounded-2xl md:rounded-3xl overflow-hidden">
          {CLIENT_LOGOS.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="flex items-center justify-center p-8 md:p-16 bg-white transition-all duration-700"
            >
              <img 
                src={logo} 
                alt={`Client Logo ${index + 1}`} 
                className="max-w-full max-h-10 md:max-h-12 object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-48 px-6 bg-white text-black" data-theme="light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32">
        <div>
          <h2 className="text-5xl md:text-8xl font-display font-light leading-[0.9] tracking-tighter mb-12 md:mb-16">
            Let's create <br /> <span className="font-bold italic">together.</span>
          </h2>
          <div className="space-y-8 md:space-y-12">
            <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-black/30 uppercase tracking-[0.2em] mb-1 md:mb-2">Call Us</p>
                <p className="text-xl md:text-2xl font-medium tracking-tight">01740509336</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black/5 p-8 md:p-16 rounded-3xl md:rounded-[2.5rem] border border-black/5"
        >
          <form className="space-y-8 md:space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 outline-none focus:border-black transition-colors placeholder:text-black/20 text-lg md:text-xl font-light"
                />
              </div>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 outline-none focus:border-black transition-colors placeholder:text-black/20 text-lg md:text-xl font-light"
                />
              </div>
            </div>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Project Type"
                className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 outline-none focus:border-black transition-colors placeholder:text-black/20 text-lg md:text-xl font-light"
              />
            </div>
            <div className="relative group">
              <textarea 
                placeholder="Message"
                rows={4}
                className="w-full bg-transparent border-b border-black/10 py-4 md:py-6 outline-none focus:border-black transition-colors placeholder:text-black/20 resize-none text-lg md:text-xl font-light"
              />
            </div>
            <button className="w-full py-5 md:py-6 bg-black text-white font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-black/80 transition-all duration-500 rounded-xl md:rounded-2xl">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 md:py-32 px-6 md:px-10 border-t border-white/5 bg-black" data-theme="dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-16 md:mb-32">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6 md:mb-12">
              <img 
                src="https://i.postimg.cc/hGrCX0q4/file-0000000084d87208a305a911b218e98b.png" 
                alt="One Third Production Logo" 
                className="h-8 md:h-12 w-auto object-contain logo-white"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/50 font-light max-w-xs text-sm md:text-lg leading-relaxed">
              Capturing the most powerful part of every story. Bangladesh-based media production house.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:contents">
            <div className="order-2 md:order-1">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-12">Navigation</h4>
              <ul className="space-y-3 md:space-y-6 text-sm font-light text-white/50">
                {['Work', 'About', 'Services', 'People', 'Contact'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-brand transition-colors duration-500">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="order-1 md:order-2">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-12">Social</h4>
              <div className="flex flex-col gap-3 md:gap-6">
                {[
                  { name: 'Instagram', icon: Instagram },
                  { name: 'Facebook', icon: Facebook },
                  { name: 'Linkedin', icon: Linkedin },
                  { name: 'Twitter', icon: Twitter }
                ].map((social) => (
                  <a key={social.name} href="#" className="flex items-center gap-4 text-sm text-white/50 hover:text-brand transition-all duration-500 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                      <social.icon className="w-3 h-3" />
                    </div>
                    <span className="font-light tracking-wide hidden sm:inline">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-16 border-t border-white/5 gap-6 md:gap-8">
          <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/20 text-center md:text-left">
            © 2026 One Third Production.
          </p>
          <div className="flex gap-8 md:gap-12 text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowLabel(true), 2000);
    const hideTimer = setTimeout(() => setShowLabel(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const actions = [
    { id: 'book', icon: Calendar, label: 'Book Now', href: '#contact', desc: 'Schedule your next production' },
    { id: 'call', icon: Phone, label: 'Call Us', href: 'tel:01740509336', desc: 'Direct line to our team' },
    { id: 'chat', icon: MessageCircle, label: 'Live Chat', href: 'https://wa.me/01740509336', desc: 'Instant support on WhatsApp' },
    { id: 'mail', icon: Mail, label: 'Email Us', href: 'mailto:kbdnoman599@gmail.com', desc: 'Send us your project brief' },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl p-8 md:p-16"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-all duration-500 group"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-12 md:mb-16">
                <span className="inline-block text-[10px] font-mono tracking-[0.4em] uppercase text-brand mb-4">Connect With Us</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Let's start a <br /><span className="italic font-light text-white/60">conversation.</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {actions.map((action, index) => (
                  <motion.a
                    key={action.id}
                    href={action.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="group flex items-center gap-6 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 hover:border-brand/40 hover:bg-brand/5 transition-all duration-500"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
                      <action.icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-bold mb-1">{action.label}</h3>
                      <p className="text-white/30 text-sm font-light">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-white/20 group-hover:text-brand transition-all -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-500" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest">Available 24/7 for urgent inquiries</p>
                <div className="flex gap-6">
                  <Instagram className="w-5 h-5 text-white/20 hover:text-brand transition-colors cursor-pointer" />
                  <Facebook className="w-5 h-5 text-white/20 hover:text-brand transition-colors cursor-pointer" />
                  <Linkedin className="w-5 h-5 text-white/20 hover:text-brand transition-colors cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-center gap-4">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-16 h-16 ${isOpen ? 'bg-black text-white border border-white/10' : 'bg-brand text-white'} rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 group`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
          </motion.div>
          <AnimatePresence>
            {!isOpen && showLabel && (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-4 px-4 py-2 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap pointer-events-none shadow-xl overflow-hidden"
              >
                Contact Us
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    repeatDelay: 1,
                    ease: "linear" 
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                />
              </motion.span>
            )}
          </AnimatePresence>
          {!isOpen && !showLabel && (
            <span className="absolute right-full mr-4 px-4 py-2 bg-brand text-white text-[10px] font-bold uppercase tracking-widest rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              Contact Us
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default function App() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-brand selection:text-white">
      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <OurWork />
        <Team />
        <Clients />
        <Contact />
      </main>

      <Footer />
      <FloatingContactWidget />
    </div>
  );
}
