import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/routes"; // Import the Routes file

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <AppRoutes /> {/* Now Routes are managed separately */}
      </main>
      <Footer />
    </>
  );
}

export default App;
