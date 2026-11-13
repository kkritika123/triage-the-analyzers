// The query parameters of a registration link, as EmailService builds it:
// /register?email=...&token=...&courseId=...&sectionId=...&role=...
export interface RegistrationLink {
  email: string
  token: string
  courseId: number
  sectionId: number
  role: string
}

// A route query value is a string, null, or an array when the parameter repeats; only a non-empty string is usable.
function nonEmptyString(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null
}

// The backend binds courseId and sectionId to Integer, so anything but a whole number fails on submit.
function wholeNumber(value: unknown): number | null {
  const text = nonEmptyString(value)
  return text !== null && /^\d+$/.test(text) ? Number(text) : null
}

// Returns the link's parameters, or null when the link cannot be used to register.
// All five are required: without courseId and sectionId the form used to appear and then fail on submit.
export function parseRegistrationLink(query: Record<string, unknown>): RegistrationLink | null {
  const email = nonEmptyString(query.email)
  const token = nonEmptyString(query.token)
  const role = nonEmptyString(query.role)
  const courseId = wholeNumber(query.courseId)
  const sectionId = wholeNumber(query.sectionId)

  if (
    email === null ||
    token === null ||
    role === null ||
    courseId === null ||
    sectionId === null
  ) {
    return null
  }

  return { email, token, courseId, sectionId, role }
}
