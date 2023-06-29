import { registerApplication, start, LifeCycles } from "single-spa";

registerApplication({
  name: "@universe/shell",
  app: () => System.import<LifeCycles>("@universe/shell"),
  activeWhen: ["/"],
});

start({
  urlRerouteOnly: true,
});
