import { List, ListItem, ListItemText } from "@mui/material";

export default function AlphabetSelectList() {
    return (
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
    )
}