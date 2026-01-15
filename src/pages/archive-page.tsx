import CourseCard from "@/components/common/course-card";
import { Title } from "@/components/ui/custom/title";

export const ArchivePage = () => {
  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Архів заходів</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 mx-auto max-w-7xl">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};
