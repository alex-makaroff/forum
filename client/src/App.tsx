import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/store/cart-context";
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import About from "@/pages/About";
import Contacts from "@/pages/Contacts";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/menu" component={Menu} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
