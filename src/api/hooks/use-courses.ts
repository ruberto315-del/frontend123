import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosClient } from "../client";
import type { CourseType } from "@/types/course.type";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const UseCourses = (status: "PLANNED" | "ARCHIVED") => {
  const query = useQuery({
    queryKey: ["courses", { status }],
    queryFn: async () => {
      const { data } = await axiosClient.get<CourseType[]>(
        `/course/status/${status}`,
      );
      return data;
    },
  });
  return query;
};

export const useAllCourses = () => {
  const query = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axiosClient.get<CourseType[]>(`/course`);
      return data;
    },
  });
  return query;
};

export const useOneCourses = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["courses", { id }],
    queryFn: async () => {
      const { data } = await axiosClient.get<CourseType>(`/course/${id}`);
      return data;
    },
  });
  return query;
};

export const useCreateCourses = () => {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (
      payload: Omit<
        CourseType,
        | "id"
        | "endDate"
        | "createAt"
        | "updateAt"
        | "certificateTemplate"
        | "registrations"
      >,
    ) => {
      const course = {...payload, startDate: new Date(payload.startDate), price: +payload.price}
      const { data } = await axiosClient.post("/course", course);
      return data;
    },
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/admin/courses");
    },

    onError: (error) => {
      toast.error(`Помилка при створені заходу. ${error.message}`);
    },
  });
  return mutation;
};

export const useUpdateCourses = () => {
  const queryCLient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["update-course"],
    mutationFn: async (
      payload: Omit<
        CourseType,
        | "endDate"
        | "createAt"
        | "updateAt"
        | "certificateTemplate"
        | "registrations"
      >,
    ) => {
      // @ts-ignore
      const { id, createAt, updateAt, ...rest } = payload;
      const course = {...rest, startDate: new Date(payload.startDate), price: +payload.price}
      const { data } = await axiosClient.patch(`/course${id}`, course);
      return data;
    },
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/admin/courses");
    },

    onError: (error) => {
      toast.error(`Помилка при оновленні   заходу. ${error.message}`);
    },
  });
  return mutation;
};
