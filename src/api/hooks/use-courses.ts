import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '../client'

export const UseCourses = (status: "PLANNED" | "ARCHIVED") => {
    const query = useQuery({
        queryKey: ["courses", {status}],
        queryFn: async() => {
            const {data} = await axiosClient.get(`/course/status/${status}`)
            return data
        }
    })
    return query
}