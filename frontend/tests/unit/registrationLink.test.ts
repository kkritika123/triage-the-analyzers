// Run with: npm run test:unit (Node's built-in test runner; needs Node 22.18+ to load .ts directly)
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseRegistrationLink } from '../../src/utils/registrationLink.ts'

const completeLink = {
  email: 'l.santos@abc.edu',
  token: 'registrationToken',
  courseId: '1',
  sectionId: '2',
  role: 'student'
}

test('a complete link is accepted with numeric course and section ids', () => {
  assert.deepEqual(parseRegistrationLink(completeLink), {
    email: 'l.santos@abc.edu',
    token: 'registrationToken',
    courseId: 1,
    sectionId: 2,
    role: 'student'
  })
})

// vue-tsc: parseInt(sectionId) where sectionId is string | undefined. A link without the
// parameter used to pass the check, show the form, and send sectionId=NaN on submit.
test('a link without sectionId is rejected', () => {
  const link: Record<string, string> = { ...completeLink }
  delete link.sectionId
  assert.equal(parseRegistrationLink(link), null)
})

test('a link without courseId is rejected', () => {
  const link: Record<string, string> = { ...completeLink }
  delete link.courseId
  assert.equal(parseRegistrationLink(link), null)
})

test('a link whose ids are not whole numbers is rejected', () => {
  assert.equal(parseRegistrationLink({ ...completeLink, sectionId: 'null' }), null)
  assert.equal(parseRegistrationLink({ ...completeLink, courseId: '1abc' }), null)
})
