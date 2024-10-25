import "./App.css";

import Header from "./components/Header";
import Survey from "./components/Survey";

export default function App() {
  return (
    // <> </> <- These are called React Fragments, and they allow us to return more than one top component
    <>
      <Header />
      <Survey />
    </>
  );
}
