import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "wouter";
import { Check, Loader2, Minus, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/store/cart-context";

const formSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  address: z.string().optional(),
  paymentMethod: z.enum(["card", "cash"]).default("card"),
  utensilsCount: z.number().min(0).max(20).default(0),
  comment: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const russianDigits = digits.startsWith("7") ? digits : "7" + digits.replace(/^8/, "");
  const limited = russianDigits.slice(0, 11);
  
  let formatted = "+7";
  if (limited.length > 1) {
    formatted += " (" + limited.slice(1, 4);
  }
  if (limited.length > 4) {
    formatted += ") " + limited.slice(4, 7);
  }
  if (limited.length > 7) {
    formatted += "-" + limited.slice(7, 9);
  }
  if (limited.length > 9) {
    formatted += "-" + limited.slice(9, 11);
  }
  return formatted;
}

interface OrderFormProps {
  items: CartItem[];
  cartTotal: number;
  clearCart: () => void;
}

export function OrderForm({ items, cartTotal, clearCart }: OrderFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consent, setConsent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      paymentMethod: "card",
      utensilsCount: 0,
      comment: "",
    },
  });

  const utensilsCount = form.watch("utensilsCount");

  const incrementUtensils = () => {
    const current = form.getValues("utensilsCount");
    if (current < 20) {
      form.setValue("utensilsCount", current + 1);
    }
  };

  const decrementUtensils = () => {
    const current = form.getValues("utensilsCount");
    if (current > 0) {
      form.setValue("utensilsCount", current - 1);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  async function onSubmit(values: FormValues) {
    if (!consent) return;
    setIsSubmitting(true);
    
    try {
      const payload = {
        contact: {
          name: values.name,
          phone: values.phone,
          address: values.address,
          paymentMethod: values.paymentMethod,
          utensilsCount: values.utensilsCount,
          comment: values.comment,
        },
        items: items.map(i => ({
          name: i.name,
          quantity: i.quantity,
          variant: i.selectedVariant?.name,
          price: i.price,
          total: (i.price || 0) * i.quantity
        })),
        total: cartTotal
      };

      await apiRequest("POST", "/api/order", payload);
      
      setIsSuccess(true);
      clearCart();

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось оформить заказ. Попробуйте позже.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="p-6 text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#838681] flex items-center justify-center">
          <Check className="h-7 w-7 text-white" />
        </div>
        <h2 className="font-serif text-xl font-semibold mb-2">Заказ оформлен</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Мы свяжемся с вами для подтверждения.
        </p>
        <Link href="/menu">
          <Button className="h-11 px-6 rounded-full bg-[#838681] hover:bg-[#6b6e69] text-white">
            В меню
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="mb-5 pb-4 border-b border-[#D8D8D2]">
        <h3 className="font-serif text-lg font-semibold mb-1">Итого</h3>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-muted-foreground">К оплате</span>
          <span className="font-serif text-xl font-semibold">{cartTotal} ₽</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">Имя</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ваше имя" 
                    {...field}
                    className="h-10 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">Телефон</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    {...field}
                    onChange={(e) => handlePhoneChange(e, field.onChange)}
                    className="h-10 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">Адрес доставки</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Улица, дом, квартира…"
                    className="resize-none h-14 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent text-sm"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">Оплата</FormLabel>
                <FormControl>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => field.onChange("card")}
                      className={cn(
                        "flex-1 h-10 rounded-lg border text-xs transition-all",
                        field.value === "card"
                          ? "border-[#838681] bg-[#838681] text-white"
                          : "border-[#D8D8D2] bg-white hover:border-[#838681]"
                      )}
                    >
                      Картой
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("cash")}
                      className={cn(
                        "flex-1 h-10 rounded-lg border text-xs transition-all",
                        field.value === "cash"
                          ? "border-[#838681] bg-[#838681] text-white"
                          : "border-[#D8D8D2] bg-white hover:border-[#838681]"
                      )}
                    >
                      Наличными
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="utensilsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">Приборы</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      type="button"
                      onClick={decrementUtensils}
                      disabled={utensilsCount <= 0}
                      className="h-10 w-10 rounded-lg border border-[#D8D8D2] bg-white flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-base font-medium min-w-[2rem] text-center">{utensilsCount}</span>
                    <button
                      type="button"
                      onClick={incrementUtensils}
                      disabled={utensilsCount >= 20}
                      className="h-10 w-10 rounded-lg border border-[#D8D8D2] bg-white flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <input type="hidden" {...field} value={field.value} />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-medium text-muted-foreground">Комментарий</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Пожелания к заказу" 
                    className="resize-none h-16 rounded-lg border-[#D8D8D2] bg-white focus:ring-2 focus:ring-[#838681] focus:border-transparent text-sm" 
                    {...field} 
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox 
              id="order-consent" 
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              className="mt-0.5 border-[#D8D8D2] data-[state=checked]:bg-[#838681] data-[state=checked]:border-[#838681]"
            />
            <label htmlFor="order-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              Согласен на обработку данных согласно{" "}
              <Link href="/privacy" className="underline hover:text-foreground">
                политике
              </Link>
            </label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 rounded-full bg-[#838681] hover:bg-[#6b6e69] text-white text-sm font-medium mt-3" 
            disabled={isSubmitting || !consent}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Отправка...
              </>
            ) : (
              "Оформить заказ"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
