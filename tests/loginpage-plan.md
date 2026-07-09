# Login page test plan

## Application Overview

Concise login page plan with three short failed-login sub-cases for invalid username/password combinations.

## Test Scenarios

### 1. Login page scenarios

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with valid credentials

**File:** `tests/loginpage-success.spec.ts`

**Steps:**
  1. Open the login page
    - expect: The login form is displayed
  2. Enter a valid username and password
    - expect: The credentials are accepted
  3. Check the terms checkbox and click Sign In
    - expect: The user is redirected to the shop page

#### 1.2. Failed login with invalid credentials

**File:** `tests/loginpage-failed.spec.ts`

**Steps:**
  1. 1.2.a username invalide + password valide
    - expect: The login fails and an error message is shown
  2. 1.2.b username valide + password invalide
    - expect: The login fails and an error message is shown
  3. 1.2.c les deux invalides
    - expect: The login fails and an error message is shown

    
### 2. GreenKart home page scenarios

#### 2.1. Verify home page loads and products are visible

**File:** `tests/greenkart-homepage.spec.ts`

**Steps:**
1. Open the GreenKart home page
   - expect: The page loads successfully
2. Verify the page title/header is visible
   - expect: The "GREENKART" logo/header is visible
3. Verify at least one product is visible
   - expect: Product cards (e.g. "Brocolli - 1 Kg") are visible with name, price, and "ADD TO CART" button