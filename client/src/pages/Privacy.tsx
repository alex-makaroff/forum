import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-muted space-y-6 text-muted-foreground">
            <p>
                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
            <p>
                Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные. 
                В настоящей Политике конфиденциальности описывается, как мы собираем, используем и защищаем вашу информацию.
            </p>

            <h3 className="text-foreground font-medium text-xl">1. Сбор информации</h3>
            <p>
                Мы собираем информацию, которую вы предоставляете нам напрямую при бронировании столика или оформлении заказа, включая:
                имя, номер телефона и комментарии к заказу.
            </p>

            <h3 className="text-foreground font-medium text-xl">2. Использование информации</h3>
            <p>
                Мы используем вашу информацию исключительно для:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li>Обработки и подтверждения ваших бронирований и заказов;</li>
                <li>Связи с вами по вопросам обслуживания;</li>
                <li>Улучшения качества нашего сервиса.</li>
            </ul>

            <h3 className="text-foreground font-medium text-xl">3. Защита данных</h3>
            <p>
                Мы принимаем разумные меры безопасности для защиты вашей личной информации от несанкционированного доступа.
            </p>

            <h3 className="text-foreground font-medium text-xl">4. Передача третьим лицам</h3>
            <p>
                Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ.
            </p>

            <h3 className="text-foreground font-medium text-xl">5. Согласие</h3>
            <p>
                Используя наш сайт, вы соглашаетесь с нашей Политикой конфиденциальности.
            </p>
        </div>
      </div>
    </Layout>
  );
}
