import loadingHeartsSvg from "../assets/images/loadingHearts.svg";
import GlassFullContainer from "./glassmorphism/glassFullContainer";

const PageLoading = () => {
  return (
    <GlassFullContainer>
      <img src={loadingHeartsSvg} alt="loading" height="800px" />
    </GlassFullContainer>
  );
};
export default PageLoading;
