# TeleSport

This document describes the architecture of the TeleSport project, its main building blocks, and how to run it.

# 📑 Table of Contents

1. Overview

2. Project Structure

3. Core Components

4. Routing

5. Services

6. Data Models

7. Development & Build Instructions

# 1. Overview

TeleSport is a front-end application built with Angular.
The project follows a modular architecture, clearly separating:

UI (presentation)

Data handling

Navigation & routing

This ensures the app is maintainable, testable, and easy to evolve.

# 2. Project Structure

Here’s the high-level folder structure:

- **/TeleSport/**
  - `.vscode/` → VS Code project settings
  - `src/`
    - `app/`
      - `pages/` → Page-level components (routes)
      - `core/`
        - `services/` → API communication & Data transformation
        - `models/` → Data models & TypeScript interfaces
      - `app-routing.module.ts`
      - `app.module.ts`
    - `assets/` → Static resources (images, icons, etc.)
    - `environments/` → Environment-specific config
  - `angular.json`
  - `package.json`
  - `tsconfig.json`
  - … other config files

# 3. Core Components

Located in pages/.

Contains page-level components representing application views.

Each page is linked to a route.

# 4. Routing

Routing is defined in app-routing.module.ts.

Each page component corresponds to at least one route.

# 5. Services

Located in core/services/.

Implemented as Angular @Injectable services.

Responsible for:

API communication (HTTP requests)

Data transformations

# 6. Data Models

Located in core/models/.

Contains TypeScript interfaces and types used across the app.

Helps maintain strong typing and avoid any.

Ensures consistent data structures when interacting with services.

Specific data structures are also required to generate charts with ngx-charts (pie and line charts).

# 7. Development & Build Instructions

Install dependencies

``npm install``

Run dev server

``ng serve``

=> Application will be available at: http://localhost:4200/

Build

``ng build``

=> Build output will be located in the dist/ directory.
