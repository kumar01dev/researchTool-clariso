import React, { useState } from "react";

const plans = [
  {
    name: "Individuals",
    price: "Free",
    period: "/month",
    features: [
      "Unlimited AI usage here",
      "Premium support",
      "Customer care on point",
      "Collaboration tools",
      "Community support",
      "Regular updates",
    ],
    button: "Get Started Now",
    popular: false,
  },
  {
    name: "Pro",
    price: "$17",
    period: "/ month",
    features: [
      "Integrations with 3rd-party",
      "Advanced analytics",
      "Team performance tracking",
      "Top grade security",
      "Priority customer support",
      "Detailed usage reports",
    ],
    button: "Get Started Now",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Dedicated account manager",
      "Custom reports & dashboards",
      "Most performance usage",
      "Tailored onboarding and training",
      "Customizable API access",
      "Dedicated success manager",
    ],
    button: "Get Started Now",
    popular: false,
  },
];

export default function Pricing() { 
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181A2A] to-[#10111A] py-12 px-4 flex flex-col items-center font-sans">
      {/* Header */}
      <div className="mb-12 text-center py-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Flexible Pricing Plans</h1>
        <p className="text-[#A2A4B8] max-w-xl mx-auto">
          Choose a plan that fits your needs and unlock the full potential of our platform
        </p>
      </div>

      {/* Billing Toggle */}
      {/* <div className="flex items-center mb-10">
        <button
          className={`px-5 py-2 rounded-l-full transition-all ${
            billing === "monthly"
              ? "bg-[#23264A] text-white"
              : "bg-[#181A2A] text-[#7B7F99]"
          }`}
          onClick={() => setBilling("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-5 py-2 rounded-r-full transition-all ${
            billing === "yearly"
              ? "bg-[#23264A] text-white"
              : "bg-[#181A2A] text-[#7B7F99]"
          }`}
          onClick={() => setBilling("yearly")}
        >
          Yearly
        </button>
        <span className="ml-3 text-xs bg-[#23264A] text-[#6DD4FF] px-3 py-1 rounded-full font-semibold">
          30% off
        </span>
      </div> */}

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative bg-[#181A2A] border border-[#22244C] rounded-2xl p-8 flex flex-col items-center shadow-lg ${
              plan.popular
                ? "border-2 border-[#6DD4FF] scale-105 z-10"
                : ""
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <span className="absolute top-4 right-4 bg-[#6DD4FF] text-[#181A2A] text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-extrabold text-white">
                {plan.price}
              </span>
              <span className="text-[#7B7F99] font-medium ml-1 mb-1">
                {plan.period}
              </span>
            </div>
            <button className="w-full bg-[#23264A] hover:bg-[#6DD4FF] hover:text-[#181A2A] text-white font-semibold py-2 rounded-lg mb-6 transition-all">
              {plan.button}
            </button>
            <ul className="text-[#A2A4B8] text-sm space-y-3 w-full">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-4 h-4 text-[#6DD4FF] mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      </div>


  );
}