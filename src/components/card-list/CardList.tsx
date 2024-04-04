import CardBox from '../CardBox';
import CardContent from '../CardContent';

import { useCardsContext } from '../hooks/useCardsContext';

type CardListProps = {
  goNextStep: () => void;
  handleClickNextCompletedCardForm: (id: number) => void;
};

export default function CardList({
  goNextStep,
  handleClickNextCompletedCardForm,
}: CardListProps) {
  const { cards } = useCardsContext();

  const handleClickEdit = (id: number) => {
    console.log(id);
    handleClickNextCompletedCardForm(id);
  };

  const handleClickAdd = () => {
    goNextStep();
  };

  const reversedCards = cards.reverse();

  return (
    <div className="root">
      <div className="app flex-column-center">
        <div className="flex-center">
          <h1 className="page-title mb-10">보유 카드</h1>
        </div>
        {reversedCards.map((card) => (
          <CardBox
            key={card.id}
            onClick={() => handleClickEdit(card.id)}
            backgroundColor={card.cardCompanyColor}
          >
            <CardContent
              variant="small"
              cardNumber={card.cardNumber}
              ownerName={card.ownerName}
              expirationDate={card.expirationDate}
              cardCompany={card.cardCompany}
            />
          </CardBox>
        ))}
        <CardBox onClick={handleClickAdd}>
          <p>+</p>
        </CardBox>
      </div>
    </div>
  );
}
