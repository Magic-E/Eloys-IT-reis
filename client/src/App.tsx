import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { ChatWidget } from "@/components/ChatWidget";

import Home from "@/pages/Home";
import Journey from "@/pages/Journey";
import Skills from "@/pages/Skills";
import Reflections from "@/pages/Reflections";
import ApiIntegration from "@/pages/ApiIntegration";
import DigitaleToegankelijkheid from "@/pages/DigitaleToegankelijkheid";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/journey" component={Journey} />
          <Route path="/skills" component={Skills} />
          <Route path="/reflections" component={Reflections} />
          <Route path="/api-integratie" component={ApiIntegration} />
          <Route path="/toegankelijkheid" component={DigitaleToegankelijkheid} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
