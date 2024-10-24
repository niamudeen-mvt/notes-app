/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_clr: "#0d6efd",
        main_dark_clr: "#0a4eb4",
        main_light_clr: "#3e64ff",
        form_box_shadow: "rgba(0, 0, 0, 0.35) -5px 5px 15px",
        light_grey_clr: "b6b2b2",
        form_btn_box_shadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backdrop: "rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};
