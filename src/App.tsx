import { HeaderContainer } from "./components/Header/HeaderContainer";
import { TableDataComponent } from "./components/TableData/TableDataComponent";
import { VideosContainer } from "./components/Videos/VideosContainer";

function App() {
  return (
    <div className="App">
      <HeaderContainer/>
      <TableDataComponent/>
      <VideosContainer/>
    </div>
  );
}

export default App;
