# GreenKart storefront test plan

## Application Overview

Plan for exercising the GreenKart storefront on the seleniumPractise page, including page load, search, product selection, cart behavior, and navigation to offers.

## Test Scenarios

### 1. GreenKart storefront

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage loads with core shopping UI

**File:** `tests/greenkart/homepage-loads.spec.ts`

**Steps:**
  1. Open the GreenKart homepage
    - expect: The page title is displayed and the header with the GreenKart brand is visible
  2. Verify the search field and cart link are visible
    - expect: The search box, cart link, and product cards are visible

#### 1.2. Search filters products

**File:** `tests/greenkart/search-filters-products.spec.ts`

**Steps:**
  1. Enter a product keyword in the search box
    - expect: Only matching products remain visible on the page
  2. Clear the search
    - expect: The full product list is restored

#### 1.3. User can add products to the cart

**File:** `tests/greenkart/add-products-to-cart.spec.ts`

**Steps:**
  1. Select a product and click ADD TO CART
    - expect: The cart count or cart summary updates
  2. Add a second product
    - expect: Both products are reflected in the cart state

#### 1.4. Cart page shows selected items and totals

**File:** `tests/greenkart/cart-summary.spec.ts`

**Steps:**
  1. Open the cart view
    - expect: The chosen products are listed with quantities and prices
  2. Verify price calculation
    - expect: The displayed total matches the selected products

#### 1.5. Top Deals page is accessible

**File:** `tests/greenkart/top-deals-navigation.spec.ts`

**Steps:**
  1. Click the Top Deals navigation link
    - expect: The offers page opens successfully and the relevant content is displayed
