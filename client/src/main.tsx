import "./styles/global.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          colorPrimary: "#8fbdff",
          colorText: "white",
          colorBorder: "#8fbdff",
        },
        components: {
          Input: {
            activeBg: "transparent",
            hoverBg: "transparent",
            colorBorder: "#8fbdff",
          },
          InputNumber: {
            activeBg: "transparent",
            hoverBg: "transparent",
            colorBorder: "#8fbdff",
          },
          Select: {
            selectorBg: "transparent",
            colorText: "#8fbdff",
          },
          Table: {
            borderColor: "none",
            headerBg: "#0a121e",
            headerColor: "#8fbdff",
            rowHoverBg: "#0f1d2f",
          },
          Menu: {
            darkItemSelectedBg: "#232e3f",
          },
          DatePicker: {
            colorText: "#8fbdff",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
);
