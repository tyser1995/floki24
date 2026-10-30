import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#292a26", olive: "#65745b", sand: "#f4f2ec" } } },
  plugins: []
};
export default config;
