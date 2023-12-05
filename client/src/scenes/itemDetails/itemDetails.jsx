import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../state';
import { IconButton, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { shades } from '../../theme';
import Item from '../../components/Item';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    try {
      const item = await fetch(
        `http://localhost:1337/api/items/${itemId}?populate=image`,
        { method: 'GET' }
      );
      const itemJSON = await item.json();
      setItem(itemJSON.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  }
  console.log(item);

  async function getItems() {
    try {
      const items = await fetch(
        `http://localhost:1337/api/items?populate=image`,
        { method: 'GET' }
      );
      const itemsJSON = await items.json();
      setItems(itemsJSON.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* Images */}
        <Box flex="1 1 40%" mb="40px">
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.name}
            width="100%"
            height="100%"
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* Actions */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.longDescription?.[0]?.children?.[0]?.text ??
                'No description available'}
            </Typography>
          </Box>

          {/* Count and Button */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: '#fff',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              Add To Cart
            </Button>
          </Box>

          <Box>
            <Box m="10px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>Add To Wishlist</Typography>
            </Box>
            <Typography>Categories: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Information */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="description" value="description" />
          <Tab label="reviews" value="reviews" />
        </Tabs>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === 'description' && (
          <div>
            {item?.attributes?.longDescription?.[0]?.children?.[0]?.text ??
              'No description available'}
          </div>
        )}
        {value === 'reviews' && <div>reviews</div>}
      </Box>

      {/* Related Items */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name} - ${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default ItemDetails;
