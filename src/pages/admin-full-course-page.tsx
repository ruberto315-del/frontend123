import {
  useCreateCourses,
  useOneCourses,
  useUpdateCourses,
} from "@/api/hooks/use-courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BaseField from "@/components/ui/custom/base-field";
import { RichTextEditor } from "@/components/ui/custom/rich-text-editor";
import { Title } from "@/components/ui/custom/title";
import { Input } from "@/components/ui/input";
import getFormErrors from "@/helpers/get-form-errors";
import React, { useState, type MouseEvent } from "react";
import { useParams } from "react-router";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Назва заходу обов'язкова"),
  price: z.coerce.number().positive("Вартість заходу має бути більше 0"),
  description: z.string().min(1, "Назва заходу обов'язкова"),
  startDate: z.string().nonoptional("Дата заходу обов'язкова"),
  status: z.enum(
    ["DRAFT", "PLANNED", "ARCHIVED"],
    "Статус заходу обов'язковий",
  ),
  registrationOpen: z.enum(
    ["OPENED", "CLOSED"],
    "Статус реєстрації обов'язковий",
  ),
  certificateTemplateId: z.coerce.number().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  startDate: "",
  status: "DRAFT",
  registrationOpen: "OPENED",
  certificateTemplateId: undefined,
} as FormData;

const AdminFullCoursePage = () => {
  const params = useParams();

  const isUpdate = !isNaN(Number(params?.id));

  const { data: course, isLoading: isCoursesLoading } = useOneCourses(
    isUpdate ? params?.id : undefined,
  );

  const [showErrors, setShowErrors] = useState(false);
  const [userFormData, setUserFormData] = useState({});

  const createCourse = useCreateCourses();
  const updateCourse = useUpdateCourses();

  const formData = {
    ...initialFormData,
    ...(course
      ? {
          ...course,
          registrationOpen: course.registrationOpen ? "OPENED" : "CLOSED",
        }
      : {}),
    ...userFormData,
  };

  const validate = () => {
    const res = formSchema.safeParse(formData);
    if (res.success) return;
    return res.error.format();
  };

  const errors = showErrors ? validate() : undefined;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = validate();
    if (errors) {
      setShowErrors(true);
      return;
    }
    if (isUpdate) {
      if (!params?.id) return;
      updateCourse.mutate({
        ...formData,
        registrationOpen: formData.registrationOpen === "OPENED" ? true : false,
        id: +params.id,
      });
    } else {
      createCourse.mutate({
        ...formData,
        registrationOpen: formData.registrationOpen === "OPENED" ? true : false,
      });
    }
  };

  const isLoading =
    isCoursesLoading || createCourse.isPending || updateCourse.isPending;

  const changeUserFormData = (key: keyof FormData, value: string) => {
    setUserFormData((prev) => ({ ...prev, [key]: value }));
  };

  console.log(formData)

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <Title className="mb-12">
        {isUpdate ? "Овновити захід" : "Новий захід"}
      </Title>
      <Card>
        <CardContent className="space-y-6">
          <BaseField
            name="name"
            required
            value={formData.name}
            type="text"
            onChange={(value) => changeUserFormData("name", value)}
            label="Назва заходу"
            placeholder="Назва заходу"
          />

          <BaseField
            name="price"
            required
            value={formData.price}
            type="text"
            onChange={(value) => changeUserFormData("price", value)}
            label="Ціна"
            placeholder="500 грн."
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Програма заходу
            </label>
            <RichTextEditor content={formData.description} onChange={(value) => changeUserFormData("description", value)} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols gap-4">
            <BaseField
              name="startDate"
              required
              value={formData.startDate}
              type="date"
              onChange={(value) => changeUserFormData("startDate", value)}
              label="Дата проведення"
              placeholder="Назва заходу"
            />

            <BaseField
              name="status"
              type="select"
              onChange={(value) => changeUserFormData("status", value)}
              value={formData.status}
              defaultValue={formData.status}
              label="Статус"
              placeholder="500 грн."
              items={[
                { label: "Чернетка", value: "DRAFT" },
                { label: "Очікується", value: "PLANNED" },
                { label: "Архів", value: "ARCHIVED" },
              ]}
            />

            <BaseField
              name="registrationOpen"
              required
              value={formData.registrationOpen}
              defaultValue={formData.registrationOpen}
              type="select"
              onChange={(value) =>
                changeUserFormData("registrationOpen", value)
              }
              label="Шаблон сертифікату"
              placeholder="500 грн."
              items={[
                { label: "Відкрито", value: "OPENED" },
                { label: "Закрито", value: "CLOSED" },
              ]}
            />

            <BaseField
              name="certificateTemplateId"
              value=""
              type="select"
              onChange={(value) =>
                changeUserFormData("certificateTemplateId", value)
              }
              label="Шаблон сертифікату"
              placeholder="500 грн."
              items={[{ label: "Шаблон №1", value: "1" }]}
            />
          </div>

          {showErrors && !!getFormErrors(errors).length && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              {getFormErrors(errors).map((error) => (
                <p className="text-sm text-destructive">{error}</p>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-10">
            <Button
              className="flex-1"
              size="lg"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isUpdate ? "Оновнити" : "Зберегти"}
            </Button>
            <Button
              className="w-50"
              variant="ghost"
              size="lg"
              disabled={isLoading}
            >
              Відмінити
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFullCoursePage;
