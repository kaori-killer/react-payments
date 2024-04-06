import { useState } from 'react';

import CardBox from '../CardBox';
import CardContent from '../CardContent';
import Button from '../Button';

import { useCardsContext } from '../hooks/useCardsContext';

import updateValidValue from '../../utils/updateValidValue';

import { CARD_ALIAS_LIMIT } from '../../constants/cardLimit';
import CardCompany from './CardCompany';
import { CardType } from '../../types/CardFormType';

type CompletedCardProps = {
  goNextStep: () => void;
  cardId: number;
};

export default function CompletedCard({
  goNextStep,
  cardId,
}: CompletedCardProps) {
  const { getCardInList } = useCardsContext();
  const card = getCardInList(cardId);

  if (!card) {
    return null;
  }

  return <CompletedCardContent card={card} goNextStep={goNextStep} />;
}

type CompletedCardContentProps = {
  card: CardType;
  goNextStep: () => void;
};

function CompletedCardContent({ card, goNextStep }: CompletedCardContentProps) {
  const { editCardInList, deleteCardInList } = useCardsContext();

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

  if (!card) {
    return null;
  }

  return (
    <div className="root">
      <div className="app flex-column-center">
        <div className="flex-center">
          <h1 className="page-title mb-10">카드 등록이 완료되었습니다.</h1>
        </div>
        <CardBox backgroundColor={card.cardCompanyColor}>
          <CardContent
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
