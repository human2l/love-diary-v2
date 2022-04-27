import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const LanguageSelector = (props) => {
  const { language, setLanguage } = props;
  const handleChange = (e, language) => {
    setLanguage(language);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={language}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="en">English</ToggleButton>
      <ToggleButton value="zh-cn">中文</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSelector;
