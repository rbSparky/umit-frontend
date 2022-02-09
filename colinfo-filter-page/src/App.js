import React from "react"
import "./App.css";
import CollegeList from "./components/CollegeList";
import FilterBar from "./components/FilterBar";

const columns = [
  { id: "name", label: "College", minWidth: 100 },
  { id: "course", label: "Course", minWidth: 170 },
  { id: "opening", label: "Opening Rank", minWidth: 70 },
  { id: "closing", label: "Closing Rank", minWidth: 70 },
];

var rows = [
];
function App() {

  const [colleges, setColleges] = React.useState(rows);

  const update = (data) =>{
    console.log("called")
    console.log()
    setColleges(data.map((element) => {return {name: element[0], course: element[1], opening: element[2], closing: element[3]}}, data));
  }
  
  return (
    <div className="App">
      <FilterBar greet={update}></FilterBar>
      <div className="list">
        <CollegeList list={colleges} columns={columns} ></CollegeList>
      </div>
    </div>
  );
}

export default App;
