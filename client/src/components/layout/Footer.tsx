import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold tracking-wider">FORUM</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ресторан авторской кухни в сердце Сколково.<br/>
              Минимализм, вкус и атмосфера.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium uppercase tracking-wide text-xs text-muted-foreground">Контакты</h4>
            <div className="text-sm space-y-2">
              <p>Новая ул., 100, д. Сколково</p>
              <p>
                <a href="tel:+79651507772" className="hover:text-primary transition-colors">
                  +7 (965) 150-77-72
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium uppercase tracking-wide text-xs text-muted-foreground">Часы работы</h4>
            <div className="text-sm space-y-2">
              <p>Пн–Вс 07:30–22:00</p>
              <p className="text-muted-foreground text-xs mt-2">
                Завтраки: Пн-Пт до 13:00, Сб-Вс до 14:00
              </p>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FORUM. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
