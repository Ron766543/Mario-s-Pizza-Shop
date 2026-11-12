# 🍕 Mario's Pizza – Online Ordering System

An interactive pizza ordering app built with **React**. Customers can build a custom pizza, add sides and drinks, choose delivery or pickup, review a live order ticket, and get an order confirmation page, all with guest checkout (no account needed).

---

## ✨ Features

### Pizza builder
- **Size:** Small 10" ($12.99), Medium 12" ($15.99, marked *Popular*), Large 16" ($18.99)
- **Crust:** Classic Regular (included), Crispy Thin (+$1.00), Stuffed Rim (+$2.50), Gluten-Free (+$2.00)
- **Toppings:** 24 toppings in three groups (Meats & Salumi, Vegetables & Aromatics, Gourmet Infusions & Seafood) at **+$1.50 each**, selected with toggle buttons
- **Quantity:** plus/minus counter for the number of pizzas
- **Special instructions:** optional text field (max 100 characters), revealed by a checkbox

### Sides & beverages
- 8 items: dough knots, mozzarella fritta, truffle fries, Caesar salad, sodas and cannoli
- Each item has its own quantity counter, and its card highlights when selected

### Order type
- **Delivery** (45–60 min, $7.50 courier fee): shows a required address field
- **Pickup** (20–30 min, no fee): hides the address field and shows the store info card

### Live order ticket
- Sticky sidebar on laptop screens and up, stacked below the form on mobile and tablet
- Shows customer details, selected size and crust, toppings, and a price breakdown (pie base, crust upgrade, toppings, sides & drinks, delivery)
- The total updates instantly with every selection

### Form validation
| Field | Rule |
|---|---|
| Name | Required |
| Email | Required, valid format (checked in real time while typing) |
| Phone | Required, exactly 10 digits |
| Address | Required for delivery only |
| Special instructions | Max 100 characters |

Error messages appear directly below each field, and submission is blocked until every rule passes.

### Confirmation & reset
- A valid submit opens a **confirmation page** with a tracking reference (`MP-xxxxx`), estimated arrival time, recipient and fulfilment details, pizza summary and a status tracker
- **Clear Form** and **Return to Pizzeria Home** reset all state and generate a new order ID

---

## 🛠 Tech Stack

- [React](https://react.dev/) (functional components with `useState`)
- [Tailwind CSS v4](https://tailwindcss.com/) utility classes
- [lucide-react](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/) for icons
- A looping background video (`src/assets/pizza.mp4`) in the header

---

## 🚀 Getting Started

> Assumes a Vite + React project with Tailwind CSS v4 configured.

```bash
# 1. Install dependencies
npm install
npm install lucide-react react-icons

# 2. Make sure this file exists
#    src/assets/pizza.mp4

# 3. Start the dev server
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

---

## 📁 Project Structure

```
src/
├── App.jsx          # All logic and UI (form, order ticket, confirmation page)
├── App.css          # Global styles
└── assets/
    └── pizza.mp4    # Header background video
```

---

## 🧠 How It Works

### State
| State | Purpose |
|---|---|
| `customerInfo` | name, phone, email, address (controlled inputs) |
| `pizzaCustom` | size, crust, toppings, special instructions |
| `pizzaCount` | pizza quantity per size |
| `beverageCounts` | quantity per side or drink, keyed by item id |
| `orderType` | `"delivery"` or `"pickup"` |
| `errors` | validation messages by field |
| `showInput` | toggles the special-instructions field |
| `orderConfirmed` | switches to the confirmation page |
| `pizzaId` | 5-digit order reference generated from `Date.now()` |

### Price formula

```
total = (sizePrice + crustPrice + toppings × $1.50) × pizzaQuantity
        + Σ(side price × side quantity)
        + deliveryCharge
```