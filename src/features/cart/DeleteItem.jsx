/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ item }) {
  const dispatch = useDispatch();

  function handleRemoveItem(e, item) {
    console.log(item);
    e.preventDefault();
    dispatch(deleteItem(item));
  }

  return (
    <div className="">
      <Button onClick={(e) => handleRemoveItem(e, item)} type="small">
        del
      </Button>
    </div>
  );
}

export default DeleteItem;
