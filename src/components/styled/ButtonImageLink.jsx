import { useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';

export default function ButtonImageLink({ sx, href, img, text }) {
  const theme = useTheme();
  return (
    <a href={href} className="primary-btn">
      <Grid2 container>
        <Grid2 xs={2}>
          <Box
            sx={{
              backgroundImage: "url('" + img + "')",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height: '90%',
              width: '90%',
              margin: '5%',
            }}
          ></Box>
        </Grid2>
        <Grid2 xs={10}>{text}</Grid2>
      </Grid2>
    </a>
  );
}
