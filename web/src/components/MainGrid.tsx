import * as React from "react";
import Grid from "@mui/material/Grid";
import MediaControlCard from "./MediaControlCard";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const mapGrid = (amount: number) => {
  let i = 0,
    grid = [];
  while (i < amount) {
    i++;
    grid.push(
      <Grid item key={i}>
        <MediaControlCard />
      </Grid>
    );
  }
  return grid;
};

export default function MainGrid() {
  return (
    <React.Fragment>
      <Drawer
        sx={{
          display: 'flex',
          width: 40,
          overflowY: 'hidden'   

        }}
        variant="persistent"
        anchor="right"
        open={true}
      >
        <List dense={true} sx={{ 
          display: 'flex',
          flexDirection: 'column',
          top: 60,
          overflowY: 'hidden'   
        }}>
          {["#", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].map((text, index) => (
            <ListItem button key={text} sx={{ textAlign: 'center', p:0, pl:1, pr:1.5 }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container spacing={3}>
        {mapGrid(50)}
      </Grid>
    </React.Fragment>
  );
}
