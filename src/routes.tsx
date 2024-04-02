import CardList from './components/card-list/CardList';
import AddCardForm from './components/card-add/AddCardForm';
import CompletedCard from './components/card-complete/CompletedCardForm';
import CardManage from './components/card-manage/CardManage';

const routes = [
  {
    children: [
      { path: '/', element: <CardManage /> },
      // { path: '/add', element: <AddCardForm /> },
      // { path: `/add/complete/:id`, element: <CompletedCard /> },
    ],
  },
];

export default routes;
