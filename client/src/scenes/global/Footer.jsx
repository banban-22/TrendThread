import { Box, Typography, useTheme } from '@mui/material';
import { shades } from '../../theme';

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            vairant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            TrendThread
          </Typography>
          <div>
            At TrendThread, we strive to provide a personalized shopping
            experience, offering a diverse range of high-quality products for
            every taste. Elevate your shopping journey with TrendThread, where
            trends meet tradition and fashion knows no bounds.
          </div>
        </Box>
        <Box>
          <Typography variant="h4" frontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
          <Typography mb="30px">Our Stories</Typography>
          <Typography mb="30px">Careers</Typography>
        </Box>
        <Box>
          <Typography variant="h4" frontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
          <Typography mb="30px">Our Stories</Typography>
          <Typography mb="30px">Careers</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Box>
            <Typography variant="h4" frontWeight="bold" mb="30px">
              Contact Us
            </Typography>
            <Typography mb="30px">
              123 Trendy Street Fashion City, Province, TND123
            </Typography>
            <Typography mb="30px">Email: trendthread@abc.com</Typography>
            <Typography mb="30px">(111) 123-4567</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
