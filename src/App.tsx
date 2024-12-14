import { ConfigProvider } from "antd";
import AviaPage from "./pages/AviaPage";
import { GlobalStyle } from "./styles/global";
import ruRU from "antd/es/locale/ru_RU";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <AviaPage />
      </DndProvider>
    </ConfigProvider>
  );
}

export default App;
