import MyCoursesCard from "@/components/common/my-coruse-card"
import { Title } from "@/components/ui/custom/title"

const MyCoursesPage = () => {
  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Мої заходи</Title>
      <div className="grid grid-cols-1 gap-8 mb-24 mx-auto max-w-7xl">
        <MyCoursesCard />
      </div>
    </div>
  )
}

export default MyCoursesPage