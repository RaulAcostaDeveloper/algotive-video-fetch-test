import { HeaderContainer } from "./components/Header/HeaderContainer";
import { TableDataComponent } from "./components/TableData/TableDataComponent";
import { VideoContainer } from "./components/Videos/VideoContainer";

function App() {
  return (
    <div className="App">
      <HeaderContainer/>
      <TableDataComponent/>
      <VideoContainer/>
    </div>
  );
}

export default App;
