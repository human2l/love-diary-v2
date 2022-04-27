import Typography from "@mui/material/Typography";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import { getCountryDateFromTimestamp } from "../utils/date_utils";

const ContentDivider = styled(Divider)({});
const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});
const DiaryMetaContainer = styled("div")({
  display: "flex",
});

const DiaryReply = (props) => {
  return (
    <>
      <ContentDivider variant="fullWidth" />
      <TitleContainer>
        <Typography color={props.color} gutterBottom>
          {props.nickname}
        </Typography>
        <DiaryMetaContainer>
          <Typography color="textSecondary">
            {getCountryDateFromTimestamp(props.time, props.country)}
          </Typography>
        </DiaryMetaContainer>
      </TitleContainer>
      <Typography
        color={props.color}
        variant="body2"
        component="p"
        gutterBottom
      >
        {props.convertToParagraph(props.content)}
      </Typography>
    </>
  );
};
export default DiaryReply;
