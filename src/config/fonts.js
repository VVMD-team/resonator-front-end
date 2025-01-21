import localFont from "next/font/local";

export const helveticaNowDisplay = localFont({
  variable: "--ff-primary",
  src: [
    {
      path: "../../public/fonts/HelveticaNowDisplay/HelveticaNowDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay/HelveticaNowDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay/HelveticaNowDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay/HelveticaNowDisplay-Medita.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay/HelveticaNowDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay/HelveticaNowDisplay-BoldIta.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
});
