import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import { settingsContext } from "../app";
import GlassRoundContainer from "../components/glassmorphism/glassRoundContainer";
import useSoundLibrary from "../hooks/useSoundLibrary";

const MusicCollectionContainer = styled("div")({
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 65,
});

const ContentContainer = styled("div")({
  marginTop: 50,
  paddingBottom: 50,
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const ListContainer = styled("div")({
  width: "100%",
  backgroundColor: "white",
});

const MusicCollection = () => {
  const { stopBgm, setMusic } = useContext(settingsContext);
  const { musicList } = useSoundLibrary("有点甜");
  const [selectedIndex, setSelectedIndex] = useState(4);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    stopBgm();
    setMusic(musicList[index].name);
  };
  return (
    <MusicCollectionContainer>
      <GlassRoundContainer>
        <ContentContainer>
          <Typography
            variant="h3"
            color="primary"
            sx={{ mt: "10px", mb: "10px" }}
          >
            Music List
          </Typography>
          <ListContainer>
            <Box sx={{ minWidth: "50%", bgcolor: "background.paper" }}>
              <List component="nav" dense>
                {musicList.map((music, index) => {
                  return (
                    <div key={index}>
                      <ListItemButton
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                      >
                        <ListItemText primary={music.name} />
                      </ListItemButton>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Box>
          </ListContainer>
        </ContentContainer>
      </GlassRoundContainer>
    </MusicCollectionContainer>
  );
};
export default MusicCollection;
