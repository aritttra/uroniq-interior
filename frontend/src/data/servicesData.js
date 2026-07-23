import { Home, Building2, Hotel, Armchair, HardHat, Zap, Droplets, Sparkles, PenTool } from 'lucide-react';

// Available images to cycle through for subcategories
const imgs = ['/hero.png', '/residential.png', '/office.png', '/kitchen.png', '/dining.png', '/bathroom.png', '/penthouse.png', '/terrace.png', '/commercial.png', '/about.png'];
const img = (i) => imgs[i % imgs.length];

export const serviceCategories = [
  {
    id: 'turnkey',
    title: 'Turnkey Interior Solutions',
    icon: Home,
    description: 'Complete interior solutions—from concept design and planning to execution, installation, and final handover—ensuring a seamless experience.',
    color: '#d4af37',
    subcategories: [
      { name: 'Luxury Apartments', img: img(0), description: 'Opulent apartment interiors designed with premium materials, bespoke furniture, and sophisticated lighting to create an extraordinary living experience.' },
      { name: 'Villas & Independent Houses', img: img(1), description: 'Grand villa interiors that blend architectural elegance with personalized luxury, featuring expansive layouts and curated design elements.' },
      { name: '2BHK, 3BHK & 4BHK Homes', img: img(2), description: 'Smart, space-optimized interior solutions tailored for modern apartments, maximizing every square foot with style and functionality.' },
      { name: 'Home Renovation & Remodeling', img: img(3), description: 'Transform your existing space with expert renovation services—structural changes, modern upgrades, and complete aesthetic makeovers.' },
      { name: 'Modular Kitchens', img: img(4), description: 'High-performance modular kitchens with custom cabinetry, premium countertops, integrated appliances, and intelligent storage solutions.' },
      { name: 'Wardrobes & Walk-in Closets', img: img(5), description: 'Bespoke wardrobe systems and luxurious walk-in closets designed for optimal organization, featuring soft-close mechanisms and premium finishes.' },
      { name: 'Living & Dining Areas', img: img(6), description: 'Sophisticated living and dining spaces that balance comfort with elegance, featuring custom furniture, statement lighting, and rich textures.' },
      { name: 'Bedrooms', img: img(7), description: 'Serene bedroom sanctuaries crafted with premium fabrics, ambient lighting, and ergonomic designs for ultimate relaxation.' },
      { name: "Children's Rooms", img: img(8), description: 'Vibrant, safe, and functional children\'s rooms designed to inspire creativity, featuring playful themes and smart storage solutions.' },
      { name: 'TV Units & Entertainment Walls', img: img(9), description: 'Custom-designed entertainment walls with integrated cable management, ambient backlighting, and premium material finishes.' },
      { name: 'Pooja Units', img: img(0), description: 'Elegant and sacred pooja room designs featuring intricate woodwork, brass accents, and ambient lighting for a spiritual atmosphere.' },
      { name: 'Balcony & Terrace Design', img: img(1), description: 'Transform outdoor spaces into stunning extensions of your home with weather-resistant materials, cozy seating, and lush greenery.' },
      { name: 'False Ceiling & Decorative Lighting', img: img(2), description: 'Architectural false ceilings with integrated cove lighting, chandeliers, and decorative fixtures that elevate any room\'s ambiance.' },
      { name: 'Wall Paneling & Feature Walls', img: img(3), description: 'Statement wall panels in wood, stone, PVC, and fabric—creating focal points that define the character of your space.' },
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial Interiors',
    icon: Building2,
    description: 'Functional and elegant commercial spaces that enhance productivity and reinforce brand identity.',
    color: '#4a90d9',
    subcategories: [
      { name: 'Corporate Offices', img: img(2), description: 'Professional corporate environments with ergonomic workstations, collaborative zones, and executive suites that reflect your brand values.' },
      { name: 'Startup Offices', img: img(9), description: 'Dynamic, creative workspaces designed for agility and growth—open layouts, breakout zones, and vibrant energy throughout.' },
      { name: 'Retail Showrooms', img: img(8), description: 'Immersive retail environments that guide customer journeys, showcase products effectively, and maximize commercial impact.' },
      { name: 'Electronics Stores', img: img(3), description: 'Tech-forward retail spaces with interactive displays, clean product showcasing, and modern lighting systems.' },
      { name: 'Fashion & Lifestyle Stores', img: img(4), description: 'Chic boutique interiors with curated display systems, luxurious fitting rooms, and brand-aligned aesthetic throughout.' },
      { name: 'Jewellery Showrooms', img: img(5), description: 'Opulent showroom designs with specialized display lighting, secure showcases, and an atmosphere of exclusivity and trust.' },
      { name: 'Restaurants & Cafés', img: img(6), description: 'Inviting dining atmospheres with thoughtful seating layouts, ambient lighting, and thematic design that enhances the culinary experience.' },
      { name: 'Salons & Spas', img: img(7), description: 'Tranquil wellness spaces designed for relaxation—soothing palettes, functional styling stations, and luxurious treatment rooms.' },
      { name: 'Clinics & Diagnostic Centres', img: img(0), description: 'Clean, calming healthcare environments that balance clinical functionality with patient comfort and modern aesthetics.' },
      { name: 'Reception Areas', img: img(1), description: 'Grand reception lobbies that make powerful first impressions—custom desks, brand integration, and sophisticated material palettes.' },
      { name: 'Conference Rooms', img: img(2), description: 'State-of-the-art meeting spaces with integrated AV systems, acoustic treatments, and executive-grade furniture.' },
    ]
  },
  {
    id: 'hospitality',
    title: 'Hospitality Interiors',
    icon: Hotel,
    description: 'Complete interior solutions for hospitality businesses that create memorable guest experiences.',
    color: '#e8734a',
    subcategories: [
      { name: 'Hotels', img: img(6), description: 'Full-service hotel interior design from lobby to suites—creating cohesive brand experiences that delight guests at every touchpoint.' },
      { name: 'Resorts', img: img(7), description: 'Destination-worthy resort interiors that harmonize with natural surroundings while delivering five-star luxury and comfort.' },
      { name: 'Guest Houses', img: img(1), description: 'Warm, inviting guest house interiors that combine homely comfort with professional hospitality standards.' },
      { name: 'Service Apartments', img: img(0), description: 'Modern serviced apartment interiors optimized for extended stays—functional kitchens, comfortable bedrooms, and premium amenities.' },
      { name: 'Banquet Halls', img: img(8), description: 'Grand banquet spaces designed for versatile events—flexible layouts, dramatic lighting, and opulent material selections.' },
      { name: 'Lounge Areas', img: img(5), description: 'Sophisticated lounge environments with plush seating, mood lighting, and curated ambiance perfect for socializing and relaxation.' },
    ]
  },
  {
    id: 'furniture',
    title: 'Custom Furniture Solutions',
    icon: Armchair,
    description: 'Premium custom furniture designed and manufactured to exact client specifications and style preferences.',
    color: '#8b6914',
    subcategories: [
      { name: 'Modular Furniture', img: img(3), description: 'Versatile modular systems that adapt to your evolving needs—configurable, space-efficient, and beautifully crafted.' },
      { name: 'Office Furniture', img: img(2), description: 'Ergonomic office furniture including executive desks, conference tables, workstations, and collaborative seating solutions.' },
      { name: 'Reception Counters', img: img(8), description: 'Custom-designed reception counters that embody your brand identity—premium materials, integrated lighting, and striking silhouettes.' },
      { name: 'Display Units', img: img(4), description: 'Bespoke display solutions for retail, showrooms, and homes—designed to highlight products with elegance and precision.' },
      { name: 'Storage Solutions', img: img(9), description: 'Intelligent storage systems that maximize space efficiency—custom cabinetry, built-in units, and concealed storage innovations.' },
      { name: 'Luxury Customized Furniture', img: img(6), description: 'One-of-a-kind luxury furniture pieces crafted from the finest materials—each piece a statement of craftsmanship and artistry.' },
    ]
  },
  {
    id: 'civil',
    title: 'Civil & Renovation Works',
    icon: HardHat,
    description: 'Comprehensive civil works and renovation services for structural modifications and upgrades.',
    color: '#7c8a6e',
    subcategories: [
      { name: 'Civil Modifications', img: img(1), description: 'Expert structural modifications including wall removal, room reconfiguration, and load-bearing alterations with engineering precision.' },
      { name: 'Demolition & Remodeling', img: img(3), description: 'Controlled demolition and complete remodeling services—transforming outdated spaces into modern, functional environments.' },
      { name: 'Masonry Work', img: img(7), description: 'Professional masonry services including brick work, plastering, and structural reinforcement with quality craftsmanship.' },
      { name: 'Painting', img: img(0), description: 'Premium painting services with designer color consultations, texture finishes, and long-lasting, eco-friendly paint systems.' },
      { name: 'Waterproofing', img: img(5), description: 'Advanced waterproofing solutions for bathrooms, terraces, basements, and external walls—preventing damage and ensuring longevity.' },
      { name: 'Flooring', img: img(4), description: 'Expert flooring installation including hardwood, engineered wood, vitrified tiles, natural stone, and epoxy flooring systems.' },
      { name: 'Tile & Marble Installation', img: img(6), description: 'Precision tile and marble installation with expert cutting, pattern layouts, and seamless finishing for walls and floors.' },
    ]
  },
  {
    id: 'electrical',
    title: 'Electrical & Smart Solutions',
    icon: Zap,
    description: 'Modern electrical planning and smart home automation solutions for intelligent living.',
    color: '#f0c040',
    subcategories: [
      { name: 'Electrical Planning & Execution', img: img(2), description: 'Complete electrical infrastructure planning and execution—circuit design, panel installations, and safety-compliant wiring systems.' },
      { name: 'Decorative Lighting', img: img(6), description: 'Curated decorative lighting solutions including chandeliers, pendant lights, cove lighting, and architectural accent fixtures.' },
      { name: 'Smart Home Automation', img: img(0), description: 'Cutting-edge smart home systems—voice-controlled lighting, automated blinds, climate control, and integrated entertainment systems.' },
      { name: 'CCTV Installation', img: img(8), description: 'Professional CCTV and security camera installations with HD monitoring, remote access, and complete coverage planning.' },
      { name: 'Networking & Data Cabling', img: img(9), description: 'Structured data cabling and networking solutions—Cat6/fiber installations, Wi-Fi optimization, and server room setups.' },
    ]
  },
  {
    id: 'plumbing',
    title: 'Plumbing & Bathroom Solutions',
    icon: Droplets,
    description: 'Complete plumbing works and luxurious bathroom renovation services with premium fittings.',
    color: '#5b9bd5',
    subcategories: [
      { name: 'Complete Plumbing Works', img: img(5), description: 'End-to-end plumbing services including pipeline installation, water supply systems, drainage, and leak-proof solutions.' },
      { name: 'Bathroom Renovation', img: img(5), description: 'Full bathroom renovations with designer layouts, premium tiles, modern fixtures, and spa-inspired design elements.' },
      { name: 'Sanitary Ware Installation', img: img(7), description: 'Professional installation of premium sanitary ware—toilets, basins, bathtubs, and shower enclosures from top global brands.' },
      { name: 'Premium CP Fittings', img: img(0), description: 'Installation of luxury chrome-plated and designer fittings—rain showers, mixer taps, and accessories in brushed gold, matte black, and more.' },
    ]
  },
  {
    id: 'finishing',
    title: 'Premium Finishing Works',
    icon: Sparkles,
    description: 'Exquisite finishing works that add the final layer of luxury and refinement to any space.',
    color: '#c77dba',
    subcategories: [
      { name: 'Veneer Finishes', img: img(6), description: 'Natural wood veneer applications that bring warmth and organic beauty—available in teak, walnut, oak, and exotic species.' },
      { name: 'Laminate Finishes', img: img(3), description: 'Durable and versatile laminate finishes in hundreds of textures, colors, and patterns—cost-effective premium aesthetics.' },
      { name: 'PU Polish', img: img(4), description: 'Mirror-smooth polyurethane polish for woodwork—high-gloss and matte options delivering a flawless, factory-like finish.' },
      { name: 'Duco Finish', img: img(1), description: 'Premium Duco paint finishes for furniture and surfaces—vibrant colors, ultra-smooth texture, and exceptional durability.' },
      { name: 'Acrylic Finish', img: img(0), description: 'High-gloss acrylic finishes that create a stunning reflective surface—perfect for modern kitchens, wardrobes, and vanity units.' },
      { name: 'Glass & Mirror Works', img: img(5), description: 'Custom glass and mirror installations including backpainted glass, beveled mirrors, glass partitions, and decorative glass art.' },
      { name: 'Decorative Metal Works', img: img(8), description: 'Bespoke metal work including brass profiles, SS inlays, laser-cut screens, and custom metal fixtures with premium finishes.' },
    ]
  },
  {
    id: 'design',
    title: 'Design & Visualization',
    icon: PenTool,
    description: 'Visualize your dream space before execution through advanced design and rendering services.',
    color: '#e06c75',
    subcategories: [
      { name: 'Space Planning', img: img(9), description: 'Strategic space planning that optimizes flow, functionality, and aesthetics—ensuring every area serves its purpose beautifully.' },
      { name: '2D Layouts', img: img(2), description: 'Detailed 2D floor plans and elevation drawings with precise measurements, furniture placement, and electrical/plumbing layouts.' },
      { name: '3D Design Renderings', img: img(6), description: 'Photorealistic 3D renderings that bring your design to life—visualize materials, colors, lighting, and furniture before execution.' },
      { name: 'Walkthrough Presentations', img: img(0), description: 'Immersive 3D walkthrough videos that let you virtually experience your space—explore every room, angle, and detail.' },
      { name: 'Material Selection', img: img(4), description: 'Expert guidance on material selection—curated palettes of tiles, stones, laminates, fabrics, and hardware tailored to your vision.' },
      { name: 'Mood Boards', img: img(7), description: 'Visual mood boards that capture the essence of your design direction—colors, textures, furniture styles, and overall ambiance.' },
    ]
  }
];

// Legacy export for backward compatibility with ServiceDetailModal
export const servicesData = {};
serviceCategories.forEach(cat => {
  cat.subcategories.forEach(sub => {
    servicesData[sub.name] = {
      title: sub.name,
      parentCategory: cat.title,
      vibe: cat.description,
      timeframe: 'Custom Timeline',
      materials: 'Premium Selection',
      desc: sub.description,
      photos: [sub.img],
      features: [`Part of ${cat.title}`, 'Custom design consultation', 'Premium materials & finishes', 'End-to-end project management']
    };
  });
});
