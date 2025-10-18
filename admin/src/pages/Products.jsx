import { Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import React from 'react'

const dummyUsers = [
    { id: 1, name: 'Irtaza Ahmed' },
    { id: 2, name: 'Ali Khan' },
];

function Products() {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Products
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

export default Products