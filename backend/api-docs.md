SkillBridge Backend API doc
backend uses Express.js with MongoDB and includes real-time updates via Socket.IO.
base URL: http://localhost:3000/api  // all endpoints use this base url
auth: Most endpoints require a JWT token in the Authorization header as Bearer <token>. Obtain token via login, signup, or OAuth endpoints.

**General Notes**
Roles: business, mentor, student, admin.
Real-Time Updates: Uses Socket.IO for live updates such as job status and forum comments.
Pagination: Supported on some endpoints with query parameters page and limit.
File Uploads: Handled via multipart/form-data requests for resumes and cover letters.
Error Responses: Return a JSON object with an error key for all failures.

**Authentication Endpoints (/api/auth)**
1. Signup
Endpoint: POST /signup
email and password signup
Request Body Fields: fullName, email, password, role, about (required for business role).
Restrictions: fullName (min 2 characters), email (valid format), password (min 6 characters, 1 uppercase, 1 number), role (must be business, mentor, or student), about required for business.
~Response Codes: 201 (Success), 400 (Validation errors or email exists).



2. Login
Endpoint: POST /login
Request Body Fields: email, password.
Restrictions: email (valid format), password (required).
~Response Codes: 200 (Success), 401 (Invalid credentials), 400 (Validation errors).


3. Google Sign-In
Endpoint: POST /googleSignIn
Request Body Fields: idToken, role.
Restrictions: idToken and role (must be business, mentor, or student) required.
Response Codes: 200 (Success), 400 (Missing fields), 500 (Sign-in failure).


4. LinkedIn Sign-In
Endpoint: POST /linkedinSignIn
Request Body Fields: code, role.
restrictions: code and role (must be business, mentor, or student) required.
Response Codes: 200 (Success), 400 (Missing fields), 500 (Sign-in failure).


5. Forgot Password
Endpoint: POST /forgotPassword
request  password reset link via email.
Request Body Fields: email.
Restrictions: email (valid format).
Response Codes: 200 (Success), 404 (User not found), 400 (Validation errors).


6. Reset Password
Endpoint: POST /resetPassword
// Reset password using a token from the email link.
Request Body Fields: token, newPassword.
Restrictions: token (required), newPassword (min 6 characters, 1 uppercase, 1 number).
Response Codes: 200 (Success), 400 (Invalid or expired token, validation errors).


**User Endpoints (/api/users)**
1. Get Profile
Endpoint: GET /profile
Roles: business, mentor, student, admin
Headers: Authorization required
Restrictions: authentication
Response Codes: 200 (Success), 404 (User not found).


2. Update Profile
Endpoint: PUT /updateProfile
Roles: business, mentor, student.
Headers: Authorization required.
Request Body Fields: fullName, about, skills, education, portfolio, services, location (business only, optional).
Restrictions: All fields optional, location applies only to business role.
Response Codes: 200 (Success), 404 (User not found).


3. Upload Resume
Endpoint: POST /uploadResume
Roles: mentor, student.
Headers: Authorization and Content-Type: multipart/form-data required.
Request Body Fields: resume (file).
Restrictions:  JPEG, PNG, PDF, DOC, DOCX, max size 10MB. // have to change storage before deployment
Response Codes: 200 (Success), 400 (No file), 500 (Invalid file type).

4. Upload Cover Letter
Endpoint: POST /uploadCoverLetter
Roles: mentor, student.
Headers: Authorization and Content-Type: multipart/form-data required.
Request Body Fields: coverLetter (file).
Restrictions: JPEG, PNG, PDF, DOC, DOCX, max size 10MB. // change storage location before deployment
Response Codes: 200 (Success), 400 (No file), 500 (Invalid file type).


5. Generate Resume
Endpoint: GET /generateResume
uses openai
Roles: mentor, student.
Headers: Authorization required.
Restrictions: authentication.
response Codes: 200 (Success), 404 (User not found), 500 (Generation failure).


6. Review User
Endpoint: POST /reviewUser
description: Submit a review for another user after a job/project.
Roles: business, mentor, student.
headers: Authorization required.
Request Body Fields: userId, rating, comment (optional).
Restrictions: rating must be 1-5, userId required.
Response Codes: 200 (Success), 400 (Missing fields or invalid rating), 404 (User not found).



**Job Endpoints (/api/jobs)**
1. Create Job
Endpoint: POST /createJob
Roles: business.
headers: Authorization required.
Request Body Fields: title, location, opportunity (optional), responsibilities, payout, category.
// opportunity (string), allows businesses to add opportunities that come with jobs or internships
Restrictions: All fields except opportunity required.
Response Codes: 201 (Success), 400 (Missing required fields).


2. Get Jobs
Endpoint: GET /jobs
Description: Fetch open jobs.
Roles: None (public).
Query Params: category (optional), page (default 1), limit (default 10, max 50).
Restrictions: None beyond pagination.
Response Codes: 200 (Success).


3. Apply for Job
Endpoint: POST /applyForJob
Roles: student, mentor.
Headers: Authorization required.
Request Body Fields: jobId, mobileNumber.
Restrictions: User must upload resume/cover letter beforehand, no duplicate applications.
Response Codes: 200 (Success), 404 (Job not found), 400 (Already applied).


4. Get Applicants
Endpoint: GET /applicants/:jobId
Fetch applicants for a specific job.
Roles: business.
Headers: Authorization required.
Restrictions: Only accessible by job poster.
Response Codes: 200 (Success), 403 (Unauthorized).

5. Manage Application
Endpoint: POST /manageApplication
Description: Accept or reject an application.
Roles: business.
Headers: Authorization required.
Request Body Fields: jobId, applicantId, decision (accept or reject).
Restrictions: Only job poster can manage, valid decision required --- accept or reject applications
Response Codes: 200 (Success), 400 (Missing fields), 403 (Unauthorized).


6. Complete Job with Payment
Endpoint: POST /completeJobWithPayment
Description: Initiate payment for a completed job.
Roles: business.
Headers: Authorization required.
Request Body Fields: jobId, clientId, businessRating (optional, 1-5).
Restrictions: Job must be in-progress and assigned.
Response Codes: 200 (Success), 400 (Missing fields), 404 (Job not found).

7. Verify Completion
Endpoint: POST /verifyCompletion
Description: Confirm job completion.
Roles: business, student, mentor.
Headers: Authorization required.
Request Body Fields: jobId, isBusiness.
Restrictions: Job must be pending payment, both parties must confirm 
Response Codes: 200 (Success), 400 (Missing fields).

8. Get Recommended Jobs
Endpoint: GET /recommendedJobs
Roles: student
Headers: Authorization required
Restrictions: None beyond authentication
Response Codes: 200 (Success)


9. Get My Applications
Endpoint: GET /myApplications
Fetch the user’s job applications.
Roles: student, mentor.
Headers: Authorization required.
Restrictions: authentication.
Response Codes: 200 (Success).

10. File Dispute
Endpoint: POST /fileDispute
Description: File a dispute for a job.
Roles: business, student, mentor.
Headers: Authorization required.
Request Body Fields: jobId, reason, isBusiness.
Restrictions: All fields required.
Response Codes: 200 (Success), 400 (Missing fields).


**Project Endpoints (/api/projects)**
1. Create Project
Endpoint: POST /createProject
Roles: business, mentor.
Headers: Authorization required.
Request Body Fields: title, description, category, deadline, payout.
Restrictions: All fields required.
Response Codes: 201 (Success), 400 (Missing fields).



2. Complete Project
Endpoint: POST /completeProject
Description: Mark a project as completed.
Roles: business, mentor.
Headers: Authorization required.
Request Body Fields: projectId, completed.
Restrictions: Valid projectId required.
Response Codes: 200 (Success), 404 (Project not found).


3. Review Project
Endpoint: POST /reviewProject
Description: Add a review for a project.
Roles: business, mentor.
Headers: Authorization required.
Request Body Fields: projectId, rating, comment (optional).
Restrictions: rating must be 1-5, projectId required.
Response Codes: 200 (Success), 404 (Project not found).

**Certification Endpoints (/api/certifications)**
1. Issue Certification
Endpoint: POST /issueCertification
***--- issue a certificate to user.---***
Roles: mentor/business --- thats the current implementation let me know if we should change it
Headers: Authorization required.
Request Body Fields: userId (student), title, description.
Restrictions: All fields required.
Response Codes: 201 (Success), 400 (Missing fields).


2. Get Certifications
Endpoint: GET /getCertifications 
Description: Fetch certifications for the authenticated user.
Roles: business, mentor, student.
Headers: Authorization required.
Restrictions: None beyond authentication.
Response Codes: 200 (Success).

**Forum Endpoints (/api/forum)**
1. Create Post
Endpoint: POST /createPost
Roles: business, mentor, student.
Headers: Authorization required.
Request Body Fields: title, content.
Restrictions: All fields required.
Response Codes: 201 (Success), 400 (Missing fields).


2. Get Posts
Endpoint: GET /getPosts
Description: Fetch forum posts.
Roles: None (public).
Query Params: page (default 1), limit (default 10, max 50).
Restrictions: None beyond pagination.
Response Codes: 200 (Success).

3. Add Comment
Endpoint: POST /addComment
Description: Add a comment to a forum post.
Roles: business, mentor, student.
Headers: Authorization required.
Request Body Fields: postId, content.
Restrictions: all fields required.
Response Codes: 200 (Success), 400 (Missing fields), 404 (Post not found).

**Admin Endpoints (/api/admin)**
1. Get All Users
Endpoint: GET /users
Roles: admin.
Headers: Authorization required.
Restrictions: must be admin
Response Codes: 200 (Success).


2. Delete User
Endpoint: DELETE /users/:id
Roles: admin.
Headers: Authorization required.
Restrictions: must be admin
Response Codes: 200 (Success), 404 (User not found).


3. Get All Jobs
Endpoint: GET /jobs
Description: Fetch all jobs.
Roles: admin.
Headers: Authorization required.
Restrictions: must be admin
Response Codes: 200 (Success).


4. Delete Job
Endpoint: DELETE /jobs/:id
Roles: admin.
Headers: Authorization required.
Restrictions: must be admin
Response Codes: 200 (Success), 404 (Job not found).


5. Get All Disputes
Endpoint: GET /disputes
Description: Fetch all disputes.
Roles: admin.
Headers: Authorization required.
Restrictions: must be admin
Response Codes: 200 (Success).


6. Resolve Dispute
Endpoint: PUT /disputes/:id/resolve
Description: Resolve a dispute.
Roles: admin.
Headers: Authorization required.
Request Body Fields: resolution.
Restrictions: resolution required.
Response Codes: 200 (Success), 400 (Missing resolution), 404 (Dispute not found).

**Real-Time Events (Socket.IO)** // used this for in-app notfications, forum notis and real-time project update notis
Setup: Use socket.io-client for connection.

***Events to Listen For***
Job Application Updates: applicationUpdated (room: job_<jobId>).

Job Status Updates: jobStatusUpdated (room: job_<jobId>).

Dispute Filed: disputeFiled (room: job_<jobId>).

New Forum Post: newPost.

New Forum Comment: newComment (room: post_<postId>).

**Mobile Integration Notes**  ------- just in case we are going to deploy for mobile
CORS: Enabled for all origins.
Pagination: Use page and limit for paginated endpoints.
Lightweight Responses: JSON-formatted, excluding unnecessary data.

**Error Handling**
401: No token or invalid token
403: Access denied
404: Resource not found
400: Validation or input errors/missing fields
500: Internal server error

