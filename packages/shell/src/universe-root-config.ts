import { registerApplication, start, LifeCycles } from "single-spa";
import bootstrap from "./bootstrap";

bootstrap();

registerApplication({
  name: "@single-spa/welcome",
  app: () =>
    System.import<LifeCycles>(
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/"],
});

// registerApplication({
//   name: "@universe/navbar",
//   app: () => System.import("@universe/navbar"),
//   activeWhen: ["/"]
// });

start({
  urlRerouteOnly: true,
});
