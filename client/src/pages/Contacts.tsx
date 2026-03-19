import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Phone, Clock } from "lucide-react";

export default function Contacts() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12 text-center">Контакты</h1>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-medium mb-2">Адрес</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Новая ул., 100, д. Сколково<br/>
                    Москва, Россия
                  </p>
                  <a 
                    href="https://yandex.com/maps/org/forum/42944225662/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline mt-2 text-sm"
                  >
                    Открыть в Яндекс.Картах <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-medium mb-2">Телефон</h3>
                  <p className="text-muted-foreground mb-2">
                    Бронирование столов и доставка:
                  </p>
                  <a href="tel:+79651507772" className="text-lg font-medium hover:text-primary transition-colors">
                    +7 (965) 150-77-72
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-serif text-xl font-medium mb-2">Часы работы</h3>
                  <p className="text-muted-foreground">
                    Пн–Вс: 07:30 – 22:00
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Завтраки: Пн-Пт до 13:00, Сб-Вс до 14:00
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-muted/30 rounded-lg border">
                <h4 className="font-medium mb-2">Как добраться</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Мы находимся на территории Сколково. Для проезда на территорию на автомобиле может потребоваться пропуск или использование платной парковки. Рекомендуем уточнить детали при бронировании столика.
                </p>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] md:h-auto bg-muted rounded-lg overflow-hidden border relative">
             <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.439956%2C55.693069&mode=search&oid=42944225662&ol=biz&z=15" 
                width="100%" 
                height="100%" 
                allowFullScreen={true}
                style={{ border: 0 }}
                title="Yandex Map"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
