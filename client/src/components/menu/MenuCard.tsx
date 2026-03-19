import { MenuItem } from "@/data/menu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-context";
import { ImageOff, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { DishModal } from "./DishModal";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { getTotalQtyByItemId, incrementByItemId, decrementByItemId } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasVariants = item.variants && item.variants.length > 0;
  const qty = getTotalQtyByItemId(item.id);

  const getDisplayPrice = () => {
    if (hasVariants) {
      const min = Math.min(...item.variants!.map((v) => v.price));
      return `от ${min} ₽`;
    }
    if (item.pricePer100g) {
      return `${item.pricePer100g} ₽ / 100г`;
    }
    return `${item.price} ₽`;
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasVariants) {
      setIsModalOpen(true);
    } else {
      incrementByItemId(item, undefined);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasVariants) {
      setIsModalOpen(true);
    } else {
      incrementByItemId(item, undefined);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasVariants) {
      setIsModalOpen(true);
    } else {
      decrementByItemId(item.id, undefined);
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col"
        onClick={handleCardClick}
        data-testid={`card-${item.id}`}
      >
        <div className="aspect-[4/3] bg-neutral-100 flex flex-col items-center justify-center text-muted-foreground overflow-hidden">
          {item.hasImage && item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <ImageOff className="h-8 w-8 stroke-1 mb-1" />
              <span className="text-xs">Фото скоро</span>
            </>
          )}
        </div>

        <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
          <h3 className="font-medium text-sm md:text-xl leading-tight mb-2 line-clamp-2" data-testid={`card-name-${item.id}`}>
            {item.name}
          </h3>
          
          <div className="grid grid-cols-[1fr_auto] items-center gap-2 mt-auto">
            <div className="min-w-0">
              <span className="font-semibold text-sm md:text-xl whitespace-nowrap block truncate" data-testid={`card-price-${item.id}`}>
                {getDisplayPrice()}
              </span>
            </div>

            <div className="shrink-0">
              {qty === 0 ? (
                <button
                  className="text-xs md:text-base px-3 md:px-5 py-1.5 h-7 md:h-11 rounded-md whitespace-nowrap bg-neutral-100 text-neutral-700 border border-neutral-200 hover:bg-neutral-200 transition-colors"
                  onClick={handleAddClick}
                  data-testid={`card-add-${item.id}`}
                >
                  + В корзину
                </button>
              ) : (
                <div
                  className="flex items-center gap-0.5 md:gap-2 bg-neutral-100 border border-neutral-200 rounded-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="h-7 w-7 md:h-11 md:w-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-l-md transition-colors"
                    onClick={handleDecrement}
                    data-testid={`card-decrement-${item.id}`}
                  >
                    <Minus className="h-3 w-3 md:h-5 md:w-5" />
                  </button>
                  <span className="font-medium min-w-[1.25rem] md:min-w-[2rem] text-center text-xs md:text-lg" data-testid={`card-qty-${item.id}`}>
                    {qty}
                  </span>
                  <button
                    className="h-7 w-7 md:h-11 md:w-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-r-md transition-colors"
                    onClick={handleIncrement}
                    data-testid={`card-increment-${item.id}`}
                  >
                    <Plus className="h-3 w-3 md:h-5 md:w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <DishModal item={item} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
