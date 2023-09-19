import { Close } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    // width: "400px",
    width: "auto",
  },
  [theme.breakpoints.up("md")]: {
    // width: "auto",
    width: "200px",
  },
  [theme.breakpoints.up("lg")]: {
    // width: "auto",
    width: "240px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  color: "black",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.3, 1.3, 1.3, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    textOverflow: "ellipsis",
    fontSize: "16px",
    // [theme.breakpoints.up("xs")]: {
    //   // width: "28ch",
    //   fontSize: "16px",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   // width: "20ch",
    //   fontSize: "16px",
    // },
  },
}));

export default function PrimarySearch({
  handleDrawerToggle,
  mobileOpen,
  showSearch,
  setShowSearch,
}) {
  const [searchTerm, setSearchTerm] = React.useState();
  const navigate = useNavigate();

  const handleClearText = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    console.log("searchTerm", mobileOpen);
    e.preventDefault();
    navigate(`/products?search=${searchTerm}`);
    setShowSearch(false);
    setSearchTerm("");
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <form onSubmit={handleSearch}>
        <StyledInputBase
          sx={{ width: "100%" }}
          placeholder="Search for products…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          endAdornment={
            showSearch && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClearText}
                  // onMouseDown={handleMouseDownPassword}
                >
                  {<Close />}
                </IconButton>
              </InputAdornment>
            )
          }
        />
      </form>
    </Search>
    // </Box>
  );
}
