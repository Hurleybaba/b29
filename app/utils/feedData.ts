// --- MOCK DATA WITH MEDIA ---

export interface Comment {
  id: number;
  user: string;
  avatarColor: string; // Tailwind color class or hex
  text: string;
  time: string;
  replies?: Comment[];
}

export interface Author {
  name: string;
  handle: string;
  avatarColor: string;
  verified: boolean;
}

export interface OriginalPostItemsProps {
  id: number;
  text: string;
  type: "image" | "video" | "text";
  src?: string;
  height: string; // Tailwind aspect ratio class
  width: string;
  timeLeft: string;
  distance?: string;
  bgColor?: string; // For text posts
  
  // New Fields
  author: Author;
  likes: number;
  shares: number;
  saves: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  comments: Comment[];
}

export const originalPostItems: OriginalPostItemsProps[] = [
  {
    id: 1,
    text: "Urban Vibes",
    type: "video",
    src: "/media/b5d706d365ed3436ba27651e382e87b5_1764753320504.mp4",
    height: "aspect-[9/16]",
    width: "w-full",
    timeLeft: "2h 30m",
    author: { name: "City Explorer", handle: "@city_exp", avatarColor: "bg-blue-600", verified: true },
    likes: 1240,
    shares: 450,
    saves: 89,
    tags: ["#Urban", "#NightLife", "#CityScapes"],
    rating: 4.8,
    reviewCount: 128,
    comments: [
      {
        id: 101,
        user: "Sarah Jenkins",
        avatarColor: "bg-pink-500",
        text: "The lighting in this shot is incredible! 🌃",
        time: "10m",
        replies: []
      },
      {
        id: 102,
        user: "Davide M.",
        avatarColor: "bg-blue-500",
        text: "Where is this exactly? Looks like Tokyo.",
        time: "45m",
        replies: [
          {
            id: 103,
            user: "City Explorer",
            avatarColor: "bg-blue-600",
            text: "Close! It's Seoul.",
            time: "30m"
          }
        ]
      },
      {
        id: 104,
        user: "TravelBug",
        avatarColor: "bg-green-400",
        text: "Added to my bucket list.",
        time: "1h",
        replies: []
      }
    ]
  },
  {
    id: 2,
    text: "Skate Park Tricks",
    type: "video",
    src: "/media/051d0c0fc208f8ec05da017a20ce78f6_1764749704694.mp4",
    height: "aspect-square",
    width: "w-full",
    timeLeft: "1d",
    author: { name: "Skate Life", handle: "@sk8r_boi", avatarColor: "bg-red-500", verified: false },
    likes: 856,
    shares: 120,
    saves: 300,
    tags: ["#Skate", "#Tricks", "#SlowMo"],
    rating: 4.5,
    reviewCount: 42,
    comments: [
      { id: 201, user: "Tony H.", avatarColor: "bg-gray-500", text: "Sick flip! That landing was clean.", time: "10m" },
      { id: 202, user: "SkaterGirl", avatarColor: "bg-purple-500", text: "How long did it take to nail that?", time: "2h", replies: [
         { id: 203, user: "Skate Life", avatarColor: "bg-red-500", text: "About 3 weeks of practice!", time: "1h" }
      ]},
      { id: 204, user: "RadDude", avatarColor: "bg-yellow-500", text: "Insane skills bro.", time: "3h" }
    ]
  },
  {
    id: 15,
    text: "Create what you love.",
    type: "text",
    bgColor: "#FF5720",
    height: "aspect-square",
    width: "w-full",
    timeLeft: "30m",
    author: { name: "InspoDaily", handle: "@daily_inspo", avatarColor: "bg-orange-400", verified: true },
    likes: 3400,
    shares: 1200,
    saves: 4500,
    tags: ["#Motivation", "#Create", "#Art"],
    rating: 5.0,
    reviewCount: 310,
    comments: [
      { id: 151, user: "Anna K.", avatarColor: "bg-teal-500", text: "Needed this today. Thank you!", time: "5m" },
      { id: 152, user: "DevOne", avatarColor: "bg-indigo-500", text: "Simple but true.", time: "12m" }
    ]
  },
  {
    id: 3,
    text: "Tech Unboxing",
    type: "video",
    src: "/media/4f84bf265315d88bdddb03db5e85fef0_1764753202715.mp4",
    height: "aspect-square",
    width: "w-full",
    timeLeft: "45m",
    author: { name: "Tech Guru", handle: "@tech_reviews", avatarColor: "bg-indigo-600", verified: true },
    likes: 560,
    shares: 30,
    saves: 120,
    tags: ["#Tech", "#Unboxing", "#Gadgets"],
    rating: 4.2,
    reviewCount: 15,
    comments: [
       { id: 301, user: "GadgetHead", avatarColor: "bg-blue-400", text: "Is the battery life actually good?", time: "2m" },
       { id: 302, user: "ReviewerX", avatarColor: "bg-red-400", text: "Waiting for the full review on YT.", time: "20m", replies: [
          { id: 303, user: "Tech Guru", avatarColor: "bg-indigo-600", text: "Dropping tomorrow!", time: "10m" }
       ]}
    ]
  },
  {
    id: 16,
    text: "Just because you are awake doesn't mean you should stop dreaming.",
    type: "text",
    bgColor: "#1F1F1F",
    height: "aspect-[16/9]",
    width: "w-full",
    timeLeft: "4h",
    author: { name: "Night Owl", handle: "@dreamer", avatarColor: "bg-gray-800", verified: false },
    likes: 900,
    shares: 200,
    saves: 50,
    tags: ["#Dreams", "#Quotes", "#Night"],
    rating: 4.7,
    reviewCount: 88,
    comments: [
      { id: 161, user: "Luna", avatarColor: "bg-purple-600", text: "Deep.", time: "1h" },
      { id: 162, user: "StarGazer", avatarColor: "bg-blue-300", text: "Love the dark mode aesthetic.", time: "2h" }
    ]
  },
  {
    id: 4,
    text: "Artistic Process",
    type: "video",
    src: "/media/eabff569a9bd0afa3bd2959f995f56ca_1764753406900.mp4",
    height: "aspect-[4/5]",
    width: "w-full",
    timeLeft: "3h 15m",
    author: { name: "Paint & Brush", handle: "@artist_lucy", avatarColor: "bg-pink-500", verified: true },
    likes: 2100,
    shares: 890,
    saves: 1500,
    tags: ["#Art", "#Process", "#Painting"],
    rating: 4.9,
    reviewCount: 205,
    comments: [
      { id: 401, user: "ColorFan", avatarColor: "bg-yellow-400", text: "Those brush strokes are so satisfying.", time: "30m" },
      { id: 402, user: "ArtyFarty", avatarColor: "bg-green-500", text: "What brand of acrylics are you using?", time: "1h", replies: [
         { id: 403, user: "Paint & Brush", avatarColor: "bg-pink-500", text: "Mostly Golden and Liquitex!", time: "45m" }
      ]}
    ]
  },
  {
    id: 5,
    text: "Morning Coffee",
    type: "image",
    src: "/media/7066c5a623d29c220d0b131a9b9e5fa4.png",
    height: "aspect-[4/3]",
    width: "w-full",
    timeLeft: "6h",
    author: { name: "Cafe Vibes", handle: "@morning_brew", avatarColor: "bg-brown-500", verified: false },
    likes: 430,
    shares: 12,
    saves: 5,
    tags: ["#Coffee", "#Morning", "#Relax"],
    rating: 4.6,
    reviewCount: 20,
    comments: [
      { id: 501, user: "BaristaJoe", avatarColor: "bg-brown-700", text: "Latte art on point! ☕️", time: "2h" },
      { id: 502, user: "MorningPerson", avatarColor: "bg-orange-300", text: "Best way to start the day.", time: "4h" }
    ]
  },
  {
    id: 6,
    text: "Nature Walk",
    type: "video",
    src: "/media/59522b476d4e635cd1151d714d4712e6_1764753388870.mp4",
    height: "aspect-[9/16]",
    width: "w-full",
    timeLeft: "12h 30m",
    author: { name: "Nature Lover", handle: "@green_earth", avatarColor: "bg-green-700", verified: true },
    likes: 1500,
    shares: 300,
    saves: 200,
    tags: ["#Nature", "#Walk", "#Peace"],
    rating: 4.8,
    reviewCount: 150,
    comments: [
      { id: 601, user: "Hiker4Life", avatarColor: "bg-green-800", text: "So peaceful. Is this the Appalachian trail?", time: "5h" },
      { id: 602, user: "CityGirl", avatarColor: "bg-pink-400", text: "I need to escape the city and go here.", time: "6h" },
      { id: 603, user: "Nature Lover", avatarColor: "bg-green-700", text: "It's a local trail in Oregon!", time: "5h" }
    ]
  },
  {
    id: 7,
    text: "Summer Collection",
    type: "image",
    src: "/media/3a1e795cae4f9bd335450403bff9d6bd.png",
    height: "aspect-[16/9]",
    width: "w-full",
    timeLeft: "1d 5h",
    author: { name: "Fashion Nova", handle: "@fashion_nova", avatarColor: "bg-purple-600", verified: true },
    likes: 5000,
    shares: 2000,
    saves: 1000,
    tags: ["#Fashion", "#Summer", "#Style"],
    rating: 4.3,
    reviewCount: 500,
    comments: [
      { id: 701, user: "ShopAholic", avatarColor: "bg-red-500", text: "Need that dress in blue!", time: "10h" },
      { id: 702, user: "TrendSetter", avatarColor: "bg-purple-400", text: "When does the sale end?", time: "12h", replies: [
         { id: 703, user: "Fashion Nova", avatarColor: "bg-purple-600", text: "It ends this Sunday!", time: "11h" }
      ]}
    ]
  },
  {
    id: 17,
    text: "Minimalism is not a lack of something. It’s simply the perfect amount of something.",
    type: "text",
    bgColor: "#8E44AD",
    height: "aspect-[16/9]",
    width: "w-full",
    timeLeft: "1d",
    author: { name: "Minimalist", handle: "@simple_life", avatarColor: "bg-gray-400", verified: false },
    likes: 780,
    shares: 150,
    saves: 300,
    tags: ["#Minimalism", "#Design", "#Life"],
    rating: 4.9,
    reviewCount: 95,
    comments: [
       { id: 171, user: "ZenMaster", avatarColor: "bg-gray-200", text: "Less is more.", time: "5h" },
       { id: 172, user: "DesignerPro", avatarColor: "bg-black", text: "Great quote.", time: "8h" }
    ]
  },
  {
    id: 8,
    text: "Interior Design",
    type: "image",
    src: "/media/48829418a0a6222084d050efd4fe9175.png",
    height: "aspect-[16/9]",
    width: "w-full",
    timeLeft: "4h",
    author: { name: "Home Decor", handle: "@interiors", avatarColor: "bg-teal-600", verified: true },
    likes: 2300,
    shares: 600,
    saves: 4000,
    tags: ["#Interior", "#Home", "#Design"],
    rating: 4.7,
    reviewCount: 300,
    comments: [
      { id: 801, user: "HouseProud", avatarColor: "bg-blue-800", text: "That sofa looks so comfy.", time: "1h" },
      { id: 802, user: "StyleGuru", avatarColor: "bg-teal-400", text: "Love the rug combination.", time: "2h" }
    ]
  },
  {
    id: 9,
    text: "Concert Highlights",
    type: "video",
    src: "/media/9c15daa7ebf874a293d07c9b98398c52_1764749604790.mp4",
    height: "aspect-[9/16]",
    width: "w-full",
    timeLeft: "8h 45m",
    author: { name: "Rock On", handle: "@music_live", avatarColor: "bg-red-700", verified: false },
    likes: 8000,
    shares: 3000,
    saves: 500,
    tags: ["#Concert", "#LiveMusic", "#Rock"],
    rating: 4.9,
    reviewCount: 1024,
    comments: [
      { id: 901, user: "MusicFan01", avatarColor: "bg-black", text: "Best night ever!! 🎸", time: "1h" },
      { id: 902, user: "LiveWire", avatarColor: "bg-red-500", text: "The energy was unreal.", time: "2h" },
      { id: 903, user: "DrummerBoy", avatarColor: "bg-blue-600", text: "That solo was melted face.", time: "3h" }
    ]
  },
  {
    id: 18,
    text: "Stay Wild 🌿",
    type: "text",
    bgColor: "#27AE60",
    height: "aspect-[4/3]",
    width: "w-full",
    timeLeft: "2h",
    author: { name: "Wild Heart", handle: "@stay_wild", avatarColor: "bg-green-500", verified: false },
    likes: 450,
    shares: 80,
    saves: 40,
    tags: ["#Wild", "#Nature", "#Quote"],
    rating: 4.5,
    reviewCount: 30,
    comments: [
       { id: 181, user: "FreeSpirit", avatarColor: "bg-green-300", text: "Always.", time: "10m" }
    ]
  },
  {
    id: 10,
    text: "Product Reveal",
    type: "image",
    src: "/media/efde2a88bc61b30a9dfe5cca7d3da070.png",
    height: "aspect-[4/3]",
    width: "w-full",
    timeLeft: "2d",
    author: { name: "Gadget World", handle: "@gadget_world", avatarColor: "bg-blue-400", verified: true },
    likes: 1200,
    shares: 400,
    saves: 150,
    tags: ["#NewProduct", "#Reveal", "#Tech"],
    rating: 4.4,
    reviewCount: 80,
    comments: [
      { id: 1001, user: "EarlyAdopter", avatarColor: "bg-cyan-500", text: "Take my money!", time: "1d" },
      { id: 1002, user: "SkepticalTech", avatarColor: "bg-gray-600", text: "Price point seems high.", time: "1d", replies: [
         { id: 1003, user: "Gadget World", avatarColor: "bg-blue-400", text: "It comes with premium features unavailable elsewhere.", time: "23h" }
      ]}
    ]
  },
  {
    id: 11,
    text: "Street Food",
    type: "video",
    src: "/media/043d516ddba1573be29ea9bedb0b313f_1764749576340.mp4",
    height: "aspect-[16/9]",
    width: "w-full",
    timeLeft: "1h 30m",
    author: { name: "Foodie", handle: "@street_eats", avatarColor: "bg-yellow-600", verified: false },
    likes: 950,
    shares: 200,
    saves: 600,
    tags: ["#Food", "#StreetFood", "#Yummy"],
    rating: 4.8,
    reviewCount: 220,
    comments: [
      { id: 1101, user: "HungryHippo", avatarColor: "bg-orange-500", text: "Looks delicious! 🤤", time: "10m" },
      { id: 1102, user: "TravelEats", avatarColor: "bg-green-400", text: "Is this in Bangkok?", time: "30m", replies: [
         { id: 1103, user: "Foodie", avatarColor: "bg-yellow-600", text: "Yes, Chinatown!", time: "15m" }
      ]}
    ]
  },
  {
    id: 19,
    text: "Design is intelligence made visible.",
    type: "text",
    bgColor: "#2980B9",
    height: "aspect-square",
    width: "w-full",
    timeLeft: "5h",
    author: { name: "Design Quote", handle: "@design_q", avatarColor: "bg-blue-700", verified: true },
    likes: 1100,
    shares: 350,
    saves: 500,
    tags: ["#Design", "#Intelligence", "#Quote"],
    rating: 4.9,
    reviewCount: 140,
    comments: [
       { id: 191, user: "UxDesigner", avatarColor: "bg-indigo-500", text: "Favorite quote ever.", time: "1h" }
    ]
  },
  {
    id: 12,
    text: "Pet Moments",
    type: "image",
    src: "/media/7066c5a623d29c220d0b131a9b9e5fa4.png",
    height: "aspect-square",
    width: "w-full",
    timeLeft: "5h",
    author: { name: "Pet Lovers", handle: "@cute_pets", avatarColor: "bg-orange-300", verified: false },
    likes: 3000,
    shares: 1000,
    saves: 2000,
    tags: ["#Pets", "#Cute", "#Animals"],
    rating: 5.0,
    reviewCount: 600,
    comments: [
      { id: 1201, user: "CatLady", avatarColor: "bg-pink-300", text: "Omg so fluffy!!!", time: "1h" },
      { id: 1202, user: "DoggoFan", avatarColor: "bg-brown-500", text: "What breed is that?", time: "2h" }
    ]
  },
  {
    id: 13,
    text: "Luxury Villa Tour",
    type: "video",
    src: "/media/043d516ddba1573be29ea9bedb0b313f_1764749576340.mp4",
    height: "aspect-[9/16]",
    width: "w-full",
    timeLeft: "1d 3h",
    author: { name: "Luxury Living", handle: "@lux_life", avatarColor: "bg-gold-500", verified: true },
    likes: 5000,
    shares: 2000,
    saves: 3000,
    tags: ["#Luxury", "#Villa", "#Tour"],
    rating: 4.6,
    reviewCount: 400,
    comments: [
      { id: 1301, user: "DreamHome", avatarColor: "bg-purple-800", text: "Goals.", time: "5h" },
      { id: 1302, user: "RealtorMike", avatarColor: "bg-blue-700", text: "The infinity pool is stunning.", time: "10h" }
    ]
  },
  {
    id: 14,
    text: "Architecture",
    type: "image",
    src: "/media/3a1e795cae4f9bd335450403bff9d6bd.png",
    height: "aspect-[3/2]",
    width: "w-full",
    timeLeft: "9h 20m",
    author: { name: "Arch Daily", handle: "@arch_daily", avatarColor: "bg-gray-600", verified: true },
    likes: 2200,
    shares: 500,
    saves: 1200,
    tags: ["#Architecture", "#Building", "#Design"],
    rating: 4.8,
    reviewCount: 250,
    comments: [
      { id: 1401, user: "StructEng", avatarColor: "bg-gray-500", text: "Impressive cantilever.", time: "2h" },
      { id: 1402, user: "Modernist", avatarColor: "bg-black", text: "Clean lines.", time: "3h" }
    ]
  },
  {
    id: 20,
    text: "Good vibes only.",
    type: "text",
    bgColor: "#F1C40F",
    height: "aspect-[16/9]",
    width: "w-full",
    timeLeft: "12h",
    author: { name: "Vibe Check", handle: "@good_vibes", avatarColor: "bg-yellow-400", verified: false },
    likes: 1500,
    shares: 600,
    saves: 300,
    tags: ["#Vibes", "#Positive", "#Happy"],
    rating: 4.7,
    reviewCount: 180,
    comments: [
       { id: 2001, user: "HappyCamper", avatarColor: "bg-green-400", text: "Yesss!", time: "1h" }
    ]
  },
];

// Filtered results based on location
export const nearbyPostItems: OriginalPostItemsProps[] = [
  {
    id: 101,
    text: "Nearby Cafe - 50m",
    type: "video",
    src: "/media/eabff569a9bd0afa3bd2959f995f56ca_1764753406900.mp4",
    height: "h-64",
    width: "w-full",
    distance: "50m",
    timeLeft: "1h 15m",
    author: { name: "Local Brews", handle: "@local_cafe", avatarColor: "bg-brown-600", verified: true },
    likes: 120,
    shares: 10,
    saves: 40,
    tags: ["#Coffee", "#Nearby", "#Local"],
    rating: 4.5,
    reviewCount: 55,
    comments: [
      { id: 1011, user: "Neighbor1", avatarColor: "bg-green-500", text: "Do you have oat milk?", time: "10m", replies: [
         { id: 1012, user: "Local Brews", avatarColor: "bg-brown-600", text: "Yes we do!", time: "5m" }
      ]}
    ]
  },
  {
    id: 102,
    text: "Local Art Gallery",
    type: "image",
    src: "/media/7066c5a623d29c220d0b131a9b9e5fa4.png",
    height: "h-80",
    width: "w-full",
    distance: "120m",
    timeLeft: "3h",
    author: { name: "Art Hub", handle: "@art_gallery", avatarColor: "bg-purple-700", verified: true },
    likes: 300,
    shares: 50,
    saves: 80,
    tags: ["#Art", "#Gallery", "#Culture"],
    rating: 4.8,
    reviewCount: 90,
    comments: [
      { id: 1021, user: "ArtStudent", avatarColor: "bg-red-400", text: "Is entry free?", time: "1h" },
      { id: 1022, user: "Art Hub", avatarColor: "bg-purple-700", text: "Free for students!", time: "30m" }
    ]
  },
  {
    id: 103,
    text: "Tech Meetup",
    type: "video",
    src: "/media/59522b476d4e635cd1151d714d4712e6_1764753388870.mp4",
    height: "h-56",
    width: "w-full",
    distance: "200m",
    timeLeft: "2h 30m",
    author: { name: "Dev Community", handle: "@dev_meetup", avatarColor: "bg-blue-800", verified: false },
    likes: 80,
    shares: 20,
    saves: 15,
    tags: ["#Tech", "#Meetup", "#Coding"],
    rating: 4.2,
    reviewCount: 12,
    comments: [
      { id: 1031, user: "Coder123", avatarColor: "bg-gray-700", text: "What's the topic tonight?", time: "1h", replies: [
         { id: 1032, user: "Dev Community", avatarColor: "bg-blue-800", text: "React Server Components.", time: "45m" }
      ]}
    ]
  },
  {
    id: 104,
    text: "Fashion Pop-up",
    type: "image",
    src: "/media/48829418a0a6222084d050efd4fe9175.png",
    height: "h-72",
    width: "w-full",
    distance: "80m",
    timeLeft: "45m",
    author: { name: "Chic Pop", handle: "@chic_popup", avatarColor: "bg-pink-400", verified: false },
    likes: 150,
    shares: 40,
    saves: 60,
    tags: ["#Fashion", "#Popup", "#Sale"],
    rating: 4.6,
    reviewCount: 35,
    comments: [
      { id: 1041, user: "Fashionista", avatarColor: "bg-pink-600", text: "On my way!", time: "5m" }
    ]
  },
  {
    id: 105,
    text: "Food Truck",
    type: "video",
    src: "/media/051d0c0fc208f8ec05da017a20ce78f6_1764749704694.mp4",
    height: "h-88",
    width: "w-full",
    distance: "150m",
    timeLeft: "5h",
    author: { name: "Burger Van", handle: "@burger_van", avatarColor: "bg-red-600", verified: true },
    likes: 500,
    shares: 100,
    saves: 200,
    tags: ["#Food", "#Burger", "#Truck"],
    rating: 4.9,
    reviewCount: 150,
    comments: [
      { id: 1051, user: "LunchTime", avatarColor: "bg-yellow-500", text: "Best burgers in town.", time: "1h" },
      { id: 1052, user: "MeatLover", avatarColor: "bg-red-800", text: "Double cheese is a must.", time: "2h" }
    ]
  },
  {
    id: 106,
    text: "Flash Sale at Zara! 50% Off",
    type: "text",
    bgColor: "#E74C3C",
    height: "aspect-square",
    width: "w-full",
    distance: "10m",
    timeLeft: "30m",
    author: { name: "Zara Official", handle: "@zara", avatarColor: "bg-black", verified: true },
    likes: 2000,
    shares: 800,
    saves: 100,
    tags: ["#Sale", "#Zara", "#Fashion"],
    rating: 4.0,
    reviewCount: 300,
    comments: [
      { id: 1061, user: "Shopper", avatarColor: "bg-gray-400", text: "Is it crowded?", time: "5m" },
      { id: 1062, user: "Zara Official", avatarColor: "bg-black", text: "Lines are moving fast!", time: "2m" }
    ]
  },
];