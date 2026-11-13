// The query parameters of a registration link, as EmailService builds it:
// /register?email=...&token=...&courseId=...&sectionId=...&role=...
export interface RegistrationLink {
  email: string
  token: string
  courseId: number
  sectionId: number
  role: string
}

// Returns the link's parameters, or null when the link cannot be used to register.
export function parseRegistrationLink(query: Record<string, string>): RegistrationLink | null {
  const { email, token, courseId, sectionId, role } = query

  if (!email || !token || !role) {
    return null
  }

  return {
    email,
    token,
    courseId: parseInt(courseId),
    sectionId: parseInt(sectionId),
    role
  }
}
