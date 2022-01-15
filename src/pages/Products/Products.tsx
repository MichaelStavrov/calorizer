import React, { FC, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Button } from '@mui/material';

import ProductTable from './components/ProductTable';
import Search from '../../components/Searh';
import ProductStore from '../../store/ProductStore';
import CustomModal from '../../components/CustomModal';
import AddProductForm from './AddProductForm';

const Products: FC = observer(() => {
  const { products } = ProductStore;
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const itemsToSearch = useMemo(
    () => products.flatMap(({ items }) => items.map(({ name }) => name)).sort(),
    [products]
  );

  return (
    <Box sx={{ padding: '20px 0' }}>
      <Box sx={{ mb: 2.5, display: 'flex', gap: '24px' }}>
        <Search
          items={itemsToSearch}
          value={searchValue}
          setValue={setSearchValue}
          label='Поиск продуктов'
        />
        <Button
          variant='contained'
          sx={{ flexGrow: 1 }}
          onClick={() => setOpenAddProductModal(true)}
        >
          Добавить
        </Button>
        <CustomModal
          open={openAddProductModal}
          closeModal={() => setOpenAddProductModal(false)}
        >
          <AddProductForm closeForm={() => setOpenAddProductModal(false)} />
        </CustomModal>
      </Box>
      <Box>
        <ProductTable filter={searchValue} />
      </Box>
    </Box>
  );
});

export default Products;
