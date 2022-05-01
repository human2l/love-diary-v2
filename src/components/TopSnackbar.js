import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { useState } from "react";

const TopSnackbar = (props) => {
  const { message } = props;
  const [open, setOpen] = useState(true);

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
