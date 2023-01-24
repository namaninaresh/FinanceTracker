import {View} from 'react-native';

export function separator() {
  return <View></View>;
}
export function MoneyFormat(x) {
  var number = Number(x);
  return number.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });
}
