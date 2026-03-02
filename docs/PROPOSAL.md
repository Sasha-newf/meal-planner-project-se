# Recipe Platform (Meal Planner Project)

## 1. Introduction

Daily meal selection is a repetitive and cognitively demanding task. Many people rely on platforms such as Instagram, TikTok, and YouTube for cooking inspiration. However, recipes shared on these platforms are often unstructured and incomplete. They lack standardized ingredient lists, portion sizes, nutritional information, and cost transparency. Moreover, they are not designed to support systematic meal planning, such as weekly scheduling, portion adjustment, or consolidated grocery list generation.

Additionally, the overwhelming volume of content on social media makes it difficult for users to track previously saved recipes. This information overload increases decision fatigue and reduces the likelihood of experimenting with new dishes.

This project builds a **reels-first recipe platform** where creators upload short recipe videos inside the app, and users can save them into **structured, reusable recipe cards**. The saved library then powers **calendar meal planning** and an **aggregated grocery list**.


---

## 2. Problem Statement

People who cook at home, particularly students and busy individuals, face several recurring challenges:

- Excessive time spent searching for meal ideas leads to decision fatigue.
- Social media recipes are unstructured, incomplete, and often lack standardized ingredient lists, portion sizes, and nutritional information.
- Users rely on separate tools for recipes, nutrition tracking, meal planning, and shopping, resulting in fragmented workflows.
- Difficulty filtering by available ingredients leads to food waste, duplicate purchases, and repetitive meal choices.
- Previously saved recipes are often lost or poorly organized due to content overload.

Existing applications typically focus on isolated functions such as recipe browsing, calorie tracking, or meal planning. Few provide an integrated workflow that combines these capabilities into a single unified system.

---

## 3. Proposed Solution

The Reels-first Recipe Platform integrates recipe management, nutrition calculation, and weekly planning into a unified platform. Core workflow: **Discover → Save → Reuse → Plan → Shop**

The application will:

- Provide structured recipes with standardized ingredient lists and preparation steps
- Automatically calculate calories and macronutrients based on ingredient data
- Allow filtering by calorie range, macronutrient values, and included or excluded ingredients
- Enable portion size adjustment with automatic nutritional recalculation
- Allow users to save and organize recipes
- Provide a weekly meal planner
- Automatically generate a consolidated shopping list based on planned meals
- Future extensions may include automated recipe import from external platforms and price-based filtering.

The goal is to reduce decision fatigue, improve organization, and enhance nutrition awareness within a single integrated workflow.

---

## 4. Target Users

Primary:
- Students and busy individuals who consume short-form food content and want to **save + reuse recipes**
- Creators who want an easy way to publish recipe videos that remain usable for cooking

Secondary (roadmap):
- Health-focused users (nutrition goals/analytics)
- Budget-focused users (cost estimation / store comparisons when feasible)


## 5. Minimum Viable Product (MVP)

The initial version of the system will include:

- Authentication  
- Creator upload: short video + guided recipe fields (ingredients with quantities, steps, time/servings)  
- Reels-style feed with basic discovery (categories + search)  
- Save → structured recipe card  
- Saved library with collections/tags + search  
- Basic calendar meal planning  
- Grocery list generation aggregated from planned meals  

### Out of Scope (Roadmap)
- Automated import/extraction from external platforms  
- Advanced nutrition analytics  
- Store-level budget comparison (depends on pricing data availability)  

---

## 6. Assumptions and Risks

### Assumptions
- Users spend significant time searching for meal ideas online.
- Users value structured recipe information and calorie calculation.
- Ingredient-based filtering will improve decision-making.
- Users are frustrated by losing or forgetting saved recipes.

### Risks
- Creators may dislike filling structured fields → mitigate with templates/autocomplete + minimal required fields  
- Users may not want to manually input ingredient data.
- The market for recipe and meal planning apps is competitive.
- Automatic nutrition calculation depends on external API reliability.
- Importing recipes from external platforms may involve technical or legal limitations.

---

## 7. Technical Overview

**Frontend:** Web application (React + TypeScript)  
Responsible for user interaction, meal planning interface, filtering controls, and data visualization.

**Backend:** REST API (Node.js + Express)  
Handles authentication, recipe management, nutrition computation orchestration, and business logic.

**Database:** PostgreSQL  
Stores users, recipes, ingredients, meal plans, and shopping list data.

**External Integration (MVP):** USDA FoodData Central API (nutrition data)  
Provides standardized nutritional values used for macro and calorie calculations.

The system follows a layered architecture separating presentation, application logic, and data persistence, ensuring maintainability and supporting future extensions (e.g., AI-based extraction).

---

## 8. Future Improvements

- AI-based recipe extraction from links  
- Personalized meal recommendations  
- Smart “cook with what you have” feature  
- Advanced nutrition analytics  
- Improved saved-recipe organization and tagging system  

---

## 9. Conclusion

This Recipe Platform aims to reduce decision fatigue, prevent information overload, and simplify home cooking by combining structured recipe storage, nutrition awareness, filtering, and meal planning into one unified platform.
