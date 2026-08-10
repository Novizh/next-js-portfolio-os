const config = {
  environment: "development",
  client: {
    buyer: process.env.NEXT_PUBLIC_BUYER_CLIENT,
    supplier: process.env.NEXT_PUBLIC_SUPPLIER_CLIENT,
    backoffice: process.env.NEXT_PUBLIC_BACKOFFICE_CLIENT,
  },
  service: {
    orchestrator: process.env.NEXT_PUBLIC_ORCHESTRATOR,
    internal: process.env.NEXT_PUBLIC_INTERNAL,
  },
};

export default config;
