import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { settingsContext } from "../app";

const ModalContent = styled("div")({
  padding: 20,
  width: "70%",
  margin: "auto",
  background: "rgba(255,255,255,0.9)",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
});

const ConfirmModal = ({
  confirmTitle,
  confirmDescription,
  cancel,
  confirm,
}) => {
  const { t } = useContext(settingsContext);

  return (
    <Modal
      open
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        marginTop: 30,
      }}
    >
      <ModalContent>
        <Typography color="primary" variant="h5" id="simple-modal-title">
          {confirmTitle}
        </Typography>
        <Typography color="textSecondary" id="simple-modal-description">
          {confirmDescription}
        </Typography>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            size="medium"
            variant="contained"
            color="inherit"
            onClick={cancel}
          >
            {t("cancel.label")}
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={confirm}
          >
            {t("confirm.label")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
export default ConfirmModal;
