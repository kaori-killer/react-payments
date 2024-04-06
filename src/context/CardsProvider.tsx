import { PropsWithChildren, createContext, useState } from 'react';

import { CardType } from '../types/CardFormType';

import isFulledCardForm from '../utils/isFulledCardForm';

type InitialCards = {
  cards: CardType[];
  getCardInList: (id: number) => CardType | null;
  addCardInList: (card: CardType) => void;
  editCardInList: (card: CardType) => void;
  deleteCardInList: (id: number) => void;
};

const initialCards: InitialCards = {
  cards: [],
  getCardInList: () => null,
  addCardInList: () => null,
  editCardInList: () => null,
  deleteCardInList: () => null,
};

export const CardsContext = createContext(initialCards);

export default function CardsProvider({ children }: PropsWithChildren) {
  const [cards, setCards] = useState<CardType[]>([]);

  const getCardInList = (id: number): CardType | null => {
    const targetCard = cards.find((card) => card.id === id);

    if (targetCard === undefined) {
      return null;
    }

    return targetCard;
  };

  const addCardInList = (card: CardType) => {
    const { cardNumber, cardPassword, securityCode, expirationDate } = card;

    const isFormFilled = isFulledCardForm({
      cardNumber,
      cardPassword,
      securityCode,
      expirationDate,
    });

    if (!isFormFilled) {
      return;
    }

    setCards([card, ...cards]);
  };

  const editCardInList = (card: CardType) => {
    const newCards = cards.map((preCard) =>
      preCard.id != card.id ? preCard : card
    );
    setCards(newCards);
  };

  const deleteCardInList = (id: number) => {
    setCards(cards.filter((preCard) => preCard.id != id));
  };

  return (
    <CardsContext.Provider
      value={{
        cards,
        getCardInList,
        addCardInList,
        editCardInList,
        deleteCardInList,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
