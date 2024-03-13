import { useContext } from 'react';
import { Link } from 'react-router-dom';

import CardBox from '../CardBox';
import { CardContext } from '../../context/CardContext';

export default function CardList() {
  const { cardState } = useContext(CardContext);

  console.log(cardState);

  return (
    <div className="root">
      <div className="app flex-column-center">
        <div className="flex-center">
          <h1 className="page-title mb-10">보유 카드</h1>
        </div>
        <Link to="/add" className="button-basic">
          <CardBox>
            <p>+</p>
          </CardBox>
        </Link>
      </div>
    </div>
  );
}
