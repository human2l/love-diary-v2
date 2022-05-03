import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const LoadingCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          ......
        </Typography>
      </CardContent>
    </Card>
  );
};
export default LoadingCard;
