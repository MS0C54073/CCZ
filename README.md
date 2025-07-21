🇿🇲 CCZ - Career Connect Zambia
📌 Overview
CCZ (Career Connect Zambia) is a Zambian-tailored job portal web application built to empower job seekers and employers with modern tools to find opportunities and talent across all industries — from ICT to mining, healthcare, NGOs, government jobs, and more.

This platform is mobile-first, smart-search enabled, and resume-driven — designed to solve one frustrating problem many Zambians (including myself) face:

“Why do I have to recreate my resume every time I apply for a job?”

With CCZ, you create your professional profile once and use it to:

Automatically generate downloadable PDF resumes

Apply to multiple jobs without retyping the same information

Filter jobs by location, field, or salary

Receive smart alerts for job openings that match your profile

🎯 Why I Built This
As a Zambian professional, I was tired of constantly re-typing and redesigning my resume for every single job application. Whether it was for an NGO role in Lusaka, an internship in Kitwe, or a government post in Ndola — it always meant the same: hours spent copying, pasting, formatting, editing dates, fixing typos...

So I decided: no more.

CCZ is built to streamline that entire process:

One clean, professional profile

Automatic resume generation

One-click job applications

Smart, local job discovery

This isn't just for me — it’s for everyone in Zambia who’s ever struggled with resume fatigue or inaccessible job systems.

🚀 Features
For Job Seekers
Create a professional profile once, use it for every job

Automatically generate and download PDF CVs

Apply to jobs instantly without retyping

Get real-time alerts for jobs that match your skills

Filter jobs by province, district, category, salary

Save job listings, track applications, and get interview invites

Multiple resume templates based on job types (ICT, NGO, healthcare, etc.)

For Employers
Register a company and post unlimited job openings

Search candidates by skills, education, or experience

Invite applicants for interviews directly through the platform

View detailed analytics: job views, application rates, and performance

For Admins
Approve companies and monitor activity

Feature jobs and manage announcements

Access platform-wide analytics and reports

🌐 Tech Stack
Frontend: React.js (mobile-first), Tailwind CSS

Backend: Firebase (Firestore, Auth, Functions, Storage, Messaging)

Extras: PDF resume generation, AI job matching engine, real-time predictive search, optional WhatsApp/SMS integration

🧱 Firebase Collections
users – Job seekers and employers

resumes – Custom resume records per user

jobs – Job listings with metadata

applications – Job applications, statuses, attachments

companies – Employer profiles

notifications – Alerts for job events

messages – Chat between employers and applicants (optional)

🎯 Mission
To eliminate resume repetition, make job applications easier for every Zambian, and create a smarter way for companies to find qualified, verified local talent.

🛠️ Getting Started (for Developers)
Clone the repository

Set up Firebase project and replace .env with your config

Run the local dev server:

```bash
npm install
npm run dev
```

Deploy with:

```bash
firebase deploy
```

🙌 Contribute
If you're a developer, designer, or recruiter who wants to help improve employment systems in Zambia, you're welcome to fork this repo, build features, or just share ideas.
