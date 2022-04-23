import * as colors from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorTiles = (props) => {
  const ColorTiles = styled("div")({
    marginTop: 10,
    display: "flex",
    flexWrap: "wrap",
    width: 160,
  });
  const ColorTile = styled("div")({
    width: 30,
    height: 30,
    border: "1px solid white",
  });

  const colorMap = {
    amber: colors.amber[500],
    blue: colors.blue[500],
    blueGrey: colors.blueGrey[500],
    brown: colors.brown[500],
    cyan: colors.cyan[500],
    deepOrange: colors.deepOrange[500],
    deepPurple: colors.deepPurple[500],
    green: colors.green[500],
    grey: colors.grey[500],
    indigo: colors.indigo[500],
    lightBlue: colors.lightBlue[500],
    lightGreen: colors.lightGreen[500],
    lime: colors.lime[500],
    orange: colors.orange[500],
    pink: colors.pink[500],
    purple: colors.purple[500],
    red: colors.red[500],
    teal: colors.teal[500],
    yellow: colors.yellow[500],
  };

  return (
    <ColorTiles>
      {Object.keys(colorMap).map((colorName) => {
        const colorValue = colorMap[colorName];
        return (
          <ColorTile
            key={colorName}
            sx={{ backgroundColor: colorValue }}
            onClick={() => props.pickColor(colorValue)}
          />
        );
      })}
    </ColorTiles>
  );
};
export default ColorTiles;
