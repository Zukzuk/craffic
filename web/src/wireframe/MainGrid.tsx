import * as React from "react";
import Grid from "@mui/material/Grid";
import MediaControlCard from "../components/MediaControlCard";
import { Drawer } from "@mui/material";
import AlphabetSelectList from "../components/AlphabetSelectList";

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
        <AlphabetSelectList />
      </Drawer>
      <Grid container spacing={3}>
        {mapGrid(50)}
      </Grid>
    </React.Fragment>
  );
}
