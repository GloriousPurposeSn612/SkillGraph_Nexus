# SkillGraph Nexus

AI-powered skill gap analysis and adaptive learning pathway generator.

## Overview

SkillGraph Nexus is an intelligent career guidance system that analyzes a user's resume, compares their skills with job market requirements, and generates a personalized learning pathway to bridge skill gaps.

Many learners and job seekers struggle to understand which skills they need for specific career roles. Traditional learning platforms recommend courses but do not perform deep skill-gap analysis based on the user's real profile.

SkillGraph Nexus addresses this challenge by using AI-driven resume analysis and job requirement matching to provide actionable learning pathways.

## Key Features

* Resume upload and AI-based skill extraction
* Job description analysis
* Skill gap detection
* Personalized learning pathway generation
* Interactive skill progress visualization
* User authentication and secure data storage
* Gamified progress tracking with missions and leaderboards
* Resume optimization suggestions

## System Architecture

The system consists of three major components:

### Frontend

* Built using Lovable.dev
* React-based UI components
* Interactive dashboard for skill visualization
* Resume upload and analysis interface

### Backend

* Supabase PostgreSQL database
* Supabase authentication for user login
* Supabase storage for resume files
* Row Level Security policies for user data protection

### AI Processing Layer

* Resume text extraction
* Natural language processing for skill detection
* Job description analysis
* Skill matching and gap identification
* Adaptive learning path generation

## Workflow

1. User creates an account and logs into the platform
2. User uploads their resume
3. The system extracts text from the resume
4. AI identifies skills present in the resume
5. Job descriptions are analyzed to determine required skills
6. The system compares user skills with job requirements
7. Missing skills are identified
8. A personalized learning path is generated
9. Progress is tracked through the dashboard

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Lovable.dev UI framework

### Backend

* Supabase
* PostgreSQL database
* Supabase authentication
* Supabase storage

### AI / NLP

* Resume text parsing
* Skill extraction logic
* Job requirement comparison

### Infrastructure

* Cloud backend via Supabase
* REST API access via Supabase Data API

## Datasets Used

The system leverages publicly available datasets for job skill mapping and validation.

1. Resume Dataset
   https://www.kaggle.com/datasets/snehaanbhawal/resume-dataset/data

2. Job Description Dataset
   https://www.kaggle.com/datasets/kshitizregmi/jobs-and-job-description

3. O*NET Occupational Skills Database
   https://www.onetcenter.org/db_releases.html

These datasets provide standardized job skill information used to validate skill extraction and job-role requirements.

## Skill Gap Analysis Logic

The system follows a multi-step approach:

### Skill Extraction

Resume text is parsed and normalized. Known technical and professional skills are extracted using keyword detection and NLP preprocessing.

### Skill Matching

Extracted skills are compared against the required skills for a given job role derived from job description datasets and occupational databases.

### Skill Gap Detection

Missing skills are identified by computing the difference between:

User Skills – Extracted from Resume
Required Skills – Derived from Job Role

### Adaptive Learning Path

Skills are represented as nodes in a directed skill graph.

The system generates a recommended pathway by prioritizing:

* foundational prerequisites
* high-demand job skills
* shortest path to target job readiness

## Security and Privacy

User data security is ensured through:

* Supabase authentication
* Row Level Security policies
* Private resume storage buckets
* User-isolated database queries

Only the authenticated user can access their resume and progress data.

## Installation and Setup

### Prerequisites

* Node.js
* npm
* Supabase project
* Supabase API keys

### Clone the Repository

```bash
git clone https://github.com/your-repo/skillgraph-nexus.git
cd skillgraph-nexus
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and add:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Application

```bash
npm run dev
```

The application will start locally.

## Future Improvements

* Advanced NLP models for skill extraction
* Knowledge tracing for adaptive learning
* Integration with real learning platforms
* More job domain coverage
* Improved explainable AI insights

## License

This project is developed for an academic hackathon submission.

