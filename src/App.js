import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import logo from './logo.svg';
import './App.css';

import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const GET_CHARACTERS = gql`
{
  characters(page:1) {
    info {
      next
    }
    results {
      id
      name 
      status
      image
    }
  }
}
`
const Character = ({ character: { name, status, image } }) => (
  <Card>
    <CardMedia component="img" alt={name} height="150" image={image} />
    <CardContent>
      <Typography variant="h2">
        {name}
      </Typography>
      <Typography variant='body2'>
        <ul>
          <li>Status: {status}</li>
        </ul>
      </Typography>
    </CardContent>
  </Card>
)

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (error) return <h1>Something went wrong!</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <Container>
      <CssBaseline />
      <Box>
        <Typography variant="h1">Rick and Morty</Typography>
        {data.characters.results.map(chr => (
          <Character key={chr.id} character={chr} />
        ))}
      </Box>
    </Container>
  );
}

export default App;
