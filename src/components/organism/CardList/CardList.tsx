import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../../../models/CharacterReducer';
import { FetchCharactersMore } from '../../../store/actions/CharacterActions';
import { initialPageNumber } from '../../../utils/constants';
import { RootReducer } from '../../../store/reducers';
import Card from '../../molecules/Card/Card';
import Modal from '../../molecules/Modal/Modal';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import styles from './CardList.module.scss';

interface CardListProps {
  listOfCharacters: Character[];
}

const CardList = (props: CardListProps) => {
  const { listOfCharacters } = props;

  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useDispatch();

  const requestPayload = useSelector(({ characters }: RootReducer) => characters);
  const { characterName, info } = requestPayload;

  const observer = useRef<IntersectionObserver | null>();
  const lastCharacterCardRef = useCallback((node: any) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      console.log(currentPage, entries[0].isIntersecting, info.pages);
      if (entries[0].isIntersecting && currentPage <= info.pages) {
        dispatch(FetchCharactersMore({ searchString: characterName, pageNumber: currentPage }));
        setCurrentPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [currentPage, info]);

  useEffect(() => {
    setCurrentPage(initialPageNumber);
  }, [characterName]);

  return (
    <div className={styles.cardListWrapper}>
      {listOfCharacters && listOfCharacters.map((character: Character, index: number) => {
        if (index === listOfCharacters.length - 1) {
          return <Card
            ref={lastCharacterCardRef}
            key={character.id}
            data={character}
            setIsModalActive={setIsModalActive}
          />;
        } else {
          return <Card
            key={character.id}
            data={character}
            setIsModalActive={setIsModalActive}
          />;
        }
      })}
      {isModalActive && <Modal setIsActive={setIsModalActive} isActive={isModalActive}>
        <CharacterInfo />
      </Modal>}
    </div>
  );
};

export default CardList;