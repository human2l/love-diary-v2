import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const ModalContent = styled("div")({
  padding: 20,
  width: "70%",
  margin: "auto",
  background: "rgba(255,255,255,0.9)",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
});

const ConfirmModal = (props) => {
  const { t } = useTranslation();
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
          {props.confirmTitle}
        </Typography>
        <Typography color="textSecondary" id="simple-modal-description">
          {props.confirmDescription}
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
            onClick={props.cancel}
          >
            {t("cancel.label")}
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={props.confirm}
          >
            {t("confirm.label")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
export default ConfirmModal;
