import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/store/cart-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { OrderForm } from "@/components/order/OrderForm";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-muted-foreground mb-8">Вы еще ничего не добавили в заказ.</p>
          <Link href="/menu">
            <Button size="lg">Перейти в меню</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="font-serif text-3xl font-bold mb-8">Ваш заказ</h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.cartId} className="flex gap-4 py-4 border-b last:border-0">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium font-serif text-lg">{item.name}</h3>
                    <p className="font-medium text-lg">
                      {item.price ? item.price * item.quantity : 0} ₽
                    </p>
                  </div>
                  {item.selectedVariant && (
                    <p className="text-sm text-muted-foreground">
                      {item.selectedVariant.name}
                    </p>
                  )}
                  {item.pricePer100g && (
                    <p className="text-sm text-muted-foreground">
                      Цена за 100г. Итоговая сумма может измениться после взвешивания.
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateQuantity(item.cartId, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateQuantity(item.cartId, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Удалить
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 flex justify-end">
              <Button variant="outline" onClick={clearCart} size="sm" className="text-muted-foreground">
                Очистить корзину
              </Button>
            </div>
          </div>

          <div className="h-fit bg-[#F6F6F4] border border-[#D8D8D2] rounded-2xl shadow-sm sticky top-24 overflow-hidden">
            <OrderForm 
              items={items} 
              cartTotal={cartTotal} 
              clearCart={clearCart} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
