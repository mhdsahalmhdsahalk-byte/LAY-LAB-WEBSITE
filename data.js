const products = [
    { id: "ART01", name: "Minimal Wall Frames", category: "Frames", price: "Custom", stock: "Available", image: "assets/categories/minimal Wall Frames.png", description: "Set of 3 frames with earthy-toned stones and organic shapes.", colors: ["Brown", "Grey", "Ochre"] },
    { id: "ART02", name: "Islamic Calligraphy Set", category: "Frames", price: "Custom", stock: "Available", image: "assets/categories/Islamic Calligraphy Set.png", description: "Set of 3 frames featuring 'Allah', 'Al-hamdu lillah', and 'Subhan Allah'.", colors: ["Custom"] },
    { id: "ART03", name: "Minimalist Texture Frame", category: "Frames", price: "Custom", stock: "Available", image: "assets/categories/Texture Frames.png", description: "Premium frame featuring a deep wrinkled fabric texture.", colors: ["Beige", "Cream"] },
    
    // Resin Arts
    { id: "ART05", name: "Abstract Resin Art", category: "Resin Arts", price: "Custom", stock: "Available", image: "assets/categories/Resin Arts.png", description: "Round piece with swirling blue, white, and gold flakes.", colors: ["Blue", "Gold", "White"] },
    { id: "ART06", name: "Calligraphy Resin Art", category: "Resin Arts", price: "Custom", stock: "Available", image: "assets/categories/Resin Arts.png", description: "Square piece with gold 'Allah' calligraphy over green/blue base.", colors: ["Green", "Blue", "Gold"] },
    
    // Metal Arts
    { id: "ART07", name: "Leaf-Vein Metal Arts (Set of 2)", category: "Metal Arts", price: "Custom", stock: "Available", image: "assets/categories/Metal Arts.png", description: "Vertical rectangular metal frames with intricate leaf patterns.", colors: ["Custom"] },
    
    // Wall Furnitures
    { id: "ART08", name: "Carved Wooden Leaf Shelf", category: "Wall Furnitures", price: "Premium", stock: "Available", image: "assets/categories/Wall Furnitures.png", description: "Wall decor and shelf in a carved wooden leaf shape.", colors: ["Wood"] },
    { id: "ART09", name: "Mandala Carved Panels (Set of 3)", category: "Wall Furnitures", price: "Premium", stock: "Available", image: "assets/categories/Wall Furnitures.png", description: "Circular wooden panels with intricate floral/mandala carvings.", colors: ["Wood"] },

    // Artificial Flowers & Leafs
    { id: "BOT01", name: "Premium Artificial Roses", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "assets/categories/flowor and leaf.png", description: "Vibrant bunch of artificial roses with green stems.", colors: ["Orange", "Deep Red"] },
    { id: "BOT02", name: "Artificial Leaf Bunch", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "assets/categories/flowor and leaf.png", description: "Lush green foliage bunch with realistic detailing.", colors: ["Green"] },
    { id: "BOT03", name: "S-Curve Bonsai Plant", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "assets/categories/flowor and leaf.png", description: "Sculptural artificial bonsai in a white ceramic pot.", colors: ["Green", "White"] },

    // Ceramic Flower Vases & Glass Vases
    { id: "VAS01", name: "Ceramic Donut Vase", category: "Ceramic Flower Vases & Glass Vases", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800", description: "Contemporary white vase with a hollow center and smooth finish.", colors: ["White"] },
    { id: "VAS02", name: "Textured Glass Vase", category: "Ceramic Flower Vases & Glass Vases", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1580974582373-c1f03808ee85?auto=format&fit=crop&q=80&w=800", description: "Clear textured glass vase with a flared base.", colors: ["Clear"] },
    { id: "LC401", name: "Cylinder Vase", category: "Ceramic Flower Vases & Glass Vases", price: "₹399", stock: 3, image: "assets/images/IMG_6227.JPG", description: "Sleek black cylindrical vase.", colors: ["Black"] },
    { id: "LC407", name: "Stone Shape Vase", category: "Ceramic Flower Vases & Glass Vases", price: "₹599", stock: 5, image: "assets/images/IMG_6234.JPG", description: "Organic black vase.", colors: ["Black"] },

    // Wall Clocks
    { id: "CLK01", name: "Single Side Wall Clock", category: "Wall Clocks", price: "Premium", stock: "Available", image: "assets/categories/wall clock single side.png", description: "Elegant single-sided wall clock.", colors: ["Custom"] },
    { id: "CLK02", name: "Double Side Wall Clock", category: "Wall Clocks", price: "Premium", stock: "Available", image: "assets/categories/double side clock.jpeg", description: "Classic double-sided station wall clock.", colors: ["Custom"] },
    { id: "ACC01", name: "Orbital Wall Clock", category: "Wall Clocks", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800", description: "Modern minimalist clock with a wooden semicircle and wire frame.", colors: ["Wood", "Black", "Gold"] },
    
    // Soap Dispensers
    { id: "ACC02", name: "Matte Black Soap Dispenser", category: "Soap Dispensers", price: "Premium", stock: "Available", image: "assets/categories/Soap Dispensers.png", description: "Elegant cylindrical dispenser with a chrome pump.", colors: ["Black", "Silver"] },
    
    // Under Table Rug
    { id: "ACC03", name: "Organic Wavy Striped Rug", category: "Under Table Rug", price: "Custom", stock: "Available", image: "assets/categories/Table Rug.png", description: "Large irregular under-table rug with concentric B&W stripes.", colors: ["Black", "White"] },
    
    // Customised Mirrors
    { id: "ACC04", name: "Organic 'Blob' Mirror", category: "Customised Mirrors", price: "Custom", stock: "Available", image: "assets/categories/Customised Mirrors.png", description: "Custom irregular shaped mirror with a slim natural wood frame.", colors: ["Wood"] },
    
    // Table Mate
    { id: "ACC05", name: "Woven Table Mats", category: "Table Mate", price: "Premium", stock: "Available", image: "assets/categories/Table Mate.png", description: "Round jute and oval grey/off-white woven table mats.", colors: ["Brown", "Grey", "Off-white"] },
    
    // Flowers Collection (mapped to Artificial Flowers & Leafs)
    { id: "FL001", name: "Classic Rose", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "assets/images/Classic_Rose.png", description: "Colors: Yellow, White, Pink, Blue, Orange, Purple", colors: ["Multiple"] },
    { id: "FL002", name: "Berry Dahlia", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "assets/images/Berry_Dahliya.png", description: "Colors: Yellow, Blue, Red, Pink, Purple, White", colors: ["Multiple"] },
    { id: "FL003", name: "Dutch Cabbage", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "assets/images/Dutch_Cabbage.png", description: "Colors: Red, Pink, Silver White, White, Orange, Light Pink", colors: ["Multiple"] },
    { id: "FL004", name: "Greek Rose", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: White, Yellow, Red, Pink, Orange, White Rose", colors: ["Multiple"] },
    { id: "FL005", name: "Cotton Berry", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Green, Yellow, Purple, Light Pink, Pink, Orange", colors: ["Multiple"] },
    { id: "FL006", name: "Shaby Lilly", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Blue, White, Pink, Light Orange, Purple", colors: ["Multiple"] },
    { id: "FL007", name: "Wheat Lilac", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Light Pink, White, Pink, Red, Blue", colors: ["Multiple"] },
    { id: "FL008", name: "German Coral", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Orange, Pink, Red, White, Light Orange, Green, Dark Pink", colors: ["Multiple"] },
    { id: "FL009", name: "Cherry Peony", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Red, Purple, White, Yellowish White, Orange, Light Pink", colors: ["Multiple"] },
    { id: "FL010", name: "Eve Daisy Jamanthy", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: White, Blue, Red, Light Pink", colors: ["Multiple"] },
    { id: "FL011", name: "Holland Rosa Daisy", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Brown, White, Yellowish, Pink, Maroon", colors: ["Multiple"] },
    { id: "FL012", name: "Jordan Peony", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Red, Light Pink, Maroon, Blue, Pink, White", colors: ["Multiple"] },
    { id: "FL013", name: "Madonna Lilly", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: White, Pink, Maroon, Blue, Light Pink", colors: ["Multiple"] },
    { id: "FL014", name: "Monica Tulip", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Purple, Red, White, Yellow", colors: ["Multiple"] },
    { id: "FL015", name: "Magic Rose", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Light Yellow, White, Blue, Orange, Yellow, Pink", colors: ["Multiple"] },
    { id: "FL016", name: "Magnolia Long", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: White, Light Pink, Pink", colors: ["Multiple"] },
    { id: "FL017", name: "Moscow Rose", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Purple, White, Brown, Yellow, Orange", colors: ["Multiple"] },
    { id: "FL018", name: "Prime Daisy", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Purple, White, Pink, Red, Orange", colors: ["Multiple"] },
    { id: "FL019", name: "Barbie Peony", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Blue, White, Pink, Orange, Green, Yellow", colors: ["Multiple"] },
    { id: "FL020", name: "Columbia", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Blue, White, Pink, Red, Dark Pink, Orange", colors: ["Multiple"] },
    { id: "FL021", name: "Delight Peony", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Light Red, White, Pink, Brown, Blue", colors: ["Multiple"] },
    { id: "FL022", name: "Delphinium", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Light Red, White, Pink, Brown, Blue", colors: ["Multiple"] },
    { id: "FL023", name: "Hydro Peony", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Blue, White, Pink, Orange, Green, Yellow", colors: ["Multiple"] },
    { id: "FL024", name: "Lilly 3 Head Long", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Pink, White, Yellow, Light Pink", colors: ["Multiple"] },
    { id: "FL025", name: "Mini Millet", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Dark Pink, Purple, White, Light Pink, Yellow", colors: ["Multiple"] },
    { id: "FL026", name: "Neo Cala Lilly", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Pink, White, Light Pink", colors: ["Multiple"] },
    { id: "FL027", name: "Mini Spring Ball", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Light Red, White, Pink, Brown, Blue", colors: ["Multiple"] },
    { id: "FL028", name: "Thick Hybrid", category: "Artificial Flowers & Leafs", price: "Premium", stock: "Available", image: "https://images.unsplash.com/photo-1560790671-b76ca4de55ef?auto=format&fit=crop&q=80&w=800", description: "Colors: Green White, White, Purple, Yellow, Orange, Red", colors: ["Multiple"] },
    
    // Crockerys Decor Set
    { id: "ACC06", name: "Luxury Spice Jars (Marble & Gold)", category: "Crockerys Decor Set", price: "Premium", stock: "Available", image: "assets/categories/Crockerys Decor Set 1.png", description: "Black & Gold marble pattern jars with labels.", colors: ["Black", "Gold"] },
    { id: "ACC07", name: "Minimalist Black Spice Jars", category: "Crockerys Decor Set", price: "Premium", stock: "Available", image: "assets/categories/Crockerys Decor Set 1.png", description: "Matte black jars with wooden lids and leather-style labels.", colors: ["Black", "Wood"] },
    { id: "ACC08", name: "Pastel Ceramic Canister Set", category: "Crockerys Decor Set", price: "Premium", stock: "Available", image: "assets/categories/Crockerys Decor Set 1.png", description: "Mint/blue set for Coffee, Tea, and Sugar.", colors: ["Mint", "Blue"] },
];
