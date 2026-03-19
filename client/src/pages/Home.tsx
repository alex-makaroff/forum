import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BookingModal } from "@/components/booking/BookingModal";
import { QuoteBlock } from "@/components/QuoteBlock";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center bg-muted">
        {/* Placeholder for Hero Image - would be generated or stock */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4">
              FORUM
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-[#4A4C47] max-w-2xl mx-auto">
              Ресторан авторской кухни в Сколково
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <Link href="/menu" className="w-full sm:w-auto">
              <Button size="lg" className="rounded-none text-lg px-8 py-6 w-full sm:w-auto min-w-[200px]">
                Меню
              </Button>
            </Link>
            <BookingModal 
                trigger={
                    <Button size="lg" variant="outline" className="rounded-none text-lg px-8 py-6 w-full sm:w-auto min-w-[200px]">
                        Забронировать
                    </Button>
                } 
            />
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center max-w-5xl space-y-12">
          <div className="flex flex-row justify-center items-start gap-4 md:gap-12 overflow-x-auto no-scrollbar pb-4 md:pb-0">
            <div className="flex flex-col items-center gap-2 min-w-[120px] flex-1">
              <Clock className="w-5 h-5 md:w-8 md:h-8 text-primary shrink-0" />
              <div className="space-y-1 text-center">
                <h3 className="font-serif text-sm md:text-xl leading-tight">Часы работы</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm leading-tight">
                  Пн–Вс 07:30–22:00
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 min-w-[120px] flex-1">
              <MapPin className="w-5 h-5 md:w-8 md:h-8 text-primary shrink-0" />
              <div className="space-y-1 text-center">
                <h3 className="font-serif text-sm md:text-xl leading-tight">Локация</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm leading-tight">
                  Новая ул., 100,<br/>д. Сколково
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 min-w-[120px] flex-1">
              <div className="w-5 h-5 md:w-8 md:h-8 rounded-full border border-primary flex items-center justify-center font-serif italic text-primary text-[10px] md:text-base shrink-0">i</div>
              <div className="space-y-1 text-center">
                <h3 className="font-serif text-sm md:text-xl leading-tight">Особенности</h3>
                <p className="text-muted-foreground text-[10px] md:text-sm leading-tight">
                  Терраса, Зал,<br/>Авторская кухня
                </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-border">
            <QuoteBlock>
              FORUM — пространство, где гастрономия встречается с эстетикой минимализма. 
              Мы создаём блюда, вдохновлённые европейскими традициями и локальными продуктами, 
              — в атмосфере спокойствия и уюта.
            </QuoteBlock>
          </div>
        </div>
      </section>

      {/* Menu Teaser */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl">Меню</h2>
                <p className="text-[#4A4C47] max-w-md leading-relaxed">
                  От изысканных завтраков до насыщенных ужинов. Попробуйте нашу пасту ручной работы, 
                  свежие морепродукты и авторские десерты.
                </p>
              </div>
              <Link href="/menu">
                <Button variant="link" className="text-lg group p-0 h-auto whitespace-nowrap">
                  Смотреть всё меню <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
             <a href="/menu#zavtrak" className="group cursor-pointer block">
               <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform group-hover:scale-105 duration-700"
                    style={{ backgroundImage: "url('/images/breakfast-teaser.jpg')" }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center z-20">
                   <h3 className="text-white font-serif text-xl sm:text-3xl font-light italic tracking-widest drop-shadow-md text-center px-2">Завтраки</h3>
                 </div>
               </div>
             </a>
             <a href="/menu#osnovnye" className="group cursor-pointer block">
               <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                 <div 
                    className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform group-hover:scale-105 duration-700"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')" }}
                 />
                 <div className="absolute inset-0 flex items-center justify-center z-20">
                   <h3 className="text-white font-serif text-xl sm:text-3xl font-light italic tracking-widest drop-shadow-md text-center px-2">Основные блюда</h3>
                 </div>
               </div>
             </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
