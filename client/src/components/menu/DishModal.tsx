import { MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart-context";
import { useState, useEffect } from "react";
import { ImageOff, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DishModalProps {
  item: MenuItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DishModal({ item, open, onOpenChange }: DishModalProps) {
  const { getQtyByItemId, items, incrementByItemId, decrementByItemId } = useCart();
  const hasVariants = item.variants && item.variants.length > 0;
  
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    hasVariants ? item.variants![0].name : undefined
  );
  
  useEffect(() => {
    if (open) {
      const inCart = items.find((i) => i.id === item.id);
      if (inCart?.selectedVariant?.name) {
        setSelectedVariant(inCart.selectedVariant.name);
      } else if (hasVariants) {
        setSelectedVariant(item.variants![0].name);
      }
    }
  }, [open, item.id, hasVariants, items]);

  const qty = getQtyByItemId(item.id, selectedVariant);

  const getDisplayPrice = () => {
    if (hasVariants && selectedVariant) {
      const variant = item.variants!.find((v) => v.name === selectedVariant);
      return variant ? `${variant.price} ₽` : "";
    }
    if (item.pricePer100g) {
      return `${item.pricePer100g} ₽ / 100г`;
    }
    return `${item.price} ₽`;
  };

  const getWeight = () => {
    if (item.weight) return item.weight;
    if (item.pricePer100g) return "100 г";
    return "—";
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    incrementByItemId(item, selectedVariant);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    decrementByItemId(item.id, selectedVariant);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="aspect-[4/3] bg-neutral-100 flex flex-col items-center justify-center text-muted-foreground overflow-hidden">
          {item.hasImage && item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <ImageOff className="h-12 w-12 stroke-1 mb-2" />
              <span className="text-sm">Фото скоро</span>
            </>
          )}
        </div>
        
        <div className="p-6 space-y-4">
          <DialogHeader className="space-y-1">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="font-semibold tracking-tight font-serif text-xl text-left">{item.name}</DialogTitle>
              <span className="text-sm text-muted-foreground whitespace-nowrap">{getWeight()}</span>
            </div>
            <p className="text-lg font-semibold text-left">{getDisplayPrice()}</p>
          </DialogHeader>

          {hasVariants && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Выберите вариант:</p>
              <RadioGroup
                value={selectedVariant}
                onValueChange={setSelectedVariant}
                className="gap-2"
              >
                {item.variants!.map((variant) => (
                  <div
                    key={variant.name}
                    className="flex items-center justify-between space-x-2 border p-3 rounded-md cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedVariant(variant.name)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={variant.name} id={`modal-${variant.name}`} />
                      <Label htmlFor={`modal-${variant.name}`} className="cursor-pointer text-sm">
                        {variant.name}
                      </Label>
                    </div>
                    <span className="text-sm font-medium">{variant.price} ₽</span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description || "Описание скоро."}
          </p>

          <div className="pt-2">
            {qty === 0 ? (
              <Button
                onClick={handleIncrement}
                className="w-full"
                data-testid={`modal-add-${item.id}`}
              >
                + В корзину
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-4 bg-muted rounded-lg p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  data-testid={`modal-decrement-${item.id}`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium min-w-[2rem] text-center" data-testid={`modal-qty-${item.id}`}>
                  {qty}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  data-testid={`modal-increment-${item.id}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
