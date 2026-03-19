import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking/BookingModal";
import { QuoteBlock } from "@/components/QuoteBlock";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-[40vh] bg-muted flex items-center justify-center overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">О нас</h1>
          <p className="text-xl font-light text-[#4A4C47] max-w-2xl mx-auto">
            История вкуса и атмосферы
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-20">
          <QuoteBlock variant="emphasis" className="max-w-3xl mx-auto text-center">
            Мы создали FORUM как место, где время замедляется, а вкус выходит на первый план.
          </QuoteBlock>

          {/* Концепция: Текст слева, Картинка справа */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold">Концепция</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Ресторан FORUM расположен в инновационном центре Сколково. Мы объединили 
                  авторскую кухню, вдохновленную европейскими традициями, с минималистичным 
                  дизайном и атмосферой спокойствия.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Наш шеф-повар тщательно отбирает локальные продукты, чтобы создавать блюда, 
                  которые удивляют своей простотой и глубиной вкуса.
                </p>
              </div>
            </div>
            <div className="bg-muted aspect-[4/3] sm:aspect-square rounded-sm overflow-hidden relative">
                <img 
                    src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop" 
                    alt="Interior" 
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
          </div>

          {/* Особенности: Картинка слева, Текст справа */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="bg-muted aspect-[4/3] sm:aspect-square rounded-sm overflow-hidden relative order-2 md:order-1">
                <img 
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
                    alt="Food details" 
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="font-serif text-3xl font-bold">Особенности</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Авторская, европейская и русская кухня</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Банкетный зал для мероприятий</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Уютная терраса с панорамными видами</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Специальное меню завтраков</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <BookingModal 
              trigger={
                <Button size="lg" className="rounded-none text-lg px-12 py-6">
                  Забронировать стол
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
