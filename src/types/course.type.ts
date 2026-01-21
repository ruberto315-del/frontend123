export type CourseStatusType = "DRAFR" | "PLANNED" | "ARCHIVED"


export type CourseType = {
    id: number
    name: string
    price: number
    startDate: Date
    endDate: Date
    description: any
    status: CourseStatusType
    registrationOpen: boolean
    certificateTemplate: any
    certificateTemplateId: number
    registrations: any
    createAt: Date
    updateAt: Date
}


/*

model Course {
  id               Int          @id @default(autoincrement())
  name             String
  price            Decimal
  startDate        DateTime?
  endDate          DateTime?
  description      Json?
  status           CourseStatus @default(DRAFT)
  registrationOpen Boolean      @default(true)

  certificateTemplateId Int?

  registrations       Registration[]
  certificateTemplate CertificateTemplate? @relation(fields: [certificateTemplateId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("courses")
}
  
*/