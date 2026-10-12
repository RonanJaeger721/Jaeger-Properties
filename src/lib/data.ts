export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  purpose: "buy" | "rent";
  type: string;
  price: number;
  beds: number;
  baths: number;
  parking: number;
  area: number;
  images: string[];
  description: string;
  features: string[];
  lifestyle: string[];
  featured: boolean;
  available: boolean;
  created: string;
};
export const locations = [
  "Borrowdale",
  "Mount Pleasant",
  "Avondale",
  "Highlands",
  "Greendale",
  "Westgate",
  "Marlborough",
  "Rolf Valley",
];
export const types = ["House", "Villa", "Apartment", "Townhouse"];
const img = (n: number) =>
  `/images/property-${String(n).padStart(2, "0")}.webp`;
const rows: [
  string,
  string,
  string,
  number,
  number,
  number,
  number,
  number,
  string[],
][] = [
  [
    "The Glasshouse",
    "Borrowdale",
    "Villa",
    875000,
    5,
    4,
    580,
    1,
    ["luxury", "family"],
  ],
  [
    "The Courtyard House",
    "Mount Pleasant",
    "House",
    420000,
    4,
    3,
    340,
    4,
    ["family"],
  ],
  [
    "Parkside Residence",
    "Highlands",
    "House",
    560000,
    4,
    3,
    410,
    7,
    ["family", "luxury"],
  ],
  [
    "The Garden Pavilion",
    "Rolf Valley",
    "Villa",
    690000,
    5,
    4,
    480,
    8,
    ["luxury"],
  ],
  [
    "Avondale Studio",
    "Avondale",
    "Apartment",
    98000,
    1,
    1,
    72,
    14,
    ["city", "investment"],
  ],
  [
    "The Willow Residence",
    "Greendale",
    "House",
    310000,
    3,
    2,
    240,
    12,
    ["family"],
  ],
  [
    "The Terrace",
    "Westgate",
    "Townhouse",
    185000,
    3,
    2,
    180,
    3,
    ["family", "investment"],
  ],
  [
    "Marlborough Mews",
    "Marlborough",
    "Townhouse",
    165000,
    3,
    2,
    165,
    13,
    ["family", "investment"],
  ],
  ["The Palm Villa", "Borrowdale", "Villa", 735000, 4, 4, 490, 11, ["luxury"]],
  [
    "Northlight Apartment",
    "Mount Pleasant",
    "Apartment",
    145000,
    2,
    2,
    115,
    5,
    ["city", "investment"],
  ],
  [
    "The Treehouse",
    "Highlands",
    "House",
    475000,
    4,
    3,
    360,
    15,
    ["family", "luxury"],
  ],
  [
    "Rolf Valley Retreat",
    "Rolf Valley",
    "House",
    390000,
    3,
    3,
    290,
    6,
    ["family"],
  ],
  ["Avondale Loft", "Avondale", "Apartment", 950, 2, 1, 95, 14, ["city"]],
  [
    "The Greendale Cottage",
    "Greendale",
    "House",
    1300,
    3,
    2,
    175,
    12,
    ["family"],
  ],
  [
    "Borrowdale Garden Villa",
    "Borrowdale",
    "Villa",
    3200,
    4,
    3,
    380,
    8,
    ["luxury", "family"],
  ],
  [
    "Westgate Terrace",
    "Westgate",
    "Townhouse",
    1100,
    3,
    2,
    150,
    13,
    ["family"],
  ],
  [
    "Mount Pleasant Living",
    "Mount Pleasant",
    "Apartment",
    1600,
    2,
    2,
    125,
    2,
    ["city"],
  ],
  [
    "The Highlands Pavilion",
    "Highlands",
    "House",
    2400,
    4,
    3,
    310,
    7,
    ["family", "luxury"],
  ],
];
export const sampleProperties: Property[] = rows.map((r, i) => ({
  id: `JP-${String(i + 1).padStart(3, "0")}`,
  slug: r[0].toLowerCase().replaceAll(" ", "-"),
  title: r[0],
  location: r[1],
  type: r[2],
  price: r[3],
  beds: r[4],
  baths: r[5],
  area: r[6],
  parking: r[4] > 3 ? 3 : 2,
  purpose: i < 12 ? "buy" : "rent",
  images: [img(r[7]), img([2, 3, 5, 6, 9, 13, 14, 16][i % 8]), img(9), img(10)],
  description: `A considered ${r[2].toLowerCase()} concept in ${r[1]}, imagined around light, comfortable proportions and a connection to the outdoors. The sample specification brings together ${r[4]} bedrooms and ${r[5]} bathrooms, with space for everyday rituals and the moments that matter. This is an illustrative listing; photographs are architectural inspiration and do not document a property available in Harare.`,
  features:
    r[2] === "Apartment"
      ? [
          "Open-plan living",
          "Natural light",
          "Private balcony",
          "Dedicated parking",
        ]
      : [
          "Indoor–outdoor living",
          "Landscaped garden concept",
          "Generous living spaces",
          "Covered parking",
        ],
  lifestyle: r[8],
  featured: [0, 1, 3, 12].includes(i),
  available: true,
  created: `2026-10-${String(12 - (i % 12)).padStart(2, "0")}`,
}));
export function priceLabel(p: Property) {
  return `$${p.price.toLocaleString("en-US")}${p.purpose === "rent" ? " / month" : ""}`;
}
export type Filters = {
  location?: string;
  type?: string;
  min?: string;
  max?: string;
  beds?: string;
  baths?: string;
  q?: string;
  lifestyle?: string;
  sort?: string;
};
export function filterProperties(
  items: Property[],
  purpose: string,
  filters: Filters,
) {
  const result = items.filter(
    (p) =>
      p.available &&
      (!purpose || p.purpose === purpose) &&
      (!filters.location || p.location === filters.location) &&
      (!filters.type || p.type === filters.type) &&
      (!filters.min || p.price >= Number(filters.min)) &&
      (!filters.max || p.price <= Number(filters.max)) &&
      (!filters.beds || p.beds >= Number(filters.beds)) &&
      (!filters.baths || p.baths >= Number(filters.baths)) &&
      (!filters.lifestyle || p.lifestyle.includes(filters.lifestyle)) &&
      (!filters.q ||
        `${p.title} ${p.location} ${p.type}`
          .toLowerCase()
          .includes(filters.q.toLowerCase())),
  );
  return result.sort((a, b) =>
    filters.sort === "price-low"
      ? a.price - b.price
      : filters.sort === "price-high"
        ? b.price - a.price
        : b.created.localeCompare(a.created),
  );
}
export const stages = [
  {
    label: "THE VISION",
    name: "Blueprint",
    copy: "Every remarkable home begins with a vision.",
    image: "/images/stage-blueprint.webp",
  },
  {
    label: "THE FOUNDATION",
    name: "Foundation",
    copy: "Every detail starts with a foundation.",
    image: "/images/stage-foundation.webp",
  },
  {
    label: "THE STRUCTURE",
    name: "Framing",
    copy: "An idea begins to take shape.",
    image: "/images/stage-framing.webp",
  },
  {
    label: "TAKING SHAPE",
    name: "Dried-in",
    copy: "Built around the way you want to live.",
    image: "/images/stage-dried-in.webp",
  },
  {
    label: "THE FINISHED HOME",
    name: "Exterior",
    copy: "Not just another property. A place to belong.",
    image: "/images/residence.webp",
  },
  {
    label: "WELCOME HOME",
    name: "Welcome home",
    copy: "Your next chapter starts here.",
    image: "/images/residence.webp",
  },
];
export const agencyUrl =
  "https://wa.me/263789937251?text=" +
  encodeURIComponent(
    "Hello Jaeger Media, I saw the Jaeger Properties concept and would like to enquire about a real estate website for my business.",
  );
