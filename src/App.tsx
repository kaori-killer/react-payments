import CardManage from './components/card-manage/CardManage';
import CardsProvider from './context/CardsProvider';

export default function App() {
  return (
    <CardsProvider>
      <CardManage />
    </CardsProvider>
  );
}
