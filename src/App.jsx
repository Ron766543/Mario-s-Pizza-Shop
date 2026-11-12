import "./App.css";
import { useState } from "react";
import pizzaVideo from "./assets/pizza.mp4";
import {
  MdOutlineStoreMallDirectory,
  MdOutlineDeliveryDining,
  MdOutlineStorefront,
} from "react-icons/md";
import {
  Pizza,
  Zap,
  BadgeCheck,
  Timer,
  Flame,
  IdCard,
  User,
  Phone,
  Mail,
  MapPin,
  ReceiptText,
  Truck,
  ArrowRight,
  Circle,
  CircleCheck,
  Check,
  Plus,
  UtensilsCrossed,
  Minus,
  CookingPot,
  RotateCcw,
  Store,
  CheckCheck,
} from "lucide-react";

// App Starts Here....................
const App = () => {
  // Validation

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  // State

  const [errors, setErrors] = useState({});
  const [beverageCounts, setBeverageCounts] = useState({});
  const [orderType, setOrderType] = useState("delivery");
  const [showInput, setShowInput] = useState(false);
  const [pizzaCount, setPizzaCount] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [pizzaId, setPizzaId] = useState(() => Date.now().toString().slice(-5));

  // Customer Info
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  //  Pizza customization state
  const [pizzaCustom, setPizzaCustom] = useState({
    size: "medium",
    crust: "regular",
    toppings: [],
    beverages: [],
    specialInstructions: "",
  });

  // handleInputChange arrow function to handle the inputs.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("name:", name, "value:", value);

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.email;
          return newErrors;
        });
      }
    }
  };

  // Validate Form

  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(customerInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!customerInfo.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (orderType === "delivery" && !customerInfo.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (pizzaCustom.specialInstructions.length > 100) {
      newErrors.specialInstructions =
        "The length of instructions should be within 100 characters only";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setOrderConfirmed(true);
    }
  };

  const deliveryCharge = orderType === "delivery" ? 7.5 : 0;
  const selectedPizzaCount = pizzaCount[pizzaCustom.size] ?? 1;
  // Total Amount

  const totalAmount = () => {
    const sizePrice = Number(
      sizeCategory
        .find((size) => size.id === pizzaCustom.size)
        ?.price.replace("$", "") || 0,
    );
    const crustPrice = Number(
      crustCategory
        .find((crust) => crust.id === pizzaCustom.crust)
        ?.price?.replace(/[^\d.]/g, "") || 0,
    );
    const toppingsPrice = pizzaCustom.toppings.length * 1.5;
    const sidesPrice = section
      .flatMap(({ items }) => items)
      .reduce(
        (total, item) =>
          total + Number(item.price) * (beverageCounts[item.id] || 0),
        0,
      );

    return Number(
      (
        (sizePrice + crustPrice + toppingsPrice) * selectedPizzaCount +
        sidesPrice +
        deliveryCharge
      ).toFixed(2),
    );
  };

  // Sides & Beverages

  const section = [
    {
      title: "Artisanal Hearth Sides",
      items: [
        {
          id: "knots",
          name: "Garlic Herb Dough Knots",
          tag: "Wood-fired",
          price: "5.99",
          desc: "6 pcs knots brushed with garlic confit butter & marinara dip.",
          note: "Shareable(6pcs)",
        },
        {
          id: "fritta",
          name: "Crispy Mozzarella Fritta",
          tag: "Chef Pick",
          price: "6.99",
          desc: "Molten scamorza and fior di latte center with warm San Marzano dip.",
          note: "House-pulled cheese",
        },
        {
          id: "fries",
          name: "Truffle Parmesan Fries",
          tag: "",
          price: "5.49",
          desc: "Hand-cut russets tossed in white truffle oil, sea salt & Parmigiano.",
          note: "White truffle glaze",
        },
        {
          id: "della",
          name: "Classic Caesar Della Casa",
          tag: "",
          price: "6.50",
          desc: "Romaine hearts, shaved parmigiano, garlic croutons & house dressing.",
          note: "Crisp salad bowl",
        },
      ],
    },
    {
      title: "Craft Beverages & Dolce",
      items: [
        {
          id: "pellegrino",
          name: "San Pellegrino Aranciata",
          tag: "Italian Import",
          price: "3.49",
          desc: "Sparkling blood orange soda from San Pellegrino (330ml can).",
          note: "Chilled 330ml Can",
        },
        {
          id: "limonata",
          name: "Limonata di Sorrento",
          tag: "",
          price: "3.49",
          desc: "Artisanal sparkling lemon soda crafted with fresh Sorrento mint.",
          note: "Citrus Infused",
        },
        {
          id: "coc",
          name: "Mexican Coca-Cola",
          tag: "Cane Sugar",
          price: "3.25",
          desc: "Real cane sugar classic cola served ice-cold (355ml glass bottle).",
          note: "Glass Bottle",
        },
        {
          id: "cannoli",
          name: "Traditional Sicilian Cannoli",
          tag: "Dolce",
          price: "4.50",
          desc: "Crisp pastry shell, sweet sheep's milk ricotta & chocolate chips.",
          note: "House Special",
        },
      ],
    },
  ];

  // toppings
  const toppingGroups = [
    {
      title: "Artisanal Meats & Salumi",
      items: [
        "Pepperoni",
        "Sausage",
        "Ham",
        "Bacon",
        "Chicken",
        "Beef",
        "Salami",
        "Meatballs",
      ],
    },
    {
      title: "Farm Vegetables & Aromatics",
      items: [
        "Onions",
        "Bell Peppers",
        "Mushrooms",
        "Tomatoes",
        "Black Olives",
        "Garlic",
        "Sun-Dried Tom.",
        "Chili Flakes",
      ],
    },
    {
      title: "Gourmet Infusions & Seafood",
      items: [
        "Paneer",
        "Tandoori Chk",
        "BBQ Chicken",
        "Genovese Pesto",
        "Anchovies",
        "Shrimp",
        "Truffle Oil",
        "Black Pepper",
      ],
    },
  ];

  // pizza size
  const sizeCategory = [
    {
      id: "small",
      title: 'Small 10"',
      subtitle: "Personal • 4 Slices",
      price: "$12.99",
      note: "Light Appetite",
    },
    {
      id: "medium",
      title: 'Medium 12"',
      subtitle: "Couples • 6-8 Slices",
      price: "$15.99",
      note: "Chef's Balance",
      popular: true,
    },
    {
      id: "large",
      title: 'Large 16"',
      subtitle: "Family Feast • 8-10 Slices",
      price: "$18.99",
      note: "Brooklyn NY Fold",
    },
  ];

  // pizza crust

  const crustCategory = [
    {
      id: "regular",
      title: "Classic Regular",
      subtitle: "48th fermented airy cornicione",
      note: "Included",
    },
    {
      id: "thin",
      title: "Crispy Thin",
      subtitle: "Extra charred & feather light",
      price: "+$1.00",
    },
    {
      id: "stuffed",
      title: "Stuffed Rim",
      subtitle: "Molten smoked scamorza core",
      price: "+$2.50",
    },
    {
      id: "gluten",
      title: "Gluten-Free",
      subtitle: "Cauliflower & parmesan crust",
      price: "+$2.00",
    },
  ];

  // reset form
  const reset = () => {
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
      address: "",
    });

    setPizzaCustom({
      size: "medium",
      crust: "regular",
      toppings: [],
      beverages: [],
      specialInstructions: "",
    });
    setPizzaCount({});
    setBeverageCounts({});
    setOrderType("delivery");
    setShowInput(false);
    setErrors({});
    setOrderConfirmed(false);
    setPizzaId(Date.now().toString().slice(-5));
  };

  if (orderConfirmed) {
    const confirmedSize = sizeCategory.find(
      (size) => size.id === pizzaCustom.size,
    );
    const confirmedCrust = crustCategory.find(
      (crust) => crust.id === pizzaCustom.crust,
    );

    return (
      <div className="min-h-screen overflow-hidden top-0 bg-stone-100 text-stone-900">
        <header className="bg-stone-950 px-5 py-5 text-white shadow-lg sm:px-8">
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <span className="rounded-full bg-red-700 p-2.5">
              <Pizza className="size-7" />
            </span>
            <span className="text-xl font-bold sm:text-2xl">
              Mario&apos;s Pizza
            </span>
            <span className="ml-auto hidden items-center gap-2 text-sm text-green-300 sm:flex">
              <CheckCheck size={18} /> Ticket fired to Volcanic Hearth
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
          <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl">
            <div className="bg-linear-to-br from-red-800 to-red-600 px-6 py-8 text-center text-white sm:px-10 sm:py-10">
              <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
                <CheckCheck className="size-9" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-100">
                Ticket Fired to Volcanic Hearth
              </p>
              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Order Confirmed!
              </h1>
              <p className="mt-3 text-sm text-red-100">
                Your pie is in good hands. We&apos;ll keep the hearth burning.
              </p>
            </div>

            <div className="p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-stone-100 p-4 sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Order Tracking Ref#
                  </p>
                  <p className="mt-1 font-mono text-xl font-bold text-stone-900">
                    MP-{pizzaId}
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                  <Timer className="size-6 text-red-700" />
                  <div>
                    <p className="text-xs text-stone-500">
                      Estimated Hearth Arrival
                    </p>
                    <p className="font-bold">35 - 45 Minutes</p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h2 className="text-lg font-bold">Order Details</h2>
                <div className="mt-3 space-y-3 rounded-2xl border border-stone-200 p-4 sm:p-5">
                  <p className="text-sm leading-6">
                    <strong>Recipient:</strong>
                    {customerInfo.name || "Marco Rossi"}
                    <span className="text-stone-400">•</span>
                    {customerInfo.phone || "(555) 234-5678"}
                  </p>
                  <p className="text-sm leading-6">
                    <strong>Fulfillment:</strong>{" "}
                    {orderType === "delivery"
                      ? `Delivery to: ${customerInfo.address || "142 Sullivan St, Apt 4B, New York, NY 10012"}`
                      : "Pickup at Mario's Pizza"}
                  </p>
                  <div className="border-t border-dashed border-stone-300 pt-3">
                    <p className="text-sm leading-6">
                      <strong>Your Pie:</strong> {confirmedSize?.title} (
                      {confirmedSize?.popular ? "Popular, " : ""}
                      {confirmedSize?.subtitle.split("•").at(-1)?.trim()}) with{" "}
                      {confirmedCrust?.title} Crust
                    </p>
                    <p className="mt-2 text-sm leading-6">
                      <strong>Toppings Included:</strong>{" "}
                      {pizzaCustom.toppings.length
                        ? pizzaCustom.toppings.join(", ")
                        : "None (Classic baseline Margherita balance)"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h2 className="text-lg font-bold">Live Hearth Status</h2>
                <ol className="mt-4 grid gap-3 sm:grid-cols-3">
                  <li className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-stone-800">
                    <CookingPot className="size-6 shrink-0 text-green-700" />
                    <span>
                      <span className="block text-xs text-green-700">
                        1. Dough
                      </span>
                      Hand-Stretched
                    </span>
                  </li>
                  <li className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-800">
                    <Flame className="size-6 shrink-0 text-red-700" />
                    <span>
                      <span className="block text-xs text-stone-500">
                        2. 900°
                      </span>
                      Hearth Bake
                    </span>
                  </li>
                  <li className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm font-semibold text-stone-800">
                    <Truck className="size-6 shrink-0 text-stone-500" />
                    <span>
                      <span className="block text-xs text-stone-500">
                        3. Courier
                      </span>
                      Dispatch
                    </span>
                  </li>
                </ol>
              </div>

              <button
                type="button"
                onClick={reset}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-4 font-bold text-white shadow-md transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
              >
                <RotateCcw size={19} /> Return to Pizzeria Home
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="App min-h-screen bg-stone-100 text-stone-900">
      <header className="fixed inset-x-0 top-0 z-50 h-16 overflow-hidden bg-black sm:h-20 md:h-26 lg:h-29">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={pizzaVideo}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/20" />
        <h1 className="logo relative z-10 mx-auto flex h-full w-full max-w-[1620px] items-center gap-2 px-4 text-lg font-bold text-white sm:gap-3 sm:px-6 sm:text-2xl lg:px-10 lg:text-3xl">
          <span className="rounded-full bg-red-800 p-2 shadow-lg shadow-black/20 sm:p-2.5 lg:p-3">
            <Pizza className="size-12 sm:size-8 lg:size-10" strokeWidth={2} />
          </span>
          Mario&apos;s Pizza
        </h1>
      </header>
      <div className="Up-section mt-16 sm:mt-20 md:mt-26 lg:mt-29">
        <div className="relative flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-linear-to-r from-red-700 to-red-800 px-4 py-1.5 font-mono text-[10px] text-white sm:px-6 sm:text-xs lg:px-10 lg:text-sm xl:py-2 2xl:px-40">
          <p className="flex items-center gap-2">
            <Zap
              strokeWidth={3.5}
              className="size-3.5 shrink-0 text-green-400 lg:size-4"
            />
            <span>Wood Hearth at 900°F • Live Queue: 14 Pizzas in Bake</span>
          </p>
          <p className="hidden flex-wrap items-center gap-2 md:flex">
            <BadgeCheck
              strokeWidth={3}
              className="size-3.5 shrink-0 lg:size-4.5"
            />
            <span>Zero-Account Instant Guest Checkout</span>
            <span aria-hidden="true">•</span>
            <Timer strokeWidth={3} className="size-3.5 shrink-0 lg:size-4.5" />
            <span>Avg. Bake &amp; Pack: 18 mins</span>
          </p>
        </div>

        {/* One centered container: stacked on phone/tablet, two columns on laptop+ */}
        <section className="mx-auto mt-4 w-full max-w-[1620px] px-3 sm:my-5 sm:px-6 lg:my-8 lg:px-10 xl:my-10">
          <p className="flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-800 sm:py-1.5 sm:text-sm xl:px-6 xl:py-2 xl:text-base">
            <Flame className="size-3.5 sm:size-4 xl:size-5" strokeWidth={3} />
            <span>Brooklyn Tradition Since 1952</span>
          </p>
          <div className="flex w-full flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="mt-2 max-w-3xl sm:mt-4 xl:mt-5 xl:max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl 2xl:text-6xl">
                Craft Your Custom Pie
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600 sm:mt-3 sm:text-base lg:text-lg lg:leading-7 xl:mt-4 xl:text-xl xl:leading-9">
                Natural 48-hour fermented sourdough, crushed San Marzano D.O.P.
                tomatoes, and fresh Fior di Latte pulled daily. Build by hand,
                baked on volcanic stone.
              </p>
            </div>
            <div className="mt-2 flex w-full max-w-md items-center rounded-4xl bg-stone-300 p-1 sm:mt-4 lg:mt-0 lg:w-fit lg:shrink-0 lg:p-1.5">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                aria-pressed={orderType === "delivery"}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-4xl border px-2 py-2 text-sm transition-colors sm:px-4 sm:text-base lg:flex-none lg:px-5 ${orderType === "delivery" ? "border-white bg-white shadow-sm" : "border-transparent bg-transparent"}`}
              >
                <MdOutlineDeliveryDining size={24} className="text-red-700" />
                <strong>Delivery</strong>
                <span className="rounded-4xl bg-stone-200 px-2 text-xs">
                  45-60m
                </span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                aria-pressed={orderType === "pickup"}
                className={`flex min-w-0 flex-1 items-center justify-center gap-1 rounded-4xl border px-2 py-2 text-sm transition-colors sm:px-4 sm:text-base lg:flex-none lg:px-5 ${orderType === "pickup" ? "border-white bg-white shadow-sm" : "border-transparent bg-transparent"}`}
              >
                <Store size={22} strokeWidth={2} className="text-red-700" />
                <strong>Pickup</strong>
                <span className="rounded-4xl bg-stone-200 px-2 text-xs">
                  20-30m
                </span>
              </button>
            </div>
          </div>
        </section>
        <div className="mx-auto flex w-full max-w-[1620px] flex-col gap-4 px-3 pb-4 sm:gap-5 sm:px-6 sm:pb-6 lg:flex-row lg:items-start lg:gap-6 lg:px-10 lg:pb-8- xl:gap-8 xl:pb-10">
          <main className="min-h-0 min-w-0 w-full flex-1">
            <section className="my-4 w-full min-w-0 rounded-2xl border border-stone-300 bg-white p-4 shadow-lg sm:my-5 sm:p-6 lg:p-7 xl:my-8 xl:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="flex min-w-0 items-center gap-3 sm:gap-5">
                  <IdCard
                    strokeWidth={2.25}
                    className="size-6 shrink-0 text-red-600 sm:size-7 xl:size-8"
                  />
                  <span className="flex min-w-0 flex-col items-start">
                    <strong className="text-base font-medium sm:text-lg lg:text-xl xl:text-2xl">
                      1. Guest Patron Information
                    </strong>
                    <p className="flex flex-wrap gap-1 text-xs sm:text-sm lg:text-base xl:text-lg">
                      No account needed
                      <strong>•</strong>
                      Place Order
                    </p>
                  </span>
                </h1>
                <h6 className="shrink-0 rounded-2xl bg-gray-200 px-2 py-0.5 text-xs sm:text-sm xl:px-3 xl:py-1 xl:text-base">
                  Step 1 of 2
                </h6>
              </div>
              <div className="mt-4 lg:mt-5 xl:mt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:gap-5">
                  <div className="form-group flex w-full flex-col sm:min-w-40 sm:flex-1">
                    <label
                      htmlFor="name"
                      className="flex gap-0.5 font-sans text-xs sm:text-sm xl:text-base"
                    >
                      Full Name
                      <span className="text-red-700 font-extrabold">*</span>
                    </label>
                    <div className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-red-700 sm:w-full md:w-full lg:py-2.5 xl:gap-3 xl:px-4 xl:py-3.5">
                      <User
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 xl:size-5.5"
                      />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        placeholder="Marco Rossi"
                        className="w-full min-w-0 text-sm outline-none lg:text-base xl:text-lg"
                      />
                    </div>
                    <span className="text-red-600 text-sm mt-1">
                      {errors.name}
                    </span>
                  </div>
                  <div className="phnum flex w-full flex-col sm:min-w-40 sm:flex-1">
                    <label
                      htmlFor="phone"
                      className="flex gap-0.5 font-sans text-xs sm:text-sm xl:text-base"
                    >
                      Phone Number
                      <span className="text-red-600 font-extrabold">*</span>
                    </label>
                    <div className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-red-700 lg:py-2.5 xl:gap-3 xl:px-4 xl:py-3.5">
                      <Phone
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 xl:size-5.5"
                      />
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 234-5678"
                        className="scroll-none w-full min-w-0 text-sm outline-none lg:text-base xl:text-lg"
                      />
                    </div>
                    <span className="text-red-600 text-sm mt-1">
                      {errors.phone}
                    </span>
                  </div>
                  <div className="email flex w-full flex-col sm:min-w-40 sm:flex-1">
                    <label
                      htmlFor="email"
                      className="flex gap-0.5 font-sans text-xs sm:text-sm xl:text-base"
                    >
                      Email Address
                      <span className="text-red-600 font-extrabold">*</span>
                    </label>
                    <div className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-2 focus-within:ring-2 focus-within:ring-red-700 lg:py-2.5 xl:gap-3 xl:px-4 xl:py-3.5">
                      <Mail
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 xl:size-5.5"
                      />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        placeholder="admin@gmail.com"
                        className="w-full min-w-0 text-sm outline-none lg:text-base xl:text-lg"
                      />
                    </div>
                    <span className="text-red-600 text-sm mt-1">
                      {errors.email}
                    </span>
                  </div>
                </div>
                {orderType === "delivery" ? (
                  <div className="mt-3 flex flex-col xl:mt-5">
                    <label
                      htmlFor="address"
                      className="flex gap-0.5 font-sans text-xs sm:text-sm xl:text-base"
                    >
                      Delivery Street Address, Apt, Floor
                      <span className="text-red-700 font-extrabold">*</span>
                    </label>
                    <div className="mt-2 flex h-16 items-start gap-3 rounded-md bg-gray-200 px-3 py-3 focus-within:ring-2 focus-within:ring-red-700 sm:h-20 sm:px-5 xl:h-24 xl:px-6 xl:py-4">
                      <MapPin
                        size={28}
                        strokeWidth={1.5}
                        className="size-5 shrink-0 text-red-800 xl:size-7"
                      />
                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        placeholder="142 Sullivan St, Apt 4B, New York, NY 10012"
                        className="scroll-none h-full w-full min-w-0 resize-none bg-transparent text-sm leading-6 outline-none lg:text-base xl:text-lg"
                      />
                    </div>
                    <span className="text-red-600 text-sm mt-1">
                      {errors.address}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-3 xl:mt-5 bg-stone-200 py-5 px-3 rounded-xl">
                    <div className="flex items-center gap-1">
                      <MdOutlineStoreMallDirectory
                        size={26}
                        className="text-orange-800"
                      />
                      <div className="flex flex-col items-start font-semibold">
                        <h1 className="text-xl ">
                          Maria's Hearth Station — Little Italy
                        </h1>
                        <p className="text-xs">
                          742 Via Vesuvio, Little Italy, NY • Ready at pickup
                          window in 20-30 min
                        </p>
                      </div>
                    </div>
                    <h3 className="text-green-900 bg-green-200 border border-green-300 shadow-2xs  font-semibold px-2 text-xs shrink-0 items-center rounded-3xl w-fit">
                      WelCome to Maria's shop
                    </h3>
                  </div>
                )}
              </div>
            </section>
            {/* second Draft */}
            <section className="second draft my-5 w-full rounded-2xl border border-stone-300 bg-white p-4 shadow-2xl sm:p-6 lg:p-7 xl:my-8 xl:p-8">
              <div className="flex flex-col gap-4 font-sans sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 rounded-full bg-gray-200 p-3">
                    <Pizza
                      size={36}
                      strokeWidth={1.5}
                      className="size-12 text-red-700"
                    />
                  </span>
                  <div className="flex flex-col items-start">
                    <h2 className="text-2xl font-medium">
                      2. Handcraft Your Pie
                    </h2>
                    <p className="text-md font-mono">
                      Select sizing, sourdough foundation & artisanal toppings
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-sm font-mono lg:flex">
                  <Circle
                    size={12}
                    strokeWidth={2.25}
                    className="rounded-full bg-green-700 text-green-700 outline-none"
                  />

                  <h3>Crust Ferment: Batch #49</h3>
                </div>
              </div>
              <div className="flex justify-between mt-13">
                <p className="uppercase font-semibold text-[18px]">
                  A. Select Size & Slices
                </p>
                <p className="text-[15px]">Hand-stretched to order</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {sizeCategory.map((size) => {
                  const isSelected = pizzaCustom.size === size.id;

                  return (
                    <button
                      key={size.id}
                      id={`size-${size.id}`}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setPizzaCustom((current) => ({
                          ...current,
                          size: size.id,
                        }))
                      }
                      className={`group relative flex h-36 flex-col justify-between overflow-hidden rounded-xl p-4 text-left transition-all ${
                        isSelected
                          ? "ring-2 ring-yellow-800 bg-orange-50 shadow-md hover:bg-gray-100"
                          : "bg-stone-100 hover:bg-stone-200"
                      }`}
                    >
                      {size.popular && (
                        <span className="absolute left-30 top-5 rounded-full bg-red-700 px-2 py-0.5 text-xs font-semibold text-white">
                          Popular
                        </span>
                      )}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="block text-lg font-semibold text-stone-900">
                            {size.title}
                          </span>
                          <span className="text-sm text-stone-600">
                            {size.subtitle}
                          </span>
                        </div>
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg ${
                            isSelected
                              ? "bg-yellow-800 text-white shadow-2xl"
                              : "bg-stone-300 text-stone-700"
                          }`}
                        >
                          {isSelected ? (
                            <CircleCheck size={18} strokeWidth={2.5} />
                          ) : (
                            <Circle size={18} strokeWidth={2.5} />
                          )}
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between pt-2">
                        <span
                          className={`text-lg font-bold ${
                            size.id === "medium" || isSelected
                              ? "text-red-800"
                              : "text-stone-900"
                          }`}
                        >
                          {size.price}
                        </span>
                        <span
                          className={`text-sm ${
                            size.id === "medium"
                              ? "text-yellow-900 font-bold"
                              : "text-stone-900 font-semibold"
                          }`}
                        >
                          {size.note}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between mt-13">
                <p className="uppercase font-semibold text-[18px]">
                  B. Choose Sourdough Crust Style
                </p>
                <p className="text-[15px]">Organic Molino Grassi Flour</p>
              </div>
              {/* crust */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {crustCategory.map((crust) => {
                  const isSelected = pizzaCustom.crust === crust.id;
                  return (
                    <button
                      key={crust.id}
                      id={`crust-${crust.id}`}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => {
                        setPizzaCustom((current) => ({
                          ...current,
                          crust: crust.id,
                        }));
                      }}
                      className={`crust-card flex min-h-36 flex-col justify-between rounded-xl p-4 text-left transition-all ${
                        isSelected
                          ? "bg-orange-50 ring-2 ring-yellow-800 shadow-md"
                          : "bg-stone-100 hover:bg-stone-200"
                      }`}
                    >
                      <div>
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <span className="min-w-0 flex-1 text-[19px] font-semibold leading-tight text-stone-900">
                            {crust.title}
                          </span>
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                              isSelected
                                ? "bg-yellow-800 text-white"
                                : "bg-stone-300 text-stone-400"
                            }`}
                          >
                            {isSelected ? (
                              <Check size={18} strokeWidth={2.25} />
                            ) : (
                              <Circle size={16} strokeWidth={2.25} />
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-stone-600">
                          {crust.subtitle}
                        </p>
                      </div>
                      <span
                        className={`pt-3 font-semibold text-slate-900 ${crust.note === "Included" ? "text-yellow-900" : "text-slate-900"}`}
                      >
                        {crust.price ?? crust.note}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Pizza Count */}
              <fieldset className="border-2 border-red-700 bg-stone-100 px-5 py-7 rounded-xl">
                <legend className="text-lg text-red-700 font-semibold ">
                  How many pizza
                </legend>
                <div className="flex justify-between">
                  <h2 className="capitalize text-xl font-semibold">
                    {pizzaCustom.size} Pizza
                  </h2>
                  <div className="flex gap-3 items-center">
                    <button
                      type="button"
                      aria-label={`remove one ${pizzaCustom.size}`}
                      onClick={() =>
                        setPizzaCount((current) => ({
                          ...current,
                          [pizzaCustom.size]: Math.max(
                            0,
                            (current[pizzaCustom.size] ?? 1) - 1,
                          ),
                        }))
                      }
                      className="bg-red-600 rounded-full text-white p-1"
                    >
                      <Minus size={22} strokeWidth={2.2} />
                    </button>
                    <span className="text-[22px] font-sans">
                      {selectedPizzaCount}
                    </span>
                    <button
                      type="button"
                      aria-label={`add one ${pizzaCustom.size}`}
                      onClick={() =>
                        setPizzaCount((current) => ({
                          ...current,
                          [pizzaCustom.size]:
                            (current[pizzaCustom.size] ?? 1) + 1,
                        }))
                      }
                      className="bg-red-600 rounded-full text-white p-1"
                    >
                      <Plus size={22} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </fieldset>

              {/* toppings */}
              <div className="mt-13 flex items-center justify-between gap-4">
                <div className="flex flex-col ">
                  <p className="flex items-center gap-1.5 text-[18px] font-semibold uppercase">
                    C. Hand-Selected Toppings
                    <span className="rounded-2xl bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-600">
                      +$1.50 each
                    </span>
                  </p>
                  <p>
                    Click to toggle ingredients. Freshly cut before each fire.
                  </p>
                </div>
                <p className="flex shrink-0 items-center gap-3 text-[15px]">
                  Total Selected:
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-2xl font-bold text-white"
                    aria-live="polite"
                  >
                    {pizzaCustom.toppings.length}
                  </span>
                </p>
              </div>
              <div className="mt-4 space-y-5 border-b-3 pb-9 border-solid border-slate-300">
                {/* toppings */}
                {toppingGroups.map((group) => (
                  <section key={group.title}>
                    <h3 className="mb-2 text-sm font-semibold text-stone-700">
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {group.items.map((topping) => {
                        const isSelected =
                          pizzaCustom.toppings.includes(topping);

                        return (
                          <button
                            key={topping}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => {
                              setPizzaCustom((current) => ({
                                ...current,
                                toppings: isSelected
                                  ? current.toppings.filter(
                                      (item) => item !== topping,
                                    )
                                  : [...current.toppings, topping],
                              }));
                            }}
                            className={`flex min-h-12 items-center justify-between rounded-lg border px-3 py-2 text-left text-lg font-medium transition-all ${
                              isSelected
                                ? "border-red-600 bg-red-600 text-gray-50 ring-1 ring-red-600"
                                : "border-stone-200 bg-stone-100 text-stone-800 hover:bg-stone-200"
                            }`}
                          >
                            <span>{topping}</span>
                            <span
                              className={`flex h-6 w-6 text-2xl items-center justify-center rounded-full ${
                                isSelected ? "text-white" : "text-stone-500  "
                              }`}
                            >
                              {isSelected ? (
                                <Check size={22} strokeWidth={3} />
                              ) : (
                                <Plus size={22} strokeWidth={2.25} />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-13 flex items-center justify-between gap-4">
                <div className="flex flex-col ">
                  <p className="flex items-center gap-1.5 text-[18px] font-semibold uppercase">
                    <UtensilsCrossed
                      size={26}
                      strokeWidth={2.25}
                      className="text-red-900"
                    />
                    <span>3. Sides & Refreshing Beverages</span>
                  </p>
                  <p>
                    Click to toggle ingredients. Freshly cut before each fire.
                  </p>
                </div>
                <p className="flex shrink-0 items-center gap-1 rounded-2xl bg-gray-200 px-3 py-1 font-semibold text-slate-600 text-[16px]">
                  <span className="" aria-live="polite">
                    {pizzaCustom.beverages.length}
                  </span>
                  Item Selected
                </p>
              </div>

              <div className="mt-4 space-y-5">
                {section.map((sides) => (
                  <section key={sides.title}>
                    <h3 className="mb-2 text-md font-semibold text-stone-700">
                      {sides.title}
                    </h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-2">
                      {sides.items.map((beverage) => {
                        const isSelected =
                          (beverageCounts[beverage.id] || 0) > 0;

                        return (
                          <div
                            key={beverage.id}
                            className={`w-full rounded-2xl border p-7 transition-all ${
                              isSelected
                                ? "border-red-600 bg-orange-50 ring-2 ring-yellow-800 shadow-md"
                                : "border-transparent bg-stone-100 hover:bg-stone-200"
                            }`}
                          >
                            <div className="flex flex-col border-b border-solid border-stone-200 pb-2">
                              <div className="flex justify-between items-center font-semibold">
                                <h1 className="flex items-center text-[21px] gap-2">
                                  {beverage.name}
                                  {beverage.tag && (
                                    <span className="px-2 py-0.5 text-sm shrink-0 bg-orange-300/50 text-slate-700 rounded-2xl">
                                      {beverage.tag}
                                    </span>
                                  )}
                                </h1>
                                <h3 className="text-[20px]">
                                  ${beverage.price}
                                </h3>
                              </div>
                              <p>{beverage.desc}</p>
                            </div>
                            <div className="flex justify-between mt-6">
                              <h1>{beverage.note}</h1>
                              <div className="flex gap-3 items-center">
                                <button
                                  type="button"
                                  aria-label={`remove one ${beverage.name}`}
                                  onClick={() => {
                                    const quantity =
                                      beverageCounts[beverage.id] || 0;
                                    if (quantity <= 1) {
                                      setPizzaCustom((current) => ({
                                        ...current,
                                        beverages: current.beverages.filter(
                                          (item) => item !== beverage,
                                        ),
                                      }));
                                    }
                                    setBeverageCounts((current) => ({
                                      ...current,
                                      [beverage.id]: Math.max(0, quantity - 1),
                                    }));
                                  }}
                                  className="bg-red-600 rounded-full text-white p-1"
                                >
                                  <Minus size={26} strokeWidth={3} />
                                </button>
                                <span className="text-[22px] font-sans">
                                  {beverageCounts[beverage.id] || 0}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`add one ${beverage.name}`}
                                  onClick={() => {
                                    setPizzaCustom((current) => ({
                                      ...current,
                                      beverages: current.beverages.includes(
                                        beverage,
                                      )
                                        ? current.beverages
                                        : [...current.beverages, beverage],
                                    }));
                                    setBeverageCounts((current) => ({
                                      ...current,
                                      [beverage.id]:
                                        (current[beverage.id] || 0) + 1,
                                    }));
                                  }}
                                  className="bg-red-600 rounded-full text-white p-1"
                                >
                                  <Plus size={26} strokeWidth={3} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h1 className="flex items-center gap-2 text-lg font-semibold text-stone-700">
                    <CookingPot size={26} strokeWidth={2.25} />
                    <span>Special Hearth Fire Request</span>
                  </h1>
                  <label className="mt-auto">
                    <input
                      type="checkbox"
                      checked={showInput}
                      onChange={(check) => setShowInput(check.target.checked)}
                    />
                  </label>
                </div>

                {showInput && (
                  <div className="rounded-xl border border-stone-200 bg-stone-100 px-3 py-2 transition-colors focus-within:border-red-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-200">
                    <input
                      type="text"
                      name="specialInstructions"
                      id="instruction"
                      value={pizzaCustom.specialInstructions}
                      onChange={(e) => {
                        setPizzaCustom((current) => ({
                          ...current,
                          specialInstructions: e.target.value,
                        }));
                      }}
                      placeholder="e.g, Well-done char, cut into squares, extra napkins"
                      className="w-full bg-transparent p-2 text-base text-stone-700 placeholder:text-stone-500 outline-none"
                    />
                  </div>
                )}
                <span className="text-red-600 text-sm mt-1">
                  {errors.specialInstructions}
                </span>
              </div>
            </section>
          </main>

          {/* side Bar: full width below the form on phone/tablet, sticky column on laptop+ */}
          <aside className="w-full shrink-0 rounded-2xl border border-stone-300 bg-white shadow-2xl lg:sticky lg:top-34 lg:w-88 xl:w-104 2xl:w-120 lg:mt-7">
            <div>
              <header className="flex flex-wrap items-center justify-between gap-2 rounded-t-2xl bg-gray-900 px-4 py-4 text-white sm:px-6 xl:px-8 xl:py-6">
                <section className="flex items-center gap-2">
                  <span className="text-red-700">
                    <ReceiptText
                      size={37}
                      strokeWidth={2.25}
                      className="size-7 xl:size-9"
                    />
                  </span>
                  <div className="flex flex-col items-start font-mono">
                    <h1 className="text-lg font-extrabold xl:text-2xl">
                      ORDER TICKET
                    </h1>
                    <h3 className="text-xs xl:text-sm">Hearth Bay Live Slip</h3>
                  </div>
                </section>
                <section className="flex flex-col items-start font-mono">
                  <h1 className="text-xl font-extrabold text-red-100/80 xl:text-3xl">
                    #MP-{pizzaId}
                  </h1>
                  <h4 className="text-xs xl:text-sm">Guest Checkout</h4>
                </section>
              </header>
              <section className="p-4 sm:p-5 xl:p-6">
                {orderType === "delivery" ? (
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-stone-300 bg-gray-200 px-3 py-2 font-mono shadow-md xl:px-4">
                    <h3 className="flex items-center gap-2 font-sans text-sm font-bold xl:text-lg">
                      <span className="text-red-700">
                        <Truck
                          size={28}
                          strokeWidth={2.25}
                          className="size-5 xl:size-7"
                        />
                      </span>
                      Curbside Delivery
                    </h3>
                    <h4 className="shrink-0 text-sm font-medium xl:text-base">
                      45-60 min
                    </h4>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-stone-300 bg-gray-200 px-3 py-2 font-mono shadow-md xl:px-4">
                    <h3 className="flex items-center gap-2 font-sans text-sm font-bold xl:text-lg">
                      <span className="text-red-700">
                        <MdOutlineStorefront
                          size={28}
                          className="size-5 xl:size-7"
                        />
                      </span>
                      Trattoria Pickup
                    </h3>
                    <h4 className="shrink-0 text-sm font-medium xl:text-base">
                      20-30 min
                    </h4>
                  </div>
                )}

                <div className="mt-5 border-b-2  border-dashed border-gray-400 px-1 py-2 xl:mt-7">
                  <div className="space-y-1 text-sm font-mono text-stone-700 pb-2 border-b border-dashed mb-4">
                    <div className="flex gap-7">
                      <p>
                        <span className="font-semibold">Name:</span>
                        {customerInfo.name || "Marco Rossi"}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>
                        {customerInfo.phone || "(555) 234-5678"}
                      </p>
                    </div>
                    {orderType === "delivery" && (
                      <p>
                        <span className="font-semibold">Address:</span>
                        {customerInfo.address ||
                          "142 Sullivan St, Apt 4B, New York, NY 10012"}
                      </p>
                    )}
                  </div>
                  <div className="my-1 flex items-start justify-between gap-3">
                    <p>
                      <strong className="flex flex-col items-start text-lg font-medium xl:text-2xl">
                        {
                          sizeCategory.find(
                            (size) => size.id === pizzaCustom.size,
                          )?.title
                        }
                        Custom Pie
                      </strong>
                      <span className="font-sans text-sm font-normal text-yellow-900 xl:text-lg">
                        {
                          crustCategory.find(
                            (crust) => crust.id === pizzaCustom.crust,
                          )?.title
                        }{" "}
                        Crust (
                        {crustCategory.find(
                          (crust) => crust.id === pizzaCustom.crust,
                        )?.note ||
                          crustCategory.find(
                            (crust) => crust.id === pizzaCustom.crust,
                          )?.price}
                        )
                      </span>
                    </p>
                    <h1 className="text-lg font-semibold xl:text-xl">
                      $
                      {Number(
                        sizeCategory
                          .find((size) => size.id === pizzaCustom.size)
                          ?.price.replace("$", "") || 0,
                      ).toFixed(2)}
                    </h1>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-3 pb-6 xl:mt-8 xl:pb-10">
                    <p>
                      <span className="flex flex-col items-start text-sm text-yellow-900 xl:text-lg">
                        Toppings ({pizzaCustom.toppings.length} selected)
                      </span>
                      {pizzaCustom.toppings.length === 0 ? (
                        <i className="font-sans text-sm font-normal xl:text-lg">
                          No toppings chosen yet. Baseline San Marzano & Fior di
                          Latte.
                        </i>
                      ) : (
                        <i>{pizzaCustom.toppings.join(", ")}</i>
                      )}
                    </p>
                    <h1 className="shrink-0 font-sans text-sm xl:text-lg">
                      +$1.5 EACH
                    </h1>
                  </div>
                </div>
                <div className="my-5 flex flex-col md:text-xl border-b-2 border-dashed border-gray-400 pb-5 text-sm xl:my-8 xl:pb-7 xl:text-lg">
                  <div className="flex w-full items-center justify-between px-1">
                    <p className="border-b-3 text-lg font-semibold xl:text-2xl">
                      Pizza:
                    </p>
                    <p className="border-b-3 text-lg font-semibold xl:text-2xl">
                      Price:
                    </p>
                  </div>
                  <div className="mx-1 my-1 flex items-center justify-between">
                    <p>Pie Base Subtotal</p>
                    <p>
                      {sizeCategory.find((size) => size.id === pizzaCustom.size)
                        ?.price ?? "$0.00"}
                    </p>
                  </div>
                  <div className="mx-1 my-1 flex items-center justify-between">
                    <p>Crust Upgrade</p>
                    <p>
                      $
                      {Number(
                        crustCategory
                          .find((crust) => crust.id === pizzaCustom.crust)
                          ?.price?.replace(/[^\d.]/g, "") || 0,
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="mx-1 my-1 flex items-center justify-between">
                    <p>Selected Toppings</p>
                    <p>${(pizzaCustom.toppings.length * 1.5).toFixed(2)}</p>
                  </div>
                  <div className="mx-1 my-1 flex items-center justify-between">
                    <p>Sides & Drinks</p>
                    <p>
                      $
                      {section
                        .flatMap(({ items }) => items)
                        .reduce(
                          (total, beverage) =>
                            total +
                            Number(beverage.price) *
                              (beverageCounts[beverage.id] || 0),
                          0,
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <div className="mx-1 my-1 flex items-center justify-between">
                    <p>Delivery Hearth Courier</p>
                    <p>${deliveryCharge.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 px-1 xl:gap-6">
                  <section className="flex items-start justify-between gap-3">
                    <p className="flex flex-col gap-1">
                      <strong className="text-lg font-medium xl:text-2xl">
                        Total Amount
                      </strong>
                      <span className="text-sm xl:text-base">
                        Includes all taxes & fees
                      </span>
                    </p>
                    <div>
                      <p>{`Quantity: ${selectedPizzaCount}`}</p>
                      <p className="text-2xl font-medium text-red-800 xl:text-4xl">
                        ${totalAmount().toFixed(2)}
                      </p>
                    </div>
                  </section>
                  <button
                    onClick={handleSubmit}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-red-900 bg-red-600 px-4 py-3 text-base text-white shadow-2xl transition duration-200 active:scale-95 active:bg-red-900 active:shadow-md xl:gap-3 xl:px-8 xl:py-4 xl:text-xl"
                  >
                    <Flame
                      size={32}
                      strokeWidth={2.25}
                      className="size-5 shrink-0 xl:size-8"
                    />
                    <span>Place Order • ${totalAmount().toFixed(2)}</span>
                    <ArrowRight
                      size={32}
                      strokeWidth={2.25}
                      className="size-5 shrink-0 transition-transform duration-200 group-focus-within:translate-x-1.5 xl:size-8 xl:group-focus-within:translate-x-2"
                    />
                  </button>
                  <button
                    onClick={reset}
                    className="flex w-full items-center font-semibold justify-center gap-3 rounded-xl bg-stone-300 px-4 py-3 text-xl text-black shadow-2xl transition duration-200 focus-visible:outline-none focus-within:ring-2 focus-within:ring-red-700 focus-within:bg-white active:scale-95 active:shadow-md xl:px-8 xl:py-4"
                  >
                    <RotateCcw size={20} strokeWidth={2.25} />
                    Clear Form
                  </button>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default App;
