import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux&saga';

import { CardsList, Header, Modal } from 'components/Organism';

export const MainPage: React.FC = () => {
  const cards = useSelector((state: RootState) => state.cards);

  return (
    <div className="grid grid-cols-1 justify-center items-center z-0">
      <Header />
      <CardsList arrOfCards={cards.cardsList.results} />
      <Modal />
    </div>
  );
};
