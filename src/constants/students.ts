export interface Student {
  rank: string;
  name: string;
  role: string;
  image: string;
  videoUrl: string;
  bgVideoUrl: string;
  desc: string;
  votes: number;
}

export const TOP_STUDENTS: Student[] = [
  { 
    rank: "01", 
    name: "Juan Manuel Terrazas", 
    role: "Software Architect",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Ejemplo URL
    bgVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ",
    image: "https://i.postimg.cc/52fbMfLK/Whats-App-Image-2026-03-17-at-19-11-53-(2).jpg", 
    desc: "Arquitecto de sistemas con visión global y liderazgo técnico.",
    votes: 150
  },
  { 
    rank: "02", 
    name: "Maria Gomez", 
    role: "Data Scientist",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    bgVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop", 
    desc: "Experta en análisis de datos masivos.",
    votes: 120
  },
  // ... Se pueden añadir más aquí siguiendo el mismo formato
];