import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import "./FilterBar.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const drawerWidth = 300;

function FilterBar(props) {
  const theme = createMuiTheme({
    palette: {
      primary: { main: "#0496ff" }, // Purple and green play nicely together.
      secondary: { main: "#365B6D" }, // This is just green.A700 as hex.
    },
    typography: { useNextVariants: true },
  });

  const applyFilters = () => {
    const fetchURL =
      "http://localhost:5000/predict?lrank=" +
      lrank +
      "&hrank=" +
      "10" +
      "&p1=" +
      priority1 +
      "&p2=" +
      priority2;
    console.log(fetchURL);
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => props.greet(data));
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [priority1, setpriority1] = React.useState("");

  const handlePriority1Change = (event) => {
    setpriority1(event.target.value);
  };

  const [priority2, setpriority2] = React.useState("");
  const [Catagory, setcatagory] = React.useState(1);
  const [lrank, setlrank] = React.useState(100000);

  const handlePriority2Change = (event) => {
    setpriority2(event.target.value);
  };

  const handleLChange = (event) => {
    setlrank(event.target.value);
  };

  const handleCatagoryChange = (event) => {
    setcatagory(event.target.value);
  };

  const drawer = (
    <div className="whatDrawer">
      <MuiThemeProvider theme={theme}>
        <Toolbar />
        <Typography
          varient="h1"
          fontSize={50}
          align="left"
          style={{ marginTop: -30 }}
          color="primary"
          theme={theme}
        >
          Filters
        </Typography>
        <Divider />
        <List align="left">
          {/* <FormControl theme={theme}>
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              align="left"
              theme={theme}
            >
              Exam
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              color="primary"
              theme={theme}
            >
              <FormControlLabel
                value="Mains"
                control={<Radio />}
                label="Mains"
              />
              <FormControlLabel
                value="Advanced"
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>
          </FormControl> */}
          <Box>
            <TextField
              fullWidth
              id="lrank"
              value={lrank}
              onChange={handleLChange}
              label="Rank"
              variant="standard"
            />
            {/* <TextField
            fullWidth
            id="urank"
            value={hrank}
            onChange={handleHChange}
            label="Upper rank"
            variant="standard"
          /> */}
          </Box>
        </List>
        <Divider />
        <List>
          <InputLabel id="demo-simple-select-autowidth-label" align="left">
            Priority 1
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={priority1}
            onChange={handlePriority1Change}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"cs"}>Computer Science</MenuItem>
            <MenuItem value={"Electronics"}>Electronics</MenuItem>
            <MenuItem value={"Electrical"}>Electrical</MenuItem>
            <MenuItem value={"Chemical"}>Chemical</MenuItem>
            <MenuItem value={"Civil"}>Civil</MenuItem>
            <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-autowidth-label" align="left">
            Priority 2
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={priority2}
            onChange={handlePriority2Change}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"cs"}>Computer Science</MenuItem>
            <MenuItem value={"Electronics"}>Electronics</MenuItem>
            <MenuItem value={"Electrical"}>Electrical</MenuItem>
            <MenuItem value={"Chemical"}>Chemical</MenuItem>
            <MenuItem value={"Civil"}>Civil</MenuItem>
            <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
          </Select>
          {/* <Divider />

          <InputLabel id="demo-simple-select-autowidth-label" align="left">
            Catagory
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={Catagory}
            onChange={handleCatagoryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Electronics"}>General</MenuItem>
            <MenuItem value={"Electrical"}>God</MenuItem>
            <MenuItem value={22}>Demigod</MenuItem>
          </Select>*/}
          <Button onClick={applyFilters} color="primary" theme={theme}>
            Apply
          </Button> 
        </List>
      </MuiThemeProvider>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        style={{ backgroundColor: "#0496ff" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Colinfo
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default FilterBar;
