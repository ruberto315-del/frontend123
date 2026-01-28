import  type {CourseStatusType} from "@/types/course.type"

export const getCourseStatus = (status: CourseStatusType) => {
    switch(status){
        case "PLANNED":
            return "Очікується"
        case "ARCHIVED":
            return "Архів"
        case "DRAFR":
            return "чернетка"

        default:
            return "Неавідомий статус"
    }
}