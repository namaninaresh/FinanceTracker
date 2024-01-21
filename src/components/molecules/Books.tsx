import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {View} from 'react-native';
import {UserContext} from '../../context/UserContext';
import Card from '../atoms/Card';
import TransItem from '../atoms/TransItem';

interface Books {
  title: string;
  amount: number;
}

const Books = () => {
  const {books, deleteBook} = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <Card>
      <Card.Title>Your Books</Card.Title>

      <View>
        {books.map((item, index) => (
          <TransItem
            item={{
              ...item,
              type: item.amount < 0 ? 'debited' : 'credited',
              vendor: 'book',
            }}
            index={index}
            prefix
            key={index}
            onClick={() => {
              navigation.navigate('Book Details', item);
            }}
            style={{paddingVertical: 20, paddingHorizontal: 10}}
            onEdit={() => navigation.navigate('AddBook', item)}
            onDelete={() => deleteBook(item)}
          />
          //  <BookItem key={index} item={item} />
        ))}
      </View>
    </Card>
  );
};

export default Books;
