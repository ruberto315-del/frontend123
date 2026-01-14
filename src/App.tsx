import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Title } from "./components/ui/custom/title";
import { Link, useLocation,  } from "react-router";

function App() {
  const location = useLocation()

  return (
    <>
      <div className="text-center">
        <Button>CENTER</Button>
      </div>

      <Input className="w-50" placeholder="Enter"></Input>

      <Button variant="outline">outline</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="default">default</Button>
      <Button variant="primary">primary</Button>
      <Card></Card>

      <Title>jndsa</Title>
      <Title>fdsfdsd</Title>
      <Title>hfghgf</Title>
      <Title>hfgfgbfg</Title>

      <Link to="/courses" className={`mr-4 ${location.pathname === '/' ? 'text-primary' : ''}`}>Courses</Link>
      <Link to="/" className={`mr-4 ${location.pathname === '/' ? 'text-primary' : ''}`}>Home</Link>
      </>
    
  );
}

export default App;
