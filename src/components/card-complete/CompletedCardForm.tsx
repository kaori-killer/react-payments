import { useState } from 'react';
import CardBox from '../CardBox';
import Card from '../Card';
import Button from '../Button';

import { useCardsContext } from '../hooks/useCardsContext';

import updateValidValue from '../../utils/updateValidValue';

import { CARD_ALIAS_LIMIT } from '../../constants/cardLimit';
import CardCompany from './CardCompany';

type CompletedCardProps = {
  goNextStep: () => void;
  cardId: number;
};

export default function CompletedCard({
  goNextStep,
  cardId,
}: CompletedCardProps) {
  const id = cardId;

  const { getCardInList, editCardInList, deleteCardInList } = useCardsContext();
  const card = getCardInList(id);

  const [cardAlias, setCardAlias] = useState(card.cardAlias);

  const handleChangeCardAlias = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    updateValidValue({
      limit: CARD_ALIAS_LIMIT,
      setter: setCardAlias,
      value,
      isMonth: false,
      isNumber: false,
    });
  };

  const handleClickEdit = () => {
    const newCardAlias = cardAlias || card.cardCompany;

    editCardInList({
      ...card,
      cardAlias: newCardAlias,
    });

    goNextStep();
  };

  const handleClickDelete = () => {
    deleteCardInList(card.id);
    goNextStep();
  };

  return (
    <div className="root">
      <div className="app flex-column-center">
        <div className="flex-center">
          <h1 className="page-title mb-10">카드 등록이 완료되었습니다.</h1>
        </div>
        <CardBox backgroundColor={card.cardCompanyColor}>
          <Card
            variant="big"
            cardNumber={card.cardNumber}
            ownerName={card.ownerName}
            expirationDate={card.expirationDate}
            cardCompany={card.cardCompany}
          />
        </CardBox>
        <div className="input-container flex-center w-100">
          <CardCompany cardAlias={cardAlias} onChange={handleChangeCardAlias} />
        </div>
        <Button
          type="button"
          text="다음"
          className="mt-55"
          onClick={handleClickEdit}
        />
        <Button
          type="button"
          text="삭제"
          className="mt-5"
          onClick={handleClickDelete}
        />
      </div>
    </div>
  );
}
