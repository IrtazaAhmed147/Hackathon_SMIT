import { Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const dummyUsers = [
  { id: 1, name: 'Irtaza Ahmed' },
  { id: 2, name: 'Ali Khan' },
];

function Users() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Paper>
        <List>
          {dummyUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} />

              <Button>
                <EditIcon />
              </Button>

              <Button>
                <DeleteIcon />
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
    )
}

export default Users