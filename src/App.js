import './App.css';
import ImageSlider from "./components/image-slider";

function App() {
  return (
    <div className="App">
      {/* Image slider component */}
      <ImageSlider
        url={"https://picsum.photos/v2/list"}
        page={"1"}
        limit={"10"}
      />
    </div>
  );
}

export default App;
