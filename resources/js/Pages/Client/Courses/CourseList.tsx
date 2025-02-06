import { useEffect, useState } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head, Link } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button"; // Import Button

// Define Course type
interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string; // Path to thumbnail image
  lessons: Lesson[];
}

// Define Lesson type
interface Lesson {
  id: number;
  title: string;
  type: "video" | "pdf" | "text";
  content: string; // URL for video, path for PDF, or text content
}

// Fake Course Data
const fakeCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React development.",
    thumbnail: "/images/react_thumbnail.jpg", // Example thumbnail path
    lessons: [
      {
        id: 1,
        title: "Setting up your environment",
        type: "text",
        content: "Instructions for setting up Node.js, npm, etc.",
      },
      {
        id: 2,
        title: "Components and JSX",
        type: "video",
        content: "/videos/react_components.mp4", // Example video URL
      },
      {
        id: 3,
        title: "Working with props",
        type: "pdf",
        content: "/pdfs/react_props.pdf", // Example PDF path
      },
    ],
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into advanced JavaScript concepts.",
    thumbnail: "/images/js_thumbnail.png", // Example thumbnail path
    lessons: [
      // ... more lessons
    ],
  },
  // ... more fake courses
];

export default function CourseList() {
  return (
    <ClientLayout path={['Courses', 'List']}>
      <Head title="Courses" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fakeCourses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="block"> {/* Use next/link */}
              <Card className="p-4 cursor-pointer">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-32 w-full object-cover mb-2 rounded-md"
                />
                <h3 className="font-medium">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </ClientLayout>
  );
};

