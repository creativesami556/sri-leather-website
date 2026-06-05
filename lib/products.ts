export interface Product {
  id: string;
  title: string;
  article: string;
  collection: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  badge?: string;
  discount?: string;
  categories: string[];
  description: string;
  features: string[];
  colors: { name: string; hex: string }[];
  sizes: number[];
  thumbnails: string[];
}

export const products: Product[] = [
  {
    id: "prod-1",
    title: "Classic Mahogany Oxford",
    article: "SL-102",
    collection: "Heritage Collection",
    price: 4999,
    originalPrice: 7499,
    discount: "33% OFF",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFtazwRJ3wC-TigvKu5Qzp1utPjnFYn7daWOEwWcL4JAdtXMrUdsQGs9OQAi9M2ADQJrE3bRxZ-13G7b754Wg3Cn_ox5g4PTSCtNVqWXg2Y3rmu-x4UehbatMbqNs10yf8oz0uwwMsUqzYB9C2VOA8IABaKe9wGgQ0r5o0icetc6z-KipO14LInjf9VP_TrIbyHwN49VIr71jO458-PG__iWIqBy4fY5jpqhH_p0KK5L-eVshP271AxCwI6bu3iLfrDynyaSzu3B7C",
    alt: "Classic Mahogany Oxford leather shoes",
    badge: "Premium Collection",
    categories: ["Men", "Formal"],
    description: "Handcrafted from the finest full-grain Italian leather, the Classic Mahogany Oxford is a testament to timeless elegance and superior durability.",
    features: [
      "Lace-up closure for a secure fit",
      "Breathable leather lining",
      "Cushioned footbed for all-day comfort",
      "Hand-burnished mahogany finish"
    ],
    colors: [
      { name: "Black", hex: "#1C1B1B" },
      { name: "Tan", hex: "#D4AF37" },
      { name: "Mahogany", hex: "#4A2C2A" }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFtazwRJ3wC-TigvKu5Qzp1utPjnFYn7daWOEwWcL4JAdtXMrUdsQGs9OQAi9M2ADQJrE3bRxZ-13G7b754Wg3Cn_ox5g4PTSCtNVqWXg2Y3rmu-x4UehbatMbqNs10yf8oz0uwwMsUqzYB9C2VOA8IABaKe9wGgQ0r5o0icetc6z-KipO14LInjf9VP_TrIbyHwN49VIr71jO458-PG__iWIqBy4fY5jpqhH_p0KK5L-eVshP271AxCwI6bu3iLfrDynyaSzu3B7C",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRHFQwavGfNC55UUEn587jU3IQn_CUBI7lWclSCx9pnxFtexO3LC5deeBxXikNG3i5yDC895OrCgwuTB2lvBVCQ32kaI4O1p8JSn19qi9gTmInrTmljeVPbUFKfs2yjlsOpwxox0AgwUQIDah-aqtMhEHUYs7A2CDrk_8ToXVftRFsatT8w4R5guP4T25lt4dYDHnjKmcLZ5-YqnDgyiBUUeyMafEMrAuafSCjvXebGDwX0bIdI6Znacg916zhgFAPwoMHkoMPKuGH",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB8gIbMhEDaO-zI8AOuajjKiQcBCweTlRrFnnNuIzlWek2KsFm1tONJc5IpydTEKdhibjoVqmDHxELgNSWnFtKk-5IwBAMRUAXcnqCVHP3oFIoMh0cKnIL1jqk56TzUZ_33fHxSfwhWDgsJGp2kSsbKAWsyBmq8d2ld55khEL-okWDeShmBnSNrsTzlp_NT1KHwPF2EWQkdX5myi8qzYXk-FtUdkVv-uuDbrHr3sEJK9kS2lAvDG7FqT_YFATc0DiqaSGTZHHStgd-"
    ]
  },
  {
    id: "prod-2",
    title: "Espresso Chelsea Boot",
    article: "SL-105",
    collection: "Modern Essentials",
    price: 5299,
    originalPrice: 7500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXXNfbSMo-XcCCIad5iK3-hJCQQSMU9uHnzRbNtZGFMjaFPkzmt7XjSRrNyPL5TyIOGdOemJczbD4GLhnQicq1HKmiv0naazKuW7Y3L_iBYFJOpteXhG9u3ps-zJN8Gqd96vkzm5FQFr9qwFG7mRydv1vzyR8QNTPmPK03TrAD4_6Eh45_hVqNJxVr3MuWW4NP7aPzM6-Wzd92J41Wy4v0hUW7Xzvcq8W4k-93win5HcT1gfDIIIdryEaGtAHo4BZblLihB9Gu4aRO",
    alt: "Polished espresso brown Chelsea boots",
    categories: ["Men", "Formal", "Loafers"],
    description: "Slip into comfort and sophistication. The Espresso Chelsea Boot is built for the modern dynamic lifestyle, featuring easy-on elastic webbing and rich full-grain leather.",
    features: [
      "Premium elastic side panels",
      "Pull-on heel tab",
      "Stitched welt construction",
      "Skid-resistant rubber outsole"
    ],
    colors: [
      { name: "Espresso", hex: "#321716" },
      { name: "Black", hex: "#1C1B1B" }
    ],
    sizes: [7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXXNfbSMo-XcCCIad5iK3-hJCQQSMU9uHnzRbNtZGFMjaFPkzmt7XjSRrNyPL5TyIOGdOemJczbD4GLhnQicq1HKmiv0naazKuW7Y3L_iBYFJOpteXhG9u3ps-zJN8Gqd96vkzm5FQFr9qwFG7mRydv1vzyR8QNTPmPK03TrAD4_6Eh45_hVqNJxVr3MuWW4NP7aPzM6-Wzd92J41Wy4v0hUW7Xzvcq8W4k-93win5HcT1gfDIIIdryEaGtAHo4BZblLihB9Gu4aRO",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7nLgzEjXWGIw6sr2pa0m7Ai9ODhdQaCkENqNvvpNEwU4pskrDjcQgEJmMwwusOJhgwZTI2BuGycbGzLcgNdJ-TzagJAYFFao2CPtocNq9J5qOo5CwPVovxpZ3mH--r_59jyZuyF1vYigl5S1uZfB9A3aa6T0iuK0_H0CJAaBxBbMrtRFX9iZvkAf0BrPjNHZ0YWBMSjbkxIRjKXGYSQhCu0Fsg8aF0xZTh12ZmRLRgFilxoS1RyqRznUYyLSg8pxeIZH2KXSRACUt"
    ]
  },
  {
    id: "prod-3",
    title: "Vanguard Leather Sneaker",
    article: "SL-109",
    collection: "Urban Line",
    price: 2850,
    originalPrice: 3999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHTW34avxTgISpZ9YpPnhakILwhuv3IRNXDay_njJ-ctNOl0eskqlvVNGuRbJvbhtXh8K4qydkah0ImxUxlzX_4FXoFxMQB9OCN22ZRlToZSz_YjozPltUSUC4RiAhirWUTv7LXJ7wPxk9dRqX-NPHmUwmG5OYGkxhYCDI2_PwanaSNLbfIDGXkaWiRZmCDQBaVeODLi4rX5C03XV-TxZ9089RukUL9zC--M68FwSmjH-ET7rW-f_xS6SZZgeUbydtc30KvpKCPpjE",
    alt: "Streetwear white and grey leather sneaker",
    badge: "Bestseller",
    categories: ["Men", "Women", "Sports", "Sneakers"],
    description: "The perfect blend of athletic function and lifestyle aesthetics. Vanguard Sneakers offer lightweight performance and structured leather paneling for daily wear.",
    features: [
      "Full-grain leather overlays",
      "Perforated toe box for ventilation",
      "Padded collar and tongue",
      "Durable cupsole design"
    ],
    colors: [
      { name: "Arctic White", hex: "#FFFFFF" },
      { name: "Slate Grey", hex: "#827472" }
    ],
    sizes: [6, 7, 8, 9, 10],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHTW34avxTgISpZ9YpPnhakILwhuv3IRNXDay_njJ-ctNOl0eskqlvVNGuRbJvbhtXh8K4qydkah0ImxUxlzX_4FXoFxMQB9OCN22ZRlToZSz_YjozPltUSUC4RiAhirWUTv7LXJ7wPxk9dRqX-NPHmUwmG5OYGkxhYCDI2_PwanaSNLbfIDGXkaWiRZmCDQBaVeODLi4rX5C03XV-TxZ9089RukUL9zC--M68FwSmjH-ET7rW-f_xS6SZZgeUbydtc30KvpKCPpjE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLacCx75Q8WMpnKtjLsMLFXmpDB8X7ivxLBBLb2N_dnj2QwE4vmQhhqWvfWkeM6ULlSIOjBoEw_yzeAEIXara9uhgj8usOxra-ZfNsw5LS33T9qPVuzqIEpumkZ9SI7TM_u5JdX8gso0r00OnPh3x-bNO1fVwXtagwhvLiFF8E7xqCRPj7L-le2LBKpagFIDmFbDZNiT7Nt6p8-OcuOp8v4lPHhNGCgvKp20o_rRPwX4E771fUt30Q9H-RqDHhZXZV7KLdXVoZ08M"
    ]
  },
  {
    id: "prod-4",
    title: "Mahogany Penny Loafer",
    article: "SL-112",
    collection: "Formal Wear",
    price: 4200,
    originalPrice: 5500,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEk6HN1l_qvO5l2AsCJZTK9oZvv3aiODU_ehvh74Hr60qyK-PDnNg7BRlwffAob7xzjrFvRaHX0sGIhP_HsojecXEvyc718nA0yPUJTwGgmHN19PN5ATMdKgPsyl7j3uQVhKyuLZl5_nZokKEv4jNS3gxxM9aQhlY7XB4noAN_hAoh-DQYf2TL8tOYdhcYk2fu6HceuHgAOOm7f5pBdSkDcAccQ238lg-22vGcaASYqlGzG59QiDPiasyLZh96MDHTgVowHWhadWuV",
    alt: "Polished mahogany brown leather penny loafers",
    categories: ["Men", "Formal", "Loafers"],
    description: "Classic silhouette meets artisan finishing. The Mahogany Penny Loafer features a traditional saddle slot, genuine leather lining, and high-shine burnishing.",
    features: [
      "Traditional moc-toe stitching",
      "Genuine leather outsole with rubber grip",
      "Ortholite padded sockliner",
      "Hand-painted leather edges"
    ],
    colors: [
      { name: "Mahogany", hex: "#4A2C2A" },
      { name: "Midnight Black", hex: "#1C1B1B" }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEk6HN1l_qvO5l2AsCJZTK9oZvv3aiODU_ehvh74Hr60qyK-PDnNg7BRlwffAob7xzjrFvRaHX0sGIhP_HsojecXEvyc718nA0yPUJTwGgmHN19PN5ATMdKgPsyl7j3uQVhKyuLZl5_nZokKEv4jNS3gxxM9aQhlY7XB4noAN_hAoh-DQYf2TL8tOYdhcYk2fu6HceuHgAOOm7f5pBdSkDcAccQ238lg-22vGcaASYqlGzG59QiDPiasyLZh96MDHTgVowHWhadWuV"
    ]
  },
  {
    id: "prod-5",
    title: "Full-Grain Signature Belt",
    article: "SL-301",
    collection: "Accessories",
    price: 1299,
    originalPrice: 1999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzPFtAcibS9wYYrBMtO3cQTDfL_YNu5AwkZ3spaKrxXRnq-5pENY_TFyCf0E07fhr-DLVnAqYjjFNmOdp17No7BGxPpf8YOnx4dg8-JRicgpltO4mflFjV7RO3DQ_kGbabT0lxyIcamkU-1GdUwneF3WIsnwpSc2c2K7jxXo8HNpUOv9WZNkhZIdAhq3KY_mva7FoFkaAYHTEo4DSczUFJ_9oTCbCe9khZ3quTnzfAsmicRAN4ygIsPCfPrgcSsBrR9J4LERVM-C7g",
    alt: "Handcrafted mahogany and brass buckle leather belt",
    categories: ["Accessories"],
    description: "The ultimate formal belt, made from thick full-grain cowhide leather that ages beautifully. Comes with a solid brass buckle.",
    features: [
      "100% full-grain leather strap",
      "Heavy-duty solid brass hardware",
      "5 adjustable holes for versatility",
      "Width: 35mm"
    ],
    colors: [
      { name: "Tan Gold", hex: "#D4AF37" },
      { name: "Dark Mahogany", hex: "#4A2C2A" }
    ],
    sizes: [32, 34, 36, 38, 40],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzPFtAcibS9wYYrBMtO3cQTDfL_YNu5AwkZ3spaKrxXRnq-5pENY_TFyCf0E07fhr-DLVnAqYjjFNmOdp17No7BGxPpf8YOnx4dg8-JRicgpltO4mflFjV7RO3DQ_kGbabT0lxyIcamkU-1GdUwneF3WIsnwpSc2c2K7jxXo8HNpUOv9WZNkhZIdAhq3KY_mva7FoFkaAYHTEo4DSczUFJ_9oTCbCe9khZ3quTnzfAsmicRAN4ygIsPCfPrgcSsBrR9J4LERVM-C7g"
    ]
  },
  {
    id: "prod-6",
    title: "Arctic White High-Tops",
    article: "SL-110",
    collection: "Athleisure",
    price: 3750,
    originalPrice: 4999,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLacCx75Q8WMpnKtjLsMLFXmpDB8X7ivxLBBLb2N_dnj2QwE4vmQhhqWvfWkeM6ULlSIOjBoEw_yzeAEIXara9uhgj8usOxra-ZfNsw5LS33T9qPVuzqIEpumkZ9SI7TM_u5JdX8gso0r00OnPh3x-bNO1fVwXtagwhvLiFF8E7xqCRPj7L-le2LBKpagFIDmFbDZNiT7Nt6p8-OcuOp8v4lPHhNGCgvKp20o_rRPwX4E771fUt30Q9H-RqDHhZXZV7KLdXVoZ08M",
    alt: "Clean design arctic white leather high top sneakers",
    categories: ["Men", "Women", "Sports", "Sneakers"],
    description: "Make a bold statement with these luxury high-top sneakers. Built with premium calfskin leather and supportive high ankle collar.",
    features: [
      "Padded high-top ankle structure",
      "Premium metal eyelets",
      "Removable cushioned insole",
      "Stitched vulcanized rubber sole"
    ],
    colors: [
      { name: "Arctic White", hex: "#FFFFFF" }
    ],
    sizes: [7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtLacCx75Q8WMpnKtjLsMLFXmpDB8X7ivxLBBLb2N_dnj2QwE4vmQhhqWvfWkeM6ULlSIOjBoEw_yzeAEIXara9uhgj8usOxra-ZfNsw5LS33T9qPVuzqIEpumkZ9SI7TM_u5JdX8gso0r00OnPh3x-bNO1fVwXtagwhvLiFF8E7xqCRPj7L-le2LBKpagFIDmFbDZNiT7Nt6p8-OcuOp8v4lPHhNGCgvKp20o_rRPwX4E771fUt30Q9H-RqDHhZXZV7KLdXVoZ08M"
    ]
  },
  {
    id: "prod-7",
    title: "Iconic Satchel Handbag",
    article: "SL-402",
    collection: "Women's Collection",
    price: 6499,
    originalPrice: 8900,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQrSgMpHTwF2qGhFdm8q-Bf6lgaw5IwfI-szLWZXzNoGQXSb8BfR_eb3atve8LZrlbbEwVDMgEzSLUljZE91QpmEhzH3hM3dLmB4EpObguvTNH8UXbiNx1fPne0SfRvj94syMTm5iTEBe7lHkdMB9wy09OZKcZKvjSWI79igIgQsNn-cEUQAsxm3mH0G19nvB6ZAoiFJkBRymIAgVnVCuMfoqALzL2_3irsimhsM8o-ks1RVjS6lc1EGldaJVK24aVVhHLOj0yF-Q-",
    alt: "Stylish black leather handbag with gold accents",
    categories: ["Women", "Accessories"],
    description: "Designed for elegance and functionality. The Iconic Satchel features premium textured Saffiano leather, structured dual handles, and multiple interior pockets.",
    features: [
      "Saffiano textured genuine leather",
      "Signature gold hardware",
      "Detachable adjustable crossbody strap",
      "Protective metal feet at the bottom"
    ],
    colors: [
      { name: "Midnight Black", hex: "#1C1B1B" },
      { name: "Slate Grey", hex: "#827472" }
    ],
    sizes: [0], // Accessories don't have sizing
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQrSgMpHTwF2qGhFdm8q-Bf6lgaw5IwfI-szLWZXzNoGQXSb8BfR_eb3atve8LZrlbbEwVDMgEzSLUljZE91QpmEhzH3hM3dLmB4EpObguvTNH8UXbiNx1fPne0SfRvj94syMTm5iTEBe7lHkdMB9wy09OZKcZKvjSWI79igIgQsNn-cEUQAsxm3mH0G19nvB6ZAoiFJkBRymIAgVnVCuMfoqALzL2_3irsimhsM8o-ks1RVjS6lc1EGldaJVK24aVVhHLOj0yF-Q-"
    ]
  },
  {
    id: "prod-8",
    title: "Double Strap Monk",
    article: "SL-118",
    collection: "Exotic Finish",
    price: 4899,
    originalPrice: 6200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDB8gIbMhEDaO-zI8AOuajjKiQcBCweTlRrFnnNuIzlWek2KsFm1tONJc5IpydTEKdhibjoVqmDHxELgNSWnFtKk-5IwBAMRUAXcnqCVHP3oFIoMh0cKnIL1jqk56TzUZ_33fHxSfwhWDgsJGp2kSsbKAWsyBmq8d2ld55khEL-okWDeShmBnSNrsTzlp_NT1KHwPF2EWQkdX5myi8qzYXk-FtUdkVv-uuDbrHr3sEJK9kS2lAvDG7FqT_YFATc0DiqaSGTZHHStgd-",
    alt: "Exquisite burgundy leather monks double strap shoe",
    categories: ["Men", "Formal"],
    description: "Stand out in any crowd. The Double Strap Monk Shoe features premium calfskin leather with a rich dual-tone burnish and polished metal buckles.",
    features: [
      "Polished dual metal buckle straps",
      "Hand-burnished toe box",
      "Stacked wooden dress heel",
      "Stretched calf leather profile"
    ],
    colors: [
      { name: "Burgundy", hex: "#4A2C2A" },
      { name: "Midnight Black", hex: "#1C1B1B" }
    ],
    sizes: [7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB8gIbMhEDaO-zI8AOuajjKiQcBCweTlRrFnnNuIzlWek2KsFm1tONJc5IpydTEKdhibjoVqmDHxELgNSWnFtKk-5IwBAMRUAXcnqCVHP3oFIoMh0cKnIL1jqk56TzUZ_33fHxSfwhWDgsJGp2kSsbKAWsyBmq8d2ld55khEL-okWDeShmBnSNrsTzlp_NT1KHwPF2EWQkdX5myi8qzYXk-FtUdkVv-uuDbrHr3sEJK9kS2lAvDG7FqT_YFATc0DiqaSGTZHHStgd-"
    ]
  },
  {
    id: "prod-9",
    title: "Sport Lux Red",
    article: "SL-204",
    collection: "UNISEX",
    price: 2899,
    originalPrice: 3999,
    discount: "27% OFF",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB51ieRVOzZQcJb4_Nu6yymJvqbugQvMkPnG4Y8KbjeaVvZqf_4BKIgAJrIk8le8xje9U2Af112R9cJLyO3McH3s5uLwbdJH0CjdZ7Nu-9Qnv_rcucJy0caVeex1lhnQ34mbsQLUQzxFiLCC21TINvK9T0YTE7ec8N55ZatKckEraqlVNW_eluY--fXu19Dlh1DTcWxWyspXdOPpmg7lHBqlDIzgSVgWLjSoetE-zoO4HIBwBr7JGPpQMZo0XPHPfTk9ML18YHyCaam",
    alt: "Vibrant red lifestyle sneakers Sport Lux Red",
    badge: "SALE",
    categories: ["Men", "Women", "Sports", "Sneakers"],
    description: "Unleash performance and style. Sport Lux Red features an eye-catching premium red leather paneling with orthopedic sole comfort.",
    features: [
      "Stripe stitching overlays",
      "Ergonomic shock-absorbing sole",
      "Highly breathable mesh and leather build",
      "Custom grip pattern"
    ],
    colors: [
      { name: "Vibrant Red", hex: "#BA1A1A" },
      { name: "Black", hex: "#1C1B1B" }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB51ieRVOzZQcJb4_Nu6yymJvqbugQvMkPnG4Y8KbjeaVvZqf_4BKIgAJrIk8le8xje9U2Af112R9cJLyO3McH3s5uLwbdJH0CjdZ7Nu-9Qnv_rcucJy0caVeex1lhnQ34mbsQLUQzxFiLCC21TINvK9T0YTE7ec8N55ZatKckEraqlVNW_eluY--fXu19Dlh1DTcWxWyspXdOPpmg7lHBqlDIzgSVgWLjSoetE-zoO4HIBwBr7JGPpQMZo0XPHPfTk9ML18YHyCaam"
    ]
  },
  {
    id: "prod-10",
    title: "Chelsea Heritage",
    article: "SL-106",
    collection: "NEW ARRIVAL",
    price: 4299,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7nLgzEjXWGIw6sr2pa0m7Ai9ODhdQaCkENqNvvpNEwU4pskrDjcQgEJmMwwusOJhgwZTI2BuGycbGzLcgNdJ-TzagJAYFFao2CPtocNq9J5qOo5CwPVovxpZ3mH--r_59jyZuyF1vYigl5S1uZfB9A3aa6T0iuK0_H0CJAaBxBbMrtRFX9iZvkAf0BrPjNHZ0YWBMSjbkxIRjKXGYSQhCu0Fsg8aF0xZTh12ZmRLRgFilxoS1RyqRznUYyLSg8pxeIZH2KXSRACUt",
    alt: "Sturdy and polished dark brown leather Chelsea boots",
    badge: "NEW ARRIVAL",
    categories: ["Men", "Formal", "Loafers"],
    description: "Crafted to be your everyday companion. The Chelsea Heritage brings a rugged outsole and refined dark brown full-grain leather to your wardrobe.",
    features: [
      "All-weather treated leather",
      "Sturdy heavy-duty pull loops",
      "Robust anti-slip tread sole",
      "Reinforced double stitching"
    ],
    colors: [
      { name: "Dark Mahogany", hex: "#4A2C2A" }
    ],
    sizes: [7, 8, 9, 10, 11],
    thumbnails: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7nLgzEjXWGIw6sr2pa0m7Ai9ODhdQaCkENqNvvpNEwU4pskrDjcQgEJmMwwusOJhgwZTI2BuGycbGzLcgNdJ-TzagJAYFFao2CPtocNq9J5qOo5CwPVovxpZ3mH--r_59jyZuyF1vYigl5S1uZfB9A3aa6T0iuK0_H0CJAaBxBbMrtRFX9iZvkAf0BrPjNHZ0YWBMSjbkxIRjKXGYSQhCu0Fsg8aF0xZTh12ZmRLRgFilxoS1RyqRznUYyLSg8pxeIZH2KXSRACUt"
    ]
  }
];
