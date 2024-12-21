import { ConfigProvider } from "antd";
import { GlobalStyle } from "./styles/global";
import ruRU from "antd/es/locale/ru_RU";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Router from "./router/Router";
import { Toaster } from "sonner";

function App() {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: "#EE9C9C",
          fontFamily: "Montserrat",
          fontSize: 14,
          colorText: "#000000",
        },
      }}
    >
      <Toaster
        richColors
        expand={false}
        position="top-right"
        closeButton
        toastOptions={{
          duration: 3000,
          className: "toaster-class",
        }}
      />
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <Router />
      </DndProvider>
    </ConfigProvider>
  );
}

export default App;
