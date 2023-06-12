import React, { useState } from 'react';
import { TextField, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../constants';
import HomeIcon from '@mui/icons-material/Home';

export default function Header() {
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar><Button color="inherit" sx={{ color: 'inherit', textDecoration: 'none' }}>
            <Link to={PAGE_PATHS.HOME}>
              <HomeIcon />
            </Link>
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Star Wars Films
          </Typography>
          {/* <Button color="inherit" sx={{ color: 'inherit', textDecoration: 'none' }}>
            <Link to={PAGE_PATHS.FILM}>Some Film Page</Link>
          </Button> */}
          <TextField 
            value={search} 
            onChange={handleSearch} 
            placeholder="Search for a film" 
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}
