import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import loadingSound from "../assets/sounds/rising-pops.mp3";

const TopSnackbar = (props) => {
  const { message } = props;
  const [open, setOpen] = useState(true);
  const [playLoadingSound] = useSound(loadingSound, { volume: 0.5 });
  useEffect(() => {
    playLoadingSound();
  }, [playLoadingSound]);

  return (
    <div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Slide}
      >
        <Alert
          variant="filled"
          icon={<PublishedWithChangesIcon />}
          color="primary"
          sx={{ width: "100%", fontSize: 18 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default TopSnackbar;
