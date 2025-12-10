"use client"

import { useState, useMemo } from "react"
import { ShoppingCart, MapPin, Cake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Data types
type Category = "Semua Kategori" | "Kue Basah" | "Kue Kering" | "Roti" | "Dessert" | "Cake"
type Location = "Semua Toko" | "Sasak Dua" | "Batu Karut" | "Baleendah" | "RS Welas Asih"

interface Product {
  id: number
  name: string
  category: Category
  locations: Location[]
  price: string
  image: string
  description: string
}

// Sample data
const products: Product[] = [
  {
    id: 1,
    name: "Klepon",
    category: "Kue Basah",
    locations: ["Sasak Dua", "Batu Karut", "Baleendah"],
    price: "Rp 25.000",
    image:
      "https://placehold.co/400x300?text=Klepon+traditional+Indonesian+green+rice+cake+balls+covered+with+grated+coconut",
    description: "Kue tradisional dengan gula merah",
  },
  {
    id: 2,
    name: "Nastar",
    category: "Kue Kering",
    locations: ["Sasak Dua", "RS Welas Asih"],
    price: "Rp 45.000",
    image: "https://placehold.co/400x300?text=Nastar+golden+pineapple+cookies+arranged+in+rows+on+decorative+plate",
    description: "Kue kering nanas premium",
  },
  {
    id: 3,
    name: "Roti Sobek",
    category: "Roti",
    locations: ["Batu Karut", "Baleendah"],
    price: "Rp 35.000",
    image: "https://placehold.co/400x300?text=Soft+fluffy+pull+apart+bread+with+butter+golden+brown+crust",
    description: "Roti empuk dengan mentega",
  },
  {
    id: 4,
    name: "Tiramisu",
    category: "Dessert",
    locations: ["Sasak Dua", "RS Welas Asih"],
    price: "Rp 65.000",
    image: "https://placehold.co/400x300?text=Elegant+tiramisu+dessert+layered+with+cocoa+powder+dusting+in+glass",
    description: "Dessert Italia klasik",
  },
  {
    id: 5,
    name: "Black Forest",
    category: "Cake",
    locations: ["Sasak Dua", "Batu Karut", "RS Welas Asih"],
    price: "Rp 180.000",
    image: "https://placehold.co/400x300?text=Luxurious+black+forest+cake+with+chocolate+shavings+and+cherries",
    description: "Cake coklat dengan ceri",
  },
  {
    id: 6,
    name: "Lemper",
    category: "Kue Basah",
    locations: ["Baleendah", "Batu Karut"],
    price: "Rp 20.000",
    image:
      "https://placehold.co/400x300?text=Lemper+glutinous+rice+rolls+filled+with+spicy+chicken+wrapped+in+banana+leaf",
    description: "Ketan isi ayam suwir",
  },
  {
    id: 7,
    name: "Kastengel",
    category: "Kue Kering",
    locations: ["Sasak Dua", "Baleendah"],
    price: "Rp 50.000",
    image:
      "https://placehold.co/400x300?text=Kastengel+cheese+stick+cookies+golden+rectangular+shape+topped+with+cheese",
    description: "Kue kering keju premium",
  },
  {
    id: 8,
    name: "Croissant",
    category: "Roti",
    locations: ["Sasak Dua", "Batu Karut"],
    price: "Rp 28.000",
    image: "https://placehold.co/400x300?text=Fresh+baked+croissant+flaky+layers+golden+brown+crispy+texture",
    description: "Roti Prancis berlapis",
  },
  {
    id: 9,
    name: "Panna Cotta",
    category: "Dessert",
    locations: ["Baleendah", "RS Welas Asih"],
    price: "Rp 55.000",
    image: "https://placehold.co/400x300?text=Creamy+panna+cotta+dessert+with+berry+sauce+in+elegant+glass",
    description: "Dessert susu Italia",
  },
  {
    id: 10,
    name: "Red Velvet",
    category: "Cake",
    locations: ["Sasak Dua", "Baleendah", "RS Welas Asih"],
    price: "Rp 200.000",
    image: "https://placehold.co/400x300?text=Red+velvet+cake+with+cream+cheese+frosting+vibrant+red+color",
    description: "Cake merah dengan cream cheese",
  },
  {
    id: 11,
    name: "Onde-onde",
    category: "Kue Basah",
    locations: ["Batu Karut", "RS Welas Asih"],
    price: "Rp 22.000",
    image:
      "https://placehold.co/400x300?text=Onde+onde+sesame+seed+covered+fried+dough+balls+filled+with+sweet+mung+bean",
    description: "Bola kue dengan wijen",
  },
  {
    id: 12,
    name: "Putri Salju",
    category: "Kue Kering",
    locations: ["Batu Karut", "Baleendah"],
    price: "Rp 48.000",
    image: "https://placehold.co/400x300?text=Putri+salju+snowball+cookies+covered+in+white+powdered+sugar",
    description: "Kue kering salju lembut",
  },
]

const categories: Category[] = ["Semua Kategori", "Kue Basah", "Kue Kering", "Roti", "Dessert", "Cake"]
const locations: Location[] = ["Semua Toko", "Sasak Dua", "Batu Karut", "Baleendah", "RS Welas Asih"]

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Semua Kategori")
  const [selectedLocation, setSelectedLocation] = useState<Location>("Semua Toko")

  // Filter products based on category and location
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = selectedCategory === "Semua Kategori" || product.category === selectedCategory
      const locationMatch = selectedLocation === "Semua Toko" || product.locations.includes(selectedLocation)
      return categoryMatch && locationMatch
    })
  }, [selectedCategory, selectedLocation])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cake className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">Aneu Cookies</span>
            </div>
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:inline">Keranjang</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/30 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-foreground">Kue Segar Setiap Hari</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Nikmati berbagai pilihan kue tradisional dan modern dari toko kami. Dibuat dengan resep turun-temurun dan
              bahan berkualitas tinggi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Pesan Sekarang
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Lihat Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Produk Kami</h2>
              <p className="text-muted-foreground">Menampilkan {filteredProducts.length} produk</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={(value) => setSelectedLocation(value as Location)}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Pilih Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                Tidak ada produk yang tersedia untuk filter yang dipilih
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("Semua Kategori")
                  setSelectedLocation("Semua Toko")
                }}
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.locations.map((loc) => (
                        <Badge key={loc} variant="outline" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {loc}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-primary">{product.price}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Tambah ke Keranjang
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Cake className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">Aneu Cookies</span>
              </div>
              <p className="text-muted-foreground">
                Menyediakan kue berkualitas tinggi dengan rasa yang tak terlupakan sejak 2010.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Lokasi Toko</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Sasak Dua
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Batu Karut
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Baleendah
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  RS Welas Asih
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Kontak</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Telepon: (021) 1234-5678</li>
                <li>Email: halo@aneucookies.com</li>
                <li>WhatsApp: +62 812-3456-7890</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>&copy; 2025 Aneu Cookies. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
