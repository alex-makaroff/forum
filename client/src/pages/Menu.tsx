import { Layout } from "@/components/layout/Layout";
import { menuItems, categories, Category } from "@/data/menu";
import { MenuCard } from "@/components/menu/MenuCard";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Full menu pages configuration
  const menuPages = [
    "/menu/page-1.png",
    "/menu/page-2.png",
    "/menu/page-3.png",
    "/menu/page-4.png",
  ];

  return (
    <Layout>
      <div className="bg-muted/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Меню</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Изысканные блюда из свежих ингредиентов. Выберите категорию или воспользуйтесь поиском.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sticky top-16 bg-background/95 backdrop-blur-sm z-40 border-b">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 no-scrollbar">
            <button
              onClick={() => setActiveCategory("All")}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-full border",
                activeCategory === "All"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-transparent hover:bg-muted"
              )}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors rounded-full border",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-transparent hover:bg-muted"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск блюд..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-transparent focus:bg-background transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {activeCategory === "All" ? (
          filteredItems.length > 0 ? (
            <div className="space-y-12">
              {categories.map((cat) => {
                const categoryItems = filteredItems.filter((item) => item.category === cat);
                if (categoryItems.length === 0) return null;
                const anchorId = cat === "Завтрак" ? "zavtrak" : cat === "Основные блюда" ? "osnovnye" : undefined;
                return (
                  <section key={cat} id={anchorId} className="scroll-mt-32">
                    <h2 className="font-serif text-2xl font-semibold mb-6">{cat}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                      {categoryItems.map((item) => (
                        <MenuCard key={item.id} item={item} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p>Ничего не найдено.</p>
              <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                Сбросить фильтры
              </Button>
            </div>
          )
        ) : (
          filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p>Ничего не найдено.</p>
              <Button variant="link" onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}>
                Сбросить фильтры
              </Button>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}
