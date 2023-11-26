import { Grid } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Grid
      height="60"
      width="60"
      color="#7dd3fc"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      visible={true}
    />
  );
};
