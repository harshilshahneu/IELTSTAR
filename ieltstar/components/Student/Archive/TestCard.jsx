import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
const TestCard = ({ test  }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/avatars/avatar_1.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {test.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {test.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TestCard