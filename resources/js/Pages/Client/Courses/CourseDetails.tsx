import { useEffect, useState } from "react";
import { ClientLayout } from "../Layout/Layout";
import { Head } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

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

// CourseDetails Page
export const CourseDetails = () => {
  const [courseProgress, setCourseProgress] = useState<Record<number, boolean>>({}); // Track progress
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Get the course ID from the URL (e.g., using react-router-dom)
    const courseId = parseInt(window.location.pathname.split('/').pop() || '1', 10); // Get the last part of the path
    const foundCourse = fakeCourses.find((c) => c.id === courseId);
    setCourse(foundCourse || null);
  }, []);

  const handleMarkAsComplete = (lessonId: number) => {
    setCourseProgress({ ...courseProgress, [lessonId]: true });
  };

  if (!course) {
    return <div>Course not found.</div>;
  }

  return (
    <ClientLayout path={['Courses', course.title]}> {/* Dynamic path */}
      <Head title={course.title} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-700">{course.description}</p>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Lessons</h3>
          <ul>
            {course.lessons.map((lesson) => (
              <li key={lesson.id} className="mb-4 border rounded p-4">
                <h4 className="font-medium">{lesson.title}</h4>
                {lesson.type === "video" && (
                  <video src={lesson.content} controls className="mt-2 w-full"></video>
                )}
                {lesson.type === "pdf" && (
                  <a href={lesson.content} target="_blank" rel="noopener noreferrer" className="mt-2 block text-blue-500 underline">View PDF</a>
                )}
                {lesson.type === "text" && <p className="mt-2">{lesson.content}</p>}
                <Button
                  onClick={() => handleMarkAsComplete(lesson.id)}
                  disabled={courseProgress[lesson.id]} // Disable if already completed
                  className="mt-2"
                >
                  {courseProgress[lesson.id] ? "Completed" : "Mark as Complete"}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ClientLayout>
  );
};