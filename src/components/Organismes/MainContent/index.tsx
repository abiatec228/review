import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MORE_HEROES } from "../../../redux/actions/heroActions";

import { getContentfulFieldsSelector } from "../../../redux/selectors/contentfulSelectors";
import { getEpisodeSelector } from "../../../redux/selectors/episodeSelectors";
import { getHeroesSelector, getHeroNameSelector, getNextPageSelector } from "../../../redux/selectors/heroesSelectors";
import { defineNextPage } from "../../../utils/validator";

import {Button, ErrorComponent, Loader} from "../../Atoms";
import { ContentList, ModalHero } from "../../Molecules";

import styles from './index.module.scss';

export const MainContent = () => {

  const heroes = useSelector(getHeroesSelector)
  const episode = useSelector(getEpisodeSelector)
  const contentfulInfo = useSelector(getContentfulFieldsSelector)
  const nextPage = useSelector(getNextPageSelector)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHeroId, setSelectedHeroId] = useState('');

  const openModal = (id: string) => {
    setSelectedHeroId(id);
    setIsModalOpen(true)
  }

  const fetchMore = () => {
    dispatch({
      type: LOAD_MORE_HEROES, 
      payload: {
        name: name || '', 
        page: defineNextPage(nextPage) || 1
      }
    })
  }
  const name = useSelector(getHeroNameSelector)
  const dispatch = useDispatch();
  const searchResult = !heroes.isError ? <ContentList characters={heroes?.heroes} setSelectedHeroId={openModal}/> : <ErrorComponent />
  return (
    <div>
      {isModalOpen && <ModalHero episode={episode} hero={heroes.heroes.find(hero => hero.id === selectedHeroId)} setIsModalOpen={() => setIsModalOpen(false)} />}
      <div className='content'>
        <h1>{contentfulInfo?.title || 'Rick and Morty'}</h1>
        { heroes?.isLoading ? <Loader /> : searchResult}
        {heroes?.heroes?.length > 19 && nextPage && <Button className={styles.button} onClick={fetchMore}>Fetch more</Button>}
      </div>
    </div>
  )
}